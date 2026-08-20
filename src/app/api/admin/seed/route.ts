import { NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { defaultProjects } from '@/lib/defaultProjects';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await requireSuperAdmin();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database is not connected. Please configure MONGODB_URI in .env.local.' },
        { status: 503 }
      );
    }

    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of defaultProjects) {
      const existing = await Project.findOne({ title: item.title });
      if (!existing) {
        await Project.create({
          title: item.title,
          category: item.category,
          description: item.description,
          image: item.image,
          link: item.link,
          featured: item.featured ?? false,
          order: item.order ?? 0,
        });
        insertedCount++;
      } else {
        skippedCount++;
      }
    }

    const allProjects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      message: `Database seeding completed. Inserted: ${insertedCount}, Skipped existing: ${skippedCount}. Total in DB: ${allProjects.length}`,
      totalCount: allProjects.length,
      projects: allProjects,
    });
  } catch (err: any) {
    console.error('Error in POST /api/admin/seed:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

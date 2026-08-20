import { NextRequest, NextResponse } from 'next/server';
import { requireAdminOrSubAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await requireAdminOrSubAdmin();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database is not connected. Please verify MONGODB_URI.' },
        { status: 503 }
      );
    }

    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      projects,
      userRole: user.role,
    });
  } catch (err: any) {
    console.error('Error in GET /api/admin/portfolio:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminOrSubAdmin();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database is not connected. Please verify MONGODB_URI.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { title, category, description, image, link, featured, isLive, order } = body;

    if (!title || !category || !description || !image) {
      return NextResponse.json(
        { success: false, error: 'Title, category, description, and image URL are required.' },
        { status: 400 }
      );
    }

    const newProject = await Project.create({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      image: image.trim(),
      link: link ? link.trim() : '#',
      featured: Boolean(featured),
      isLive: isLive !== undefined ? Boolean(isLive) : true,
      order: typeof order === 'number' ? order : 0,
    });

    return NextResponse.json({
      success: true,
      message: 'Project created successfully.',
      project: newProject,
    }, { status: 201 });
  } catch (err: any) {
    console.error('Error in POST /api/admin/portfolio:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

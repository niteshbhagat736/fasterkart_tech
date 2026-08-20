import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { defaultProjects } from '@/lib/defaultProjects';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await connectToDatabase();
    
    if (db) {
      const dbProjects = await Project.find({ isLive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean();
      
      if (dbProjects && dbProjects.length > 0) {
        return NextResponse.json({
          success: true,
          source: 'database',
          projects: dbProjects,
        });
      }
    }

    // Fallback if DB is empty or not connected
    return NextResponse.json({
      success: true,
      source: 'fallback',
      projects: defaultProjects,
    });
  } catch (error: any) {
    console.error('Error in GET /api/portfolio:', error);
    return NextResponse.json(
      {
        success: true,
        source: 'fallback_on_error',
        projects: defaultProjects,
        error: error.message,
      },
      { status: 200 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { requireAdminOrSubAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    await requireAdminOrSubAdmin();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database is not connected.' },
        { status: 503 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        ...(body.title && { title: body.title.trim() }),
        ...(body.category && { category: body.category.trim() }),
        ...(body.description && { description: body.description.trim() }),
        ...(body.image && { image: body.image.trim() }),
        ...(body.link !== undefined && { link: body.link.trim() }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
        ...(body.isLive !== undefined && { isLive: Boolean(body.isLive) }),
        ...(body.order !== undefined && { order: Number(body.order) }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully.',
      project: updatedProject,
    });
  } catch (err: any) {
    console.error('Error in PUT /api/admin/portfolio/[id]:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAdminOrSubAdmin();
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database is not connected.' },
        { status: 503 }
      );
    }

    const { id } = await context.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (err: any) {
    console.error('Error in DELETE /api/admin/portfolio/[id]:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

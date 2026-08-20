import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin, getHostAdminEmails } from '@/lib/auth';
import { clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireSuperAdmin();

    const client = await clerkClient();
    const userListResponse = await client.users.getUserList({ limit: 100 });
    const hostAdminEmails = getHostAdminEmails();

    // Normalize users
    const users = userListResponse.data.map((u) => {
      const userEmails = (u.emailAddresses || []).map((e) => e.emailAddress.toLowerCase().trim());
      const primaryEmail = (u.emailAddresses?.find(
        (e) => e.id === u.primaryEmailAddressId
      )?.emailAddress || u.emailAddresses?.[0]?.emailAddress || 'No Email').toLowerCase().trim();

      let role = (u.publicMetadata?.role as string) || 'user';
      const isHostAdmin = hostAdminEmails.length > 0 && userEmails.some((email) => hostAdminEmails.includes(email));
      
      if (isHostAdmin || role === 'admin') {
        role = 'admin';
      }

      return {
        id: u.id,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || 'User',
        email: primaryEmail,
        imageUrl: u.imageUrl,
        role,
        isHostAdmin,
        createdAt: u.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (err: any) {
    console.error('Error in GET /api/admin/subadmins:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireSuperAdmin();

    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, error: 'userId and role are required.' },
        { status: 400 }
      );
    }

    if (!['admin', 'sub_admin', 'user'].includes(role)) {
      return NextResponse.json(
        { success: false, error: 'Invalid role. Must be admin, sub_admin, or user.' },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    const updatedUser = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    });

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role} successfully.`,
      user: {
        id: updatedUser.id,
        role: updatedUser.publicMetadata?.role,
      },
    });
  } catch (err: any) {
    console.error('Error in POST /api/admin/subadmins:', err);
    const status = err.message.includes('UNAUTHORIZED') ? 401 : err.message.includes('FORBIDDEN') ? 403 : 500;
    return NextResponse.json({ success: false, error: err.message }, { status });
  }
}

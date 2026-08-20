import { auth, currentUser } from '@clerk/nextjs/server';

export type UserRole = 'admin' | 'sub_admin' | 'user';

/**
 * Retrieves the configured host admin emails strictly from environment variables (.env / .env.local).
 * Zero emails are hardcoded in the codebase.
 */
export function getHostAdminEmails(): string[] {
  const envEmail = process.env.ADMIN_EMAIL;
  const envEmails = process.env.ADMIN_EMAILS;
  
  const emails: string[] = [];

  if (envEmail) {
    emails.push(envEmail.trim().toLowerCase());
  }

  if (envEmails) {
    envEmails.split(',').forEach((e) => {
      const trimmed = e.trim().toLowerCase();
      if (trimmed && !emails.includes(trimmed)) {
        emails.push(trimmed);
      }
    });
  }

  return emails;
}

export interface AuthenticatedUser {
  userId: string;
  email: string | null;
  name: string | null;
  role: UserRole;
  isSuperAdmin: boolean;
}

/**
 * Retrieves the currently authenticated Clerk user and determines their role.
 * - If user's email matches ADMIN_EMAIL in .env, they are automatically granted 'admin' (Host Super-Admin).
 * - Otherwise, checks user's Clerk publicMetadata.role ('admin' | 'sub_admin' | 'user').
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  // Extract all email addresses associated with this account
  const userEmails = (user.emailAddresses || []).map((e) => e.emailAddress.toLowerCase().trim());
  const primaryEmail = (user.emailAddresses?.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '').toLowerCase().trim();

  const hostAdminEmails = getHostAdminEmails();
  
  // Host admin check: matches ADMIN_EMAIL from .env or explicit metadata role
  const isHostAdmin = Boolean(
    (hostAdminEmails.length > 0 && userEmails.some((email) => hostAdminEmails.includes(email))) ||
    user.publicMetadata?.role === 'admin'
  );

  let role: UserRole = 'user';
  if (isHostAdmin) {
    role = 'admin';
  } else if (user.publicMetadata?.role === 'sub_admin') {
    role = 'sub_admin';
  }

  return {
    userId: user.id,
    email: primaryEmail || userEmails[0] || null,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User',
    role,
    isSuperAdmin: isHostAdmin,
  };
}

/**
 * Validates that the user has at least 'sub_admin' or 'admin' privileges.
 * Throws an Error if unauthorized.
 */
export async function requireAdminOrSubAdmin(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('UNAUTHORIZED: Authentication required.');
  }

  if (user.role !== 'admin' && user.role !== 'sub_admin') {
    throw new Error('FORBIDDEN: Admin or Sub-Admin role required.');
  }

  return user;
}

/**
 * Validates that the user has strict 'admin' (Host Super-Admin) privileges.
 * Used exclusively for Sub-Admin team management and database seeding.
 */
export async function requireSuperAdmin(): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error('UNAUTHORIZED: Authentication required.');
  }

  if (user.role !== 'admin') {
    throw new Error('FORBIDDEN: Super Admin role required to perform this action.');
  }

  return user;
}

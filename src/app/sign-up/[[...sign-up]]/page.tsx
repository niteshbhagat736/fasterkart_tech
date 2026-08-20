import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 0))',
    }}>
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
      }}>
        <Link 
          href="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-text-dim)',
            textDecoration: 'none',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div style={{
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '100px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#818cf8',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '12px',
        }}>
          <ShieldCheck size={16} /> FasterKart Tech Portal
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--color-text)',
          margin: 0,
        }}>
          Create Admin / Team Account
        </h1>
      </div>

      <SignUp />
    </div>
  );
}

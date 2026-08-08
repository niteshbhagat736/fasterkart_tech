'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Phases from '@/components/Phases';
import Footer from '@/components/Footer';

export default function ProcessPage() {
  // Global scroll reveal observer for this page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe all elements with reveal classes
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg-2)' }}>
        <Phases />
      </div>
      <Footer />
    </>
  );
}

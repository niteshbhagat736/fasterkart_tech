'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

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
  }, [pathname]); // Re-run when pathname changes to ensure new elements are observed

  return null;
}

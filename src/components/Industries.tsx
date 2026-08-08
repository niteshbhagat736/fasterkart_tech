'use client';

import { useEffect, useRef } from 'react';
import { HeartPulse, ShoppingCart, Home, GraduationCap, Car, Utensils, Landmark, Plane, HardHat, Store } from 'lucide-react';
import styles from './Industries.module.css';

const industries = [
  { icon: <HeartPulse size={32} />, label: 'Healthcare', desc: 'Hospital systems, clinic apps, patient portals' },
  { icon: <ShoppingCart size={32} />, label: 'E-commerce', desc: 'Online stores, inventory, order management' },
  { icon: <Home size={32} />, label: 'Real Estate', desc: 'Property listings, agent portals, booking' },
  { icon: <GraduationCap size={32} />, label: 'Education', desc: 'LMS platforms, student portals, e-learning' },
  { icon: <Car size={32} />, label: 'Automotive', desc: 'Service booking, dealership management' },
  { icon: <Utensils size={32} />, label: 'Food & Restaurant', desc: 'Ordering apps, kitchen dashboards, delivery' },
  { icon: <Landmark size={32} />, label: 'Finance & Banking', desc: 'Fintech apps, payment systems, analytics' },
  { icon: <Plane size={32} />, label: 'Travel & Tourism', desc: 'Booking platforms, itinerary managers' },
  { icon: <HardHat size={32} />, label: 'Construction', desc: 'Project management, site tracking tools' },
  { icon: <Store size={32} />, label: 'Retail & Wholesale', desc: 'POS systems, stock management, B2B portals' },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const header = section.querySelector('[data-reveal]');
      if (header) observer.observe(header);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="industries" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={`reveal ${styles.header}`} data-reveal>
          <span className="section-label">Industries We Serve</span>
          <h2 className="section-title">
            Built for <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="section-subtitle">
            Our solutions span across industries — we speak your business language and understand
            your domain-specific challenges.
          </p>
        </div>
      </div>

      <div className={styles.scrollTrack}>
        <div className={styles.scrollRow}>
          {[...industries, ...industries].map((ind, i) => (
            <div key={`${ind.label}-${i}`} className={styles.card} id={`industry-${i}`}>
              <span className={styles.cardIcon}>{ind.icon}</span>
              <span className={styles.cardLabel}>{ind.label}</span>
              <span className={styles.cardDesc}>{ind.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

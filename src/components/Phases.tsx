'use client';

import { useEffect, useRef } from 'react';
import styles from './Phases.module.css';

const phases = [
  {
    number: '01',
    title: 'Discovery & Proposal',
    subtitle: 'Phase 1 — Understanding Your Vision',
    color: '#6366f1',
    points: [
      'Understanding your business and its goals',
      'Identifying the problem we need to solve together',
      'Gathering all feature and platform requirements',
      'Identifying user roles (Admin, Customer, Staff, etc.)',
      'Sending a detailed proposal and project quotation',
      'Agreement on feature list, budget, and timelines',
    ],
    note: '📌 Client Deliverable: Project Proposal Document',
  },
  {
    number: '02',
    title: 'Planning & UI Design',
    subtitle: 'Phase 2 — Building the Blueprint',
    color: '#a855f7',
    points: [
      'Branding discussion — colors, fonts, and feel',
      'UI/UX wireframes and design mockups',
      'User flow diagrams — how your users navigate',
      'Pseudo-code discussion (in plain English, no tech jargon)',
      'Database and system architecture planning',
      'Client review and design approval before coding begins',
    ],
    note: '📌 Client Deliverable: Design Mockups + System Flowchart',
  },
  {
    number: '03',
    title: 'Development',
    subtitle: 'Phase 3 — Building Your Product',
    color: '#06b6d4',
    points: [
      'Frontend development — what your users see',
      'Backend development — the engine behind the scenes',
      'Database setup and data management',
      'API integrations — payments, maps, WhatsApp, etc.',
      'AI feature integration (if required)',
      'Weekly milestone reviews with the client',
    ],
    note: '📌 Duration based on complexity. Weekly client check-ins.',
  },
  {
    number: '04',
    title: 'Testing & Launch',
    subtitle: 'Phase 4 — Making it Perfect',
    color: '#10b981',
    points: [
      'Local testing — internal QA by our developers',
      'User Acceptance Testing (UAT) with client team',
      'Bug fixing and performance optimization',
      'Security review and final audit',
      'Production deployment and go-live',
      'Final walkthrough and client sign-off',
    ],
    note: '📌 Client Deliverable: Live Product + Handover Documentation',
  },
];

export default function Phases() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-label">How We Work</span>
          <h2 className="section-title">
            Our <span className="gradient-text">4-Phase Process</span>
          </h2>
          <p className="section-subtitle">
            A clear, structured journey from your idea to a live product — with you
            involved at every key step.
          </p>
        </div>

        <div className={styles.timeline}>
          {phases.map((phase, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={phase.number}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`${isEven ? 'reveal-left' : 'reveal-right'} ${styles.item} ${isEven ? styles.itemLeft : styles.itemRight}`}
                style={{ '--phase-color': phase.color } as React.CSSProperties}
                id={`phase-${phase.number}`}
              >
                <div className={styles.connector}>
                  <div className={styles.dot} />
                  {i < phases.length - 1 && <div className={styles.line} />}
                </div>

                <div className={styles.card}>
                  <div className={styles.cardNumber}>{phase.number}</div>
                  <div className={styles.cardSubtitle}>{phase.subtitle}</div>
                  <h3 className={styles.cardTitle}>{phase.title}</h3>
                  <ul className={styles.points}>
                    {phase.points.map((pt) => (
                      <li key={pt} className={styles.point}>
                        <svg className={styles.checkIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.note}>{phase.note}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

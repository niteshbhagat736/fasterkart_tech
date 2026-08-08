'use client';

import { useEffect, useRef } from 'react';
import { Globe, Monitor, Smartphone, Bot } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    icon: <Globe size={28} />,
    title: 'Website Development',
    tagline: 'Your brand on the internet, built to convert',
    description:
      'From sleek landing pages to full-scale portals, we design and develop websites that look stunning and perform brilliantly.',
    items: ['Landing Pages', 'E-commerce Stores', 'Corporate Websites', 'Real Estate Portals', 'Hospital & Clinic Sites', 'Educational Platforms'],
    color: '#6366f1',
  },
  {
    icon: <Monitor size={28} />,
    title: 'Software Development',
    tagline: 'Custom software that runs your business',
    description:
      'We build enterprise-grade desktop and cloud-based software tailored to your exact workflows and business processes.',
    items: ['ERP Systems', 'CRM Platforms', 'Inventory Management', 'Billing & Invoicing', 'HR Management', 'Hospital Management'],
    color: '#a855f7',
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile App Development',
    tagline: 'One codebase. Android & iOS. Zero compromise.',
    description:
      'Using React Native, we build fast, beautiful mobile apps for both Android and iOS from a single codebase — faster, cheaper, better.',
    items: ['Food Delivery Apps', 'Taxi & Ride Booking', 'Healthcare Apps', 'Shopping Apps', 'Learning Platforms', 'Business Management'],
    color: '#06b6d4',
  },
  {
    icon: <Bot size={28} />,
    title: 'AI Solutions',
    tagline: 'Make your product intelligent',
    description:
      'We integrate cutting-edge AI into your products — chatbots, voice assistants, document readers, and automation that saves hours every day.',
    items: ['AI Chatbot', 'Voice Assistant', 'AI Customer Support', 'Document Reader (OCR)', 'AI Automation', 'Recommendation Engine'],
    color: '#f59e0b',
  },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={`reveal ${styles.header}`} id="services-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            End-to-End{' '}
            <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="section-subtitle">
            Whether you need a stunning website, powerful software, a mobile app,
            or AI capabilities — we&apos;ve got the full stack covered.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`reveal delay-${i + 1} ${styles.card}`}
              style={{ '--card-color': service.color } as React.CSSProperties}
              id={`service-card-${i}`}
            >
              <div className={styles.cardGlow} />
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardTagline}>{service.tagline}</p>
              <p className={styles.cardDesc}>{service.description}</p>
              <ul className={styles.itemList}>
                {service.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.itemDot} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

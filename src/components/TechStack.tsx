'use client';

import { useEffect, useRef } from 'react';
import { 
  Triangle, Atom, Palette, Braces,
  Hexagon, Zap, Plug, Share2,
  Leaf, Database, Layers, Flame,
  Smartphone, Bot, TabletSmartphone, SmartphoneNfc,
  Brain, Sparkles, Cloud, CloudLightning,
  LayoutGrid, Laptop, Terminal
} from 'lucide-react';
import styles from './TechStack.module.css';

const stackGroups = [
  {
    category: 'Frontend',
    color: '#6366f1',
    items: [
      { name: 'Next.js', icon: <Triangle size={18} fill="currentColor" /> },
      { name: 'React.js', icon: <Atom size={18} /> },
      { name: 'Tailwind CSS', icon: <Palette size={18} /> },
      { name: 'TypeScript', icon: <Braces size={18} /> },
    ],
  },
  {
    category: 'Backend',
    color: '#06b6d4',
    items: [
      { name: 'Node.js', icon: <Hexagon size={18} /> },
      { name: 'Express.js', icon: <Zap size={18} /> },
      { name: 'REST APIs', icon: <Plug size={18} /> },
      { name: 'GraphQL', icon: <Share2 size={18} /> },
    ],
  },
  {
    category: 'Database',
    color: '#a855f7',
    items: [
      { name: 'MongoDB', icon: <Leaf size={18} /> },
      { name: 'PostgreSQL', icon: <Database size={18} /> },
      { name: 'Redis', icon: <Layers size={18} /> },
      { name: 'Firebase', icon: <Flame size={18} /> },
    ],
  },
  {
    category: 'Mobile',
    color: '#10b981',
    items: [
      { name: 'React Native', icon: <Smartphone size={18} /> },
      { name: 'Android', icon: <Bot size={18} /> },
      { name: 'iOS', icon: <SmartphoneNfc size={18} /> },
      { name: 'Expo', icon: <TabletSmartphone size={18} /> },
    ],
  },
  {
    category: 'AI & Cloud',
    color: '#f59e0b',
    items: [
      { name: 'OpenAI', icon: <Brain size={18} /> },
      { name: 'Google Gemini', icon: <Sparkles size={18} /> },
      { name: 'AWS', icon: <Cloud size={18} /> },
      { name: 'Vercel', icon: <Triangle size={18} className="rotate-180" /> },
    ],
  },
  {
    category: 'Desktop',
    color: '#ef4444',
    items: [
      { name: 'Electron.js', icon: <Atom size={18} /> },
      { name: 'Windows', icon: <LayoutGrid size={18} /> },
      { name: 'macOS', icon: <Laptop size={18} /> },
      { name: 'Linux', icon: <Terminal size={18} /> },
    ],
  },
];

export default function TechStack() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((c) => { if (c) observer.observe(c); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" className={styles.section}>
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-label">Technology</span>
          <h2 className="section-title">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            We use industry-leading, battle-tested technologies — selected for performance,
            scalability, and long-term maintainability.
          </p>
        </div>

        <div className={styles.grid}>
          {stackGroups.map((group, gi) => (
            <div
              key={group.category}
              ref={(el) => { cardsRef.current[gi] = el; }}
              className={`reveal delay-${(gi % 4) + 1} ${styles.group}`}
              style={{ '--group-color': group.color } as React.CSSProperties}
              id={`tech-group-${gi}`}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupDot} />
                <span className={styles.groupName}>{group.category}</span>
              </div>
              <div className={styles.items}>
                {group.items.map((item) => (
                  <div key={item.name} className={styles.techItem}>
                    <span className={styles.techIcon}>{item.icon}</span>
                    <span className={styles.techName}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`reveal ${styles.pitch}`}>
          <p>
            <span className={styles.quoteIcon}>&ldquo;</span>
            We build modern, scalable, and secure applications. For websites, we use
            <strong> React, Next.js, Node.js, Express.js, and MongoDB</strong>. For mobile apps,
            we use <strong>React Native</strong> so the same app works on both Android and iOS.
            For desktop software, we use <strong>Electron</strong>. For AI features, we integrate
            leading models like <strong>OpenAI and Google Gemini</strong>.
            <span className={styles.quoteIcon}>&rdquo;</span>
          </p>
          <span className={styles.pitchAuthor}>— How we explain our stack to clients</span>
        </div>
      </div>
    </section>
  );
}

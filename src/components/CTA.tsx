'use client';

import { Mail, MessageCircle } from 'lucide-react';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.bgGrad} />
      <div className={styles.grid1} />
      <div className="container">
        <div className={styles.box}>
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Ready to Start?
          </span>
          <h2 className={styles.title}>
            Let&apos;s Build Something
            <br />
            <span className={styles.titleAccent}>Amazing Together</span>
          </h2>
          <p className={styles.subtitle}>
            Tell us about your project. We&apos;ll understand your business, propose a plan,
            and get to work — with you at every step.
          </p>

          <div className={styles.actions}>
            <a
              href="mailto:hello@fasterkarttech.com"
              className={styles.primaryBtn}
              id="cta-email-btn"
            >
              <Mail size={18} /> Send Us an Email
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
              id="cta-whatsapp-btn"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          <div className={styles.features}>
            {['Free initial consultation', 'No-commitment proposal', 'Response within 24 hours'].map((f) => (
              <div key={f} className={styles.feature}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

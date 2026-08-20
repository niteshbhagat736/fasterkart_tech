'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactEmail } from '@/app/actions';
import styles from './CTA.module.css';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);

      const res = await sendContactEmail(data);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Failed to send email. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

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

          <div className={styles.formContainer}>
            {status === 'success' ? (
              <div className={styles.successBox}>
                <CheckCircle2 size={48} className={styles.successIcon} />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className={styles.secondaryBtn}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {status === 'error' && (
                  <div className={styles.errorBox}>
                    <AlertCircle size={20} className={styles.errorIcon} />
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Project details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, timeline, budget or requirements..."
                    required
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.actions}>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={styles.submitBtn}
                    id="cta-submit-btn"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className={styles.spinner} /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/919678330237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                    id="cta-whatsapp-btn"
                    title="Chat on WhatsApp"
                    aria-label="Chat on WhatsApp"
                  >
                    <MessageCircle size={22} />
                  </a>
                </div>
              </form>
            )}
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

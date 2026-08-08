import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = {
  Services: [
    { name: 'Website Development', href: '/#services' },
    { name: 'Software Development', href: '/#services' },
    { name: 'Mobile Apps', href: '/#services' },
    { name: 'AI Solutions', href: '/#services' }
  ],
  Process: [
    { name: 'Discovery & Proposal', href: '/process' },
    { name: 'UI/UX Planning', href: '/process' },
    { name: 'Development', href: '/process' },
    { name: 'Testing & Launch', href: '/process' }
  ],
  Company: [
    { name: 'About Us', href: '/#stats' },
    { name: 'Our Team', href: '/#stats' },
    { name: 'Case Studies', href: '/#testimonials' },
    { name: 'Blog', href: '#' }
  ],
  Contact: [
    { name: 'hello@fasterkarttech.com', href: 'mailto:hello@fasterkarttech.com' },
    { name: '+91 98765 43210', href: 'tel:+919876543210' },
    { name: 'Surat, Gujarat, India', href: '#' },
    { name: 'Mon–Sat, 9am–7pm', href: '#' }
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Zap size={20} className={styles.logoIcon} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
              FasterKart<span className={styles.logoAccent}>Tech</span>
            </div>
            <p className={styles.tagline}>
              We build digital products that transform businesses — websites, mobile apps,
              software, and AI solutions, all under one roof.
            </p>
            <div className={styles.socials}>
              {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((s) => (
                <a key={s} href="#" className={styles.social} aria-label={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            {Object.entries(footerLinks).map(([category, items]) => (
              <div key={category} className={styles.linkGroup}>
                <h4 className={styles.linkGroupTitle}>{category}</h4>
                <ul>
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={styles.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} FasterKart Tech. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            <Link href="#" className={styles.link}>Privacy Policy</Link>
            <Link href="#" className={styles.link}>Terms of Service</Link>
            <Link href="#" className={styles.link}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

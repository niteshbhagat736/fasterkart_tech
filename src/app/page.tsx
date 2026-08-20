import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import TechStack from '@/components/TechStack';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FasterKart Tech | Digital Transformation & Custom Software Development',
  description: 'Accelerate your digital growth with FasterKart Tech. We develop custom software, high-performance web applications, mobile apps, and scalable AI solutions tailored to your business needs.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FasterKart Tech | Custom Software Development Agency',
    description: 'We develop custom software, high-performance web applications, mobile apps, and scalable AI solutions.',
    url: '/',
    siteName: 'FasterKart Tech',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <TechStack />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

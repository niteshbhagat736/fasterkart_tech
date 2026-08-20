export interface PortfolioProject {
  id?: number | string;
  _id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
  isLive?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultProjects: PortfolioProject[] = [
  {
    title: 'Investcly',
    category: 'Financial News Platform',
    description: 'A dynamic blogging platform focused on financial news, featuring real-time market data tickers, financial calculators, and categorized insights into investments, budgets, and taxes.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    link: 'https://dynamicnews.vercel.app/',
    featured: true,
    order: 1,
  },
  {
    title: 'AskMentor',
    category: 'AI Educational Platform',
    description: 'An AI-powered mentoring platform connecting learners with virtual personas of alumni, professors, and professionals for personalized 24/7 guidance and career advice.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    link: 'https://www.askmentor.online/',
    featured: true,
    order: 2,
  },
  {
    title: 'Insane Duo',
    category: 'Artist Portfolio',
    description: 'A visually stunning artist portfolio for professional aerial and circus performers. Showcases high-risk aerial acts, global performance history, and dynamic event galleries.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop',
    link: 'https://www.insaneduo.in/',
    featured: true,
    order: 3,
  },
  {
    title: 'MediConnection',
    category: 'Healthcare Platform',
    description: 'A smart healthcare networking platform to connect patients with medical professionals. Streamlines appointments, medical history, and secure prescription tracking.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    link: 'https://mediconnection.vercel.app/user',
    featured: true,
    order: 4,
  },
  {
    title: 'Bharat Vibes',
    category: 'Cultural Platform',
    description: 'A platform dedicated to showcasing Indian culture. Users can post stories, upload photos and videos, upvote content, and earn Vibe Coins as rewards.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop',
    link: 'https://bharatvibes.vercel.app/',
    featured: true,
    order: 5,
  },
  {
    title: 'Hospital Management ERP',
    category: 'Software Development',
    description: 'A complete end-to-end hospital management system handling patient records, billing, pharmacy inventory, and doctor scheduling in real-time.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    link: '#',
    featured: false,
    order: 6,
  },
  {
    title: 'ShopNest E-Commerce',
    category: 'Web & Mobile App',
    description: 'A high-performance e-commerce platform with a mobile app. Features include real-time order tracking, AI recommendations, and advanced analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    link: '#',
    featured: false,
    order: 7,
  },
  {
    title: 'QuickBites Delivery Network',
    category: 'Mobile Application',
    description: 'A fast and scalable food delivery app connecting local restaurants with delivery drivers. Includes live GPS tracking and automated dispatching.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop',
    link: '#',
    featured: false,
    order: 8,
  },
  {
    title: 'AI Customer Support Bot',
    category: 'AI Solutions',
    description: 'An intelligent chatbot trained on company knowledge bases that resolves 80% of customer queries automatically without human intervention.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    link: '#',
    featured: false,
    order: 9,
  },
  {
    title: 'BuildRight CRM',
    category: 'Software Development',
    description: 'A custom CRM built for construction firms to manage client leads, project milestones, vendor contracts, and field worker timesheets.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    link: '#',
    featured: false,
    order: 10,
  },
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    description: 'A secure financial dashboard providing real-time data visualization, portfolio tracking, and automated reporting for investment firms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: '#',
    featured: false,
    order: 11,
  },
];

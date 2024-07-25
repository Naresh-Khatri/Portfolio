import { Link } from '@/types/link';

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    thumbnail: 'home.jpg'
  },
  {
    title: 'About',
    href: 'about',
    thumbnail: 'about.jpg'
  },
  {
    title: 'Projects',
    href: '/projects',
    thumbnail: 'projects.jpg'
  },
  // {
  //   title: 'Skills',
  //   href: '/skills',
  //   thumbnail: 'skills.jpg'
  // },
  // {
  //   title: 'Testimonials',
  //   href: '/testimonials',
  //   thumbnail: 'testimonials.jpg'
  // },
  {
    title: 'Blogs',
    href: '/blogs',
    thumbnail: 'blog.jpg',
    target: '_blank'
  },
  {
    title: 'Contact',
    href: '/contact',
    thumbnail: 'contact.jpg'
  }
];

export { links };

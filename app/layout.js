import './globals.css';
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Rahul Sisode — AI & Full Stack Developer',
  description:
    'Building intelligent systems. From database schema to deployment — every layer, end to end.',
  keywords: ['AI Developer', 'Full Stack', 'React', 'Django', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Rahul Sisode' }],
  openGraph: {
    title: 'Rahul Sisode — AI & Full Stack Developer',
    description: 'Building intelligent systems. End to end.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import './globals.css';
import { Bebas_Neue, DM_Sans, DM_Mono, Space_Grotesk } from 'next/font/google';

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

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata = {
  title: 'Rahul Hiratsingh Sisode — Developer · Marketer · Security',
  description:
    '3 self-shipped products. 4 real internships. Zero fluff. Explore Rahul\'s portfolio through Developer, Marketer, or Security Analyst lenses.',
  keywords: ['AI Developer', 'Full Stack', 'React', 'Django', 'Security', 'Marketing', 'Portfolio'],
  authors: [{ name: 'Rahul Hiratsingh Sisode' }],
  openGraph: {
    title: 'Rahul Hiratsingh Sisode — Choose Your Path',
    description: '3 self-shipped products. 4 real internships. Zero fluff.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${dmMono.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}

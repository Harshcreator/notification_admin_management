import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NotificationBell } from './components/NotificationBell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notification System',
  description: 'A comprehensive notification management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Notification System</h1>
            <NotificationBell />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import './globals.css';

// Polyfill for Array.prototype.toSorted for older Node.js versions
if (typeof Array.prototype.toSorted === 'undefined') {
  Array.prototype.toSorted = function(compareFn) {
    return [...this].sort(compareFn);
  };
}

import { ThemeProvider } from '@/components/theme-provider';
import { SidebarConfigProvider } from '@/contexts/sidebar-context';
import { inter, outfit } from '@/lib/fonts';
import { GoogleAnalytics } from '@next/third-parties/google';
import { TermsModal } from '@/components/terms-modal';

export const metadata: Metadata = {
  title: 'Nanochip',
  description: 'A driver monitoring system in your phone.',
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className={outfit.className}>
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
          <SidebarConfigProvider>
            {children}
            <TermsModal />
          </SidebarConfigProvider>
        </ThemeProvider>

        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}

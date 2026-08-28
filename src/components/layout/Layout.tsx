import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export function Layout({ children, title = 'Password Analyzer | Security Engine' }: { children: React.ReactNode, title?: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Quantify password security before adversaries do." />
      </Head>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-text">Password Analyzer</span>
        </Link>
        <div className="flex items-center gap-8 text-sm text-muted">
          <Link href="/methodology" className="hover:text-text transition-colors">Methodology</Link>
          <Link href="/performance" className="hover:text-text transition-colors">Performance</Link>
        </div>
      </nav>

      <main className="flex flex-col items-center w-full min-h-[calc(100vh-140px)]">
        {children}
      </main>

      <footer className="w-full bg-dark-bg text-dark-text pb-12 px-6 md:px-12 border-t border-[#2A2A28] mt-24">
        <div className="max-w-screen-xl mx-auto pt-12 flex flex-col md:flex-row justify-between items-start gap-12">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-dark-text">Password Analyzer</span>
          </Link>
          
          <div className="flex gap-16 md:gap-24 text-sm">
            <div className="flex flex-col gap-4">
              <span className="text-[#A3A39E] font-medium">Product</span>
              <Link href="/" className="hover:text-white transition-colors">Engine</Link>
              <Link href="/methodology" className="hover:text-white transition-colors">Methodology</Link>
              <Link href="/performance" className="hover:text-white transition-colors">Performance</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#A3A39E] font-medium">Resources</span>
              <a href="https://github.com/AdhavBai/password-analyzer" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

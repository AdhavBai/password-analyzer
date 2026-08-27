import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { AnalyzerWidget } from '@/components/widgets/AnalyzerWidget';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Layout>
      <section className="w-full max-w-screen-xl px-6 md:px-12 py-24 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 max-w-4xl"
        >
          <span className="text-sm font-medium tracking-wider uppercase text-muted">Security Intelligence</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tightest leading-[1.05] text-text">
            Quantify security.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mt-4 leading-relaxed">
            Type below to instantly analyze password entropy and vulnerabilities. 100% client-side.
          </p>
        </motion.div>
      </section>

      <section className="w-full max-w-3xl px-6 md:px-12 pb-24 md:pb-32 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <AnalyzerWidget />
        </motion.div>
      </section>
    </Layout>
  );
}

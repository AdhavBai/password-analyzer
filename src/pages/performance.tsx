import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';

export default function Performance() {
  return (
    <Layout title="Performance | Tinfoil">
      <section className="w-full max-w-screen-xl px-6 md:px-12 py-24 md:py-32 flex flex-col gap-16">
        <div className="max-w-3xl flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Engine Performance</h1>
          <p className="text-lg text-muted leading-relaxed">
            Security tools should be instantaneous. We engineered Tinfoil to operate entirely in the client's browser, ensuring zero latency and maximum privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-border">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <span className="text-6xl md:text-8xl font-medium tracking-tighter text-text">{'<'} 2ms</span>
            <span className="text-lg font-medium text-text mt-2">Evaluation Latency</span>
            <span className="text-sm text-muted">Regex and math operations complete near-instantly on modern devices.</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <span className="text-6xl md:text-8xl font-medium tracking-tighter text-text">100%</span>
            <span className="text-lg font-medium text-text mt-2">Client-Side</span>
            <span className="text-sm text-muted">All logic is bundled in the frontend. We don't host a backend API.</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-2"
          >
            <span className="text-6xl md:text-8xl font-medium tracking-tighter text-text">Zero</span>
            <span className="text-lg font-medium text-text mt-2">Data Transmission</span>
            <span className="text-sm text-muted">Passwords never leave your device. Network interception is mathematically impossible.</span>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

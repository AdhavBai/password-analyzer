import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { GeneratorWidget } from '@/components/widgets/GeneratorWidget';
import { TestBenchWidget } from '@/components/widgets/TestBenchWidget';
import { Divider } from '@/components/ui/Divider';

export default function Methodology() {
  return (
    <Layout title="Methodology | Password Analyzer">
      <section className="w-full max-w-screen-xl px-6 md:px-12 py-24 md:py-32 flex flex-col gap-16">
        <div className="max-w-3xl flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Security Methodology</h1>
          <p className="text-lg text-muted leading-relaxed">
            Our evaluation engine combines raw Shannon entropy calculations with heuristic penalty deductions to accurately model real-world vulnerabilities.
          </p>
        </div>

        <Divider />

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl font-medium tracking-tight">Raw Entropy & Compute Cost</h2>
            <p className="text-muted leading-relaxed">
              We calculate raw bit entropy based on the character sets utilized and the total length of the string. We then extrapolate the estimated monetary cost to crack this hash using a theoretical cloud GPU cluster capable of 100 GH/s. If the compute cost is lower than the value of the protected data, the password is fundamentally flawed.
            </p>
            <div className="mt-8">
              <GeneratorWidget />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl font-medium tracking-tight">Heuristic Penalties</h2>
            <p className="text-muted leading-relaxed">
              Entropy alone is deceiving. "12345678" has a length of 8, but an adversary will check for sequences before attempting a brute-force attack. Our engine applies strict score deductions for common sequences, repeated characters, and keyboard walks.
            </p>
            <div className="mt-8">
              <TestBenchWidget />
            </div>
            
            <div className="p-6 mt-4 rounded-xl border border-border bg-secondary shadow-sm">
               <h3 className="text-sm font-medium text-text mb-2">Engine Rules Example</h3>
               <div className="text-xs font-mono text-muted p-4 bg-background rounded-md border border-border overflow-x-auto">
                 rules.push({'{'}<br/>
                 &nbsp;&nbsp;name: 'Keyboard Walk',<br/>
                 &nbsp;&nbsp;deduction: 15,<br/>
                 &nbsp;&nbsp;match: 'qwerty'<br/>
                 {'}'});
               </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

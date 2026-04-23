"use client";

import { motion } from "framer-motion";
import { Search, Filter, Video, FileText, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Lead Discovery",
    description:
      "I identify high-potential prospects through LinkedIn, Apollo, Upwork, and targeted research focusing on decision-makers who match your ideal client profile.",
  },
  {
    icon: Filter,
    step: "02",
    title: "Qualification",
    description:
      "Every lead is vetted against budget, authority, need, and timeline (BANT). Only qualified opportunities move forward saving your team time and energy.",
  },
  {
    icon: Video,
    step: "03",
    title: "Discovery Call",
    description:
      "I run structured discovery calls to uncover pain points, goals, and decision criteria. This is where trust is built and the deal is won or lost.",
  },
  {
    icon: FileText,
    step: "04",
    title: "Proposal & Pitch",
    description:
      "Custom proposals tailored to each client's specific needs not templates. I position your solution as the obvious choice with clear ROI and value framing.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Deal Closing",
    description:
      "Using consultative closing techniques, I handle objections, negotiate terms, and guide prospects to a confident 'yes' without pressure tactics.",
  },
  {
    icon: Rocket,
    step: "06",
    title: "Delivery Handoff",
    description:
      "A smooth transition to your delivery team ensures client expectations are met from day one. Happy clients become repeat clients and referral sources.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-800/8 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            How I Work
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Sales Process</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A proven, repeatable framework that takes prospects from first touch to signed
            contract with zero guesswork.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative card-glow rounded-2xl p-6 group overflow-hidden"
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-black text-violet-900/30 select-none leading-none">
                {step}
              </span>

              <div className="w-11 h-11 rounded-xl bg-violet-600/15 border border-violet-600/20 flex items-center justify-center mb-5 group-hover:bg-violet-600/25 transition-colors relative z-10">
                <Icon size={20} className="text-violet-400" />
              </div>

              <h3 className="text-base font-bold text-white mb-2 relative z-10">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                {description}
              </p>

              {/* Connector arrow (not on last items) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px bg-violet-700/50 z-20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

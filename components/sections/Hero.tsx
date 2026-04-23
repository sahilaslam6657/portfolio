"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, TrendingUp, Users, Globe } from "lucide-react";
import type { Variants } from "framer-motion";

const stats = [
  { icon: TrendingUp, value: "5+", label: "Years in IT Sales" },
  { icon: Users, value: "50+", label: "Clients Acquired" },
  { icon: Globe, value: "4", label: "Global Markets" },
  { icon: TrendingUp, value: "7+", label: "Companies Served" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-700/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 bg-violet-900/40 border border-violet-700/40 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase"
        >
          <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          Available for New Opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6"
        >
          I Turn Conversations
          <br />
          <span className="gradient-text">Into Closed Deals.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Business Development Executive with 5+ years helping IT companies generate
          qualified leads, close international deals, and build scalable sales pipelines
          across the US, Europe, and the Middle East.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 text-base"
          >
            Hire Me
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="mailto:sahilaslam6657@gmail.com"
            className="flex items-center gap-2 border border-violet-700/50 hover:border-violet-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base"
          >
            <Calendar size={18} />
            Book a Call
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="card-glow rounded-2xl p-5 flex flex-col items-center gap-2"
            >
              <Icon size={20} className="text-violet-400" />
              <span className="text-3xl font-black gradient-text">{value}</span>
              <span className="text-xs text-slate-500 font-medium text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-violet-500/50 to-transparent" />
      </div>
    </section>
  );
}

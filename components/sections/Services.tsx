"use client";

import { motion } from "framer-motion";
import { Target, Zap, BarChart3, Handshake, Search, Globe } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Business Development",
    tagline: "From zero to pipeline.",
    description:
      "I identify growth opportunities, forge strategic partnerships, and position your company to win in competitive markets. Whether you're entering a new region or scaling an existing one, I build the foundation for sustainable revenue.",
  },
  {
    icon: Zap,
    title: "Lead Generation",
    tagline: "Qualified leads, not just contacts.",
    description:
      "Using multi-channel outreach LinkedIn, cold email, Upwork, and referrals I deliver a consistent flow of decision-maker leads who are ready to talk. No spray-and-pray. Every lead is researched, qualified, and relevant.",
  },
  {
    icon: BarChart3,
    title: "Sales Strategy",
    tagline: "A system that scales.",
    description:
      "I design and implement sales processes that remove bottlenecks and accelerate deal velocity. From CRM setup to pitch optimization, I turn your sales function into a predictable, repeatable growth engine.",
  },
  {
    icon: Handshake,
    title: "Client Acquisition",
    tagline: "Close more. Lose less.",
    description:
      "I manage the full sales cycle from first contact to signed contract. With a consultative approach and deep understanding of IT services, I convert prospects into long-term clients who refer others.",
  },
  {
    icon: Search,
    title: "Market Research",
    tagline: "Know before you go.",
    description:
      "Before entering a new market, you need intelligence. I conduct in-depth research on target industries, buyer personas, competitor positioning, and pricing so your strategy is built on data, not assumptions.",
  },
  {
    icon: Globe,
    title: "Global Expansion",
    tagline: "Take your business international.",
    description:
      "I've helped IT companies break into the US, UK, UAE, and European markets. I understand the cultural nuances, buying behaviors, and communication styles that make international deals happen.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-700/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What I Do
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Services That <span className="gradient-text">Drive Revenue</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every service is designed with one goal: growing your business. Not just
            activity results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, tagline, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glow rounded-2xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-600/20 flex items-center justify-center mb-5 group-hover:bg-violet-600/25 transition-colors">
                <Icon size={22} className="text-violet-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
              <p className="text-violet-400 text-xs font-semibold uppercase tracking-wide mb-3">
                {tagline}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

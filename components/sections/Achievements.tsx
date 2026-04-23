"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const achievements = [
  {
    metric: "35%",
    label: "Average Revenue Growth",
    detail: "Consistently drove 20–35% revenue growth for clients through structured pipeline development and targeted outreach strategies.",
  },
  {
    metric: "200+",
    label: "Qualified Leads Generated",
    detail: "Built and maintained active prospect databases of 200+ decision-makers across multiple industries and geographies.",
  },
  {
    metric: "50+",
    label: "International Deals Closed",
    detail: "Successfully closed deals with clients in the US, UK, UAE, Germany, and Australia spanning web, mobile, and ERP projects.",
  },
  {
    metric: "4",
    label: "Global Markets Penetrated",
    detail: "Led market entry strategies for IT companies entering North America, Europe, the Middle East, and Southeast Asia.",
  },
  {
    metric: "40%",
    label: "Faster Sales Cycles",
    detail: "Reduced average deal closure time by 40% through optimized follow-up sequences, proposal templates, and objection handling frameworks.",
  },
  {
    metric: "7+",
    label: "Companies Scaled",
    detail: "Contributed to the growth of 7+ IT companies across different stages from early-stage startups to established agencies.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-violet-700/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Impact
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Results That <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Numbers tell the story. Here's the measurable impact I've delivered across
            companies and markets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(({ metric, label, detail }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glow rounded-2xl p-6 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award size={18} className="text-violet-400 shrink-0" />
                <span className="text-4xl font-black gradient-text">{metric}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

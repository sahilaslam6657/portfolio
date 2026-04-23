"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const markets = [
  {
    region: "North America",
    flag: "🇺🇸",
    countries: "United States · Canada",
    focus: "SaaS, Enterprise Software, IT Outsourcing",
  },
  {
    region: "Europe",
    flag: "🇪🇺",
    countries: "UK · Germany · Netherlands · Nordics",
    focus: "Web Development, Digital Transformation, ERP",
  },
  {
    region: "Middle East",
    flag: "🇦🇪",
    countries: "UAE · Saudi Arabia · Qatar",
    focus: "Custom Software, Mobile Apps, E-commerce",
  },
  {
    region: "Asia Pacific",
    flag: "🌏",
    countries: "Australia · Singapore · Southeast Asia",
    focus: "IT Services, Startups, Tech Agencies",
  },
];

const clientTypes = [
  { label: "Startups", desc: "Early-stage companies needing rapid growth" },
  { label: "SMEs", desc: "Mid-size businesses scaling their tech stack" },
  { label: "Tech Agencies", desc: "Agencies looking to expand client base" },
  { label: "SaaS Companies", desc: "Software companies entering new markets" },
];

export default function Markets() {
  return (
    <section id="markets" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Global Reach
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Markets I <span className="gradient-text">Operate In</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            I understand the buying behaviors, communication styles, and business cultures
            of each market I work in.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {markets.map(({ region, flag, countries, focus }, i) => (
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ delay: i * 0.1 }}
              className="card-glow rounded-2xl p-5 text-center"
            >
              <span className="text-4xl mb-3 block">{flag}</span>
              <h3 className="font-bold text-white mb-1">{region}</h3>
              <p className="text-xs text-slate-500 mb-3">{countries}</p>
              <p className="text-xs text-violet-400 font-medium">{focus}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="card-glow rounded-2xl p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <MapPin size={18} className="text-violet-400" />
            <h3 className="font-bold text-white">Who I Work With</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientTypes.map(({ label, desc }) => (
              <div key={label} className="bg-[#0a0a0f]/60 rounded-xl p-4">
                <p className="font-semibold text-violet-300 mb-1 text-sm">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

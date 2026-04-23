"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Consistently exceeded quarterly revenue targets by 20–35%",
  "Built and managed end-to-end sales pipelines from cold outreach to deal closure",
  "Developed long-term partnerships with clients across US, Europe & Middle East",
  "Specialized in IT services, SaaS, and custom software development sales",
  "Proficient in CRM-driven sales processes using HubSpot, Apollo & Salesforce",
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-900/40 to-[#12121a] border border-violet-800/30 p-10 flex flex-col gap-6">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl" />

              <div className="w-20 h-20 rounded-2xl bg-violet-600/20 border border-violet-600/30 flex items-center justify-center text-4xl font-black gradient-text">
                SJ
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Sahil Jr</h3>
                <p className="text-violet-400 font-semibold text-sm tracking-wide uppercase">
                  Business Development Executive
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Experience", value: "4+ Years" },
                  { label: "Markets", value: "US · EU · ME" },
                  { label: "Specialization", value: "IT Services" },
                  { label: "Focus", value: "B2B Sales" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#0a0a0f]/60 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-slate-200">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              I Don't Just Find Clients {" "}
              <span className="gradient-text">I Build Revenue Engines.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              With over 4 years in IT services sales, I've helped startups and established
              tech companies break into new markets, shorten their sales cycles, and close
              deals that actually stick. My approach combines data-driven prospecting with
              relationship-first selling because the best deals are built on trust.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              From cold outreach to contract signing, I own the full sales cycle. I've
              worked across diverse verticals web development, mobile apps, ERP, and
              custom software giving me the technical fluency to speak your client's
              language and close with confidence.
            </p>

            <ul className="flex flex-col gap-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-violet-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

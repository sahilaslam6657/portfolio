"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";

const experiences = [
  {
    company: "AppCrates",
    url: "https://www.appcrates.com/",
    role: "Business Development Executive",
    type: "IT Services · Mobile & Web Development",
    achievements: [
      "Generated 40+ qualified leads per month through LinkedIn outreach and cold email campaigns",
      "Closed international deals with clients across the US and UK, contributing to 30% revenue growth",
      "Built and maintained a CRM pipeline of 200+ prospects using HubSpot",
      "Collaborated with technical teams to craft winning proposals for enterprise clients",
    ],
  },
  {
    company: "AR Web Crafts",
    url: "https://www.arwebcrafts.com/",
    role: "Senior BDE",
    type: "Web Development Agency",
    achievements: [
      "Spearheaded client acquisition strategy targeting SMEs in the Middle East and Europe",
      "Increased monthly deal closures by 25% through structured follow-up and proposal optimization",
      "Managed end-to-end sales for web development and digital marketing projects",
      "Established referral partnerships that generated recurring revenue streams",
    ],
  },
  {
    company: "Nebulaleap Technologies",
    url: "#",
    role: "Business Development Executive",
    type: "Software Development · SaaS",
    achievements: [
      "Identified and pursued high-value opportunities in the SaaS and custom software space",
      "Developed outbound sales sequences that achieved a 22% response rate",
      "Coordinated with delivery teams to ensure seamless client onboarding post-deal",
    ],
  },
  {
    company: "ProgrammX",
    url: "#",
    role: "BDE",
    type: "IT Services",
    achievements: [
      "Managed Upwork and LinkedIn profiles to generate consistent inbound leads",
      "Closed 15+ projects in the first quarter, exceeding targets by 40%",
      "Developed pitch decks and service proposals tailored to client pain points",
    ],
  },
  {
    company: "Devstitch",
    url: "#",
    role: "Business Development",
    type: "IT Services · Digital Solutions",
    achievements: [
      "Gained foundational experience in B2B sales, lead generation, and client communication",
      "Managed multi-channel outreach across email, LinkedIn, and freelance platforms",
      "Contributed to building early-stage sales processes and client databases",
    ],
  },
  {
    company: "TWS",
    url: "#",
    role: "Business Development",
    type: "IT Services · Digital Solutions",
    achievements: [
      "Gained foundational experience in B2B sales, lead generation, and client communication",
      "Managed multi-channel outreach across email, LinkedIn, and freelance platforms",
      "Contributed to building early-stage sales processes and client databases",
    ],
  },
  {
    company: "Search O Pal",
    url: "#",
    role: "Business Development",
    type: "IT Services · Digital Solutions",
    achievements: [
      "Gained foundational experience in B2B sales, lead generation, and client communication",
      "Managed multi-channel outreach across email, LinkedIn, and freelance platforms",
      "Contributed to building early-stage sales processes and client databases",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-800/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Work History
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Where I've <span className="gradient-text">Driven Growth</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-violet-800/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:block absolute top-6 w-3 h-3 bg-violet-500 rounded-full border-2 border-violet-300 ${
                    i % 2 === 0 ? "-right-[calc(2rem+6px)]" : "-left-[calc(2rem+6px)]"
                  }`}
                />

                <div className="card-glow rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                        {exp.url !== "#" && (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-500 hover:text-violet-300 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <p className="text-violet-400 text-sm font-semibold">{exp.role}</p>
                      <p className="text-slate-500 text-xs mt-1">{exp.type}</p>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {exp.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-slate-400">
                        <TrendingUp size={13} className="text-violet-500 mt-0.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

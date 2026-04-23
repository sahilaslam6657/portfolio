"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, TrendingUp, Users, Globe, X, CheckCircle2 } from "lucide-react";
import type { Variants } from "framer-motion";

const stats = [
  { icon: TrendingUp, value: "5+", label: "Years in IT Sales" },
  { icon: Users, value: "50+", label: "Clients Acquired" },
  { icon: Globe, value: "4", label: "Global Markets" },
  { icon: TrendingUp, value: "7+", label: "Companies Served" },
];

const callWindows = [
  "Today",
  "Within 48 Hours",
  "This Week",
  "Next Week",
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [preferredWindow, setPreferredWindow] = useState<(typeof callWindows)[number]>(
    "Within 48 Hours"
  );

  const requestMessage = useMemo(
    () =>
      `Hi Sahil, I visited your portfolio and I would like to book a discovery call. Preferred time: ${preferredWindow}.`,
    [preferredWindow]
  );

  const encodedMessage = encodeURIComponent(requestMessage);
  const emailHref = `mailto:sahilaslam6657@gmail.com?subject=${encodeURIComponent(
    "Discovery Call Request"
  )}&body=${encodedMessage}`;
  const whatsappHref = `https://wa.me/923431431246?text=${encodedMessage}`;

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
            href="#book-call"
            onClick={(event) => {
              event.preventDefault();
              setShowBookingFlow(true);
            }}
            className="flex items-center gap-2 border border-violet-700/50 hover:border-violet-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base"
          >
            <Calendar size={18} />
            Book a Call
          </a>
        </motion.div>

        {showBookingFlow && (
          <motion.div
            id="book-call"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-12 max-w-2xl rounded-3xl border border-violet-700/40 bg-[#100f1d]/95 p-6 text-left shadow-2xl shadow-violet-900/30"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                  30-Second Booking Flow
                </p>
                <h3 className="text-xl font-black text-white">Pick your preferred call window</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingFlow(false)}
                className="rounded-full border border-violet-700/50 p-2 text-slate-400 transition-colors hover:border-violet-500 hover:text-white"
                aria-label="Close booking flow"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {callWindows.map((windowOption) => {
                const isActive = preferredWindow === windowOption;
                return (
                  <button
                    key={windowOption}
                    type="button"
                    onClick={() => setPreferredWindow(windowOption)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "border-violet-500 bg-violet-600/20 text-violet-200"
                        : "border-violet-800/40 bg-[#171528] text-slate-300 hover:border-violet-600/70"
                    }`}
                  >
                    {windowOption}
                  </button>
                );
              })}
            </div>

            <p className="mb-5 flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-violet-400" />
              Your request will be prefilled with the selected time preference.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-violet-500"
              >
                Send via WhatsApp
              </a>
              <a
                href={emailHref}
                className="flex-1 rounded-xl border border-violet-600/50 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition-colors hover:border-violet-500 hover:text-white"
              >
                Send via Email
              </a>
            </div>
          </motion.div>
        )}

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

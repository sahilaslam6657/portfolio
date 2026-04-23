"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Link, ArrowRight, MessageSquare } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "sahilaslam6657@gmail.com",
    href: "mailto:sahilaslam6657@gmail.com",
    cta: "Send Email",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+923431431246",
    href: "https://wa.me/923431431246",
    cta: "WhatsApp Me",
  },
  {
    icon: Link,
    label: "LinkedIn",
    value: "linkedin.com/in/sahil-aslam-1bba83389",
    href: "https://www.linkedin.com/in/sahil-aslam-1bba83389/",
    cta: "Connect",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-800/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Let's Talk
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Grow Your{" "}
            <span className="gradient-text">Business?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need to fill your pipeline, close more deals, or break into a new
            market I'm ready to make it happen. Let's start with a conversation.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-5 mb-12"
        >
          {contactLinks.map(({ icon: Icon, label, value, href, cta }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="card-glow rounded-2xl p-6 flex flex-col items-center gap-3 group text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                <Icon size={20} className="text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-200 break-all">{value}</p>
              </div>
              <span className="text-xs text-violet-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {cta} <ArrowRight size={12} />
              </span>
            </a>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#book-call"
            className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-10 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 text-base"
          >
            <MessageSquare size={18} />
            Start a Conversation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

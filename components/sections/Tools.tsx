"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "CRM & Sales",
    color: "violet",
    tools: ["HubSpot", "Salesforce", "Apollo.io", "Upwork", "LinkedIn Sales Nav", "Pipedrive"],
  },
  {
    label: "Outreach & Marketing",
    color: "purple",
    tools: ["Instantly.ai", "Lemlist", "Hunter.io", "Mailchimp", "Cold Email", "LinkedIn DMs"],
  },
  {
    label: "Project Management",
    color: "indigo",
    tools: ["Jira", "Trello", "Asana", "ClickUp", "Notion", "Monday.com"],
  },
  {
    label: "Communication",
    color: "violet",
    tools: ["Slack", "Microsoft Teams", "Zoom", "Google Meet", "Loom", "WhatsApp Business"],
  },
  {
    label: "Productivity",
    color: "purple",
    tools: ["Google Workspace", "MS Office 365", "Calendly", "Typeform", "DocuSign"],
  },
  {
    label: "ERP & Enterprise",
    color: "indigo",
    tools: ["Odoo", "SAP (Basic)", "Zoho CRM", "Freshsales"],
  },
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-600/15 text-violet-300 border-violet-600/20",
  purple: "bg-purple-600/15 text-purple-300 border-purple-600/20",
  indigo: "bg-indigo-600/15 text-indigo-300 border-indigo-600/20",
};

export default function Tools() {
  return (
    <section id="tools" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tools I <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            The right tools amplify results. Here's the stack I use to prospect, manage
            pipelines, and close deals efficiently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ label, color, tools }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card-glow rounded-2xl p-6"
            >
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
                {label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${colorMap[color]}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

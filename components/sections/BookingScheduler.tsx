"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Loader2, Shield, X } from "lucide-react";

type Slot = {
  id: string;
  start: string;
  end: string;
  booked?: boolean;
};

type BookingSchedulerProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BookingPayload = {
  slotId: string;
  name: string;
  email: string;
  company: string;
  notes: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL ?? "";
const APPOINTMENT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL ?? "";

function formatSlot(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const day = start.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  return { day, time };
}

function getFallbackSlots(): Slot[] {
  const now = new Date();
  const slots: Slot[] = [];

  for (let dayOffset = 1; dayOffset <= 7; dayOffset += 1) {
    const base = new Date(now);
    base.setDate(now.getDate() + dayOffset);

    [14, 17].forEach((hour, idx) => {
      const start = new Date(base);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setMinutes(start.getMinutes() + 30);

      slots.push({
        id: `fallback-${dayOffset}-${idx}`,
        start: start.toISOString(),
        end: end.toISOString(),
      });
    });
  }

  return slots;
}

async function fetchSlots(): Promise<Slot[]> {
  if (!BACKEND_URL) return getFallbackSlots();

  const response = await fetch(`${BACKEND_URL}?action=slots`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch available slots.");
  }

  const data = (await response.json()) as { slots?: Slot[] };
  return (data.slots ?? []).filter((slot) => !slot.booked);
}

async function submitBooking(payload: BookingPayload): Promise<{ ok: boolean; message?: string }> {
  if (!BACKEND_URL) {
    const body = encodeURIComponent(
      `Booking request from ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company}\nNotes: ${payload.notes}`
    );
    const mailto = `mailto:sahilaslam6657@gmail.com?subject=${encodeURIComponent(
      "Business Growth Consultation Request"
    )}&body=${body}`;
    window.location.href = mailto;
    return { ok: true, message: "Opened email app as a fallback booking method." };
  }

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "book", ...payload }),
  });

  if (!response.ok) {
    return { ok: false, message: "Booking failed. Please try another slot." };
  }

  const result = (await response.json()) as { ok?: boolean; message?: string };
  return { ok: Boolean(result.ok), message: result.message };
}

export default function BookingScheduler({ isOpen, onClose }: BookingSchedulerProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const [adminOpen, setAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [adminStart, setAdminStart] = useState("");
  const [adminEnd, setAdminEnd] = useState("");

  async function loadSlots() {
    setLoading(true);
    setStatus("");
    try {
      const list = await fetchSlots();
      setSlots(list);
      if (!list.find((slot) => slot.id === selectedSlot)) {
        setSelectedSlot(list[0]?.id ?? "");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to load slots.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    if (window.location.search.includes("admin=1")) {
      setAdminOpen(true);
    }

    void loadSlots();

    const interval = window.setInterval(() => {
      void loadSlots();
    }, 30000);

    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const selectedSlotInfo = useMemo(
    () => slots.find((slot) => slot.id === selectedSlot),
    [selectedSlot, slots]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) {
      setStatus("Please choose a slot before booking.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    const result = await submitBooking({
      slotId: selectedSlot,
      name,
      email,
      company,
      notes,
    });

    setSubmitting(false);
    if (!result.ok) {
      setStatus(result.message ?? "Could not complete booking.");
      return;
    }

    setStatus(result.message ?? "Booking request submitted. Check your email for confirmation.");
    setName("");
    setEmail("");
    setCompany("");
    setNotes("");
    await loadSlots();
  }

  async function handleAdminAddSlot() {
    if (!BACKEND_URL) {
      setStatus("Connect NEXT_PUBLIC_BOOKING_API_URL to enable admin slot management.");
      return;
    }

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add_slot",
        token: adminToken,
        start: adminStart,
        end: adminEnd,
      }),
    });

    const result = (await response.json()) as { ok?: boolean; message?: string };
    setStatus(result.message ?? (result.ok ? "Slot added." : "Failed to add slot."));
    if (result.ok) {
      setAdminStart("");
      setAdminEnd("");
      await loadSlots();
    }
  }

  async function handleAdminDeleteSlot(slotId: string) {
    if (!BACKEND_URL) {
      setStatus("Connect NEXT_PUBLIC_BOOKING_API_URL to enable admin slot management.");
      return;
    }

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete_slot",
        token: adminToken,
        slotId,
      }),
    });

    const result = (await response.json()) as { ok?: boolean; message?: string };
    setStatus(result.message ?? (result.ok ? "Slot deleted." : "Failed to delete slot."));
    if (result.ok) {
      await loadSlots();
    }
  }

  if (!isOpen) return null;

  return (
    <motion.div
      id="book-call"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-4xl rounded-3xl border border-violet-700/40 bg-[#100f1d]/95 p-6 text-left shadow-2xl shadow-violet-900/30"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            Live Consultation Scheduler
          </p>
          <h3 className="text-xl font-black text-white">Book your business growth consultation</h3>
          <p className="mt-2 text-sm text-slate-300">
            Select a live slot and submit your details. Availability refreshes every 30 seconds.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-violet-700/50 p-2 text-slate-400 transition-colors hover:border-violet-500 hover:text-white"
          aria-label="Close booking flow"
        >
          <X size={16} />
        </button>
      </div>

      {loading ? (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-violet-800/40 bg-[#171528] px-4 py-3 text-sm text-slate-300">
          <Loader2 size={16} className="animate-spin text-violet-300" />
          Fetching available time slots...
        </div>
      ) : (
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {slots.map((slot) => {
            const { day, time } = formatSlot(slot.start, slot.end);
            const isActive = selectedSlot === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlot(slot.id)}
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-violet-500 bg-violet-600/20"
                    : "border-violet-800/40 bg-[#171528] hover:border-violet-600/70"
                }`}
              >
                <p className="text-sm font-semibold text-slate-200">{day}</p>
                <p className="text-xs text-violet-300">{time}</p>
              </button>
            );
          })}
          {slots.length === 0 && (
            <div className="rounded-xl border border-violet-800/40 bg-[#171528] px-4 py-4 text-sm text-slate-300">
              No slots are currently available. Try again shortly.
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
          className="rounded-xl border border-violet-800/40 bg-[#171528] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-500"
        />
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          type="email"
          required
          className="rounded-xl border border-violet-800/40 bg-[#171528] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-500"
        />
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          placeholder="Company"
          className="rounded-xl border border-violet-800/40 bg-[#171528] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-500"
        />
        <input
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="What growth challenge do you want to solve?"
          className="rounded-xl border border-violet-800/40 bg-[#171528] px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-500"
        />

        <button
          type="submit"
          disabled={submitting || !selectedSlot}
          className="sm:col-span-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Booking..." : "Confirm Consultation Slot"}
        </button>
      </form>

      {APPOINTMENT_URL && (
        <a
          href={APPOINTMENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200"
        >
          <CalendarDays size={16} />
          Open Google Appointment Page
        </a>
      )}

      {status && (
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
          <CheckCircle2 size={14} className="text-violet-400" />
          {status}
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-violet-800/40 bg-[#171528]/90 p-4">
        <button
          type="button"
          onClick={() => setAdminOpen((value) => !value)}
          className="flex items-center gap-2 text-sm font-semibold text-violet-300"
        >
          <Shield size={15} />
          {adminOpen ? "Hide admin slot manager" : "Admin slot manager"}
        </button>

        {adminOpen && (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={adminToken}
                onChange={(event) => setAdminToken(event.target.value)}
                placeholder="Admin token"
                className="rounded-xl border border-violet-800/40 bg-[#0f0d1a] px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-500"
              />
              <input
                value={adminStart}
                onChange={(event) => setAdminStart(event.target.value)}
                type="datetime-local"
                className="rounded-xl border border-violet-800/40 bg-[#0f0d1a] px-3 py-2 text-xs text-slate-100 outline-none focus:border-violet-500"
              />
              <input
                value={adminEnd}
                onChange={(event) => setAdminEnd(event.target.value)}
                type="datetime-local"
                className="rounded-xl border border-violet-800/40 bg-[#0f0d1a] px-3 py-2 text-xs text-slate-100 outline-none focus:border-violet-500"
              />
              <button
                type="button"
                onClick={() => void handleAdminAddSlot()}
                className="sm:col-span-3 rounded-xl border border-violet-700/60 bg-violet-800/30 px-4 py-2 text-xs font-semibold text-violet-200 hover:bg-violet-700/40"
              >
                Add availability slot
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-300">Manage existing slots</p>
              {slots.length === 0 && (
                <p className="text-xs text-slate-500">No current slots available to manage.</p>
              )}
              {slots.map((slot) => {
                const { day, time } = formatSlot(slot.start, slot.end);
                return (
                  <div
                    key={`admin-${slot.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-violet-900/40 bg-[#0f0d1a] px-3 py-2"
                  >
                    <p className="text-xs text-slate-300">
                      {day} · {time}
                    </p>
                    <button
                      type="button"
                      onClick={() => void handleAdminDeleteSlot(slot.id)}
                      className="rounded-lg border border-rose-700/40 px-2 py-1 text-xs font-semibold text-rose-300 hover:border-rose-500/70"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

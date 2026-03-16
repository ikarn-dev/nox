"use client";

import { useState } from "react";
import { HERO_GRAIN_STYLE } from "@/lib/constants";
import { useToast } from "./toast";

// Extracted from hero.tsx to keep identical styling
const primaryCtaGradient: React.CSSProperties = {
  background: "linear-gradient(180deg, #ffffff 0%, #d8d8d8 100%)",
};

interface EarlyAccessFormProps {
  compact?: boolean;
}

export function EarlyAccessForm({ compact = false }: EarlyAccessFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      const payloadStatus = data.status || res.status;

      if (payloadStatus === 200) {
        // 200 — Success
        setStatus("success");
        showToast(data.message || "You're on the list!", "success");
        setTimeout(() => {
          setStatus("idle");
          setEmail("");
        }, 3000);
        return;
      }

      // Handle specific error codes
      switch (payloadStatus) {
        case 400:
          showToast(data.message || "Please enter a valid email.", "error");
          break;
        case 409:
          showToast(data.message || "This email is already registered.", "info");
          break;
        case 429:
          showToast(data.message || "Too many requests. Slow down.", "error");
          break;
        case 503:
          showToast(data.message || "Service unavailable. Try again later.", "error");
          break;
        default:
          showToast(data.message || "Something went wrong. Try again.", "error");
      }

      setStatus("idle");
    } catch {
      // Network error / fetch failure
      showToast("Network error. Check your connection and try again.", "error");
      setStatus("idle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex flex-col sm:flex-row sm:items-center gap-2 ${compact ? "w-full max-w-[320px]" : "w-full sm:w-auto"}`}
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading" || status === "success"}
        required
        className={`bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 rounded-md focus:outline-none focus:border-white/30 transition-colors ${
          compact ? "h-[38px] px-3 text-[13px] w-full" : "h-[46px] px-4 text-[14px] w-full sm:w-[220px]"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`relative flex items-center justify-center text-black font-sans font-semibold tracking-wide rounded-md overflow-hidden group transition-all duration-300 border border-white/20 hover:scale-[1.02] active:scale-[0.98] shrink-0 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed w-full sm:w-auto ${
          compact ? "h-[38px] px-4 text-[12.5px]" : "h-[46px] px-6 text-[13.5px]"
        }`}
        style={primaryCtaGradient}
      >
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={HERO_GRAIN_STYLE}
        />
        <span className="relative z-10 group-hover:opacity-80 transition-opacity whitespace-nowrap">
          {status === "loading" ? "Joining..." : status === "success" ? "Joined ✓" : "Get Access"}
        </span>
      </button>
    </form>
  );
}

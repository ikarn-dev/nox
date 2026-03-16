"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/* ── Types ── */
type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

/* ── Provider ── */
let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext value={{ showToast }}>
      {children}

      {/* Toast Container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-toast-in"
            style={{ animation: "toastSlideIn 0.3s ease-out" }}
          >
            <div
              className={`relative flex items-start gap-3 max-w-[360px] px-4 py-3 rounded-lg border backdrop-blur-xl font-sans text-[13px] leading-relaxed shadow-2xl ${
                toast.type === "success"
                  ? "bg-white/[0.06] border-emerald-500/30 text-emerald-300"
                  : toast.type === "error"
                  ? "bg-white/[0.06] border-red-500/30 text-red-300"
                  : "bg-white/[0.06] border-white/10 text-white/80"
              }`}
            >
              {/* Icon */}
              <span className="shrink-0 mt-[1px] text-[15px]">
                {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}
              </span>

              {/* Message */}
              <span className="flex-1">{toast.message}</span>

              {/* Dismiss */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="shrink-0 text-white/30 hover:text-white/60 transition-colors text-[11px] mt-[1px] cursor-pointer"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext>
  );
}

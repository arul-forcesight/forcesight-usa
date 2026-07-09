import { useLayoutEffect, useState } from "react";

export interface TourStep {
  target: string; // matches a data-tour="..." attribute
  title: string;
  body: string;
}

/**
 * Lightweight guided tour for the Plan Inventory module.
 * Spotlights one element at a time (dim everything else) with a one-line tip.
 */
export function InventoryTour({
  steps,
  index,
  onNext,
  onBack,
  onClose,
}: {
  steps: TourStep[];
  index: number;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const step = steps[index];
  const [rect, setRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = document.querySelector(
        `[data-tour="${step.target}"]`,
      ) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        raf = requestAnimationFrame(() => setRect(el.getBoundingClientRect()));
      } else {
        setRect(null);
      }
    };
    const t = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [step.target, index]);

  const pad = 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const isLast = index === steps.length - 1;

  // Tooltip placement: below the target if there's room, else above; centered otherwise.
  const TIP_W = 300;
  const TIP_H = 150;
  let tipTop = vh / 2 - TIP_H / 2;
  let tipLeft = vw / 2 - TIP_W / 2;
  if (rect) {
    tipTop =
      rect.bottom + 14 + TIP_H < vh
        ? rect.bottom + 14
        : Math.max(14, rect.top - 14 - TIP_H);
    tipLeft = Math.min(
      Math.max(14, rect.left + rect.width / 2 - TIP_W / 2),
      vw - TIP_W - 14,
    );
  }

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Dim + spotlight hole */}
      {rect ? (
        <div
          className="absolute rounded-xl transition-all duration-200"
          style={{
            top: rect.top - pad,
            left: rect.left - pad,
            width: rect.width + pad * 2,
            height: rect.height + pad * 2,
            boxShadow: "0 0 0 9999px rgba(15,23,42,0.55)",
            outline: "2px solid #007fff",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-[rgba(15,23,42,0.55)]" />
      )}

      {/* Tooltip */}
      <div
        className="absolute w-[300px] rounded-xl bg-white p-4 shadow-xl"
        style={{ top: tipTop, left: tipLeft }}
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-400">
            {index + 1} / {steps.length}
          </span>
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Skip
          </button>
        </div>
        <h4 className="font-semibold text-[#0a335c]">{step.title}</h4>
        <p className="mt-1 text-sm text-gray-600">{step.body}</p>
        <div className="mt-3 flex items-center justify-end gap-2">
          {index > 0 && (
            <button
              onClick={onBack}
              className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
            >
              Back
            </button>
          )}
          <button
            onClick={isLast ? onClose : onNext}
            className="rounded-lg bg-[#007fff] px-3.5 py-1.5 text-sm font-medium text-white hover:bg-[#0069d6]"
          >
            {isLast ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

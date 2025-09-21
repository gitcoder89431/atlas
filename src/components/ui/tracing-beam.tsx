"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Track scroll progress within the nearest scrollable container (fallback to window)
  const scrollYProgress = useMotionValue(0);
  const [, setContainerEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    // Find nearest scrollable ancestor (overflow-y: auto|scroll) or fallback to documentElement
    let el: HTMLElement | null = ref.current || null;
    let attempts = 0;
    let found: HTMLElement | null = null;
    while (el && attempts < 10) {
      const style = window.getComputedStyle(el);
      const oy = style.overflowY;
      if (oy === "auto" || oy === "scroll") {
        found = el;
        break;
      }
      el = el.parentElement;
      attempts += 1;
    }
    const container = found || document.scrollingElement || document.documentElement;
    setContainerEl(container as HTMLElement);

    const handler = () => {
      const c = container as HTMLElement;
      const scrollTop = c.scrollTop ?? window.scrollY;
      const scrollHeight = c.scrollHeight ?? document.documentElement.scrollHeight;
      const clientHeight = c.clientHeight ?? window.innerHeight;
      const denom = Math.max(1, scrollHeight - clientHeight);
      const p = Math.min(1, Math.max(0, scrollTop / denom));
      scrollYProgress.set(p);
    };

    handler();
    container.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      container.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [scrollYProgress]);

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      {/* Hide decorative tracing beam on small and tablet screens to avoid overlap */}
      <div className="hidden lg:block absolute top-3 -left-4 lg:-left-20">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          style={{
            boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            style={{
              backgroundColor: scrollYProgress.get() > 0 ? "white" : "#10b981",
              borderColor: scrollYProgress.get() > 0 ? "white" : "#059669",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Download, Users } from "lucide-react";

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return <span>{displayValue}</span>;
}

export default function DownloadCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = () => {
      fetch("/api/downloads")
        .then((res) => res.json())
        .then((data) => {
          setCount(data.count);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchCount();
    // Poll every 3 seconds to keep count updated
    const interval = setInterval(fetchCount, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading || count === null) {
    return (
      <motion.div
        className="download-counter"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="counter-skeleton" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="download-counter"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="counter-inner">
        <div className="counter-icon-wrapper">
          <Users size={16} strokeWidth={1.5} />
        </div>
        <div className="counter-text">
          <span className="counter-number">
            <AnimatedNumber value={count} />
          </span>
          <span className="counter-label"> downloads</span>
        </div>
      </div>

      <div className="counter-pulse" aria-hidden="true" />
    </motion.div>
  );
}

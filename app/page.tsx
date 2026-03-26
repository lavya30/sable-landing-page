"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import DownloadCounter from "./components/DownloadCounter";
import {
  Shield,
  PenTool,
  Sparkles,
  Terminal,
  FileText,
  Clock,
  Download,
  ArrowRight,
  Github,
  BookOpen,
  Edit3,
  Settings,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Showcase Data ─── */
const showcaseTabs = [
  { id: "library", label: "Library", icon: BookOpen, image: "/ss1.png", alt: "Sable Library — browse and organize all your notebooks" },
  { id: "editor", label: "Editor", icon: Edit3, image: "/ss4.png", alt: "Sable Editor — a distraction-free writing canvas" },
  { id: "settings", label: "Settings", icon: Settings, image: "/ss2.png", alt: "Sable Settings — customize your writing environment" },
  { id: "about", label: "About", icon: Info, image: "/ss3.png", alt: "Sable About — built with love for writers" },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const coverflowVariants = {
  center: {
    x: "0%",
    scale: 1,
    zIndex: 10,
    opacity: 1,
    filter: "blur(0px) brightness(100%)",
  },
  left: {
    x: "-45%",
    scale: 0.8,
    zIndex: 5,
    opacity: 0.5,
    filter: "blur(2px) brightness(60%)",
  },
  right: {
    x: "45%",
    scale: 0.8,
    zIndex: 5,
    opacity: 0.5,
    filter: "blur(2px) brightness(60%)",
  },
  hidden: {
    x: "0%",
    scale: 0.6,
    zIndex: 0,
    opacity: 0,
    filter: "blur(4px)",
  },
};

/* ─── Feature Data ─── */
const features = [
  {
    icon: Shield,
    title: "Local-First & Private",
    description:
      "Your words never leave your device. No cloud, no tracking, no compromise.",
  },
  {
    icon: PenTool,
    title: "Distraction-Free Editor",
    description:
      "Focus mode, typewriter scrolling, and ambient sounds. Just you and the page.",
  },
  {
    icon: Terminal,
    title: "Rich Writing Tools",
    description:
      "Slash commands, mood boards, margin notes, and sprint timers to keep you in flow.",
  },
  {
    icon: FileText,
    title: "Beautiful Export",
    description:
      "Publish as PDF, Markdown, HTML, or a print-ready zine-style booklet.",
  },
  {
    icon: Clock,
    title: "Version History",
    description:
      "Automatic snapshots of every version. Travel back through your story\u2019s timeline.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant (optional)",
    description:
      "Grammar, rewrites, and continuations \u2014 powered by local AI. Stays out of your way.",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [downloadTracked, setDownloadTracked] = useState(false);

  const trackDownload = useCallback(() => {
    if (downloadTracked) return;
    setDownloadTracked(true);
    fetch("/api/downloads", { method: "POST" }).catch(() => {});
  }, [downloadTracked]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => (prev + newDirection + showcaseTabs.length) % showcaseTabs.length);
  };

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > showcaseTabs.length / 2) diff -= showcaseTabs.length;
    if (diff <= -showcaseTabs.length / 2) diff += showcaseTabs.length;
    return diff;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div className="page-wrapper">
      {/* ══════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════ */}
      <motion.nav
        className="navbar"
        id="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="Sable home">
            Sable
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#download">Download</a>
            <a
              href="https://github.com/lavya30/Sable"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="hero" id="hero">
        {/* Ambient glow */}
        <div className="hero-glow" aria-hidden="true" />

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className="hero-headline" variants={fadeUp} custom={0}>
            Write with intention.
            <br />
            <span className="hero-headline-accent">
              Create without distraction.
            </span>
          </motion.h1>
          <motion.p className="hero-subtext" variants={fadeUp} custom={1}>
            A beautiful, local-first writing app. Your words stay on your
            device. Your focus stays unbroken.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp} custom={2}>
            <a
              href="https://github.com/lavya30/Sable/releases/download/v0.1.0/Sable.Setup.0.1.0.exe"
              className="btn-primary"
              id="hero-download-btn"
              onClick={trackDownload}
            >
              <Download size={18} />
              Download for Windows
            </a>
            <a
              href="https://github.com"
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-github-btn"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </motion.div>
          <motion.div variants={fadeUp} custom={3}>
            <DownloadCounter />
          </motion.div>
        </motion.div>

        {/* HTML Faux Editor Preview */}
        <motion.div
          className="faux-editor-card"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="faux-editor-header">
            <div className="faux-header-left">
              <ChevronLeft size={16} />
              <span>Journal 2025</span>
            </div>
            
            <div className="faux-header-center">
              <span className="faux-icon">B</span>
              <span className="faux-icon italic">I</span>
              <span className="faux-icon underline">U</span>
            </div>
            
            <div className="faux-header-right">
              <span className="faux-publish-btn">✦ Publish</span>
            </div>
          </div>
          
          <div className="faux-editor-body">
            <h2>Chapter One</h2>
            <div className="faux-editor-text">
              <p>
                The morning light was gentle, filtering through half-drawn
                curtains. She sat at the old desk, the one her grandmother had
                kept by the window, and began to write.
              </p>
              <div className="faux-cursor"></div>
            </div>
          </div>
        </motion.div>

        <span className="faux-editor-label">Preview only · Not interactive</span>

        {/* Trust signal badges */}
        <motion.div
          className="hero-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="badge">
            <Shield size={14} /> 100% Offline
          </div>
          <div className="badge">
            <Shield size={14} /> Zero Tracking
          </div>
          <div className="badge">
            <Github size={14} /> Open Source
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          APP SHOWCASE SECTION (moved before features)
      ══════════════════════════════════════════ */}
      <section className="showcase-section" id="showcase">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} custom={0}>
            Inside Sable
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
            A calm, minimal interface designed to get out of your way.
          </motion.p>
        </motion.div>

        <motion.div
          className="showcase-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={scaleIn}
        >
          {/* Coverflow Header */}
          <div className="coverflow-header">
            <span><strong>{showcaseTabs[activeIndex].label}</strong></span>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(showcaseTabs.length).padStart(2, "0")}</span>
          </div>

          <div className="coverflow-wrapper">
            {showcaseTabs.map((tab, i) => {
              const offset = getOffset(i);
              let animateState = "hidden";
              if (offset === 0) animateState = "center";
              else if (offset === 1) animateState = "right";
              else if (offset === -1) animateState = "left";

              return (
                <motion.div
                  key={tab.id}
                  className="coverflow-item"
                  animate={animateState}
                  variants={coverflowVariants}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onClick={() => {
                    if (offset !== 0) handleTabClick(i);
                  }}
                >
                  <Image
                    src={tab.image}
                    alt={tab.alt}
                    width={1540}
                    height={770}
                    className="showcase-image"
                    priority={offset === 0}
                  />
                </motion.div>
              );
            })}

            <button
              className="carousel-btn prev"
              onClick={() => paginate(-1)}
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="carousel-btn next"
              onClick={() => paginate(1)}
              aria-label="Next screenshot"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="coverflow-pagination">
            {showcaseTabs.map((tab, i) => (
              <button
                key={i}
                className={`pagination-dot ${i === activeIndex ? "active" : ""}`}
                onClick={() => handleTabClick(i)}
                aria-label={tab.label}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════════ */}
      <section className="features-section" id="features">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} custom={0}>
            Everything you need.
            <br />
            <span className="text-accent">Nothing you don&apos;t.</span>
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp} custom={1}>
            Built for focus. No bloat, no accounts, no notifications.
          </motion.p>
        </motion.div>

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {features.map((f, i) => (
            <motion.div
              className="feature-card"
              key={i}
              id={`feature-${i}`}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="feature-icon">
                <f.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Design principle callout */}
        <motion.p
          className="design-principle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={scaleIn}
        >
          ✦ <em>Sable&apos;s guiding principle: a tool should be invisible. You should only notice your words.</em>
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section className="cta-section" id="download">
        <div className="cta-glow" aria-hidden="true" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 className="cta-headline" variants={fadeUp} custom={0}>
            Ready to write?
          </motion.h2>
          <motion.p className="cta-subtext" variants={fadeUp} custom={1}>
            Free, open-source, and yours forever. No account needed.
          </motion.p>
          <motion.div className="cta-actions" variants={fadeUp} custom={2}>
            <a
              href="https://github.com/lavya30/Sable/releases/download/v0.1.0/Sable.Setup.0.1.0.exe"
              className="btn-primary btn-lg"
              id="cta-download-btn"
              onClick={trackDownload}
            >
              <Download size={20} />
              Download for Windows
            </a>
            <span className="cta-meta">v0.1.0 · Windows 10/11</span>
          </motion.div>
          <motion.a
            href="https://github.com/lavya30/Sable"
            className="cta-source-link"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            custom={3}
          >
            View source on GitHub <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="site-footer" id="footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © 2026 Sable. Made with ♥ for writers.
          </p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Changelog</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

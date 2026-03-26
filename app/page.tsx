"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  Feather,
  Eye,
  Lock,
} from "lucide-react";

/* ─── Showcase Data ─── */
const showcaseTabs = [
  { id: "library", label: "Library", icon: BookOpen, image: "/ss1.png", alt: "Sable Library — browse and organize all your notebooks" },
  { id: "editor", label: "Editor", icon: Edit3, image: "/ss4.png", alt: "Sable Editor — a distraction-free writing canvas" },
  { id: "settings", label: "Settings", icon: Settings, image: "/ss2.png", alt: "Sable Settings — customize your writing environment" },
  { id: "about", label: "About", icon: Info, image: "/ss3.png", alt: "Sable About — built with love for writers" },
];

/* ─── Feature Data ─── */
const features = [
  {
    icon: Shield,
    title: "Local-First & Private",
    description: "Your words never leave your device. No cloud, no tracking, no compromise on your privacy.",
  },
  {
    icon: PenTool,
    title: "Distraction-Free Editor",
    description: "Focus mode, typewriter scrolling, and ambient sounds. Just you and the page, nothing else.",
  },
  {
    icon: Terminal,
    title: "Rich Writing Tools",
    description: "Slash commands, mood boards, margin notes, and sprint timers to keep you in flow.",
  },
  {
    icon: FileText,
    title: "Beautiful Export",
    description: "Publish as PDF, Markdown, HTML, or a print-ready zine-style booklet.",
  },
  {
    icon: Clock,
    title: "Version History",
    description: "Automatic snapshots of every version. Travel back through your story's timeline.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description: "Grammar, rewrites, and continuations — powered by local AI. Stays out of your way.",
  },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const coverflowVariants = {
  center: {
    x: "0%",
    scale: 1,
    zIndex: 10,
    opacity: 1,
    filter: "blur(0px) brightness(100%)",
    rotateY: 0,
  },
  left: {
    x: "-55%",
    scale: 0.75,
    zIndex: 5,
    opacity: 0.4,
    filter: "blur(3px) brightness(50%)",
    rotateY: 35,
  },
  right: {
    x: "55%",
    scale: 0.75,
    zIndex: 5,
    opacity: 0.4,
    filter: "blur(3px) brightness(50%)",
    rotateY: -35,
  },
  hidden: {
    x: "0%",
    scale: 0.5,
    zIndex: 0,
    opacity: 0,
    filter: "blur(8px)",
    rotateY: 0,
  },
};

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [downloadTracked, setDownloadTracked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackDownload = useCallback(() => {
    if (downloadTracked) return;
    setDownloadTracked(true);
    fetch("/api/downloads", { method: "POST" }).catch(() => {});
  }, [downloadTracked]);

  const paginate = (direction: number) => {
    setActiveIndex((prev) => (prev + direction + showcaseTabs.length) % showcaseTabs.length);
  };

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
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
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  // Handle mouse movement for feature card spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <div className="page-wrapper">
      {/* Ambient mesh background */}
      <div className="mesh-bg" />

      {/* ═══════════════════════════════════════════
          NAVIGATION
      ═══════════════════════════════════════════ */}
      <motion.nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="Sable home">
            Sable
          </a>
          <div className="nav-links">
            <a href="#showcase" className="nav-link">Showcase</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#download" className="nav-link">Download</a>
            <a
              href="https://github.com/lavya30/Sable"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="hero" ref={heroRef} id="hero">
        {/* Ambient glow effects */}
        <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

        <motion.div
          className="hero-content"
          style={{ opacity: heroOpacity, y: heroY }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hero-eyebrow" variants={fadeUp} custom={0}>
            <Feather size={14} />
            For writers who value focus
          </motion.div>

          <motion.h1 className="hero-headline" variants={fadeUp} custom={1}>
            <span className="hero-headline-line">Write with intention.</span>
            <span className="hero-headline-line hero-headline-accent">Create without distraction.</span>
          </motion.h1>

          <motion.p className="hero-subtext" variants={fadeUp} custom={2}>
            A beautiful, local-first writing app. Your words stay on your device.
            Your focus stays unbroken.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp} custom={3}>
            <a
              href="https://github.com/lavya30/Sable/releases/download/v0.1.0/Sable.Setup.0.1.0.exe"
              className="btn btn-primary btn-lg"
              onClick={trackDownload}
            >
              <Download size={20} />
              <span>Download for Windows</span>
            </a>
            <a
              href="https://github.com/lavya30/Sable"
              className="btn btn-secondary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
              <span>View on GitHub</span>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={4}>
            <DownloadCounter />
          </motion.div>
        </motion.div>

        {/* Hero Preview Card */}
        <motion.div
          className="hero-preview"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="preview-frame">
            <div className="preview-inner">
              <div className="preview-header">
                <div className="preview-header-left">
                  <div className="preview-dots">
                    <span className="preview-dot preview-dot-red" />
                    <span className="preview-dot preview-dot-yellow" />
                    <span className="preview-dot preview-dot-green" />
                  </div>
                  <ChevronLeft size={16} />
                  <span>Journal 2025</span>
                </div>
                <div className="preview-toolbar">
                  <span style={{ fontStyle: "italic" }}>I</span>
                  <span style={{ fontWeight: "bold" }}>B</span>
                  <span style={{ textDecoration: "underline" }}>U</span>
                </div>
              </div>
              <div className="preview-body">
                <div className="preview-title">Chapter One</div>
                <div className="preview-text">
                  The morning light was gentle, filtering through half-drawn
                  curtains. She sat at the old desk, the one her grandmother had
                  kept by the window, and began to write.
                  <span className="preview-cursor" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="hero-badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="badge">
            <Lock size={14} className="badge-icon" />
            <span>100% Offline</span>
          </div>
          <div className="badge">
            <Eye size={14} className="badge-icon" />
            <span>Zero Tracking</span>
          </div>
          <div className="badge">
            <Github size={14} className="badge-icon" />
            <span>Open Source</span>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SHOWCASE SECTION
      ═══════════════════════════════════════════ */}
      <section className="showcase-section" id="showcase">
        <div className="ambient-glow ambient-glow-3" aria-hidden="true" />

        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="section-eyebrow" variants={fadeUp} custom={0}>
            Inside the app
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1}>
            Designed to get out of your way
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
            A calm, minimal interface that lets your words take center stage.
          </motion.p>
        </motion.div>

        <div className="showcase-wrapper">
          {/* Tabs */}
          <motion.div
            className="showcase-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {showcaseTabs.map((tab, i) => (
              <button
                key={tab.id}
                className={`showcase-tab ${i === activeIndex ? "active" : ""}`}
                onClick={() => handleTabClick(i)}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Coverflow */}
          <motion.div
            className="coverflow-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {showcaseTabs.map((tab, i) => {
              const offset = getOffset(i);
              let animateState = "hidden";
              if (offset === 0) animateState = "center";
              else if (offset === 1) animateState = "right";
              else if (offset === -1) animateState = "left";

              return (
                <motion.div
                  key={tab.id}
                  className={`coverflow-slide ${animateState}`}
                  animate={animateState}
                  variants={coverflowVariants}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    if (offset !== 0) handleTabClick(i);
                  }}
                  style={{ perspective: "1200px" }}
                >
                  <Image
                    src={tab.image}
                    alt={tab.alt}
                    width={1600}
                    height={1000}
                    className="coverflow-image"
                    priority={offset === 0}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Controls */}
          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={() => paginate(-1)}
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="carousel-dots">
              {showcaseTabs.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === activeIndex ? "active" : ""}`}
                  onClick={() => handleTabClick(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel-btn"
              onClick={() => paginate(1)}
              aria-label="Next screenshot"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════ */}
      <section className="features-section" id="features">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="section-eyebrow" variants={fadeUp} custom={0}>
              Features
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}>
              Everything you need.
              <br />
              <span className="text-gradient">Nothing you don't.</span>
            </motion.h2>
            <motion.p className="section-subtitle" variants={fadeUp} custom={2}>
              Built for focus. No bloat, no accounts, no notifications.
            </motion.p>
          </motion.div>

          <motion.div
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {features.map((feature, i) => (
              <motion.div
                className="feature-card"
                key={i}
                variants={fadeUp}
                custom={i}
                onMouseMove={handleMouseMove}
              >
                <div className="feature-content">
                  <div className="feature-icon">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Editorial Quote */}
          <motion.div
            className="editorial-quote"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              A tool should be invisible. You should only notice your words,
              not the software that holds them.
            </p>
            <cite>— Sable's Guiding Principle</cite>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════ */}
      <section className="cta-section" id="download">
        <div className="ambient-glow ambient-glow-1" aria-hidden="true" />

        <motion.div
          className="cta-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="section-eyebrow" variants={fadeUp} custom={0}>
            Start writing today
          </motion.div>
          <motion.h2 className="cta-headline" variants={fadeUp} custom={1}>
            Ready to find your focus?
          </motion.h2>
          <motion.p className="cta-subtext" variants={fadeUp} custom={2}>
            Free, open-source, and yours forever. No account needed.
          </motion.p>
          <motion.div className="cta-actions" variants={fadeUp} custom={3}>
            <a
              href="https://github.com/lavya30/Sable/releases/download/v0.1.0/Sable.Setup.0.1.0.exe"
              className="btn btn-primary btn-lg"
              onClick={trackDownload}
            >
              <Download size={20} />
              <span>Download for Windows</span>
            </a>
            <span className="cta-meta">v0.1.0 • Windows 10/11 • 64-bit</span>
          </motion.div>
          <motion.a
            href="https://github.com/lavya30/Sable"
            className="cta-link"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            custom={4}
          >
            View source on GitHub <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © 2026 Sable. Made with care for writers.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Changelog</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

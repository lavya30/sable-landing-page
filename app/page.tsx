"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";

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
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Feature Data ─── */
const features = [
  {
    icon: Shield,
    title: "Local-First & Private",
    description:
      "Your words never leave your device. No cloud syncing you didn't ask for, no tracking, and absolutely no compromise on your creative privacy.",
  },
  {
    icon: PenTool,
    title: "Distraction-Free Editor",
    description:
      "A beautiful, minimal writing canvas featuring focus mode, typewriter scrolling, and integrated ambient soundscapes designed to induce deep flow.",
  },
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description:
      "Smart suggestions that respect your voice. From grammar fixing to rewriting and narrative continuation, powered by local-first AI models.",
  },
  {
    icon: Terminal,
    title: "Rich Writing Tools",
    description:
      "Slash commands for speed, mood boards for inspiration, margin notes for edits, and sprint timers to keep you moving.",
  },
  {
    icon: FileText,
    title: "Beautiful Export",
    description:
      "Turn your manuscript into a masterpiece. Publish as PDF, Markdown, HTML, or even a professionally formatted zine-style booklet ready for print.",
  },
  {
    icon: Clock,
    title: "Version History",
    description:
      "Never lose a single character. Automatic snapshots keep every version of your work safe, allowing you to travel back through the timeline of your story.",
  },
];

export default function Home() {
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
            Sable is a beautiful, local-first writing app that keeps your words
            private, your focus sharp, and your creativity flowing.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp} custom={2}>
            <a href="#download" className="btn-primary" id="hero-download-btn">
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
        </motion.div>

        {/* Mock editor preview */}
        <motion.div
          className="hero-editor-card"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="editor-chrome">
            <div className="editor-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="editor-title">untitled.md — Sable</span>
          </div>
          <div className="editor-body">
            <div className="editor-sidebar">
              <div className="sidebar-item active">Chapter One</div>
              <div className="sidebar-item">Chapter Two</div>
              <div className="sidebar-item">Chapter Three</div>
              <div className="sidebar-item dim">Notes</div>
            </div>
            <div className="editor-content">
              <h4 className="editor-chapter-title">Chapter One.</h4>
              <p className="editor-text">
                The morning light filtered through the curtains, casting long
                amber streaks across the wooden desk. She sat down, opened her
                notebook, and let the silence settle around her like snow.
              </p>
              <p className="editor-text">
                There was a quietness to this hour that felt like a gift — the
                kind only early risers knew.
              </p>
              <div className="editor-margin-note">
                <span className="margin-note-icon">✎</span>
                Maybe use a more descriptive adjective here?
              </div>
              <p className="editor-cursor">|</p>
            </div>
          </div>
        </motion.div>

        {/* Small feature badges */}
        <motion.div
          className="hero-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="badge">
            <Shield size={14} /> Distraction-Free
          </div>
          <div className="badge">
            <Download size={14} /> Local-First
          </div>
          <div className="badge">
            <Sparkles size={14} /> Rich Typography
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
            Sable is designed to disappear. We&apos;ve stripped away the noise of
            modern software to leave only the essential tools for the craft of
            writing.
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

        {/* Editorial quote */}
        <motion.blockquote
          className="editorial-quote"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={scaleIn}
        >
          <p>
            &ldquo;A tool should be like a masterfully crafted pen: weighted
            perfectly, silent in its operation, and entirely subservient to the
            hand that holds it.&rdquo;
          </p>
          <cite>— The Sable Manifesto</cite>
        </motion.blockquote>
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
            Start writing beautifully.{" "}
            <span className="text-accent">Today.</span>
          </motion.h2>
          <motion.p className="cta-subtext" variants={fadeUp} custom={1}>
            Sable is free, open-source, and built for writers who care about
            their craft. Focus on your words in an environment designed for deep
            creative work.
          </motion.p>
          <motion.div className="cta-actions" variants={fadeUp} custom={2}>
            <a href="#" className="btn-primary btn-lg" id="cta-download-btn">
              <Download size={20} />
              Download for Windows
            </a>
            <span className="cta-meta">v0.1.0 · Windows 10/11 · 85MB</span>
          </motion.div>
          <motion.a
            href="https://github.com/lavya30/Sable"
            className="cta-source-link"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            custom={3}
          >
            View Source on GitHub <ArrowRight size={16} />
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

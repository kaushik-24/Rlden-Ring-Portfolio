"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FooterSection.module.css";

/* ── LINKS ──────────────────────────────────────── */
const SOCIAL_LINKS = [
  { label: "GitHub",   sub: "Source Codex",       href: "#", rune: "⚙" },
  { label: "LinkedIn", sub: "Order of the Round",  href: "#", rune: "⚔" },
  { label: "Twitter",  sub: "Whispers of the Fog", href: "#", rune: "🌫" },
  { label: "Dribbble", sub: "Hall of Visions",     href: "#", rune: "👁" },
];

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Work",       href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

/* ── COMPONENT ──────────────────────────────────── */
export default function FooterSection() {
  const footerRef    = useRef<HTMLElement>(null);
  const bonfireRef   = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const fogRef       = useRef<HTMLDivElement>(null);
  const runeRingRef  = useRef<HTMLDivElement>(null);
  const [copied, setCopied]     = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@placeholder.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useEffect(() => {
    const init = async () => {
      const { gsap }           = await import("gsap");
      const { ScrollTrigger }  = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── Dying embers — sparse & slow ── */
      const pc = particlesRef.current!;
      for (let i = 0; i < 22; i++) {
        const p = document.createElement("div");
        p.className = styles.ember;
        p.style.left             = `${30 + Math.random() * 40}%`;
        p.style.animationDuration= `${7 + Math.random() * 10}s`;
        p.style.animationDelay   = `${Math.random() * 9}s`;
        const sz = 1 + Math.random() * 2;
        p.style.width = p.style.height = `${sz}px`;
        p.style.opacity = `${0.3 + Math.random() * 0.4}`;
        pc.appendChild(p);
      }

      /* ── Bonfire dims as it enters (dying flame) ── */
      gsap.set(bonfireRef.current, { opacity: 0, y: 30, scale: 0.85 });
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(bonfireRef.current, {
            opacity: 1, y: 0, scale: 1,
            duration: 2, ease: "power3.out",
          }),
      });

      /* ── Rune ring materialises ── */
      gsap.set(runeRingRef.current, { opacity: 0, scale: 0.7, rotation: -20 });
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(runeRingRef.current, {
            opacity: 0.5, scale: 1, rotation: 0,
            duration: 2.5, ease: "power4.out",
          });
          gsap.to(runeRingRef.current, {
            rotation: 360, duration: 120, repeat: -1, ease: "none", delay: 2.5,
          });
        },
      });

      /* ── Content stagger reveal ── */
      const els = contentRef.current?.querySelectorAll<HTMLElement>(
        `.${styles.revealEl}`
      );
      els?.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 22 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              opacity: 1, y: 0,
              duration: 0.9,
              delay: i * 0.06,
              ease: "power3.out",
            }),
        });
      });

      /* ── Fog rises as you near footer ── */
      gsap.set(fogRef.current, { opacity: 0 });
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(fogRef.current, { opacity: 1, duration: 2.5, ease: "power1.in" }),
      });
    };

    init();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>

      {/* ── BG ── */}
      <div className={styles.bgBase} />
      <div className={styles.bgRadial} />
      <div className={styles.bgVignette} />
      <div className={styles.bgGrunge} />
      <div className={styles.bgScanlines} />
      <div ref={fogRef} className={styles.fog} />
      <div ref={particlesRef} className={styles.particles} />

      {/* ── Rune ring behind everything ── */}
      <div ref={runeRingRef} className={styles.runeRingWrap}>
        <svg viewBox="0 0 500 500" fill="none" className={styles.runeRing}>
          <circle cx="250" cy="250" r="238" stroke="#c8920d" strokeWidth="1"
            strokeDasharray="6 9" opacity="0.9" />
          <circle cx="250" cy="250" r="218" stroke="#7a5808" strokeWidth="0.6" opacity="0.5" />
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a) => {
            const rad = (a * Math.PI) / 180;
            const ox = 250 + 238 * Math.sin(rad);
            const oy = 250 - 238 * Math.cos(rad);
            const ix = 250 + 218 * Math.sin(rad);
            const iy = 250 - 218 * Math.cos(rad);
            return (
              <line key={a} x1={ox} y1={oy} x2={ix} y2={iy}
                stroke="#c8920d"
                strokeWidth={a % 90 === 0 ? 2 : 0.8}
                opacity={a % 90 === 0 ? 0.9 : 0.45} />
            );
          })}
          <circle cx="250" cy="250" r="190" stroke="#c8920d"
            strokeWidth="0.6" strokeDasharray="2 10" opacity="0.35" />
        </svg>
      </div>

      {/* ── INNER ── */}
      <div ref={contentRef} className={styles.inner}>

        {/* ── TOP: dying bonfire + title ── */}
        <div className={styles.topRow}>
          <div ref={bonfireRef} className={styles.bonfireWrap}>
            <DyingBonfire />
            <div className={styles.bonfireGlow} />
          </div>

          <div className={`${styles.titleBlock} ${styles.revealEl}`}>
            <span className={styles.topLabel}>LAST SITE OF GRACE</span>
            <h2 className={styles.footerTitle}>
              SEND A<br />
              <span className={styles.footerTitleAccent}>SUMMONING SIGN</span>
            </h2>
            <p className={styles.footerLore}>
              If you seek alliance — leave your mark below.<br />
              <em>A message heard across the fog of war.</em>
            </p>
          </div>
        </div>

        {/* ── RUNE DIVIDER ── */}
        <RuneDivider />

        {/* ── MAIN GRID: contact form + sidebar ── */}
        <div className={styles.mainGrid}>

          {/* ── Contact form ── */}
          <div className={`${styles.formPanel} ${styles.revealEl}`}>
            <PanelHeader title="SEND A MISSIVE" sub="Leave your summoning sign" />

            <div className={styles.form}>
              <div className={styles.fieldRow}>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>YOUR NAME</label>
                  <input
                    className={styles.fieldInput}
                    type="text"
                    placeholder="Tarnished Wanderer"
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                  />
                  <span className={styles.fieldLine} />
                </div>
                <div className={styles.fieldWrap}>
                  <label className={styles.fieldLabel}>YOUR EMAIL</label>
                  <input
                    className={styles.fieldInput}
                    type="email"
                    placeholder="soul@realm.dev"
                    value={formState.email}
                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                  />
                  <span className={styles.fieldLine} />
                </div>
              </div>

              <div className={styles.fieldWrap}>
                <label className={styles.fieldLabel}>YOUR MESSAGE</label>
                <textarea
                  className={styles.fieldTextarea}
                  rows={5}
                  placeholder="Speak your purpose, Tarnished. What quest brings you here?"
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                />
                <span className={styles.fieldLine} />
              </div>

              <button className={styles.submitBtn}>
                <span className={styles.submitGlow} />
                <span className={styles.submitBorder} />
                <span className={styles.submitText}>SEND ACROSS THE FOG</span>
                <svg viewBox="0 0 20 10" fill="none" className={styles.submitArrow}>
                  <path d="M0 5 L16 5 M12 1 L17 5 L12 9"
                    stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className={styles.sidebar}>

            {/* Direct contact */}
            <div className={`${styles.contactPanel} ${styles.revealEl}`}>
              <PanelHeader title="DIRECT SUMMON" sub="No fog required" />
              <button className={styles.emailRow} onClick={handleCopy}>
                <span className={styles.emailIcon}>✉</span>
                <span className={styles.emailAddress}>hello@placeholder.dev</span>
                <span className={`${styles.copyBadge} ${copied ? styles.copyDone : ""}`}>
                  {copied ? "✓ COPIED" : "COPY"}
                </span>
              </button>
              <p className={styles.responseNote}>
                <em>Responds within one bonfire rest.</em>
              </p>
            </div>

            {/* Social links */}
            <div className={`${styles.socialPanel} ${styles.revealEl}`}>
              <PanelHeader title="ALLIED OUTPOSTS" sub="Find the tarnished elsewhere" />
              <div className={styles.socialList}>
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} className={styles.socialLink}>
                    <span className={styles.socialRune}>{s.rune}</span>
                    <span className={styles.socialMeta}>
                      <span className={styles.socialLabel}>{s.label}</span>
                      <span className={styles.socialSub}>{s.sub}</span>
                    </span>
                    <svg viewBox="0 0 12 12" fill="none" className={styles.socialArrow}>
                      <path d="M2 10 L10 2 M5 2 L10 2 L10 7"
                        stroke="currentColor" strokeWidth="1.1"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── RUNE DIVIDER ── */}
        <RuneDivider />

        {/* ── BOTTOM BAR ── */}
        <div className={`${styles.bottomBar} ${styles.revealEl}`}>

          {/* Nav links */}
          <nav className={styles.bottomNav}>
            {NAV_LINKS.map((n) => (
              <a key={n.label} href={n.href} className={styles.bottomNavLink}>
                {n.label}
              </a>
            ))}
          </nav>

          {/* Sigil wordmark */}
          <div className={styles.wordmark}>
            <SigilSVG />
            <span className={styles.wordmarkText}>PLACEHOLDER.DEV</span>
          </div>

          {/* Copyright / lore */}
          <div className={styles.copyright}>
            <span className={styles.copyrightText}>
              © MMXXV · ALL RIGHTS RESERVED
            </span>
            <span className={styles.copyrightLore}>
              <em>Crafted in the Lands Between</em>
            </span>
          </div>
        </div>

        {/* ── FINAL EPITAPH ── */}
        <div className={`${styles.epitaph} ${styles.revealEl}`}>
          <span className={styles.epitaphDash} />
          <span className={styles.epitaphText}>
            YOU DIED · BUT THE DESIGN LIVES ON
          </span>
          <span className={styles.epitaphDash} />
        </div>

      </div>
    </footer>
  );
}

/* ── DYING BONFIRE SVG ────────────────────────────── */
function DyingBonfire() {
  return (
    <svg viewBox="0 0 100 140" fill="none" className={styles.bonfire}>
      {/* Ash base */}
      <ellipse cx="50" cy="130" rx="32" ry="6" fill="rgba(200,146,13,0.1)" />
      {/* Logs */}
      <line x1="22" y1="130" x2="78" y2="114" stroke="#3a2508" strokeWidth="5"
        strokeLinecap="round" />
      <line x1="78" y1="130" x2="22" y2="114" stroke="#3a2508" strokeWidth="5"
        strokeLinecap="round" />
      {/* Dim embers */}
      <circle cx="38" cy="122" r="2.5" fill="#c85500" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="120" r="2" fill="#e07000" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Weak outer flame */}
      <path d="M50 115 C44 105 40 96 42 82 C44 70 50 64 50 54 C50 64 56 70 58 82 C60 96 56 105 50 115Z"
        fill="url(#dyingOuter)" opacity="0.55">
        <animateTransform attributeName="transform" type="scale"
          values="1,1; 0.94,1.05; 1.04,0.95; 1,1"
          dur="3.2s" repeatCount="indefinite" additive="sum"
          transformOrigin="50 115" />
      </path>
      {/* Weak inner flame */}
      <path d="M50 118 C46 110 44 103 46 94 C48 85 50 80 50 70 C50 80 52 85 54 94 C56 103 54 110 50 118Z"
        fill="url(#dyingInner)">
        <animateTransform attributeName="transform" type="scale"
          values="1,1; 0.96,1.04; 1.02,0.97; 1,1"
          dur="2.4s" repeatCount="indefinite" additive="sum"
          transformOrigin="50 118" />
      </path>
      {/* Sword in ash */}
      <line x1="50" y1="126" x2="50" y2="58" stroke="rgba(0,0,0,0.6)"
        strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="100" x2="57" y2="100" stroke="rgba(0,0,0,0.6)"
        strokeWidth="1.8" strokeLinecap="round" />

      <defs>
        <linearGradient id="dyingInner" x1="50" y1="118" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c84000" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#e07030" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0b040" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="dyingOuter" x1="50" y1="115" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#8b2800" stopOpacity="0.7" />
          <stop offset="70%"  stopColor="#c06020" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#e09040" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── SIGIL SVG ────────────────────────────────────── */
function SigilSVG() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.sigil}>
      <polygon points="16,2 30,24 2,24"
        stroke="#c8920d" strokeWidth="1.2" fill="none" />
      <polygon points="16,8 25,22 7,22"
        stroke="#7a5808" strokeWidth="0.7" fill="none" opacity="0.6" />
      <circle cx="16" cy="16" r="3" fill="#e8b030" opacity="0.85" />
    </svg>
  );
}

/* ── PANEL HEADER ─────────────────────────────────── */
function PanelHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className={styles.panelHeader}>
      <div className={styles.panelLine} />
      <div className={styles.panelMeta}>
        <h3 className={styles.panelTitle}>{title}</h3>
        <span className={styles.panelSub}>{sub}</span>
      </div>
      <div className={styles.panelLine} />
    </div>
  );
}

/* ── RUNE DIVIDER ─────────────────────────────────── */
function RuneDivider() {
  return (
    <div className={styles.runeDivider}>
      <div className={styles.rdLine} />
      <svg viewBox="0 0 28 28" fill="none" className={styles.rdIcon}>
        <path d="M14 2 L26 14 L14 26 L2 14 Z"
          stroke="#c8920d" strokeWidth="1.2" fill="none" />
        <path d="M14 8 L20 14 L14 20 L8 14 Z"
          fill="#c8920d" opacity="0.5" />
        <circle cx="14" cy="14" r="2.5" fill="#e8b030" />
      </svg>
      <div className={styles.rdLine} />
    </div>
  );
}

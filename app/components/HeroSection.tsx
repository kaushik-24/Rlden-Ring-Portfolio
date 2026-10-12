"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

const STATS = [
  { label: "LOGIC",  value: 88, color: "#d4a520" },
  { label: "CRAFT",  value: 74, color: "#c07848" },
  { label: "VISION", value: 91, color: "#7ab8a0" },
];

export default function HeroSection() {
  const containerRef      = useRef<HTMLDivElement>(null);
  const titleRef          = useRef<HTMLHeadingElement>(null);
  const subtitleRef       = useRef<HTMLParagraphElement>(null);
  const loreRef           = useRef<HTMLParagraphElement>(null);
  const runeRingRef       = useRef<HTMLDivElement>(null);
  const runeRingInnerRef  = useRef<HTMLDivElement>(null);
  const overlayRef        = useRef<HTMLDivElement>(null);
  const lineLeftRef       = useRef<HTMLDivElement>(null);
  const lineRightRef      = useRef<HTMLDivElement>(null);
  const crestRef          = useRef<HTMLDivElement>(null);
  const statusRef         = useRef<HTMLDivElement>(null);
  const scrollPromptRef   = useRef<HTMLDivElement>(null);
  const particlesRef      = useRef<HTMLDivElement>(null);
  const fogRef            = useRef<HTMLDivElement>(null);
  const statsRef          = useRef<HTMLDivElement>(null);
  const ctaRef            = useRef<HTMLDivElement>(null);
  const mouseRef          = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const init = async () => {
      const { gsap }         = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── EMBERS ─────────────────────────────── */
      const pc = particlesRef.current!;
      for (let i = 0; i < 55; i++) {
        const p = document.createElement("div");
        p.className = styles.ember;
        const leftSide = Math.random() > 0.5;
        p.style.left             = `${leftSide ? Math.random() * 45 : 55 + Math.random() * 45}%`;
        p.style.animationDuration= `${4 + Math.random() * 8}s`;
        p.style.animationDelay   = `${Math.random() * 6}s`;
        const sz = 1.5 + Math.random() * 3.5;
        p.style.width = p.style.height = `${sz}px`;
        p.style.opacity = `${0.5 + Math.random() * 0.5}`;
        pc.appendChild(p);
      }

      /* ── INITIAL STATES ──────────────────────── */
      gsap.set(overlayRef.current,         { opacity: 1 });
      gsap.set(fogRef.current,             { opacity: 0 });
      gsap.set(runeRingRef.current,        { opacity: 0, scale: 0.5, rotation: -45 });
      gsap.set(runeRingInnerRef.current,   { opacity: 0, scale: 0.4, rotation: 60 });
      gsap.set(lineLeftRef.current,        { scaleX: 0, opacity: 0, transformOrigin: "right center" });
      gsap.set(lineRightRef.current,       { scaleX: 0, opacity: 0, transformOrigin: "left center" });
      gsap.set([crestRef.current, statusRef.current, subtitleRef.current,
                loreRef.current, statsRef.current, ctaRef.current,
                scrollPromptRef.current], { opacity: 0, y: 16 });
      gsap.set(`.${styles.titleChar}`, { opacity: 0, y: 40 });

      /* ── MASTER TIMELINE ────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        .to(overlayRef.current,        { opacity: 0, duration: 2.8, ease: "power2.inOut" }, 0)
        .to(fogRef.current,            { opacity: 1, duration: 3.5, ease: "power1.inOut" }, 0.3)
        .to(runeRingRef.current,       { opacity: 1, scale: 1, rotation: 0, duration: 3, ease: "power4.out" }, 0.5)
        .to(runeRingInnerRef.current,  { opacity: 0.9, scale: 1, rotation: 0, duration: 2.6, ease: "power4.out" }, 0.8)
        .to(crestRef.current,          { opacity: 1, y: 0, duration: 1 }, 1.3)
        .to(statusRef.current,         { opacity: 1, y: 0, duration: 0.8 }, 1.6)
        .to(lineLeftRef.current,       { scaleX: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, 1.8)
        .to(lineRightRef.current,      { scaleX: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, 1.8)
        .to(`.${styles.titleChar}`,    { opacity: 1, y: 0, duration: 0.55, stagger: 0.04, ease: "back.out(1.4)" }, 2.1)
        .to(subtitleRef.current,       { opacity: 1, y: 0, duration: 1.1 }, 3.0)
        .to(loreRef.current,           { opacity: 1, y: 0, duration: 1 }, 3.4)
        .to(statsRef.current,          { opacity: 1, y: 0, duration: 0.9 }, 3.7)
        .to(ctaRef.current,            { opacity: 1, y: 0, duration: 0.9 }, 4.1)
        .to(scrollPromptRef.current,   { opacity: 1, y: 0, duration: 0.8 }, 4.5);

      /* ── RUNE RING SPIN ──────────────────────── */
      gsap.to(runeRingRef.current,       { rotation: 360,  duration: 90, repeat: -1, ease: "none" });
      gsap.to(runeRingInnerRef.current,  { rotation: -360, duration: 55, repeat: -1, ease: "none" });

      /* ── MOUSE PARALLAX ─────────────────────── */
      const handleMouse = (e: MouseEvent) => {
        const mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        const my = (e.clientY / window.innerHeight - 0.5) * 2;
        mouseRef.current = { x: mx, y: my };

        gsap.to(runeRingRef.current,      { x: mx * 30, y: my * 20, duration: 2.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(runeRingInnerRef.current, { x: mx * -20, y: my * -14, duration: 1.9, ease: "power2.out", overwrite: "auto" });
        gsap.to(fogRef.current,           { x: mx * 14, duration: 3.2, ease: "power1.out", overwrite: "auto" });
      };
      window.addEventListener("mousemove", handleMouse);

      /* ── SCROLL PARALLAX ────────────────────── */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top", end: "35% top",
        scrub: true,
        onUpdate: (self: any) => {
          const p = self.progress;
          const fade = Math.max(0, 1 - p * 2.2);
          gsap.set([titleRef.current, subtitleRef.current, loreRef.current], {
            opacity: fade, y: p * -50,
          });
          gsap.set(runeRingRef.current, {
            y: (mouseRef.current.y * 20) + p * 200,
            opacity: Math.max(0, 1 - p * 1.8),
          });
        },
      });

      return () => window.removeEventListener("mousemove", handleMouse);
    };

    init();
  }, []);

  /* ── TITLE CHARACTER SPLIT ───────────────── */
  const splitLine = (text: string, key: string) =>
    text.split("").map((ch, i) => (
      <span key={`${key}-${i}`} className={styles.titleChar} style={{ display: "inline-block" }}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <section ref={containerRef} className={styles.hero}>

      {/* BG layers */}
      <div className={styles.bgBase} />
      <div className={styles.bgRadial} />
      <div className={styles.bgVignette} />
      <div className={styles.bgScanlines} />
      <div className={styles.bgGrunge} />

      {/* Fog / mist */}
      <div ref={fogRef} className={styles.fog} />

      {/* Embers */}
      <div ref={particlesRef} className={styles.particles} />

      {/* Cinematic overlay */}
      <div ref={overlayRef} className={styles.cinematicOverlay} />

      {/* Outer rune ring */}
      <div ref={runeRingRef} className={styles.runeRingWrap}>
        <svg className={styles.runeRing} viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="288" stroke="#c8920d" strokeWidth="1.4"
            strokeDasharray="8 10" opacity="0.95" />
          <circle cx="300" cy="300" r="274" stroke="#906808" strokeWidth="0.6" opacity="0.5" />
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const ox = 300 + 288 * Math.sin(rad);
            const oy = 300 - 288 * Math.cos(rad);
            const ix = 300 + 262 * Math.sin(rad);
            const iy = 300 - 262 * Math.cos(rad);
            const mx = 300 + 270 * Math.sin(rad);
            const my = 300 - 270 * Math.cos(rad);
            const isMajor = angle % 90 === 0;
            return (
              <g key={angle}>
                <line x1={ox} y1={oy} x2={ix} y2={iy}
                  stroke="#c8920d" strokeWidth={isMajor ? 2.2 : 0.9}
                  opacity={isMajor ? 1 : 0.55} />
                {isMajor && (
                  <circle cx={mx} cy={my} r="5.5" fill="#c8920d" opacity="1" />
                )}
              </g>
            );
          })}
          <circle cx="300" cy="300" r="242" stroke="#c8920d" strokeWidth="0.7" opacity="0.35" />
        </svg>
      </div>

      {/* Inner counter-rotating ring */}
      <div ref={runeRingInnerRef} className={styles.runeRingInnerWrap}>
        <svg className={styles.runeRing} viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="212" stroke="#e8b030" strokeWidth="1.6"
            strokeDasharray="3 16" opacity="1" />
          <circle cx="300" cy="300" r="197" stroke="#a07008" strokeWidth="0.5" opacity="0.45" />
          {[0,45,90,135,180,225,270,315].map((angle) => {
            const rad   = (angle * Math.PI) / 180;
            const dmx   = 300 + 212 * Math.sin(rad);
            const dmy   = 300 - 212 * Math.cos(rad);
            return (
              <g key={angle} transform={`rotate(${angle}, 300, 300)`}>
                <line x1="300" y1="86" x2="300" y2="110"
                  stroke="#e8b030" strokeWidth="1.8" opacity="1" />
                <rect x={dmx - 4.5} y={dmy - 4.5} width="9" height="9"
                  fill="none" stroke="#e8b030" strokeWidth="1.2" opacity="0.8"
                  transform={`rotate(45, ${dmx}, ${dmy})`} />
              </g>
            );
          })}
          <circle cx="300" cy="300" r="26" stroke="#e8b030" strokeWidth="1.2" opacity="0.6" />
          <circle cx="300" cy="300" r="10" fill="#c8920d" opacity="0.3" />
          <line x1="274" y1="300" x2="326" y2="300" stroke="#c8920d" strokeWidth="0.9" opacity="0.45" />
          <line x1="300" y1="274" x2="300" y2="326" stroke="#c8920d" strokeWidth="0.9" opacity="0.45" />
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <div className={styles.content}>

        {/* Crest */}
        <div ref={crestRef} className={styles.crest} style={{ opacity: 0 }}>
          <svg viewBox="0 0 90 90" fill="none" className={styles.crestSvg}>
            <polygon points="45,5 85,70 5,70"
              stroke="#e8b030" strokeWidth="1.6" fill="rgba(232,176,48,0.05)" />
            <polygon points="45,18 72,65 18,65"
              stroke="#a07008" strokeWidth="0.9" fill="none" opacity="0.6" />
            <line x1="45" y1="5"  x2="45" y2="70" stroke="#c8920d" strokeWidth="0.9" opacity="0.45" />
            <line x1="5"  y1="70" x2="85" y2="70" stroke="#c8920d" strokeWidth="0.9" opacity="0.45" />
            <circle cx="45" cy="44" r="7" fill="#e8b030" opacity="0.95" />
            <circle cx="45" cy="44" r="3" fill="#fff8e0" opacity="0.7" />
          </svg>
        </div>

        {/* Status tag */}
        <div ref={statusRef} className={styles.statusTag} style={{ opacity: 0 }}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>CLASS: DEVELOPER → DESIGNER</span>
          <span className={styles.statusDot} />
        </div>

        {/* Decorative lines */}
        <div className={styles.linesRow}>
          <div ref={lineLeftRef}  className={styles.line} style={{ opacity: 0 }} />
          <div className={styles.lineDiamond} />
          <div ref={lineRightRef} className={styles.line} style={{ opacity: 0 }} />
        </div>

        {/* Title */}
        <h1 ref={titleRef} className={styles.titleBlock}>
          <span className={styles.titleLine1}>{splitLine("FORGED IN CODE", "l1")}</span>
          <span className={styles.titleLine2}>{splitLine("REBORN IN DESIGN", "l2")}</span>
        </h1>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <svg viewBox="0 0 24 24" className={styles.dividerIcon} fill="none">
            <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke="#e8b030" strokeWidth="1.3" fill="none" />
            <path d="M12 7 L17 12 L12 17 L7 12 Z" fill="#c8920d" opacity="0.65" />
            <circle cx="12" cy="12" r="2.2" fill="#e8b030" />
          </svg>
          <span className={styles.dividerLine} />
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className={styles.subtitle} style={{ opacity: 0 }}>
          Once a builder of logic and systems —
          <br />now a shaper of worlds seen.
        </p>

        {/* Lore accent */}
        <p ref={loreRef} className={styles.loreAccent} style={{ opacity: 0 }}>
          <span className={styles.loreBracket}>❝ </span>
          The code was the first trial. Design is the true ordeal.
          <span className={styles.loreBracket}> ❞</span>
        </p>

        {/* Stat bars */}
        <div ref={statsRef} className={styles.stats} style={{ opacity: 0 }}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statLabel}>{s.label}</span>
              <div className={styles.statBar}>
                <div className={styles.statFill}
                  style={{ "--stat-val": `${s.value}%`, "--stat-color": s.color } as React.CSSProperties} />
              </div>
              <span className={styles.statVal}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className={styles.ctaRow} style={{ opacity: 0 }}>
          <button className={styles.ctaBtn}>
            <span className={styles.ctaBtnGlow} />
            <span className={styles.ctaBtnBorder} />
            <span className={styles.ctaBtnText}>ENTER THE REALM</span>
          </button>
          <button className={styles.ctaBtnGhost}>
            <span className={styles.ctaBtnText}>VIEW LORE</span>
          </button>
        </div>
      </div>

      {/* Scroll prompt */}
      <div ref={scrollPromptRef} className={styles.scrollPrompt} style={{ opacity: 0 }}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>DESCEND</span>
        <svg viewBox="0 0 14 22" fill="none" width="10" className={styles.scrollArrow}>
          <path d="M7 2 L7 17 M3 12 L7 19 L11 12"
            stroke="#c8920d" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Corner ornaments */}
      {(["tl","tr","bl","br"] as const).map((pos) => (
        <div key={pos} className={`${styles.corner} ${styles[pos]}`}>
          <svg viewBox="0 0 50 50" fill="none">
            <path d="M2 2 L22 2 L2 22"  stroke="#c8920d" strokeWidth="1.8" opacity="0.85" />
            <path d="M6 2 L22 2 L2 22 L2 6"
              fill="none" stroke="#c8920d" strokeWidth="0.6" opacity="0.3" />
          </svg>
        </div>
      ))}

      {/* Side rune labels */}
      <div className={`${styles.sideLabel} ${styles.sideLabelLeft}`}><span>✦ PORTFOLIO ✦</span></div>
      <div className={`${styles.sideLabel} ${styles.sideLabelRight}`}><span>✦ MMXXV ✦</span></div>

    </section>
  );
}

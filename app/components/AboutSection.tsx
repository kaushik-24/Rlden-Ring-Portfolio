"use client";

import { useEffect, useRef } from "react";
import styles from "./AboutSection.module.css";

/* ── DATA ──────────────────────────────────────────── */

const ATTRIBUTES = [
  { label: "ENDURANCE",   value: 82, desc: "Survived 3am debugging sessions" },
  { label: "INTELLIGENCE",value: 88, desc: "Learned to speak in both code & colour" },
  { label: "DEXTERITY",   value: 79, desc: "Pixel-perfect precision under pressure" },
  { label: "FAITH",       value: 95, desc: "Belief that great design changes worlds" },
  { label: "ARCANE",      value: 71, desc: "Dark arts of animation & motion" },
  { label: "VIGOR",       value: 84, desc: "Ships work. Then ships better work." },
];

const LORE_FRAGMENTS = [
  {
    icon: "⚔",
    title: "ORIGIN",
    text: "Born of curiosity and late-night terminals. The first lines of code were scratched into existence not for gain — but to understand the machine.",
  },
  {
    icon: "🔥",
    title: "THE FIRST FLAME",
    text: "Programming was the bonfire. Every project a new kindling — React, Node, APIs — each one a trial survived, a scar earned.",
  },
  {
    icon: "👁",
    title: "THE GREAT RUNE",
    text: "Then came the vision: logic alone cannot move a soul. Design is the language between the builder and the world. The path shifted.",
  },
  {
    icon: "🗡",
    title: "THE PRESENT ORDEAL",
    text: "Now the weapon is both — systems thinking fused with visual craft. A developer who sees, and a designer who builds.",
  },
];

const EQUIPMENT = [
  { slot: "RIGHT HAND",   item: "React / Next.js",   tier: "S" },
  { slot: "LEFT HAND",    item: "Figma / Design Sys",tier: "A" },
  { slot: "HEAD",         item: "Systems Thinking",  tier: "S" },
  { slot: "CHEST",        item: "TypeScript",         tier: "A" },
  { slot: "TALISMAN",     item: "GSAP / Motion",      tier: "B" },
  { slot: "SEAL",         item: "Tailwind CSS",        tier: "A" },
];

const TIER_COLORS: Record<string, string> = {
  S: "#e8b030",
  A: "#a0c878",
  B: "#7ab8c8",
  C: "#c87878",
};

/* ── COMPONENT ─────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const bonfireRef    = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLDivElement>(null);
  const loreGridRef   = useRef<HTMLDivElement>(null);
  const attrPanelRef  = useRef<HTMLDivElement>(null);
  const equipPanelRef = useRef<HTMLDivElement>(null);
  const sealRef       = useRef<HTMLDivElement>(null);
  const runeWallRef   = useRef<HTMLDivElement>(null);
  const particlesRef  = useRef<HTMLDivElement>(null);
  const fogBotRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── EMBERS ──────────────────────── */
      const pc = particlesRef.current!;
      for (let i = 0; i < 35; i++) {
        const p       = document.createElement("div");
        p.className   = styles.ember;
        p.style.left  = `${20 + Math.random() * 60}%`;
        p.style.animationDuration = `${5 + Math.random() * 8}s`;
        p.style.animationDelay   = `${Math.random() * 7}s`;
        const sz = 1.2 + Math.random() * 3;
        p.style.width = p.style.height = `${sz}px`;
        p.style.opacity = `${0.4 + Math.random() * 0.6}`;
        pc.appendChild(p);
      }

      const makeScrollReveal = (
        el: Element | null,
        vars: gsap.TweenVars,
        triggerVars?: Partial<ScrollTrigger.Vars>
      ) => {
        if (!el) return;
        gsap.set(el, vars);
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => gsap.to(el, { ...vars, opacity: 1, y: 0, x: 0, scale: 1,
            duration: 1.1, ease: "power3.out", clearProps: "transform" }),
          ...triggerVars,
        });
      };

      /* ── BONFIRE entrance (centre) ───── */
      gsap.set(bonfireRef.current, { opacity: 0, scale: 0.6, y: 40 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(bonfireRef.current, {
            opacity: 1, scale: 1, y: 0,
            duration: 1.8, ease: "power4.out",
          }),
      });

      /* ── Heading ─────────────────────── */
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.timeline()
            .to(headingRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
            .from(`.${styles.headingChar}`, {
              opacity: 0, y: 30, stagger: 0.035, duration: 0.6, ease: "back.out(1.6)",
            }, "-=0.6"),
      });

      /* ── Lore cards — staggered from left/right ── */
      const cards = loreGridRef.current?.querySelectorAll(`.${styles.loreCard}`);
      cards?.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(card, { opacity: 0, x: fromLeft ? -60 : 60, y: 20 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(card, {
              opacity: 1, x: 0, y: 0,
              duration: 1.0,
              delay: (i % 2) * 0.12,
              ease: "power3.out",
            }),
        });
      });

      /* ── Attribute rows — cascade down ── */
      const rows = attrPanelRef.current?.querySelectorAll(`.${styles.attrRow}`);
      rows?.forEach((row, i) => {
        gsap.set(row, { opacity: 0, x: -40 });
        ScrollTrigger.create({
          trigger: row,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(row, {
              opacity: 1, x: 0,
              duration: 0.9,
              delay: i * 0.08,
              ease: "power3.out",
              onComplete: () => {
                const fill = row.querySelector(`.${styles.attrFill}`) as HTMLElement;
                if (fill) gsap.to(fill, { width: fill.dataset.val, duration: 1.2, ease: "power2.out" });
              },
            }),
        });
      });

      /* ── Equipment slots — scale in ──── */
      const slots = equipPanelRef.current?.querySelectorAll(`.${styles.equipSlot}`);
      slots?.forEach((slot, i) => {
        gsap.set(slot, { opacity: 0, scale: 0.85, y: 20 });
        ScrollTrigger.create({
          trigger: slot,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(slot, {
              opacity: 1, scale: 1, y: 0,
              duration: 0.8,
              delay: i * 0.07,
              ease: "back.out(1.3)",
            }),
        });
      });

      /* ── Seal ────────────────────────── */
      makeScrollReveal(sealRef.current, { opacity: 0, scale: 0.7 });
      gsap.to(sealRef.current, { rotation: 360, duration: 100, repeat: -1, ease: "none" });

      /* ── Rune wall parallax ──────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (runeWallRef.current) {
            gsap.set(runeWallRef.current, { y: self.progress * -120 });
          }
        },
      });

      /* ── Fog bottom parallax ─────────── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
          if (fogBotRef.current) {
            gsap.set(fogBotRef.current, {
              opacity: 0.6 + self.progress * 0.4,
              y: self.progress * -60,
            });
          }
        },
      });
    };

    init();
  }, []);

  const TITLE = "THE TARNISHED BUILDER";

  return (
    <section ref={sectionRef} className={styles.about}>

      {/* ── BG LAYERS ─── */}
      <div className={styles.bgBase} />
      <div className={styles.bgRadial} />
      <div className={styles.bgVignette} />
      <div className={styles.bgGrunge} />
      <div ref={runeWallRef} className={styles.runeWall} />
      <div className={styles.bgScanlines} />

      {/* ── EMBERS ────── */}
      <div ref={particlesRef} className={styles.particles} />

      {/* ── FOG BOTTOM ── */}
      <div ref={fogBotRef} className={styles.fogBottom} />

      {/* ── CONTENT ───── */}
      <div className={styles.inner}>

        {/* ── TOP: Bonfire + heading ── */}
        <div className={styles.topRow}>
          <div ref={bonfireRef} className={styles.bonfireWrap}>
            <BonfireSVG />
            <div className={styles.bonfireGlow} />
          </div>

          <div ref={headingRef} className={styles.headingBlock}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelDash} />
              <span className={styles.labelText}>ABOUT THE TARNISHED</span>
              <span className={styles.labelDash} />
            </div>
            <h2 className={styles.heading}>
              {TITLE.split("").map((ch, i) => (
                <span key={i} className={styles.headingChar} style={{ display: "inline-block" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h2>
            <p className={styles.headingLore}>
              A soul who wandered the lowlands of{" "}
              <em>logic and syntax</em>, only to be drawn
              toward the light of <em>form and feeling</em>.
              Neither purely developer nor purely designer —
              but a rare hybrid cursed to see both sides of the veil.
            </p>
          </div>
        </div>

        {/* ── DIVIDER ──────────── */}
        <RuneDivider />

        {/* ── LORE FRAGMENTS GRID ── */}
        <div ref={loreGridRef} className={styles.loreGrid}>
          {LORE_FRAGMENTS.map((f) => (
            <div key={f.title} className={styles.loreCard}>
              <div className={styles.loreCardCornerTL} />
              <div className={styles.loreCardCornerBR} />
              <div className={styles.loreIcon}>{f.icon}</div>
              <h3 className={styles.loreTitle}>{f.title}</h3>
              <p className={styles.loreText}>{f.text}</p>
            </div>
          ))}
        </div>

        {/* ── DIVIDER ──────────── */}
        <RuneDivider label="CHARACTER ATTRIBUTES" />

        {/* ── BOTTOM SPLIT: attributes + equipment ── */}
        <div className={styles.bottomGrid}>

          {/* Attribute panel */}
          <div ref={attrPanelRef} className={styles.panel}>
            <PanelHeader title="ATTRIBUTES" sub="Base soul values" />
            <div className={styles.attrList}>
              {ATTRIBUTES.map((a) => (
                <div key={a.label} className={styles.attrRow}>
                  <div className={styles.attrMeta}>
                    <span className={styles.attrLabel}>{a.label}</span>
                    <span className={styles.attrDesc}>{a.desc}</span>
                  </div>
                  <div className={styles.attrBarWrap}>
                    <div
                      className={styles.attrFill}
                      data-val={`${a.value}%`}
                      style={{ width: 0 }}
                    />
                    <span className={styles.attrVal}>{a.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment panel */}
          <div ref={equipPanelRef} className={styles.panel}>
            <PanelHeader title="EQUIPMENT" sub="Weapons & talismans equipped" />
            <div className={styles.equipGrid}>
              {EQUIPMENT.map((e) => (
                <div key={e.slot} className={styles.equipSlot}>
                  <span className={styles.equipSlotLabel}>{e.slot}</span>
                  <span className={styles.equipItem}>{e.item}</span>
                  <span
                    className={styles.equipTier}
                    style={{ color: TIER_COLORS[e.tier] ?? "#888" }}
                  >
                    {e.tier}
                  </span>
                </div>
              ))}
            </div>

            {/* Seal / sigil */}
            <div className={styles.sealWrap}>
              <div ref={sealRef} className={styles.seal} style={{ opacity: 0 }}>
                <SealSVG />
              </div>
              <span className={styles.sealLabel}>MARK OF THE MAKER</span>
            </div>
          </div>
        </div>

        {/* ── BOTTOM QUOTE ── */}
        <div className={styles.bottomQuote}>
          <span className={styles.bqBracket}>❝</span>
          <p className={styles.bqText}>
            I did not abandon code. I evolved beyond it.
          </p>
          <span className={styles.bqBracket}>❞</span>
        </div>

      </div>
    </section>
  );
}

/* ── SUB-COMPONENTS ──────────────────────────────── */

function BonfireSVG() {
  return (
    <svg viewBox="0 0 120 160" fill="none" className={styles.bonfire}>
      {/* Base / ash */}
      <ellipse cx="60" cy="148" rx="38" ry="7" fill="rgba(200,146,13,0.15)" />
      {/* Logs */}
      <line x1="26" y1="148" x2="94" y2="130" stroke="#5a3a0a" strokeWidth="6" strokeLinecap="round" />
      <line x1="94" y1="148" x2="26" y2="130" stroke="#5a3a0a" strokeWidth="6" strokeLinecap="round" />
      {/* Embers at base */}
      <circle cx="44" cy="138" r="3" fill="#e85500" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="76" cy="136" r="2.5" fill="#ff7700" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.2s" repeatCount="indefinite" />
      </circle>
      {/* Flame layers — inner */}
      <path d="M60 130 C54 118 46 108 50 90 C53 76 60 68 60 55 C60 68 67 76 70 90 C74 108 66 118 60 130Z"
        fill="url(#flameInner)">
        <animateTransform attributeName="transform" type="scale"
          values="1,1; 0.96,1.04; 1.02,0.97; 1,1"
          dur="2.1s" repeatCount="indefinite" additive="sum"
          transformOrigin="60 130" />
      </path>
      {/* Flame layers — outer */}
      <path d="M60 132 C50 115 38 100 42 78 C46 60 58 48 60 32 C62 48 74 60 78 78 C82 100 70 115 60 132Z"
        fill="url(#flameOuter)" opacity="0.7">
        <animateTransform attributeName="transform" type="scale"
          values="1,1; 1.03,0.96; 0.97,1.03; 1,1"
          dur="1.7s" repeatCount="indefinite" additive="sum"
          transformOrigin="60 132" />
      </path>
      {/* Flame tip */}
      <path d="M60 80 C57 68 58 56 60 44 C62 56 63 68 60 80Z"
        fill="#fff5cc" opacity="0.85">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; -1,-2; 1,-1; 0,0"
          dur="1.3s" repeatCount="indefinite" />
      </path>
      {/* Sword silhouette in flame */}
      <line x1="60" y1="142" x2="60" y2="62" stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="114" x2="70" y2="114" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="flameInner" x1="60" y1="130" x2="60" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#e85500" />
          <stop offset="40%"  stopColor="#ff8800" />
          <stop offset="80%"  stopColor="#ffd060" />
          <stop offset="100%" stopColor="#fff5cc" />
        </linearGradient>
        <linearGradient id="flameOuter" x1="60" y1="132" x2="60" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c84000" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#e87820" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffcc44" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SealSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={styles.sealSvg}>
      <circle cx="50" cy="50" r="46" stroke="#c8920d" strokeWidth="1" strokeDasharray="4 6" opacity="0.8" />
      <circle cx="50" cy="50" r="38" stroke="#e8b030" strokeWidth="0.8" opacity="0.5" />
      {[0,60,120,180,240,300].map((a) => {
        const r = (a * Math.PI) / 180;
        const x = 50 + 38 * Math.sin(r);
        const y = 50 - 38 * Math.cos(r);
        return <circle key={a} cx={x} cy={y} r="2.5" fill="#c8920d" opacity="0.7" />;
      })}
      <polygon points="50,18 62,40 86,44 68,62 72,86 50,74 28,86 32,62 14,44 38,40"
        stroke="#e8b030" strokeWidth="1" fill="rgba(200,146,13,0.08)" opacity="0.9" />
      <circle cx="50" cy="50" r="7" fill="#c8920d" opacity="0.6" />
    </svg>
  );
}

function RuneDivider({ label }: { label?: string }) {
  return (
    <div className={styles.runeDivider}>
      <div className={styles.rdLine} />
      {label ? (
        <span className={styles.rdLabel}>{label}</span>
      ) : (
        <svg viewBox="0 0 28 28" fill="none" className={styles.rdIcon}>
          <path d="M14 2 L26 14 L14 26 L2 14 Z" stroke="#c8920d" strokeWidth="1.2" fill="none" />
          <path d="M14 8 L20 14 L14 20 L8 14 Z" fill="#c8920d" opacity="0.5" />
          <circle cx="14" cy="14" r="2.5" fill="#e8b030" />
        </svg>
      )}
      <div className={styles.rdLine} />
    </div>
  );
}

function PanelHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className={styles.panelHeader}>
      <div className={styles.panelHeaderLine} />
      <div className={styles.panelHeaderText}>
        <h3 className={styles.panelTitle}>{title}</h3>
        <span className={styles.panelSub}>{sub}</span>
      </div>
      <div className={styles.panelHeaderLine} />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./WorkSection.module.css";

/* ── DATA ──────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "I",
    codename: "REMEMBRANCE OF THE FIRST BUILD",
    title: "Project Placeholder I",
    subtitle: "Full-Stack Web Application",
    tags: ["React", "Node.js", "MongoDB"],
    lore: "Forged in the earliest days of the journey. A crude but functional construct — the first proof that logic could be bent to purpose. Many nights were lost here. Many errors survived.",
    stat: { label: "SOULS EARNED", value: "14,400" },
    difficulty: "MARGIT-TIER",
    status: "CONQUERED",
    year: "2023",
    accent: "#c8920d",
  },
  {
    id: "II",
    codename: "REMEMBRANCE OF THE DEEP ARCHIVE",
    title: "Project Placeholder II",
    subtitle: "Data Dashboard & Visualiser",
    tags: ["TypeScript", "Next.js", "D3.js"],
    lore: "Descended into the depths of data. Charts that once seemed impossible became weapons. The archive breathes — each graph a window into patterns only the patient can read.",
    stat: { label: "SOULS EARNED", value: "28,600" },
    difficulty: "GODRICK-TIER",
    status: "CONQUERED",
    year: "2023",
    accent: "#7ab8c8",
  },
  {
    id: "III",
    codename: "REMEMBRANCE OF THE SHIFTING FORM",
    title: "Project Placeholder III",
    subtitle: "Brand Identity & Design System",
    tags: ["Figma", "Design Tokens", "Storybook"],
    lore: "The first purely visual ordeal. Where once there was only code — now colour, type, space. A design system assembled from nothing. The tarnished began to see.",
    stat: { label: "SOULS EARNED", value: "42,000" },
    difficulty: "RENNALA-TIER",
    status: "CONQUERED",
    year: "2024",
    accent: "#c87898",
  },
  {
    id: "IV",
    codename: "REMEMBRANCE OF THE ETERNAL CRAFT",
    title: "Project Placeholder IV",
    subtitle: "Interactive Portfolio Experience",
    tags: ["Next.js", "GSAP", "Tailwind CSS"],
    lore: "The current ordeal. A world built to hold all the others — a monument to the path walked. Code and design, finally unified. The war was always internal. This is proof it was won.",
    stat: { label: "SOULS EARNED", value: "???,???" },
    difficulty: "ELDEN BEAST-TIER",
    status: "IN PROGRESS",
    year: "2025",
    accent: "#e8b030",
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  "MARGIT-TIER":       "#a89878",
  "GODRICK-TIER":      "#7ab8c8",
  "RENNALA-TIER":      "#c87898",
  "ELDEN BEAST-TIER":  "#e8b030",
};

/* ── COMPONENT ─────────────────────────────────────── */
export default function WorkSection() {
  const sectionRef     = useRef<HTMLElement>(null);
  const headingRef     = useRef<HTMLDivElement>(null);
  const cardsWrapRef   = useRef<HTMLDivElement>(null);
  const particlesRef   = useRef<HTMLDivElement>(null);
  const fogTopRef      = useRef<HTMLDivElement>(null);
  const runeWallRef    = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── Embers ── */
      const pc = particlesRef.current!;
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = styles.ember;
        p.style.left             = `${Math.random() * 100}%`;
        p.style.animationDuration= `${5 + Math.random() * 8}s`;
        p.style.animationDelay   = `${Math.random() * 7}s`;
        const sz = 1.2 + Math.random() * 2.8;
        p.style.width = p.style.height = `${sz}px`;
        p.style.opacity = `${0.4 + Math.random() * 0.5}`;
        pc.appendChild(p);
      }

      /* ── Heading ── */
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 86%",
        once: true,
        onEnter: () => {
          gsap.timeline()
            .to(headingRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
            .from(`.${styles.headingChar}`, {
              opacity: 0, y: 28, stagger: 0.032, duration: 0.55, ease: "back.out(1.5)",
            }, "-=0.7");
        },
      });

      /* ── Project cards — dramatic cinematic entrance ── */
      const cards = cardsWrapRef.current?.querySelectorAll(`.${styles.projectCard}`);
      cards?.forEach((card, i) => {
        const isEven = i % 2 === 0;

        // Set each card clipped off-screen
        gsap.set(card, {
          opacity: 0,
          x: isEven ? -80 : 80,
          y: 30,
          clipPath: isEven
            ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
            : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              y: 0,
              clipPath: isEven
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 1.1,
              delay: i * 0.1,
              ease: "power3.out",
            });

            // Stagger inner elements
            const inner = card.querySelectorAll(
              `.${styles.projectId}, .${styles.projectCodename}, .${styles.projectTitle}, .${styles.projectSub}, .${styles.projectLore}, .${styles.projectTagList}, .${styles.projectMeta}`
            );
            gsap.from(inner, {
              opacity: 0, y: 20,
              stagger: 0.07,
              duration: 0.7,
              delay: i * 0.1 + 0.3,
              ease: "power2.out",
            });
          },
        });
      });

      /* ── Runic wall parallax ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
          if (runeWallRef.current) gsap.set(runeWallRef.current, { y: self.progress * -100 });
        },
      });

      /* ── Fog top parallax ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "40% top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (fogTopRef.current) {
            gsap.set(fogTopRef.current, { opacity: 0.7 - self.progress * 0.5 });
          }
        },
      });
    };

    init();
  }, []);

  const SECTION_TITLE = "HALL OF REMEMBRANCE";

  return (
    <section ref={sectionRef} className={styles.work}>

      {/* BG */}
      <div className={styles.bgBase} />
      <div className={styles.bgRadial} />
      <div className={styles.bgVignette} />
      <div className={styles.bgGrunge} />
      <div className={styles.bgScanlines} />
      <div ref={runeWallRef} className={styles.runeWall} />

      {/* Fog at top — transition from about */}
      <div ref={fogTopRef} className={styles.fogTop} />

      {/* Embers */}
      <div ref={particlesRef} className={styles.particles} />

      <div className={styles.inner}>

        {/* ── Section heading ── */}
        <div ref={headingRef} className={styles.headingBlock}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelDash} />
            <span className={styles.labelText}>CONQUERED TRIALS</span>
            <span className={styles.labelDash} />
          </div>

          <h2 className={styles.heading}>
            {SECTION_TITLE.split("").map((ch, i) => (
              <span key={i} className={styles.headingChar} style={{ display: "inline-block" }}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h2>

          <p className={styles.headingLore}>
            Every project is a slain remembrance — a boss defeated, a rune absorbed.
            <br />
            <em>These are the echoes of battles fought between logic and beauty.</em>
          </p>

          {/* Stat row below heading */}
          <div className={styles.headingStats}>
            {[
              { label: "PROJECTS SHIPPED", value: "12+" },
              { label: "TRIALS SURVIVED", value: "40+" },
              { label: "RUNES ABSORBED", value: "∞"   },
            ].map((s) => (
              <div key={s.label} className={styles.headingStat}>
                <span className={styles.headingStatVal}>{s.value}</span>
                <span className={styles.headingStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <RuneDivider />

        {/* ── Project cards ── */}
        <div ref={cardsWrapRef} className={styles.cardsWrap}>
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              isActive={activeCard === i}
              onToggle={() => setActiveCard(activeCard === i ? null : i)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className={styles.bottomCta}>
          <RuneDivider />
          <p className={styles.ctaLore}>
            <em>More remembrances are being forged in the crucible.</em>
          </p>
          <button className={styles.ctaBtn}>
            <span className={styles.ctaBtnGlow} />
            <span className={styles.ctaBtnBorder} />
            <span className={styles.ctaBtnText}>VIEW ALL WORKS</span>
          </button>
        </div>

      </div>
    </section>
  );
}

/* ── PROJECT CARD ──────────────────────────────────── */
function ProjectCard({
  project,
  index,
  isActive,
  onToggle,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const isEven = index % 2 === 0;
  const diffColor = DIFFICULTY_COLORS[project.difficulty] ?? "#888";
  const isInProgress = project.status === "IN PROGRESS";

  return (
    <div
      className={`${styles.projectCard} ${isEven ? styles.cardLeft : styles.cardRight} ${isActive ? styles.cardActive : ""}`}
      onClick={onToggle}
      style={{ "--card-accent": project.accent } as React.CSSProperties}
    >
      {/* Corner ornaments */}
      <span className={styles.cornerTL} />
      <span className={styles.cornerBR} />

      {/* Left — Roman numeral + vertical label */}
      <div className={styles.cardSide}>
        <span className={styles.projectId}>{project.id}</span>
        <div className={styles.verticalLine} />
        <span className={styles.verticalYear}>{project.year}</span>
      </div>

      {/* Main content */}
      <div className={styles.cardBody}>

        <div className={styles.cardTop}>
          <div className={styles.cardTopLeft}>
            <span className={styles.projectCodename}>{project.codename}</span>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <span className={styles.projectSub}>{project.subtitle}</span>
          </div>

          {/* Status badge */}
          <div className={`${styles.statusBadge} ${isInProgress ? styles.statusActive : styles.statusDone}`}>
            {isInProgress ? (
              <span className={styles.statusPulse} />
            ) : (
              <svg viewBox="0 0 12 12" fill="none" width="10">
                <path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span>{project.status}</span>
          </div>
        </div>

        {/* Lore text */}
        <p className={styles.projectLore}>{project.lore}</p>

        {/* Tags */}
        <div className={styles.projectTagList}>
          {project.tags.map((t) => (
            <span key={t} className={styles.projectTag}>{t}</span>
          ))}
        </div>

        {/* Meta row */}
        <div className={styles.projectMeta}>
          <div className={styles.metaSouls}>
            <span className={styles.metaRune}>⚙</span>
            <span className={styles.metaLabel}>{project.stat.label}</span>
            <span className={styles.metaValue}>{project.stat.value}</span>
          </div>

          <div className={styles.metaDifficulty} style={{ color: diffColor }}>
            <span className={styles.metaDiffLabel}>DIFFICULTY</span>
            <span className={styles.metaDiffValue}>{project.difficulty}</span>
          </div>
        </div>

        {/* Expand row */}
        <div className={styles.cardExpand}>
          <span className={styles.expandLine} />
          <span className={styles.expandText}>{isActive ? "CLOSE REMEMBRANCE" : "OPEN REMEMBRANCE"}</span>
          <span className={`${styles.expandChevron} ${isActive ? styles.chevronOpen : ""}`}>
            <svg viewBox="0 0 14 8" fill="none" width="12">
              <path d="M1 1 L7 7 L13 1" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.expandLine} />
        </div>

        {/* Expanded panel */}
        <div className={`${styles.expandPanel} ${isActive ? styles.expandPanelOpen : ""}`}>
          <div className={styles.expandPanelInner}>
            <RemembSeal accent={project.accent} id={project.id} />
            <div className={styles.expandDetails}>
              <p className={styles.expandDetailTitle}>REMEMBRANCE NOTES</p>
              <p className={styles.expandDetailText}>
                Placeholder — add a deeper case study, links, live demo URL,
                GitHub repo, or any additional lore about this project here.
                Each remembrance holds the soul of its challenge.
              </p>
              <div className={styles.expandLinks}>
                <a className={styles.expandLink} href="#">
                  <span className={styles.expandLinkDot} />
                  LIVE REALM
                </a>
                <a className={styles.expandLink} href="#">
                  <span className={styles.expandLinkDot} />
                  SOURCE CODEX
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── REMEMBRANCE SEAL SVG ──────────────────────────── */
function RemembSeal({ accent, id }: { accent: string; id: string }) {
  return (
    <div className={styles.remembSeal}>
      <svg viewBox="0 0 110 110" fill="none" className={styles.remembSealSvg}
        style={{ "--seal-accent": accent } as React.CSSProperties}>
        <circle cx="55" cy="55" r="50" stroke={accent} strokeWidth="1" strokeDasharray="5 7" opacity="0.8" />
        <circle cx="55" cy="55" r="40" stroke={accent} strokeWidth="0.6" opacity="0.4" />
        <polygon
          points="55,18 66,42 92,45 73,64 78,90 55,77 32,90 37,64 18,45 44,42"
          stroke={accent} strokeWidth="1.1" fill="none" opacity="0.85"
        />
        <circle cx="55" cy="55" r="9" fill={accent} opacity="0.25" />
        <circle cx="55" cy="55" r="4" fill={accent} opacity="0.8" />
        <text x="55" y="59" textAnchor="middle"
          fontFamily="'Cinzel Decorative', serif" fontSize="10"
          fill={accent} opacity="0.9">{id}</text>
      </svg>
    </div>
  );
}

/* ── RUNE DIVIDER ──────────────────────────────────── */
function RuneDivider() {
  return (
    <div className={styles.runeDivider}>
      <div className={styles.rdLine} />
      <svg viewBox="0 0 28 28" fill="none" className={styles.rdIcon}>
        <path d="M14 2 L26 14 L14 26 L2 14 Z" stroke="#c8920d" strokeWidth="1.2" fill="none" />
        <path d="M14 8 L20 14 L14 20 L8 14 Z" fill="#c8920d" opacity="0.5" />
        <circle cx="14" cy="14" r="2.5" fill="#e8b030" />
      </svg>
      <div className={styles.rdLine} />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ExperienceSection.module.css";

/* ── DATA ──────────────────────────────────────────────── */

const JOURNEY: {
  id: string;
  era: string;
  role: string;
  place: string;
  type: "grace" | "fog" | "boss";
  duration: string;
  period: string;
  skills: string[];
  lore: string;
  rune: string;
  accolade?: string;
}[] = [
  {
    id: "I",
    era: "THE FIRST GRACE",
    role: "Self-Taught Initiate",
    place: "The Limgrave of Learning",
    type: "grace",
    duration: "1 Year",
    period: "2021 – 2022",
    skills: ["HTML", "CSS", "Vanilla JS", "Git"],
    lore: "The journey began alone, guided only by documentation and the distant glow of Stack Overflow. Every bug was a lesson in patience. Every working render — a victory.",
    rune: "⚙",
    accolade: "FIRST FLAME LIT",
  },
  {
    id: "II",
    era: "THE STORMVEIL TRIAL",
    role: "Junior Developer",
    place: "Placeholder Company / Freelance",
    type: "grace",
    duration: "10 Months",
    period: "2022 – 2023",
    skills: ["React", "Node.js", "REST APIs", "MongoDB"],
    lore: "The first real ordeal. Shipped to production, broke things, fixed things faster. Learned that code in isolation and code under pressure are entirely different beasts.",
    rune: "⚔",
    accolade: "SEAL OF THE BUILDER",
  },
  {
    id: "III",
    era: "THE FOG GATE CROSSING",
    role: "Fullstack Developer",
    place: "Placeholder Studio / Agency",
    type: "fog",
    duration: "8 Months",
    period: "2023",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    lore: "Past the fog gate — complexity multiplied. Systems grew. Deadlines sharpened. The tarnished learned to architect, not just build. The shift toward design began whispering here.",
    rune: "🌫",
  },
  {
    id: "IV",
    era: "THE GREAT RUNE REFORGED",
    role: "UI / UX Developer",
    place: "Placeholder Product Team",
    type: "boss",
    duration: "1 Year",
    period: "2023 – 2024",
    skills: ["Figma", "Design Systems", "GSAP", "Accessibility"],
    lore: "The title changed. The weapon changed. The eye for form and function sharpened into something lethal. Bridging the two worlds — code and design — became the mission.",
    rune: "👁",
    accolade: "GREAT RUNE RESTORED",
  },
  {
    id: "V",
    era: "THE ERDTREE ASCENT",
    role: "Design Engineer",
    place: "Present Journey",
    type: "grace",
    duration: "Ongoing",
    period: "2024 – Present",
    skills: ["Next.js", "Motion Design", "Design Tokens", "Brand Systems"],
    lore: "The current climb. Where no clear path exists — one is carved. Each project now carries both the weight of engineering precision and the light of intentional design.",
    rune: "✦",
    accolade: "ELDEN LORD ASPIRANT",
  },
];

const TYPE_ACCENT: Record<string, string> = {
  grace: "#c8920d",
  fog:   "#7ab8c8",
  boss:  "#c87898",
};

/* ── COMPONENT ─────────────────────────────────────────── */
export default function ExperienceSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLDivElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const pathLineRef  = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const fogTopRef    = useRef<HTMLDivElement>(null);
  const runeWallRef  = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* ── Embers ── */
      const pc = particlesRef.current!;
      for (let i = 0; i < 28; i++) {
        const p = document.createElement("div");
        p.className = styles.ember;
        p.style.left             = `${35 + Math.random() * 30}%`;
        p.style.animationDuration= `${5 + Math.random() * 9}s`;
        p.style.animationDelay   = `${Math.random() * 8}s`;
        const sz = 1 + Math.random() * 2.5;
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
        onEnter: () =>
          gsap.timeline()
            .to(headingRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
            .from(`.${styles.headingChar}`, {
              opacity: 0, y: 28, stagger: 0.032, duration: 0.55, ease: "back.out(1.5)",
            }, "-=0.7"),
      });

      /* ── Path line draw ── */
      gsap.set(pathLineRef.current, { scaleY: 0, transformOrigin: "top center" });
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.4,
        onUpdate: (self) => {
          gsap.set(pathLineRef.current, { scaleY: self.progress });
        },
      });

      /* ── Journey nodes ── */
      const nodes = timelineRef.current?.querySelectorAll(`.${styles.journeyNode}`);
      nodes?.forEach((node, i) => {
        const isLeft = i % 2 === 0;

        gsap.set(node, { opacity: 0, x: isLeft ? -70 : 70, y: 10 });

        ScrollTrigger.create({
          trigger: node,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(node, {
              opacity: 1, x: 0, y: 0,
              duration: 1.05,
              delay: 0.05,
              ease: "power3.out",
            });

            /* Grace orb pulse on enter */
            const orb = node.querySelector(`.${styles.graceOrb}`);
            if (orb) {
              gsap.fromTo(orb,
                { scale: 0.3, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(2)", delay: 0.25 }
              );
            }

            /* Skill tags stagger */
            const tags = node.querySelectorAll(`.${styles.skillTag}`);
            gsap.from(tags, {
              opacity: 0, y: 10, stagger: 0.06, duration: 0.5, delay: 0.4, ease: "power2.out",
            });
          },
        });
      });

      /* ── Rune wall parallax ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom", end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
          if (runeWallRef.current)
            gsap.set(runeWallRef.current, { y: self.progress * -110 });
        },
      });

      /* ── Fog top ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom", end: "30% top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (fogTopRef.current)
            gsap.set(fogTopRef.current, { opacity: 0.75 - self.progress * 0.65 });
        },
      });
    };

    init();
  }, []);

  const TITLE = "THE PATH OF THE TARNISHED";

  return (
    <section ref={sectionRef} className={styles.experience}>

      {/* ── BG ── */}
      <div className={styles.bgBase} />
      <div className={styles.bgRadial} />
      <div className={styles.bgVignette} />
      <div className={styles.bgGrunge} />
      <div className={styles.bgScanlines} />
      <div ref={runeWallRef} className={styles.runeWall} />
      <div ref={fogTopRef} className={styles.fogTop} />
      <div ref={particlesRef} className={styles.particles} />

      <div className={styles.inner}>

        {/* ── Heading ── */}
        <div ref={headingRef} className={styles.headingBlock}>
          <div className={styles.sectionLabel}>
            <span className={styles.labelDash} />
            <span className={styles.labelText}>JOURNEY THROUGH THE LANDS BETWEEN</span>
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
            Each site of grace marks a chapter survived.
            {" "}<em>The path was never straight — but every step was forward.</em>
          </p>
        </div>

        {/* ── Rune divider ── */}
        <RuneDivider />

        {/* ── TIMELINE ── */}
        <div ref={timelineRef} className={styles.timeline}>

          {/* Central path line */}
          <div className={styles.pathTrack}>
            <div ref={pathLineRef} className={styles.pathLine} />
            <div className={styles.pathGlow} />
          </div>

          {/* Journey nodes */}
          {JOURNEY.map((node, i) => {
            const isLeft   = i % 2 === 0;
            const accent   = TYPE_ACCENT[node.type];
            const isActive = activeNode === i;

            return (
              <div
                key={node.id}
                className={`${styles.journeyNode} ${isLeft ? styles.nodeLeft : styles.nodeRight}`}
                style={{ "--node-accent": accent } as React.CSSProperties}
              >
                {/* Card */}
                <div
                  className={`${styles.nodeCard} ${isActive ? styles.nodeCardActive : ""}`}
                  onClick={() => setActiveNode(isActive ? null : i)}
                >
                  {/* Corner cuts */}
                  <span className={styles.cutTL} />
                  <span className={styles.cutBR} />

                  {/* Top row */}
                  <div className={styles.nodeTop}>
                    <div className={styles.nodeTopLeft}>
                      <span className={styles.nodeEra}>{node.era}</span>
                      <h3 className={styles.nodeRole}>{node.role}</h3>
                      <span className={styles.nodePlace}>
                        <span className={styles.placeDash}>—</span>
                        {node.place}
                      </span>
                    </div>
                    <div className={styles.nodeTopRight}>
                      <span className={styles.nodePeriod}>{node.period}</span>
                      <span className={styles.nodeDuration}>{node.duration}</span>
                    </div>
                  </div>

                  {/* Lore */}
                  <p className={styles.nodeLore}>{node.lore}</p>

                  {/* Skills */}
                  <div className={styles.skillList}>
                    {node.skills.map((s) => (
                      <span key={s} className={styles.skillTag}>{s}</span>
                    ))}
                  </div>

                  {/* Accolade */}
                  {node.accolade && (
                    <div className={styles.accolade}>
                      <span className={styles.accoladeDot} />
                      <span className={styles.accoladeText}>{node.accolade}</span>
                    </div>
                  )}

                  {/* Expand hint */}
                  <div className={styles.nodeExpand}>
                    <span className={styles.expandLine} />
                    <span className={styles.expandLabel}>
                      {isActive ? "EXTINGUISH" : "KINDLE GRACE"}
                    </span>
                    <span className={`${styles.expandChevron} ${isActive ? styles.chevronOpen : ""}`}>
                      <svg viewBox="0 0 14 8" fill="none" width="11">
                        <path d="M1 1 L7 7 L13 1" stroke="currentColor"
                          strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={styles.expandLine} />
                  </div>

                  {/* Expanded wisdom panel */}
                  <div className={`${styles.wisdomPanel} ${isActive ? styles.wisdomOpen : ""}`}>
                    <div className={styles.wisdomInner}>
                      <GraceSVG accent={accent} rune={node.rune} id={node.id} />
                      <div className={styles.wisdomText}>
                        <p className={styles.wisdomTitle}>GRACE WISDOM</p>
                        <p className={styles.wisdomBody}>
                          Placeholder — add deeper context about this role here:
                          key achievements, what you built, what you learned,
                          links to work, or testimonials. Every grace holds wisdom
                          for those who rest at it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Centre connector — orb + lines */}
                <div className={styles.connector}>
                  <div className={styles.connectorLine} />
                  <div className={styles.graceOrb} style={{ opacity: 0 }}>
                    <span className={styles.orbRune}>{node.rune}</span>
                    <div className={styles.orbRing} />
                    <div className={styles.orbPulse} />
                  </div>
                  <div className={styles.connectorLine} />
                </div>

                {/* Spacer for opposite side */}
                <div className={styles.nodeSpacer} />
              </div>
            );
          })}

          {/* End node — the present */}
          <div className={styles.journeyEnd}>
            <div className={styles.endOrb}>
              <svg viewBox="0 0 60 60" fill="none" className={styles.endOrbSvg}>
                <circle cx="30" cy="30" r="28" stroke="#e8b030" strokeWidth="1"
                  strokeDasharray="4 5" opacity="0.8" />
                <circle cx="30" cy="30" r="18" stroke="#c8920d" strokeWidth="0.8" opacity="0.5" />
                <circle cx="30" cy="30" r="8"  fill="#e8b030" opacity="0.25" />
                <circle cx="30" cy="30" r="4"  fill="#f4e090" opacity="0.9" />
              </svg>
              <div className={styles.endGlow} />
            </div>
            <span className={styles.endLabel}>JOURNEY CONTINUES</span>
          </div>

        </div>

        {/* ── Bottom divider ── */}
        <RuneDivider />

      </div>
    </section>
  );
}

/* ── GRACE SITE SVG ────────────────────────────────────── */
function GraceSVG({ accent, rune, id }: { accent: string; rune: string; id: string }) {
  return (
    <div className={styles.graceSeal}>
      <svg viewBox="0 0 100 100" fill="none" className={styles.graceSealSvg}
        style={{ "--grace-accent": accent } as React.CSSProperties}>
        <circle cx="50" cy="50" r="46" stroke={accent} strokeWidth="1"
          strokeDasharray="4 6" opacity="0.8" />
        <circle cx="50" cy="50" r="36" stroke={accent} strokeWidth="0.6" opacity="0.4" />
        {[0, 72, 144, 216, 288].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 50 + 36 * Math.sin(rad);
          const y = 50 - 36 * Math.cos(rad);
          return <circle key={a} cx={x} cy={y} r="2.5" fill={accent} opacity="0.65" />;
        })}
        <polygon
          points="50,16 58,36 80,36 63,50 70,72 50,58 30,72 37,50 20,36 42,36"
          stroke={accent} strokeWidth="1" fill="none" opacity="0.7"
        />
        <circle cx="50" cy="50" r="9" fill={accent} opacity="0.2" />
        <text x="50" y="54" textAnchor="middle" fontSize="12" fill={accent} opacity="0.9">{rune}</text>
      </svg>
    </div>
  );
}

/* ── RUNE DIVIDER ──────────────────────────────────────── */
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

import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/hero-pavilion.png";
import aboutImg from "@/assets/about-interior.jpg";
import bRaw from "@/assets/bamboo-raw.jpg";
import bForest from "@/assets/bamboo-forest.jpg";
import bJoint from "@/assets/bamboo-joint.jpg";
import bCeiling from "@/assets/bamboo-ceiling.jpg";
import pPavilion from "@/assets/proj-pavilion.jpg";
import pVilla from "@/assets/proj-villa.jpg";
import pEarth from "@/assets/proj-earth.jpg";
import pMud from "@/assets/proj-mud.jpg";
import pJungle from "@/assets/proj-jungle.jpg";
import pHilltop from "@/assets/proj-hilltop.jpg";
import matBamboo from "@/assets/mat-bamboo.jpg";
import matMud from "@/assets/mat-mud.jpg";
import matRammed from "@/assets/mat-rammed.jpg";

export const Route = createFileRoute("/")({
  component: BaansInfraPage,
});
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
} as const;

function StaggerWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 1.0, ease }}
          className="inline-block mr-[0.22em] pb-[0.1em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2000;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// -------------- NAV --------------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-warm-dark/96 backdrop-blur-md border-b border-gold/20 shadow-[0_4px_40px_rgba(28,23,18,0.35)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-2xl tracking-wide text-gold transition-opacity hover:opacity-80">
          BAANS <span className="font-light">INFRA</span>
        </a>
        <nav className="hidden items-center gap-9 text-sm text-cream md:flex">
          {["Projects", "Process", "Materials", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="relative transition-colors hover:text-gold group"
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-warm-dark transition-all hover:scale-105 hover:shadow-[0_8px_30px_-8px] hover:shadow-gold/60"
        >
          Build With Us
        </a>
      </div>
    </header>
  );
}

// -------------- HERO --------------
function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Star-shaped bamboo pavilion with thatched roof on a circular stone platform"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Layered warm overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-dark/40 via-warm-dark/20 to-warm-dark/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(200,144,58,0.08)_0%,rgba(28,23,18,0.0)_60%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9 }}
          className="label-caps mb-8 text-gold"
        >
          Est. 2009 · India&apos;s Leading Eco Architects
        </motion.p>

        <h1
          className="font-display max-w-5xl text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.95] text-cream"
          style={{ textShadow: "0 2px 40px rgba(28,23,18,0.6)" }}
        >
          <StaggerWords text="Building Luxury" />
          <br />
          <span className="italic text-[#D4A96A]">
            <StaggerWords text="Through Nature" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="label-caps mt-10 max-w-2xl text-cream/80"
        >
          Bamboo Resorts · Bali Villas · Rammed Earth · Mud Architecture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.9 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-warm-dark transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_-10px] hover:shadow-gold/60"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream/70 px-8 py-4 text-sm font-medium tracking-wide text-cream transition-all duration-300 hover:scale-105 hover:bg-cream/10 hover:border-cream"
          >
            Build With Us &rarr;
          </a>
        </motion.div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.3, duration: 0.9 }}
        className="absolute bottom-10 left-6 z-10 hidden rounded-full border border-gold/40 bg-warm-dark/80 px-5 py-3 text-xs text-cream backdrop-blur-md md:flex md:items-center md:gap-2"
      >
        <span className="text-gold">✦</span>
        <span className="label-caps !text-[0.68rem]">200+ Projects Delivered · Pan India</span>
      </motion.div>

      {/* Scroll indicator — clean line only, no overlapping text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="scroll-line relative h-[56px] w-px overflow-hidden" />
      </motion.div>
    </section>
  );
}

// -------------- MARQUEE --------------
function Marquee() {
  const items = [
    "Bamboo Construction",
    "Bali Villas",
    "Mud Architecture",
    "Rammed Earth",
    "Eco Luxury Resorts",
    "Sustainable Design",
    "Nature-First Architecture",
  ];
  const row = [...items, ...items, ...items, ...items];
  return (
    <section className="marquee-wrap overflow-hidden bg-gold py-4 select-none">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="label-caps !text-sm flex items-center gap-8 text-warm-dark"
          >
            <span className="text-warm-dark/50">✦</span>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

// -------------- ABOUT --------------
function About() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="label-caps text-gold">Our Philosophy</p>
          <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-warm-dark">
            Crafted From Earth.
            <br />
            <span className="italic text-clay">Designed for Tomorrow.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-warm-dark/70">
            At Baans Infra, we believe the most luxurious spaces are those that exist in harmony with nature. Every bamboo culm, every rammed earth wall, every mud curve — is a conversation between human craftsmanship and the living earth.
          </p>

          <div className="mt-14 grid grid-cols-2 gap-8">
            {[
              { n: 200, s: "+", l: "Projects Completed" },
              { n: 15, s: "", l: "Years of Expertise" },
              { n: 8, s: "", l: "States Delivered" },
              { n: 100, s: "%", l: "Sustainable Materials" },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                className="border-t border-warm-dark/15 pt-5"
              >
                <div className="font-display text-5xl font-light text-warm-dark">
                  <Counter to={stat.n} suffix={stat.s} />
                </div>
                <p className="label-caps mt-2 text-warm-dark/55">{stat.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Arch-top frame — image fills perfectly */}
          <div
            className="relative h-[640px] w-full overflow-hidden"
            style={{
              borderRadius: "999px 999px 0 0",
              boxShadow: "0 40px 100px -20px rgba(28,23,18,0.28)",
            }}
          >
            <img
              src={aboutImg}
              alt="Warm bamboo interior with golden light"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -------------- WHY BAMBOO --------------
function WhyBamboo() {
  const stats = [
    { big: "3×", title: "Stronger", desc: "than timber by tensile strength" },
    { big: "CO₂", title: "Negative", desc: "absorbs more than it emits" },
    { big: "100", title: "Year Lifespan", desc: "when properly treated" },
  ];
  const circles = [
    { img: bRaw, label: "Raw Material" },
    { img: bForest, label: "Structural Use" },
    { img: bJoint, label: "Joinery" },
    { img: bCeiling, label: "Finishing" },
  ];
  return (
    <section className="bg-warm-dark px-6 py-32 text-cream">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <p className="label-caps text-gold">The Material</p>
          <h2 className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] leading-[1]">
            Why <span className="italic text-tan">Bamboo?</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.14 }}
              className="group rounded-3xl border border-gold/15 bg-cream/[0.04] p-8 transition-all duration-500 hover:border-gold/40 hover:bg-cream/[0.07]"
            >
              <div className="font-display text-6xl font-light text-gold transition-transform duration-500 group-hover:scale-105">{s.big}</div>
              <h3 className="mt-3 font-display text-2xl text-cream">{s.title}</h3>
              <p className="mt-2 text-sm text-cream/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Circle gallery — true square aspect ratio ensures perfect circles */}
        <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {circles.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.14 }}
              className="group flex flex-col items-center"
            >
              {/* aspect-square + overflow-hidden + rounded-full = perfect circle with object-cover */}
              <div className="relative w-full aspect-square overflow-hidden rounded-full ring-1 ring-gold/15 transition-all duration-500 group-hover:ring-4 group-hover:ring-gold/70 group-hover:scale-[1.06]">
                <img
                  src={c.img}
                  alt={c.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="label-caps mt-5 text-cream/65 transition-colors duration-300 group-hover:text-gold">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------- PROJECTS --------------
type Project = { name: string; place: string; type: string; img: string };
const projects: Project[] = [
  { name: "Bamboo Pavilion", place: "Hyderabad", type: "Bamboo Structure", img: pPavilion },
  { name: "The Forest Villa", place: "Coorg, Karnataka", type: "Bali Villa", img: pVilla },
  { name: "Earth Retreat", place: "Auroville", type: "Rammed Earth", img: pEarth },
  { name: "Mud Spa", place: "Rishikesh", type: "Mud Architecture", img: pMud },
  { name: "Jungle Resort", place: "Kerala", type: "Bamboo Resort", img: pJungle },
  { name: "Hilltop Eco Villa", place: "Uttarakhand", type: "Sustainable Villa", img: pHilltop },
];

function ProjectCard({
  p,
  className = "",
  height = "h-[440px]",
  shape = "soft",
  delay = 0,
}: {
  p: Project;
  className?: string;
  height?: string;
  shape?: "soft" | "rect";
  delay?: number;
}) {
  const radius = shape === "soft" ? "40px 40px 0 0" : "16px 16px 0 0";
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.0, delay, ease }}
      className={`group relative block ${className}`}
      style={{ boxShadow: "0 20px 60px rgba(28,23,18,0.12)" }}
    >
      <div className="relative overflow-hidden bg-warm-dark/5" style={{ borderRadius: radius }}>
        <div className={`relative ${height} w-full overflow-hidden`}>
          <img
            src={p.img}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-dark/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="label-caps absolute bottom-6 left-6 translate-y-4 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Project &rarr;
          </span>
        </div>
        <div className="relative bg-cream px-6 py-6">
          <h3 className="font-display text-2xl text-warm-dark">{p.name}</h3>
          <p className="label-caps mt-2 text-gold">
            {p.place} · <span className="text-warm-dark/55">{p.type}</span>
          </p>
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </motion.a>
  );
}

function PillCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.0, delay, ease }}
      className="group relative block"
      style={{ boxShadow: "0 20px 60px rgba(28,23,18,0.12)" }}
    >
      {/* overflow-hidden + border-radius on the wrapper, absolute img inside */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: "999px", height: "520px" }}
      >
        <img
          src={p.img}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-dark/72 via-warm-dark/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-14 px-8 text-cream">
          <h3 className="font-display text-2xl">{p.name}</h3>
          <p className="label-caps mt-2 text-gold">
            {p.place} · <span className="text-cream/60">{p.type}</span>
          </p>
        </div>
      </div>
    </motion.a>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="label-caps text-gold">Selected Works</p>
            <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-warm-dark">
              Projects That <span className="italic text-clay">Speak</span>
            </h2>
          </div>
          <p className="max-w-sm text-warm-dark/65">
            Six recent works across India — pavilions, villas, retreats and resorts crafted from living materials.
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <ProjectCard p={projects[0]} className="lg:col-span-3" height="h-[520px]" shape="soft" delay={0} />
          <div className="lg:col-span-2">
            <PillCard p={projects[1]} delay={0.13} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <ProjectCard p={projects[2]} delay={0} />
          <ProjectCard p={projects[3]} delay={0.12} />
          <ProjectCard p={projects[4]} delay={0.24} />
        </div>

        {/* Row 3 */}
        <div className="mt-8">
          <ProjectCard p={projects[5]} height="h-[420px]" shape="rect" delay={0} />
        </div>
      </div>
    </section>
  );
}

// -------------- MATERIALS --------------
function Materials() {
  const cards = [
    {
      title: "Bamboo",
      img: matBamboo,
      tag: "The Steel of Nature",
      desc: "Living strength — hollow, light, infinitely formable.",
    },
    {
      title: "Mud",
      img: matMud,
      tag: "Earth's First Architecture",
      desc: "Hand-shaped, breathing walls that cool and calm.",
    },
    {
      title: "Rammed Earth",
      img: matRammed,
      tag: "Walls That Last Centuries",
      desc: "Layered earth, compressed time — monumental and quiet.",
    },
  ];
  return (
    <section id="materials" className="bg-cream-deep px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl">
          <p className="label-caps text-gold">What We Build With</p>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-warm-dark">
            Our <span className="italic text-clay">Materials</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, delay: i * 0.15 }}
              whileHover={{ rotate: 1.5, scale: 1.03 }}
              className="group relative cursor-pointer"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Pill card — absolute positioned image fills the oval perfectly */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "999px",
                  height: "560px",
                  boxShadow: "0 30px 80px -20px rgba(28,23,18,0.25)",
                }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/88 via-warm-dark/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10 text-cream">
                  <p className="label-caps text-gold">{c.tag}</p>
                  <h3 className="font-display mt-3 text-4xl">{c.title}</h3>
                  <p className="mt-3 text-sm text-cream/75 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------- PROCESS --------------
const steps = [
  { n: "01", name: "Vision & Discovery", desc: "We begin with listening. Understanding the land, the client's dream, and the natural surroundings before a single line is drawn." },
  { n: "02", name: "Concept & Design", desc: "Crafting an architectural language drawn from the site — its light, its winds, its silences." },
  { n: "03", name: "Material Sourcing", desc: "Ethically sourced bamboo, earth and stone — traced from grove to ground." },
  { n: "04", name: "Construction", desc: "Skilled artisan hands meet modern precision. Every joint, every wall is signed by craft." },
  { n: "05", name: "Handover & Legacy", desc: "A space that grows more beautiful with time — weathered, lived-in, loved." },
];

function Process() {
  const [active, setActive] = useState(0);
  return (
    <section id="process" className="bg-warm-dark px-6 py-32 text-cream">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl">
          <p className="label-caps text-gold">How We Build</p>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]">
            Our <span className="italic text-tan">Process</span>
          </h2>
        </motion.div>

        {/* Step bar */}
        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-6 h-px bg-cream/12" />
          <motion.div
            className="absolute left-0 top-6 h-px bg-gold"
            animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.7, ease }}
          />
          <div className="relative flex justify-between">
            {steps.map((s, i) => (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                    i <= active
                      ? "border-gold bg-gold text-warm-dark"
                      : "border-cream/25 bg-warm-dark text-cream/55 group-hover:border-gold/50"
                  }`}
                >
                  <span className="label-caps !text-[0.7rem]">{s.n}</span>
                </span>
                <span
                  className={`label-caps !text-[0.6rem] hidden md:block transition-colors duration-300 ${
                    i === active ? "text-gold" : "text-cream/40"
                  }`}
                >
                  {s.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="relative mt-16 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease }}
              className="grid grid-cols-1 gap-12 md:grid-cols-12"
            >
              <div className="md:col-span-7">
                <p className="font-display text-[clamp(8rem,18vw,16rem)] font-light leading-none text-cream/[0.06] select-none">
                  {steps[active].n}
                </p>
                <p className="label-caps -mt-6 text-gold">Step {steps[active].n}</p>
                <h3 className="font-display mt-3 text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]">
                  {steps[active].name}
                </h3>
                <p className="mt-6 max-w-xl text-lg text-cream/70 leading-relaxed">{steps[active].desc}</p>
              </div>

              <div className="flex flex-col items-end justify-between md:col-span-5">
                <svg viewBox="0 0 200 200" className="h-48 w-48 text-gold/60">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M30 100 Q100 30 170 100 Q100 170 30 100" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.6" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.6" />
                </svg>
                <button
                  onClick={() => setActive((a) => (a + 1) % steps.length)}
                  className="label-caps mt-6 inline-flex items-center gap-3 text-cream/60 transition-all duration-300 hover:text-gold hover:gap-4"
                >
                  Next Step <span aria-hidden>&#8594;</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// -------------- TESTIMONIALS --------------
const tlist = [
  { q: "BAANS INFRA transformed a barren hillside into our dream resort. Every bamboo joint feels like art.", n: "Rajesh Menon", p: "Forest Retreat, Coorg" },
  { q: "The rammed earth walls they built have become the soul of our spa. Guests never want to leave.", n: "Priya Nair", p: "Ayurveda Spa, Kerala" },
  { q: "Working with Baans was like working with nature itself. The bamboo villa they built is timeless.", n: "Arjun Sharma", p: "Eco Villa, Goa" },
];

function Testimonials() {
  return (
    <section className="bg-cream px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="max-w-3xl">
          <p className="label-caps text-gold">What Clients Say</p>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-warm-dark">
            Stories of <span className="italic text-clay">Trust</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tlist.map((t, i) => (
            <motion.figure
              key={t.n}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, delay: i * 0.16 }}
              className="group rounded-[40px] bg-cream-deep p-10 transition-all duration-500 hover:-translate-y-2"
              style={{ boxShadow: "0 30px 70px -25px rgba(28,23,18,0.18)" }}
            >
              <div className="font-display text-7xl leading-none text-gold">&#8220;</div>
              <blockquote className="font-display mt-2 text-xl italic leading-snug text-warm-dark">
                {t.q}
              </blockquote>
              <div className="mt-8 h-px w-12 bg-warm-dark/20 transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
              <figcaption className="mt-6">
                <p className="font-medium text-warm-dark">{t.n}</p>
                <p className="label-caps mt-1 text-gold">{t.p}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------- CONTACT --------------
function FloatField({ id, label, type }: { id: string; label: string; type: string }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const float = focused || val.length > 0;
  const common = {
    id,
    value: val,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "w-full border-0 border-b border-cream/25 bg-transparent py-3 text-cream outline-none transition-colors duration-300 focus:border-gold",
  };
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`label-caps absolute left-0 transition-all duration-300 ${
          float ? "top-0 !text-[0.6rem] text-gold" : "top-9 text-cream/50"
        }`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea rows={3} {...(common as any)} className={`${common.className} resize-none mt-6`} />
      ) : (
        <input type={type} {...(common as any)} className={`${common.className} mt-6`} />
      )}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-warm-dark px-6 pt-32 text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <p className="label-caps text-gold">Get In Touch</p>
          <h2 className="font-display mt-5 text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]">
            Let&apos;s Build
            <br />
            Something
            <br />
            <span className="italic text-tan">Timeless.</span>
          </h2>
          <p className="mt-8 max-w-md text-lg text-cream/70 leading-relaxed">
            Whether it&apos;s a bamboo resort, a rammed earth villa, or a mud sanctuary — we build with nature, for life.
          </p>

          <ul className="mt-12 space-y-5 text-cream/75">
            {[
              { icon: "◉", text: "India · Pan-India Projects" },
              { icon: "◉", text: "@baansinfra · 22K Followers" },
              { icon: "◉", text: "hello@baansinfra.com" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3 transition-colors hover:text-cream">
                <span className="text-gold">{item.icon}</span> {item.text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0 }}
          className="space-y-8"
        >
          <FloatField id="name" label="Name" type="text" />
          <FloatField id="contact-field" label="Email / Phone" type="text" />

          <div className="relative">
            <label className="label-caps text-cream/50">Project Type</label>
            <select
              className="mt-3 w-full appearance-none border-0 border-b border-cream/25 bg-transparent py-3 text-cream outline-none transition-colors focus:border-gold"
              defaultValue=""
            >
              <option value="" disabled className="bg-warm-dark">Select&hellip;</option>
              {["Resort", "Villa", "Spa", "Commercial", "Other"].map((o) => (
                <option key={o} className="bg-warm-dark">{o}</option>
              ))}
            </select>
          </div>

          <FloatField id="dream" label="Tell us your dream" type="textarea" />

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-full bg-gold py-4 text-sm font-medium tracking-wider text-warm-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_-10px] hover:shadow-gold/50"
          >
            <span className="label-caps">Start Building &#8594;</span>
          </button>
        </motion.form>
      </div>

      <footer className="mx-auto mt-32 flex max-w-7xl flex-col items-center gap-4 border-t border-cream/10 py-8 text-xs text-cream/45 md:flex-row md:justify-between">
        <p>&copy; 2025 BAANS INFRA &middot; All Rights Reserved</p>
        <span className="text-gold">— ✦ —</span>
        <p>Designed with <span className="text-forest">🌿</span> Nature</p>
      </footer>
    </section>
  );
}

// -------------- PAGE --------------
function BaansInfraPage() {
  return (
    <main className="bg-cream text-warm-dark">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <WhyBamboo />
      <Projects />
      <Materials />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}

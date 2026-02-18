import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend',
    skills: 'React, Redux, TypeScript, Angular',
  },
  {
    title: 'Backend',
    skills: 'Java, Spring Boot, Node.js, C#',
  },
  {
    title: 'Databases',
    skills: 'PostgreSQL, MongoDB, Elasticsearch',
  },
  {
    title: 'DevOps',
    skills: 'Docker, Kubernetes, Azure, GCP',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { y: '40vh', rotateX: 45, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, ease: 'none' },
        0
      );

      // Label
      scrollTl.fromTo(
        labelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Right image card
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', rotateY: -35, scale: 0.92, opacity: 0 },
        { x: 0, rotateY: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Skill categories
      scrollTl.fromTo(
        categoriesRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '18vw', scale: 0.94, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        categoriesRef.current,
        { y: 0, opacity: 1 },
        { y: 30, opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = ['REACT', 'TYPESCRIPT', 'JAVA', 'SPRING BOOT'];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-pinned bg-primary-light flex items-center justify-center"
    >
      {/* Top-left Label */}
      <div
        ref={labelRef}
        className="absolute micro-label text-secondary-muted"
        style={{
          left: '6vw',
          top: '8vh',
        }}
      >
        TECHNICAL SKILLS
      </div>

      {/* Main Headline */}
      <div
        ref={headlineRef}
        className="absolute flex flex-col"
        style={{
          left: '6vw',
          top: '18vh',
          width: '62vw',
          perspective: '1000px',
        }}
      >
        {headlineWords.map((word, i) => (
          <div
            key={i}
            className={`headline-xl ${
              i === 1 ? 'text-accent' : 'text-primary-dark'
            }`}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Right Image Card */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          right: '6vw',
          top: '12vh',
          width: '28vw',
          height: '76vh',
          perspective: '1000px',
        }}
      >
        <img
          src="/images/skills_code.jpg"
          alt="Code"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Skill Categories */}
      <div
        ref={categoriesRef}
        className="absolute grid grid-cols-4 gap-8"
        style={{
          left: '6vw',
          right: '6vw',
          top: '72vh',
        }}
      >
        {skillCategories.map((category, i) => (
          <div key={i} className="flex flex-col">
            <span className="micro-label text-secondary-muted mb-3">
              {category.title}
            </span>
            <span className="text-sm text-primary-dark leading-relaxed">
              {category.skills}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

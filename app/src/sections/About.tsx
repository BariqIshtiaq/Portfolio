import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
      // Left image card
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', rotateY: 35, scale: 0.92, opacity: 0 },
        { x: 0, rotateY: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Section label
      scrollTl.fromTo(
        labelRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Heading
      scrollTl.fromTo(
        headingRef.current,
        { x: '18vw', rotateZ: 2, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Body paragraph
      scrollTl.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Stats row
      scrollTl.fromTo(
        statsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%) - elements hold position

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, rotateY: 0, scale: 1, opacity: 1 },
        { x: '-18vw', rotateY: -10, scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headingRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: 12, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        statsRef.current,
        { y: 0, opacity: 1 },
        { y: 20, opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-primary-light flex items-center justify-center"
    >
      {/* Left Media Card */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          left: '6vw',
          top: '12vh',
          width: '40vw',
          height: '76vh',
          perspective: '1000px',
        }}
      >
        <img
          src="/images/about_workspace.jpg"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content Block */}
      <div
        className="absolute"
        style={{
          left: '52vw',
          top: '14vh',
          width: '42vw',
        }}
      >
        {/* Section Label */}
        <div ref={labelRef} className="micro-label text-secondary-muted mb-6">
          ABOUT
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="headline-lg text-primary-dark mb-8"
          style={{ perspective: '1000px' }}
        >
          Building <span className="text-accent">scalable systems</span> with modern technologies
        </h2>

        {/* Body Paragraph */}
        <p
          ref={bodyRef}
          className="text-lg text-secondary-muted leading-relaxed max-w-xl"
        >
          I'm a full-stack developer focused on clean architecture, type-safe frontends, 
          and reliable backend services. I work across React, TypeScript, Java, and 
          cloud-native tooling to ship features end to end.
        </p>

        {/* Stats Row (moved inside content so it flows below the paragraph) */}
        <div
          ref={statsRef}
          className="mt-6 flex gap-12"
        >
          <div className="flex flex-col">
            <span className="headline-lg text-accent">2+</span>
            <span className="micro-label text-secondary-muted mt-2">YEARS</span>
          </div>
          <div className="flex flex-col">
            <span className="headline-lg text-primary-dark">10+</span>
            <span className="micro-label text-secondary-muted mt-2">PROJECTS</span>
          </div>
          <div className="flex flex-col">
            <span className="headline-lg text-primary-dark">Full</span>
            <span className="micro-label text-secondary-muted mt-2">STACK</span>
          </div>
        </div>
      </div>
      
    </section>
  );
}

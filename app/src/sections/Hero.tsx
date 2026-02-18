import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Portrait entrance
      loadTl.fromTo(
        portraitRef.current,
        { x: '40vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 1.1 },
        0
      );

      // Headline words entrance
      headlineRefs.current.forEach((ref, i) => {
        if (ref) {
          loadTl.fromTo(
            ref,
            { y: 60, rotateX: 25, opacity: 0 },
            { y: 0, rotateX: 0, opacity: 1, duration: 0.8 },
            0.1 + i * 0.06
          );
        }
      });

      // Subheadline entrance
      loadTl.fromTo(
        subheadRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      // CTA buttons entrance
      loadTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.58
      );

      // Micro label entrance
      loadTl.fromTo(
        microLabelRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        0.4
      );

      // Scroll-driven exit animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(portraitRef.current, { x: 0, y: 0, scale: 1, opacity: 1 });
            headlineRefs.current.forEach((ref) => {
              if (ref) gsap.set(ref, { x: 0, opacity: 1 });
            });
            gsap.set(subheadRef.current, { y: 0, opacity: 1 });
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
            gsap.set(microLabelRef.current, { x: 0, opacity: 1 });
          },
        },
      });

      // EXIT phase (70-100%)
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '18vw', y: '10vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      headlineRefs.current.forEach((ref) => {
        if (ref) {
          scrollTl.fromTo(
            ref,
            { x: 0, opacity: 1 },
            { x: '-18vw', opacity: 0, ease: 'power2.in' },
            0.7
          );
        }
      });

      scrollTl.fromTo(
        subheadRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        microLabelRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineLines = ['BARIQ', 'ISHTIAQ', 'FULL-STACK', 'DEVELOPER'];

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-primary-light flex items-center justify-center"
    >
      {/* Portrait Card */}
      <div
        ref={portraitRef}
        className="image-card absolute"
        style={{
          right: '6vw',
          top: '10vh',
          width: '34vw',
          height: '80vh',
        }}
      >
        <img
          src="/images/hero_portrait.PNG"
          alt="Bariq Ishtiaq"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline Block */}
      <div
        className="absolute flex flex-col"
        style={{
          left: '6vw',
          top: '18vh',
          width: '46vw',
        }}
      >
        {headlineLines.map((line, i) => (
          <div
            key={i}
            ref={(el) => { headlineRefs.current[i] = el; }}
            className={`headline-xl ${
              i === 3 ? 'text-accent' : 'text-primary-dark'
            }`}
            style={{ perspective: '1000px' }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Subheadline */}
      <div
        ref={subheadRef}
        className="absolute"
        style={{
          left: '6vw',
          top: '72vh',
          width: '34vw',
        }}
      >
        <p className="text-lg md:text-xl text-secondary-muted font-medium">
          React • TypeScript • Java • Spring Boot
        </p>
      </div>

      {/* CTA Row */}
      <div
        ref={ctaRef}
        className="absolute flex gap-4"
        style={{
          left: '6vw',
          top: '82vh',
        }}
      >
        <button onClick={scrollToWork} className="btn-primary flex items-center gap-2">
          View Work
          <ArrowDown size={18} />
        </button>
        <button onClick={scrollToContact} className="btn-secondary flex items-center gap-2">
          Contact Me
          <Mail size={18} />
        </button>
      </div>

      {/* Vertical Micro Label */}
      <div
        ref={microLabelRef}
        className="absolute micro-label text-secondary-muted"
        style={{
          left: '2.2vw',
          top: '50vh',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'left center',
        }}
      >
        BASED IN MONTREAL
      </div>
    </section>
  );
}

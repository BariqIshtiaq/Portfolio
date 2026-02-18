import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const degrees = [
  {
    title: 'Master of Engineering — Software Engineering',
    school: 'Concordia University',
    period: '2022–2023',
  },
  {
    title: 'Bachelor of Engineering — Computer Science',
    school: 'Osmania University',
    period: '2016–2020',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const degreesRef = useRef<HTMLDivElement>(null);

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
        { x: '-40vw', rotateZ: -3, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right image card
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', rotateY: -35, scale: 0.92, opacity: 0 },
        { x: 0, rotateY: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Degree entries
      scrollTl.fromTo(
        degreesRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '18vw', scale: 0.94, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        degreesRef.current,
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
      id="education"
      className="section-pinned bg-primary-light flex items-center justify-center"
    >
      {/* Left Headline */}
      <div
        ref={headlineRef}
        className="absolute"
        style={{
          left: '6vw',
          top: '18vh',
          width: '46vw',
          perspective: '1000px',
        }}
      >
        <div className="headline-lg text-primary-dark">
          <span className="text-accent">EDU</span>CATION
        </div>
      </div>

      {/* Right Image Card */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          right: '6vw',
          top: '12vh',
          width: '40vw',
          height: '76vh',
          perspective: '1000px',
        }}
      >
        <img
          src="/images/education_campus.jpg"
          alt="Education"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Degrees List */}
      <div
        ref={degreesRef}
        className="absolute flex flex-col gap-8"
        style={{
          left: '6vw',
          top: '44vh',
          width: '40vw',
        }}
      >
        {degrees.map((degree, i) => (
          <div key={i} className="flex flex-col">
            <h3 className="text-lg font-semibold text-primary-dark mb-1">
              {degree.title}
            </h3>
            <p className="text-sm text-secondary-muted">
              {degree.school}, {degree.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

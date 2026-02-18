import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Thermal Control Systems',
    description: 'React + TypeScript frontend for industrial IoT dashboards.',
  },
  {
    title: 'Order Processing Platform',
    description: 'Full-stack feature delivery with C#/.NET backend.',
  },
  {
    title: 'Real-Time Data APIs',
    description: 'Spring Boot + MongoDB services for high-throughput ingestion.',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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
        { x: '-70vw', rotateY: 45, scale: 0.9, opacity: 0 },
        { x: 0, rotateY: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', rotateZ: 3, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'none' },
        0
      );

      // Project list
      scrollTl.fromTo(
        projectsRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, rotateY: 0, scale: 1, opacity: 1 },
        { x: '-18vw', rotateY: 10, scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        projectsRef.current,
        { y: 0, opacity: 1 },
        { y: 18, opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pinned bg-primary-light flex items-center justify-center"
    >
      {/* Left Image Card */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          left: '6vw',
          top: '12vh',
          width: '44vw',
          height: '76vh',
          perspective: '1000px',
        }}
      >
        <img
          src="/images/work_project.jpg"
          alt="Projects"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Headline */}
      <div
        ref={headlineRef}
        className="absolute flex flex-col"
        style={{
          left: '54vw',
          top: '16vh',
          width: '40vw',
          perspective: '1000px',
        }}
      >
        <div className="headline-lg text-primary-dark">SELECTED</div>
        <div className="headline-lg text-accent">WORK</div>
      </div>

      {/* Project List */}
      <div
        ref={projectsRef}
        className="absolute flex flex-col gap-6"
        style={{
          left: '54vw',
          top: '46vh',
          width: '40vw',
        }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="group cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-primary-dark mb-1 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-secondary-muted">
              {project.description}
            </p>
          </div>
        ))}

        {/* GitHub CTA */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 mt-4 w-fit"
        >
          <Github size={18} />
          View GitHub
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}

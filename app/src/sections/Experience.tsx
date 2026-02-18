import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Software Developer',
    company: 'Neptronic',
    location: 'Montreal, Canada',
    period: 'Feb 2024 – Present',
    points: [
      'Developed user-facing features for thermal control systems using React with TypeScript',
      'Managed complex application state using Redux and Context API',
      'Engineered scalable backend microservices using Spring Boot and ASP.NET',
      'Implemented form validations and dynamic pricing rules',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Neptronic',
    location: 'Montreal, Canada',
    period: 'May 2023 – Jan 2024',
    points: [
      'Built full-stack features with React.js frontend and C#/.NET backend',
      'Implemented order processing logic with inventory checks and discount rules',
      'Collaborated in Agile sprints and designed scalable RESTful APIs',
      'Contributed to testing suite using Jest and Cypress',
    ],
  },
  {
    role: 'Junior Software Developer',
    company: 'Rishjay Technologies',
    location: 'Hyderabad, India',
    period: 'Dec 2020 – Jul 2021',
    points: [
      'Developed RESTful APIs using Spring Boot with MongoDB integration',
      'Leveraged Java 8 features for improved code efficiency',
      'Designed SOAP web services and implemented Hibernate ORM',
      'Enhanced frontend using AngularJS, improving UI responsiveness by 25%',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Rishjay Technologies',
    location: 'Hyderabad, India',
    period: 'Feb 2020 – Oct 2020',
    points: [
      'Assisted in Spring Boot application development',
      'Optimized MySQL database queries and performance',
      'Wrote JUnit test cases, reducing post-deployment bugs by 20%',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Intro animation
      gsap.fromTo(
        introRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Timeline items animation
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { x: '-8vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 55%',
                scrub: true,
              },
            }
          );
        }
      });

      // Background line parallax
      gsap.fromTo(
        lineRef.current,
        { y: 0 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-flowing bg-primary-light py-24 md:py-32"
    >
      {/* Background line */}
      <div
        ref={lineRef}
        className="absolute left-[6vw] top-0 w-px hairline"
        style={{ height: '100%' }}
      />

      <div className="px-[6vw]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="headline-lg text-primary-dark mb-6"
        >
          EXPERIENCE
        </h2>

        {/* Intro */}
        <p
          ref={introRef}
          className="text-lg text-secondary-muted max-w-2xl mb-16"
        >
          A track record of shipping features across startups and established teams.
        </p>

        {/* Timeline */}
        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8"
            >
              {/* Date */}
              <div className="micro-label text-secondary-muted">
                {exp.period}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-1">
                  {exp.role}
                </h3>
                <p className="text-sm text-secondary-muted mb-4">
                  {exp.company} — {exp.location}
                </p>
                <ul className="flex flex-col gap-2">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="text-sm text-primary-dark leading-relaxed pl-4 relative"
                    >
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

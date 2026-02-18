import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 60, rotateX: 30, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: '-10vw', scale: 0.96, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Contact details animation
      gsap.fromTo(
        contactRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            end: 'top 55%',
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
      id="contact"
      className="section-flowing bg-primary-dark py-24 md:py-32 min-h-screen"
    >
      <div className="relative px-[6vw]">
        {/* Left Image Card */}
        <div
          ref={imageRef}
          className="image-card absolute hidden md:block"
          style={{
            left: '6vw',
            top: '14vh',
            width: '40vw',
            height: '72vh',
          }}
        >
          <img
            src="/images/contact_portrait.jpg"
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div
          className="md:ml-[50vw]"
          style={{
            paddingTop: '18vh',
          }}
        >
          {/* Heading */}
          <div
            ref={headingRef}
            className="flex flex-col mb-12"
            style={{ perspective: '1000px' }}
          >
            <div className="headline-lg text-primary-light">LET'S</div>
            <div className="headline-lg text-accent">WORK</div>
            <div className="headline-lg text-primary-light">TOGETHER</div>
          </div>

          {/* Contact Details */}
          <div ref={contactRef} className="flex flex-col gap-6">
            <a
              href="mailto:Bariqishtiaq20@gmail.com"
              className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors group"
            >
              <Mail size={20} className="text-accent" />
              <span className="text-lg">Bariqishtiaq20@gmail.com</span>
            </a>

            <a
              href="tel:+15149728755"
              className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors group"
            >
              <Phone size={20} className="text-accent" />
              <span className="text-lg">(514)-972-8755</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors group"
            >
              <Linkedin size={20} className="text-accent" />
              <span className="text-lg">LinkedIn</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary-light hover:text-accent transition-colors group"
            >
              <Github size={20} className="text-accent" />
              <span className="text-lg">GitHub</span>
            </a>

            {/* CTA Button */}
            <a
              href="mailto:Bariqishtiaq20@gmail.com"
              className="btn-primary flex items-center gap-2 mt-6 w-fit"
            >
              <Send size={18} />
              Send Email
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 px-[6vw]">
        <div className="hairline mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="micro-label text-secondary-muted">
            © 2024 Bariq Ishtiaq. All rights reserved.
          </span>
          <span className="micro-label text-secondary-muted">
            Built with React + TypeScript + GSAP
          </span>
        </div>
      </div>
    </section>
  );
}

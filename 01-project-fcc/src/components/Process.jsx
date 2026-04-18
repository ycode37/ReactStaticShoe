import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const process = [
  {
    step: '01',
    title: 'Material Selection',
    desc: 'We source only the finest materials — recycled ocean plastics, aerospace-grade carbon fiber, and bio-engineered leathers.',
    accent: '#ff2d46',
  },
  {
    step: '02',
    title: 'Digital Sculpting',
    desc: 'Our design team uses AI-assisted 3D modeling to perfect every curve and contour before a single prototype is made.',
    accent: '#8b5cf6',
  },
  {
    step: '03',
    title: 'Precision Assembly',
    desc: 'Each pair passes through 47 quality checkpoints. Hand-finished details meet machine-perfect construction.',
    accent: '#06b6d4',
  },
  {
    step: '04',
    title: 'Performance Testing',
    desc: '500+ hours of real-world testing with professional athletes across 12 different sports and environments.',
    accent: '#22c55e',
  },
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Label
      gsap.fromTo('.proc-label',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.proc-label', start: 'top 85%' }
        }
      );

      // Title
      gsap.fromTo('.proc-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.proc-title', start: 'top 85%' }
        }
      );

      // Timeline line draw
      gsap.fromTo('.proc-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: '.proc-timeline',
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 1,
          }
        }
      );

      // Steps stagger
      const steps = gsap.utils.toArray('.proc-step');
      steps.forEach((step, i) => {
        const direction = i % 2 === 0 ? -1 : 1;

        gsap.fromTo(step,
          { x: 60 * direction, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 82%',
            }
          }
        );

        // Dot pulse
        const dot = step.querySelector('.proc-dot');
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Label */}
        <div className="proc-label flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
          <div className="w-12 h-[1px] bg-[#ff2d46]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff2d46] font-medium"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Our Process
          </span>
        </div>

        <h2 className="proc-title display-text text-4xl md:text-5xl lg:text-6xl mb-20 max-w-3xl" style={{ opacity: 0 }}>
          From concept to <span className="text-[#ff2d46]">creation</span>
        </h2>

        {/* Timeline */}
        <div className="proc-timeline relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-[0.5px]">
            <div className="proc-line w-full h-full bg-gradient-to-b from-[#ff2d46] via-[#8b5cf6] via-[#06b6d4] to-[#22c55e]"
                 style={{ transform: 'scaleY(0)' }} />
          </div>

          {/* Steps */}
          <div className="space-y-20">
            {process.map((item, i) => (
              <div
                key={i}
                className={`proc-step relative flex items-start gap-8 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ opacity: 0 }}
              >
                {/* Content card */}
                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                  <div className="glass-card p-8 relative group">
                    <span className="text-5xl font-bold block mb-3 opacity-10"
                          style={{ fontFamily: 'Space Grotesk, sans-serif', color: item.accent }}>
                      {item.step}
                    </span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff2d46] transition-colors duration-300"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {item.title}
                    </h3>
                    <p className="body-text text-sm">{item.desc}</p>

                    {/* Accent line */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                         style={{ background: item.accent }} />
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2">
                  <div className="proc-dot w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                       style={{ background: item.accent, transform: 'scale(0)', boxShadow: `0 0 20px ${item.accent}66` }}>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

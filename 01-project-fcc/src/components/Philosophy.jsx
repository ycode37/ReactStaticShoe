import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Pinned text reveal
      const lines = gsap.utils.toArray('.philo-word');
      lines.forEach((word, i) => {
        gsap.fromTo(word,
          { opacity: 0.1 },
          {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: word,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true,
            }
          }
        );
      });

      // Side label
      gsap.fromTo('.philo-label',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.philo-label', start: 'top 85%' }
        }
      );

      // Large quote mark
      gsap.fromTo('.philo-quote',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 0.03,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.philo-quote', start: 'top 80%' }
        }
      );

      // Bottom details
      gsap.fromTo('.philo-detail',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: '.philo-details', start: 'top 85%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "We believe that every step you take should feel like a statement. Not just of style, but of intent. Of refusing to settle. Of demanding more from every moment, every surface, every stride. This is what drives us. This is SOLEX.";
  const words = text.split(' ');

  return (
    <section ref={sectionRef} className="section-padding relative noise-overlay overflow-hidden">
      {/* Giant quote mark */}
      <div className="philo-quote absolute top-20 left-10 text-white pointer-events-none select-none"
           style={{
             fontFamily: 'Georgia, serif',
             fontSize: 'clamp(15rem, 30vw, 30rem)',
             lineHeight: 0.8,
             opacity: 0,
           }}>
        "
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Label */}
        <div className="philo-label flex items-center gap-4 mb-20" style={{ opacity: 0 }}>
          <div className="w-12 h-[1px] bg-[#ff2d46]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff2d46] font-medium"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Philosophy
          </span>
        </div>

        {/* Word-by-word reveal paragraph */}
        <p className="display-text text-3xl md:text-4xl lg:text-5xl leading-tight max-w-5xl mb-20"
           style={{ lineHeight: 1.3 }}>
          {words.map((word, i) => (
            <span key={i} className="philo-word inline-block mr-[0.3em]" style={{ opacity: 0.1 }}>
              {word}
            </span>
          ))}
        </p>

        {/* Bottom details */}
        <div className="philo-details grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'Relentless Innovation',
              desc: 'Every collection pushes the boundary of material science and design engineering.',
            },
            {
              num: '02',
              title: 'Sustainable by Design',
              desc: 'We design products that respect the planet without compromising on performance.',
            },
            {
              num: '03',
              title: 'Community First',
              desc: 'Our designs are shaped by the athletes, creators, and dreamers who wear them.',
            },
          ].map((item, i) => (
            <div key={i} className="philo-detail border-t border-[rgba(255,255,255,0.06)] pt-6" style={{ opacity: 0 }}>
              <span className="text-xs text-[#ff2d46] font-bold mb-3 block"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.num}
              </span>
              <h4 className="text-lg font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.title}
              </h4>
              <p className="body-text text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;

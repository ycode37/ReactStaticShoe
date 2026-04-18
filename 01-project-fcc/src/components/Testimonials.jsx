import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Professional Runner',
    text: 'The VELOCITY X changed my running game completely. I shaved 12 seconds off my personal best within the first week. The energy return is unreal.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    role: 'Fashion Editor, Vogue',
    text: 'SOLEX has managed what few brands have — creating shoes that are both functionally superior and aesthetically groundbreaking. Pure design excellence.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Streetwear Designer',
    text: 'I\'ve worn every major sneaker brand over the past decade. SOLEX sits in a category of its own. The attention to detail is obsessive — in the best way.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Label
      gsap.fromTo('.test-label',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.test-label', start: 'top 85%' }
        }
      );

      // Title
      gsap.fromTo('.test-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.test-title', start: 'top 85%' }
        }
      );

      // Cards stagger from different directions
      const cards = gsap.utils.toArray('.test-card');
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(card,
          { x: 80 * direction, opacity: 0, rotate: 3 * direction },
          {
            x: 0, opacity: 1, rotate: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }
          }
        );
      });

      // Quote marks scale
      gsap.utils.toArray('.quote-mark').forEach((mark) => {
        gsap.fromTo(mark,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 0.05,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: mark, start: 'top 85%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Label */}
        <div className="test-label flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
          <div className="w-12 h-[1px] bg-[#ff2d46]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff2d46] font-medium"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Testimonials
          </span>
        </div>

        <h2 className="test-title display-text text-4xl md:text-5xl lg:text-6xl mb-16 max-w-3xl" style={{ opacity: 0 }}>
          What people are <span className="text-[#ff2d46]">saying</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card glass-card p-8 relative overflow-hidden group"
              style={{ opacity: 0 }}
            >
              {/* Giant quote mark */}
              <div className="quote-mark absolute top-4 right-4 text-[8rem] leading-none text-white pointer-events-none select-none"
                   style={{ fontFamily: 'Georgia, serif', opacity: 0 }}>
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} className="text-[#ff2d46] text-sm">★</span>
                ))}
              </div>

              <p className="body-text text-sm leading-relaxed mb-8 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff2d46] to-[#ff6b7a] flex items-center justify-center text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {t.name}
                  </div>
                  <div className="text-xs text-[#555]">{t.role}</div>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,45,70,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

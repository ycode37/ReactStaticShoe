import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '⚡',
    title: 'Ultra Lightweight',
    description: 'Advanced foam technology reduces weight by 40% without compromising durability or support.',
  },
  {
    icon: '🛡️',
    title: 'Impact Shield',
    description: 'Proprietary cushioning system absorbs and redistributes impact energy across every step.',
  },
  {
    icon: '🌊',
    title: 'AquaGuard Pro',
    description: 'Hydrophobic nano-coating keeps your feet dry in any weather, any terrain, any adventure.',
  },
  {
    icon: '🔬',
    title: 'BioFit Insole',
    description: 'AI-mapped ergonomic insoles that adapt to your unique foot architecture over time.',
  },
  {
    icon: '♻️',
    title: 'Eco Forward',
    description: '73% recycled materials, carbon-neutral production, and fully biodegradable packaging.',
  },
  {
    icon: '✨',
    title: 'NightGlow',
    description: 'Photoluminescent accents charge in daylight and glow for up to 8 hours in the dark.',
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section label
      gsap.fromTo('.feat-label',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.feat-label', start: 'top 85%' }
        }
      );

      // Title
      gsap.fromTo('.feat-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.feat-title', start: 'top 85%' }
        }
      );

      // Cards stagger
      const cards = gsap.utils.toArray('.feat-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            }
          }
        );
      });

      // Hover glow effect on each card
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
          gsap.to(card.querySelector('.feat-icon'), { scale: 1.2, rotate: 10, duration: 0.4, ease: 'back.out(1.7)' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
          gsap.to(card.querySelector('.feat-icon'), { scale: 1, rotate: 0, duration: 0.4 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative noise-overlay" id="features">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Label */}
        <div className="feat-label flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
          <div className="w-12 h-[1px] bg-[#ff2d46]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff2d46] font-medium"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Innovation
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <h2 className="feat-title display-text text-4xl md:text-5xl lg:text-6xl max-w-2xl" style={{ opacity: 0 }}>
            Engineered for the <span className="text-[#ff2d46]">future</span>
          </h2>
          <p className="feat-title body-text max-w-md text-base" style={{ opacity: 0 }}>
            Six breakthrough technologies that redefine what footwear can be.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="feat-card glass-card p-8 cursor-pointer group"
              style={{ opacity: 0 }}
            >
              <div className="feat-icon feature-icon group-hover:bg-gradient-to-br group-hover:from-[rgba(255,45,70,0.3)] group-hover:to-[rgba(255,45,70,0.1)]">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-[#ff2d46] transition-colors duration-300"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {feat.title}
              </h3>
              <p className="body-text text-sm leading-relaxed">
                {feat.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-[#ff2d46] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider uppercase">
                Learn more
                <span className="text-sm">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

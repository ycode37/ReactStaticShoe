import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { value: 15000, suffix: '+', label: 'Happy Customers', icon: '👟' },
  { value: 200, suffix: '+', label: 'Unique Designs', icon: '🎨' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
  { value: 45, suffix: '', label: 'Countries Served', icon: '🌍' },
];

const Stats = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Animate counters
      const statEls = gsap.utils.toArray('.stat-value');
      statEls.forEach((el, i) => {
        const target = statsData[i].value;

        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
            onUpdate: function() {
              el.textContent = Math.floor(this.targets()[0].innerText).toLocaleString();
            }
          }
        );
      });

      // Card stagger
      const cards = gsap.utils.toArray('.stat-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }
          }
        );
      });

      // Background text
      gsap.fromTo('.stats-bg-text',
        { x: '10%', opacity: 0 },
        {
          x: '-10%', opacity: 0.02,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden noise-overlay">
      {/* Giant background text */}
      <div className="stats-bg-text absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
           style={{
             fontFamily: 'Space Grotesk, sans-serif',
             fontSize: 'clamp(8rem, 20vw, 20rem)',
             fontWeight: 900,
             color: 'white',
             opacity: 0,
           }}>
        SOLEX SOLEX SOLEX
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="display-text text-4xl md:text-5xl mb-4">
            Numbers that <span className="text-[#ff2d46]">speak</span>
          </h2>
          <p className="body-text max-w-md mx-auto">
            Our impact in numbers — and we're just getting started.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="stat-card glass-card p-8 text-center"
              style={{ opacity: 0 }}
            >
              <div className="text-3xl mb-4">{stat.icon}</div>
              <div className="stat-number">
                <span className="stat-value">0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-xs text-[#888] uppercase tracking-widest mt-3"
                   style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Zoom-in reveal
      gsap.fromTo('.cta-container',
        { scale: 0.85, opacity: 0, borderRadius: '40px' },
        {
          scale: 1, opacity: 1, borderRadius: '24px',
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-container', start: 'top 80%' }
        }
      );

      // Text elements
      gsap.fromTo('.cta-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, delay: 0.3,
          scrollTrigger: { trigger: '.cta-title', start: 'top 85%' }
        }
      );

      gsap.fromTo('.cta-subtitle',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.5,
          scrollTrigger: { trigger: '.cta-subtitle', start: 'top 85%' }
        }
      );

      gsap.fromTo('.cta-btn',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.7,
          scrollTrigger: { trigger: '.cta-btn', start: 'top 90%' }
        }
      );

      // Floating particles
      gsap.utils.toArray('.cta-particle').forEach((p, i) => {
        gsap.to(p, {
          y: `random(-40, 40)`,
          x: `random(-30, 30)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });

      // Orb parallax
      gsap.to('.cta-orb', {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="cta-container relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
             style={{
               opacity: 0,
               background: 'linear-gradient(135deg, rgba(255,45,70,0.12) 0%, rgba(10,10,10,0.95) 50%, rgba(255,45,70,0.08) 100%)',
               border: '1px solid rgba(255,45,70,0.15)',
             }}>

          {/* Orbs */}
          <div className="cta-orb absolute w-[400px] h-[400px] rounded-full bg-[#ff2d46] blur-[120px] opacity-15 top-[-20%] right-[-10%]" />
          <div className="cta-orb absolute w-[300px] h-[300px] rounded-full bg-[#ff6b7a] blur-[100px] opacity-10 bottom-[-20%] left-[-10%]" />

          {/* Floating particles */}
          {Array(6).fill(0).map((_, i) => (
            <div
              key={i}
              className="cta-particle absolute w-1 h-1 rounded-full bg-[#ff2d46] opacity-30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,45,70,0.1)] border border-[rgba(255,45,70,0.2)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#ff2d46] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#ff6b7a]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Limited Drop
              </span>
            </div>

            <h2 className="cta-title display-text text-4xl md:text-6xl lg:text-7xl mb-6" style={{ opacity: 0 }}>
              Ready to step<br />
              into the <span className="text-[#ff2d46]">future</span>?
            </h2>

            <p className="cta-subtitle body-text text-lg max-w-lg mx-auto mb-10" style={{ opacity: 0 }}>
              Join 15,000+ who've already made the switch. Free shipping on your first order.
              No questions asked returns for 90 days.
            </p>

            <div className="cta-btn flex flex-wrap justify-center gap-4" style={{ opacity: 0 }}>
              <button className="magnetic-btn primary text-base py-4 px-10">
                Shop the Collection
              </button>
              <button className="magnetic-btn outline text-base py-4 px-10">
                Book a Fitting
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-xs text-[#555] uppercase tracking-widest"
                 style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span>Free Shipping</span>
              <span>·</span>
              <span>90-Day Returns</span>
              <span>·</span>
              <span>2-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

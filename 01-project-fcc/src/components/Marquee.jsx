import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite scroll marquee
      const track1 = document.querySelector('.marquee-row-1');
      const track2 = document.querySelector('.marquee-row-2');

      if (track1) {
        gsap.to(track1, {
          x: '-50%',
          duration: 30,
          repeat: -1,
          ease: 'none',
        });
      }

      if (track2) {
        gsap.to(track2, {
          x: '0%',
          duration: 25,
          repeat: -1,
          ease: 'none',
        });
        gsap.set(track2, { x: '-50%' });
      }

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: marqueeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const speed = Math.min(Math.abs(velocity) / 500, 3);
          if (track1) gsap.to(track1, { timeScale: 1 + speed, duration: 0.5 });
        }
      });

      // Entrance
      gsap.fromTo(marqueeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 90%',
          }
        }
      );

    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const words = ['PERFORMANCE', '✦', 'STYLE', '✦', 'COMFORT', '✦', 'INNOVATION', '✦', 'PREMIUM', '✦'];

  return (
    <section ref={marqueeRef} className="py-16 overflow-hidden relative" style={{ opacity: 0 }}>
      <div className="section-divider mb-16" />

      {/* Row 1 */}
      <div className="overflow-hidden mb-4">
        <div className="marquee-track marquee-row-1">
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span key={i} className={i % 4 === 0 ? 'filled' : ''}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden">
        <div className="marquee-track marquee-row-2">
          {[...words, ...words, ...words, ...words].map((word, i) => (
            <span key={i} className={i % 3 === 0 ? 'filled' : ''}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
};

export default Marquee;

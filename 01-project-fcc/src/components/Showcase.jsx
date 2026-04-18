import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section heading
      gsap.fromTo('.showcase-label',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.showcase-label', start: 'top 85%' }
        }
      );

      gsap.fromTo('.showcase-title',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.showcase-title', start: 'top 85%' }
        }
      );

      // Horizontal scroll section
      const horizontal = horizontalRef.current;
      const slides = gsap.utils.toArray('.showcase-slide');

      if (slides.length > 0) {
        gsap.to(slides, {
          xPercent: -100 * (slides.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontal,
            pin: true,
            scrub: 1,
            snap: 1 / (slides.length - 1),
            end: () => '+=' + horizontal.offsetWidth * 2,
          }
        });

        // Each slide image parallax
        slides.forEach((slide) => {
          const img = slide.querySelector('.showcase-slide-img');
          if (img) {
            gsap.fromTo(img,
              { scale: 1.3 },
              {
                scale: 1,
                scrollTrigger: {
                  trigger: slide,
                  start: 'left right',
                  end: 'right left',
                  scrub: 1,
                  containerAnimation: ScrollTrigger.getAll().find(st => st.trigger === horizontal) ? undefined : undefined,
                }
              }
            );
          }
        });
      }

      // Counter animation
      const counters = gsap.utils.toArray('.showcase-counter');
      counters.forEach((counter) => {
        gsap.fromTo(counter,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6,
            scrollTrigger: { trigger: counter, start: 'top 90%' }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const slides = [
    {
      title: 'VELOCITY X',
      subtitle: 'Performance Running',
      price: '$249',
      color: '#ff2d46',
      desc: 'Built for speed. The VELOCITY X features our lightest midsole ever, paired with a carbon fiber plate for explosive energy return.',
    },
    {
      title: 'SHADOW MK-II',
      subtitle: 'Urban Stealth',
      price: '$219',
      color: '#8b5cf6',
      desc: 'Invisible in the city. Matte black with reflective accents, built with premium suede and ballistic nylon for all-day comfort.',
    },
    {
      title: 'AERO DRIFT',
      subtitle: 'Lifestyle Elite',
      price: '$289',
      color: '#06b6d4',
      desc: 'Where runway meets pavement. The AERO DRIFT combines aerospace-grade materials with haute couture design language.',
    },
    {
      title: 'TERRA FORCE',
      subtitle: 'Trail Domination',
      price: '$269',
      color: '#22c55e',
      desc: 'Conquer any terrain. Vibram outsole, Gore-Tex lining, and reinforced toe cap for the most demanding adventures.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative noise-overlay" id="collection">
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-16">
          <div className="showcase-label flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
            <div className="w-12 h-[1px] bg-[#ff2d46]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#ff2d46] font-medium"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Collection
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="showcase-title display-text text-4xl md:text-5xl lg:text-6xl" style={{ opacity: 0 }}>
              The Lineup
            </h2>
            <div className="showcase-title text-sm text-[#555] uppercase tracking-widest" style={{ opacity: 0, fontFamily: 'Space Grotesk, sans-serif' }}>
              Scroll to explore →
            </div>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div ref={horizontalRef} className="flex overflow-hidden w-full" style={{ height: '85vh' }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="showcase-slide flex-none w-screen h-full flex items-center justify-center px-6 md:px-10"
            >
              <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center h-full py-12">
                {/* Slide text */}
                <div className="flex flex-col justify-center">
                  <div className="showcase-counter flex items-center gap-3 mb-6">
                    <span className="text-7xl font-bold text-[rgba(255,255,255,0.05)]"
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      0{i + 1}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#555]">/ 0{slides.length}</span>
                  </div>

                  <span className="text-xs uppercase tracking-[0.3em] mb-3"
                        style={{ color: slide.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {slide.subtitle}
                  </span>
                  <h3 className="display-text text-5xl md:text-6xl lg:text-7xl mb-6">
                    {slide.title}
                  </h3>
                  <p className="body-text text-base max-w-md mb-8">
                    {slide.desc}
                  </p>

                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {slide.price}
                    </span>
                    <button className="magnetic-btn primary text-sm py-3 px-7"
                            style={{ background: slide.color }}>
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Slide image */}
                <div className="flex items-center justify-center relative">
                  <div className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[80px]"
                       style={{ background: slide.color }} />
                  <img
                    src="/images/resShoe.png"
                    alt={slide.title}
                    className="showcase-slide-img w-full max-w-md relative z-10"
                    style={{
                      filter: `hue-rotate(${i * 60}deg) drop-shadow(0 20px 50px ${slide.color}44)`,
                      transform: `rotate(${-15 + i * 5}deg)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;

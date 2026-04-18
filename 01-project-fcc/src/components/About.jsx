import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.fromTo('.about-label',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.about-label', start: 'top 85%' }
        }
      );

      // Big text line by line
      const lines = gsap.utils.toArray('.about-line');
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { y: 80, opacity: 0, rotateX: 20 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 1, delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 85%' }
          }
        );
      });

      // Right column fade in
      gsap.fromTo('.about-desc',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2,
          scrollTrigger: { trigger: '.about-desc', start: 'top 80%' }
        }
      );

      gsap.fromTo('.about-cta',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '.about-cta', start: 'top 85%' }
        }
      );

      // Image parallax
      gsap.to('.about-img', {
        yPercent: -15,
        scrollTrigger: {
          trigger: '.about-img-wrap',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Image reveal
      gsap.fromTo('.about-img-mask',
        { scaleY: 1 },
        {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.about-img-wrap', start: 'top 75%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative noise-overlay" id="about">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Label */}
        <div className="about-label flex items-center gap-4 mb-16" style={{ opacity: 0 }}>
          <div className="w-12 h-[1px] bg-[#ff2d46]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#ff2d46] font-medium"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            About Us
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Big statement */}
          <div>
            <h2 className="display-text text-4xl md:text-5xl lg:text-6xl mb-8">
              <span className="about-line block" style={{ opacity: 0 }}>We don't just</span>
              <span className="about-line block" style={{ opacity: 0 }}>make shoes.</span>
              <span className="about-line block text-[#ff2d46]" style={{ opacity: 0 }}>We craft</span>
              <span className="about-line block text-[#ff2d46]" style={{ opacity: 0 }}>experiences.</span>
            </h2>

            {/* Image with parallax */}
            <div className="about-img-wrap parallax-img-wrap relative h-[350px] md:h-[450px] mt-10">
              <img
                src="/images/resShoe.png"
                alt="Craftsmanship"
                className="about-img w-full h-full object-contain scale-110"
                style={{ filter: 'hue-rotate(20deg) brightness(0.9)' }}
              />
              <div className="about-img-mask absolute inset-0 bg-[#0a0a0a] z-20" />
            </div>
          </div>

          {/* Right - Description */}
          <div className="lg:pt-20">
            <p className="about-desc body-text text-lg mb-8 leading-relaxed" style={{ opacity: 0 }}>
              Born from the intersection of art and engineering, SOLEX represents
              a new paradigm in footwear design. Every curve, every stitch, every
              material is chosen with obsessive attention to detail.
            </p>
            <p className="about-desc body-text text-lg mb-8 leading-relaxed" style={{ opacity: 0 }}>
              We believe your shoes are more than just footwear — they're an extension
              of your identity. That's why we've spent years perfecting the balance
              between cutting-edge technology and timeless design.
            </p>
            <p className="about-desc body-text text-lg mb-10 leading-relaxed" style={{ opacity: 0 }}>
              From the streets of Tokyo to the runways of Milan, our designs have
              been recognized for pushing the boundaries of what's possible in
              modern footwear.
            </p>

            <div className="about-cta" style={{ opacity: 0 }}>
              <button className="magnetic-btn outline">
                Our Story →
              </button>
            </div>

            {/* Awards */}
            <div className="grid grid-cols-2 gap-6 mt-16">
              {[
                { year: '2024', award: 'Red Dot Design Award' },
                { year: '2025', award: 'IF Design Award' },
                { year: '2025', award: 'Good Design Award' },
                { year: '2026', award: 'A\' Design Award' },
              ].map((item, i) => (
                <div key={i} className="about-desc border-t border-[rgba(255,255,255,0.06)] pt-4" style={{ opacity: 0 }}>
                  <div className="text-xs text-[#ff2d46] font-medium mb-1">{item.year}</div>
                  <div className="text-sm text-[#888]">{item.award}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

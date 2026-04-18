import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const shoeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background orbs entrance
      tl.fromTo('.hero-orb-1',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.3, duration: 2 }, 0
      );
      tl.fromTo('.hero-orb-2',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.2, duration: 2 }, 0.3
      );

      // Title - word by word reveal
      tl.fromTo('.hero-title-line',
        { y: 120, opacity: 0, rotateX: 40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15 }, 0.8
      );

      // Subtitle
      tl.fromTo('.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }, 1.6
      );

      // Buttons
      tl.fromTo('.hero-btn',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, 1.9
      );

      // Shoe image - dramatic entrance
      tl.fromTo(shoeRef.current,
        { x: 200, opacity: 0, rotate: -20, scale: 0.7 },
        { x: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.8, ease: 'power3.out' }, 1
      );

      // Floating badges
      tl.fromTo('.hero-badge',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' }, 2.2
      );

      // Scroll indicator
      tl.fromTo('.scroll-indicator',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, 2.8
      );

      // Parallax on scroll
      gsap.to(shoeRef.current, {
        y: -100,
        rotate: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.hero-title-wrap', {
        y: 80,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        }
      });

      gsap.to('.hero-orb-1', {
        y: -150,
        x: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });

      // Continuous shoe float
      gsap.to(shoeRef.current, {
        y: '+=15',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden noise-overlay" id="home">
      {/* Glow orbs */}
      <div className="hero-orb-1 glow-orb w-[600px] h-[600px] bg-[#ff2d46] top-[-10%] left-[-10%]" />
      <div className="hero-orb-2 glow-orb w-[400px] h-[400px] bg-[#ff6b7a] bottom-[-5%] right-[10%]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '60px 60px'
           }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left content */}
          <div className="hero-title-wrap lg:w-[55%] text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
              <span className="w-2 h-2 rounded-full bg-[#ff2d46] animate-pulse"></span>
              <span className="text-xs font-medium tracking-widest uppercase text-[#888]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                New Collection 2026
              </span>
            </div>

            <div ref={titleRef} className="overflow-hidden mb-6">
              <h1 className="display-text text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                <span className="hero-title-line block">YOUR FEET</span>
                <span className="hero-title-line block">DESERVE THE</span>
                <span className="hero-title-line block text-[#ff2d46]">BEST</span>
              </h1>
            </div>

            <p className="hero-subtitle body-text text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10" style={{ opacity: 0 }}>
              Engineered for performance. Designed for the streets.
              Every step tells a story — make yours unforgettable with
              footwear that pushes boundaries.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="hero-btn magnetic-btn primary" style={{ opacity: 0 }}>
                Explore Collection
              </button>
              <button className="hero-btn magnetic-btn outline" style={{ opacity: 0 }}>
                Watch Film
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex justify-center lg:justify-start gap-10 mt-12">
              {[
                { num: '15K+', label: 'Happy Customers' },
                { num: '200+', label: 'Unique Designs' },
                { num: '4.9', label: 'Average Rating' },
              ].map((stat, i) => (
                <div key={i} className="hero-btn text-center lg:text-left" style={{ opacity: 0 }}>
                  <div className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.num}</div>
                  <div className="text-xs text-[#555] uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Shoe */}
          <div className="lg:w-[45%] relative flex justify-center items-center">
            <div ref={shoeRef} className="relative" style={{ opacity: 0 }}>
              {/* Glow behind shoe */}
              <div className="absolute inset-0 bg-gradient-radial from-[rgba(255,45,70,0.2)] to-transparent rounded-full blur-3xl scale-150" />
              <img
                src="/images/resShoe.png"
                alt="Premium Shoe"
                className="w-full max-w-lg relative z-10 drop-shadow-[0_30px_60px_rgba(255,45,70,0.3)]"
                style={{ filter: 'drop-shadow(0 20px 50px rgba(255, 45, 70, 0.25))' }}
              />

              {/* Floating badges */}
              <div className="hero-badge absolute top-4 right-0 glass-card px-4 py-3 flex items-center gap-3" style={{ opacity: 0 }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff2d46] to-[#ff6b7a] flex items-center justify-center text-sm">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold">Lightweight</div>
                  <div className="text-[10px] text-[#888]">Only 280g</div>
                </div>
              </div>

              <div className="hero-badge absolute bottom-16 left-0 glass-card px-4 py-3 flex items-center gap-3" style={{ opacity: 0 }}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff2d46] to-[#ff6b7a] flex items-center justify-center text-sm">
                  🔥
                </div>
                <div>
                  <div className="text-xs font-bold">Best Seller</div>
                  <div className="text-[10px] text-[#888]">#1 This Week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#555]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#ff2d46] to-transparent relative overflow-hidden">
          <div className="w-full h-4 bg-[#ff2d46] absolute animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

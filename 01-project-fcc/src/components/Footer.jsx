import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Footer reveal
      gsap.fromTo('.footer-content',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.footer-content', start: 'top 90%' }
        }
      );

      // Stagger columns
      gsap.utils.toArray('.footer-col').forEach((col, i) => {
        gsap.fromTo(col,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: { trigger: col, start: 'top 92%' }
          }
        );
      });

      // Bottom bar
      gsap.fromTo('.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const links = {
    Products: ['New Arrivals', 'Best Sellers', 'Running', 'Lifestyle', 'Limited Edition'],
    Company: ['About Us', 'Careers', 'Press', 'Sustainability', 'Investors'],
    Support: ['Help Center', 'Shipping', 'Returns', 'Size Guide', 'Contact'],
    Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Accessibility'],
  };

  return (
    <footer ref={footerRef} className="relative pt-20 pb-8 noise-overlay">
      <div className="section-divider" />

      <div className="footer-content relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">
          {/* Brand */}
          <div className="footer-col col-span-2 md:col-span-1" style={{ opacity: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2d46] to-[#ff6b7a] flex items-center justify-center font-bold text-lg"
                   style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                S
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                SOLE<span className="text-[#ff2d46]">X</span>
              </span>
            </div>
            <p className="text-sm text-[#555] leading-relaxed mb-6">
              Redefining footwear for the modern era. Engineered for performance,
              designed for life.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {['𝕏', 'in', 'ig', 'yt'].map((social, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-xs text-[#888] hover:bg-[rgba(255,45,70,0.1)] hover:border-[rgba(255,45,70,0.2)] hover:text-[#ff2d46] transition-all duration-300 cursor-pointer"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items], i) => (
            <div key={i} className="footer-col" style={{ opacity: 0 }}>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-[#555] hover:text-[#ff2d46] transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-col glass-card p-8 md:p-10 mb-20 grid md:grid-cols-2 gap-8 items-center" style={{ opacity: 0 }}>
          <div>
            <h3 className="display-text text-2xl md:text-3xl mb-2">
              Stay in the <span className="text-[#ff2d46]">loop</span>
            </h3>
            <p className="body-text text-sm">Get early access to drops & exclusive member pricing.</p>
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl px-5 py-3 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#ff2d46] transition-colors duration-300"
            />
            <button className="magnetic-btn primary text-sm py-3 px-6">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[rgba(255,255,255,0.04)]" style={{ opacity: 0 }}>
          <span className="text-xs text-[#333]">
            © 2026 SOLEX. All rights reserved.
          </span>
          <span className="text-xs text-[#333]">
            Designed with obsessive attention to detail.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

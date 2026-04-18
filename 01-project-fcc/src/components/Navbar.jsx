import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 },
    );

    // Stagger nav items
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 5,
        ease: "power2.out",
        delay: 1,
      },
    );

    // Scroll-based background change
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]"
          : "bg-transparent"
      }`}
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <div className="nav-item flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff2d46] to-[#ff6b7a] flex items-center justify-center font-bold text-lg"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            S
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            SOLE<span className="text-[#ff2d46]">X</span>
          </span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8">
          {["Collection", "About", "Features", "Contact"].map((item, i) => (
            <li key={i} className="nav-item">
              <a
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-[#888] hover:text-white transition-colors duration-300 tracking-wide uppercase"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  letterSpacing: "0.1em",
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="nav-item">
          <button className="magnetic-btn primary text-sm py-3 px-7">
            Shop Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Features from './components/Features';
import Showcase from './components/Showcase';
import Process from './components/Process';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // Smooth scroll refresh
    ScrollTrigger.refresh();

    // Custom cursor
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      document.addEventListener('mousemove', moveCursor);

      // Add hover class for interactive elements
      const interactiveEls = document.querySelectorAll('a, button, .glass-card, .magnetic-btn');
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
      });

      return () => {
        document.removeEventListener('mousemove', moveCursor);
      };
    }
  }, []);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <div className="cursor-follower hidden lg:block" />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero - Full viewport landing */}
        <Hero />

        {/* Marquee text band */}
        <Marquee />

        {/* About section */}
        <About />

        {/* Philosophy - Word reveal on scroll */}
        <Philosophy />

        {/* Features - Tech showcase */}
        <Features />

        {/* Product showcase - Horizontal scroll */}
        <Showcase />

        {/* Manufacturing process timeline */}
        <Process />

        {/* Stats counter section */}
        <Stats />

        {/* Testimonials */}
        <Testimonials />

        {/* Call to action */}
        <CallToAction />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { Menu, X, Crosshair } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Training', href: '#training' },
  { label: 'Research', href: '#research' },
  { label: 'Learning Hub', href: '#learning-hub' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{
        backgroundColor: scrolled ? 'var(--nav-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        boxShadow: scrolled ? `0 4px 30px var(--shadow-color)` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 group" onClick={(e) => handleNav(e, '#home')}>
          <div
            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300"
            style={{
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
            }}
          >
            <Crosshair className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--accent)' }} />
            <div
              className="absolute inset-0 rounded-lg blur-sm group-hover:blur-md transition-all"
              style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}
            />
          </div>
          <span className="font-orbitron font-bold text-lg sm:text-xl tracking-widest" style={{ color: 'var(--text-primary)' }}>
            SNIPER<span style={{ color: 'var(--accent)' }}>AERO</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="font-medium text-sm tracking-wide relative transition-colors duration-300"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
            >
              {link.label}
              <span
                className="absolute bottom-[-4px] left-0 w-0 h-[2px] transition-all duration-300"
                style={{ backgroundColor: 'var(--accent)' }}
              />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            className="ml-2 px-5 xl:px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
            }}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden transition-colors p-2"
          aria-label="Toggle menu"
          style={{ color: 'var(--text-dim)' }}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-40 transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] z-50 transition-transform duration-500 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderLeft: '1px solid var(--border-color)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-between p-4 sm:p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <span className="font-orbitron font-bold text-lg tracking-widest" style={{ color: 'var(--text-primary)' }}>
            Menu
          </span>
          <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-dim)' }}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="px-4 sm:px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="block py-3 px-4 rounded-xl text-sm font-medium tracking-wide transition-all duration-300"
              style={{ color: 'var(--text-dim)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            className="block mt-4 text-center py-3 rounded-full font-semibold text-sm tracking-wide transition-all"
            style={{
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}

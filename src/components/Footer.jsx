import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Palette, Check } from 'lucide-react';
import { FaInstagram } from "react-icons/fa";
import { useTheme, themes } from '../context/ThemeContext';
import { useState } from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Training', href: '#training' },
  { label: 'Research', href: '#research' },
  { label: 'Learning Hub', href: '#learning-hub' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const { themeId, setThemeId } = useTheme();
  const [showThemeLabel, setShowThemeLabel] = useState(null);

  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const themeList = Object.values(themes);

  return (
    <footer className="relative" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-footer)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div
                className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--accent-subtle)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                <Crosshair className="w-3.5 sm:w-4 h-3.5 sm:h-4" style={{ color: 'var(--accent)' }} />
              </div>
              <span className="font-orbitron font-bold text-base sm:text-lg tracking-widest" style={{ color: 'var(--text-primary)' }}>
                SNIPER<span style={{ color: 'var(--accent)' }}>AERO</span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs leading-relaxed max-w-xs" style={{ color: 'var(--text-dimmer)' }}>
              Pioneering the future of unmanned aerial vehicles, IoT ecosystems, AI and ML defense technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5 font-inter" style={{ color: 'var(--text-dim)' }}>Quick Links</h4>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-[11px] sm:text-xs py-1 transition-colors duration-300"
                  style={{ color: 'var(--text-dimmer)' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-dimmer)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5 font-inter" style={{ color: 'var(--text-dim)' }}>Connect</h4>
            <p className="text-[11px] sm:text-xs mb-1" style={{ color: 'var(--text-dimmer)' }}>Manager@sniperaero.com</p>
            <p className="text-[11px] sm:text-xs mb-4 sm:mb-5" style={{ color: 'var(--text-dimmer)' }}>+91 99522 69356</p>
          </div>

          {/* Theme Switcher */}
          <div>
            <h4 className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5 font-inter flex items-center gap-2" style={{ color: 'var(--text-dim)' }}>
              <Palette className="w-3.5 h-3.5" />
              Color Theme
            </h4>
            <div className="flex flex-wrap gap-3">
              {themeList.map((t) => {
                const isActive = themeId === t.id;
                return (
                  <div key={t.id} className="relative">
                    <button
                      onClick={() => setThemeId(t.id)}
                      onMouseEnter={() => setShowThemeLabel(t.id)}
                      onMouseLeave={() => setShowThemeLabel(null)}
                      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none group"
                      style={{
                        background: t.id === 'dark'
                          ? 'linear-gradient(135deg, #0a0f1e, #1a2540)'
                          : t.id === 'white'
                          ? 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                          : 'linear-gradient(135deg, #0c1a3d, #1e3a8a)',
                        border: isActive
                          ? `2px solid var(--accent)`
                          : '2px solid var(--border-color)',
                        boxShadow: isActive
                          ? `0 0 15px rgba(var(--accent-rgb), 0.3)`
                          : 'none',
                      }}
                      aria-label={`Switch to ${t.name} theme`}
                    >
                      {/* Active checkmark */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'var(--accent)' }}
                            >
                              <Check className="w-3 h-3" style={{ color: t.id === 'white' ? '#0f172a' : '#ffffff' }} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Theme preview dots */}
                      {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center gap-1">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: t.id === 'dark' ? '#00d4ff' : t.id === 'white' ? '#0ea5e9' : '#60a5fa',
                            }}
                          />
                          <div
                            className="w-1.5 h-1.5 rounded-full opacity-50"
                            style={{
                              backgroundColor: t.id === 'dark' ? '#00d4ff' : t.id === 'white' ? '#0ea5e9' : '#60a5fa',
                            }}
                          />
                        </div>
                      )}
                    </button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {showThemeLabel === t.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap z-50"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            boxShadow: '0 4px 12px var(--shadow-color)',
                          }}
                        >
                          {t.name}
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                              borderLeft: '4px solid transparent',
                              borderRight: '4px solid transparent',
                              borderTop: '4px solid var(--border-color)',
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] mt-3 font-medium" style={{ color: 'var(--text-dimmer)' }}>
              {themes[themeId]?.name} active
            </p>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div
          className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p className="text-[10px] sm:text-[11px] tracking-wide" style={{ color: 'var(--text-dimmer)' }}>
            © 2025 Sniper Aero. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-[11px] tracking-wide" style={{ color: 'var(--text-dimmer)' }}>
            CFI, IIT Madras, Chennai - 600036
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Crosshair } from 'lucide-react';
import Logo from '../assets/logo_sniperaero.png';


const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Training', href: '#training' },
  { label: 'Research', href: '#research' },
  { label: 'Learning Hub', href: '#learning-hub' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-footer)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex ml-10 items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <a href="#home" className="flex relative items-center group" onClick={(e) => handleNav(e, '#home')}>
          
          <img src={Logo} alt="" className='absolute right-40 h-[70px] mt-2 w-[70px] object-fill'/>
          <span className="font-orbitron font-bold text-lg sm:text-xl tracking-widest" style={{ color: 'var(--text-primary)' }}>
            SNIPER<span style={{ color: 'var(--accent)' }}>AERO</span>
          </span>
        </a>
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

          {/* Optional Third Column */}
          <div className="hidden lg:block">
            {/* Empty for layout balance */}
          </div>
        </div>

        {/* Divider & Copyright */}
        <div
          className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p className="text-[10px] sm:text-[11px] tracking-wide" style={{ color: 'var(--text-dimmer)' }}>
            © 2026 Sniper Aero. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-[11px] tracking-wide" style={{ color: 'var(--text-dimmer)' }}>
            Sniperaero, Sudha and Shankar Innovation Hub, <br/>IIT Madras, Chennai - 600036
          </p>
        </div>
      </div>
    </footer>
  );
}

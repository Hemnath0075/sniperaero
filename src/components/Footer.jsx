import { Crosshair } from 'lucide-react';
import { FaInstagram } from "react-icons/fa";

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Training', href: '#training' },
  { label: 'Research', href: '#research' },
  { label: 'Learning Hub', href: '#learning-hub' },
  { label: 'Contact', href: '#contact' },
];

// const socials = [
//   { Icon: Linkedin, href: '#' },
//   { Icon: Twitter, href: '#' },
//   { Icon: FaInstagram, href: '#' },
//   { Icon: Youtube, href: '#' },
// ];

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.05] bg-[#060a15]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Crosshair className="w-4 h-4 text-accent" />
              </div>
              <span className="font-orbitron font-bold text-lg tracking-widest text-white">
                SNIPER<span className="text-accent">AERO</span>
              </span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
              Pioneering the future of unmanned aerial vehicles, IoT ecosystems, AI and ML defense technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5 font-inter">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-gray-600 text-xs hover:text-accent transition-colors duration-300 py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5 font-inter">Connect</h4>
            <p className="text-gray-600 text-xs mb-1">Manager@sniperaero.com</p>
            <p className="text-gray-600 text-xs mb-5">+91 99522 69356</p>
            <div className="flex items-center gap-2">
              {/* {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-600 hover:text-accent hover:border-accent/30 transition-all duration-300">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))} */}
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-[11px] tracking-wide">
            © 2025 Sniper Aero. All rights reserved.
          </p>
          <p className="text-gray-700 text-[11px] tracking-wide">
            CFI, IIT Madras, Chennai - 600036
          </p>
        </div>
      </div>
    </footer>
  );
}

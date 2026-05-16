import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowRight, Target, Zap, Shield, Crosshair } from 'lucide-react';

const techStack = ['Hardware', 'Firmware', 'Software', 'Cloud', 'AI'];

export default function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const getParticleColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--particle-color').trim() || '0, 212, 255';
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        const color = getParticleColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getParticleColor();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color}, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Particle Canvas with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0" />
      </motion.div>

      {/* Background HUD Elements */}
      <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-tl-3xl" style={{ borderLeft: '1px solid var(--accent-border)', borderTop: '1px solid var(--accent-border)' }} />
        <div className="absolute top-10 right-10 w-20 sm:w-32 h-20 sm:h-32 rounded-tr-3xl" style={{ borderRight: '1px solid var(--accent-border)', borderTop: '1px solid var(--accent-border)' }} />
        <div className="absolute bottom-10 left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-bl-3xl" style={{ borderLeft: '1px solid var(--accent-border)', borderBottom: '1px solid var(--accent-border)' }} />
        <div className="absolute bottom-10 right-10 w-20 sm:w-32 h-20 sm:h-32 rounded-br-3xl" style={{ borderRight: '1px solid var(--accent-border)', borderBottom: '1px solid var(--accent-border)' }} />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] z-0"
          style={{
            background: `linear-gradient(to right, transparent, rgba(var(--accent-rgb), 0.4), transparent)`,
            boxShadow: `0 0 15px rgba(var(--accent-rgb), 0.5)`,
          }}
        />
      </motion.div>

      {/* Floating Drone Graphic */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative w-full max-w-4xl flex justify-between items-center px-4 sm:px-10 opacity-30"
        >
          {/* Left HUD readout */}
          <div className="hidden lg:block space-y-4">
            <div className="p-3 rounded-lg backdrop-blur-sm" style={{ border: '1px solid var(--accent-border)', backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}>
              <div className="text-[10px] uppercase tracking-tighter mb-1" style={{ color: 'var(--accent)' }}>Alt Status</div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>425.82m <span className="animate-pulse" style={{ color: 'var(--accent)' }}>▲</span></div>
            </div>
            <div className="p-3 rounded-lg backdrop-blur-sm" style={{ border: '1px solid var(--accent-border)', backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}>
              <div className="text-[10px] uppercase tracking-tighter mb-1" style={{ color: 'var(--accent)' }}>Telemetry</div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>LAT: 12.9716<br/>LON: 77.5946</div>
            </div>
          </div>

          {/* Center Drone Silhouette (SVG) */}
          <div className="relative">
             <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200px] sm:w-[300px] lg:w-[400px] h-auto" style={{ color: 'var(--accent)', filter: `drop-shadow(0 0 20px rgba(var(--accent-rgb), 0.3))` }}>
                {/* Main Body */}
                <path d="M150 100L250 100L260 110L140 110L150 100Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
                <path d="M180 90L220 90L230 100L170 100L180 90Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1"/>
                {/* Arms */}
                <path d="M150 100L100 60M150 110L100 150M250 100L300 60M250 110L300 150" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                {/* Motors/Rotors */}
                <circle cx="100" cy="60" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                <circle cx="100" cy="150" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                <circle cx="300" cy="60" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                <circle cx="300" cy="150" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                {/* Spinning blades animation */}
                <motion.circle 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  cx="100" cy="60" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5"
                />
                <motion.circle 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  cx="100" cy="150" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5"
                />
                <motion.circle 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  cx="300" cy="60" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5"
                />
                <motion.circle 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  cx="300" cy="150" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5"
                />
             </svg>
             {/* Scanning pulse */}
             <motion.div 
               animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-40 h-28 sm:h-40 rounded-full"
               style={{ border: `2px solid var(--accent)` }}
             />
          </div>

          {/* Right HUD readout */}
          <div className="hidden lg:block space-y-4 text-right">
            <div className="p-3 rounded-lg backdrop-blur-sm" style={{ border: '1px solid var(--accent-border)', backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}>
              <div className="text-[10px] uppercase tracking-tighter mb-1" style={{ color: 'var(--accent)' }}>Signal</div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>STRONG [98%]</div>
            </div>
            <div className="p-3 rounded-lg backdrop-blur-sm" style={{ border: '1px solid var(--accent-border)', backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}>
              <div className="text-[10px] uppercase tracking-tighter mb-1" style={{ color: 'var(--accent)' }}>AI Link</div>
              <div className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>ACTIVE.v2</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content with parallax */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-6 sm:mb-8"
          style={{
            border: '1px solid var(--accent-border)',
            backgroundColor: 'rgba(var(--accent-rgb), 0.05)',
            color: 'var(--accent)',
          }}
        >
          <Zap className="w-3 h-3 animate-pulse" />
          Autonomous Defense Systems
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6"
        >
          <span style={{ color: 'var(--text-primary)', textShadow: '0 0 15px rgba(var(--accent-rgb), 0.1)' }}>Next-Gen </span>
          <span className="text-glow" style={{ color: 'var(--accent)' }}>UAV</span>
          <br />
          <span style={{ color: 'var(--text-primary)', textShadow: '0 0 15px rgba(var(--accent-rgb), 0.1)' }}>& Intelligent </span>
          <span className="text-glow" style={{ color: 'var(--accent)' }}>Systems</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light"
          style={{ color: 'var(--text-dim)' }}
        >
          Pioneering the future of unmanned aerial vehicles, IoT ecosystems, AI and ML defense technology
        </motion.p>

        {/* Additional Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.40 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
        >
          {['Fpv Drones', 'Cyber security & Ethical hacking'].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300"
              style={{
                backgroundColor: 'var(--accent-subtle)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent)',
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Tech Stack Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {techStack.map((item, i) => (
            <span key={item} className="flex items-center gap-2 sm:gap-3">
              <span
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[9px] sm:text-[10px] font-bold font-space tracking-[0.1em] uppercase transition-colors"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-muted)',
                }}
              >
                {item}
              </span>
              {i < techStack.length - 1 && (
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-border)' }} />
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={() => scrollTo('#services')}
            className="group flex items-center gap-3 px-7 sm:px-10 py-3 sm:py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
              boxShadow: 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 30px rgba(var(--accent-rgb), 0.5)`}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
          >
            Explore Services
            <Target className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="group flex items-center gap-3 px-7 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 w-full sm:w-auto justify-center"
            style={{
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent',
            }}
          >
            Contact Us
            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </motion.div>

        {/* HUD Crosshair corner accents */}
        <div className="absolute top-1/2 left-0 w-6 sm:w-8 h-[1px]" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.2)' }} />
        <div className="absolute top-1/2 right-0 w-6 sm:w-8 h-[1px]" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.2)' }} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3"
        style={{ color: 'var(--text-dimmer)' }}
      >
        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase">System Ready</span>
        <div className="relative w-[2px] h-8 sm:h-12 overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
           <motion.div 
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1/2"
            style={{ backgroundColor: 'var(--accent)' }}
           />
        </div>
      </motion.div>
    </section>
  );
}

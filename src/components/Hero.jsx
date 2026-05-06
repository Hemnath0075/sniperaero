import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Target, Zap, Shield, Crosshair } from 'lucide-react';

const techStack = ['Hardware', 'Firmware', 'Software', 'Cloud', 'AI'];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Background HUD Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-accent/30 rounded-tl-3xl" />
        <div className="absolute top-10 right-10 w-32 h-32 border-r border-t border-accent/30 rounded-tr-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-l border-b border-accent/30 rounded-bl-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-accent/30 rounded-br-3xl" />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent shadow-[0_0_15px_rgba(0,212,255,0.5)] z-0"
        />
      </div>

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
          className="relative w-full max-w-4xl flex justify-between items-center px-10 opacity-30"
        >
          {/* Left HUD readout */}
          <div className="hidden lg:block space-y-4">
            <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg backdrop-blur-sm">
              <div className="text-[10px] text-accent uppercase tracking-tighter mb-1">Alt Status</div>
              <div className="font-mono text-xs text-white">425.82m <span className="text-accent animate-pulse">▲</span></div>
            </div>
            <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg backdrop-blur-sm">
              <div className="text-[10px] text-accent uppercase tracking-tighter mb-1">Telemetry</div>
              <div className="font-mono text-xs text-white">LAT: 12.9716<br/>LON: 77.5946</div>
            </div>
          </div>

          {/* Center Drone Silhouette (SVG) */}
          <div className="relative">
             <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent drop-shadow-[0_0_20px_rgba(0,212,255,0.3)]">
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
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-accent rounded-full"
             />
          </div>

          {/* Right HUD readout */}
          <div className="hidden lg:block space-y-4 text-right">
            <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg backdrop-blur-sm">
              <div className="text-[10px] text-accent uppercase tracking-tighter mb-1">Signal</div>
              <div className="font-mono text-xs text-white">STRONG [98%]</div>
            </div>
            <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg backdrop-blur-sm">
              <div className="text-[10px] text-accent uppercase tracking-tighter mb-1">AI Link</div>
              <div className="font-mono text-xs text-white">ACTIVE.v2</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
        >
          <Zap className="w-3 h-3 animate-pulse" />
          Autonomous Defense Systems
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Next-Gen </span>
          <span className="text-accent text-glow">UAV</span>
          <br />
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">& Intelligent </span>
          <span className="text-accent text-glow">Systems</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Pioneering the future of unmanned aerial vehicles, IoT ecosystems, AI and ML defense technology
        </motion.p>

        {/* Tech Stack Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {techStack.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] font-bold text-gray-300 font-space tracking-[0.1em] uppercase hover:border-accent/40 transition-colors">
                {item}
              </span>
              {i < techStack.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-accent/30" />
              )}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('#services')}
            className="group flex items-center gap-3 px-10 py-4 rounded-xl bg-accent text-primary font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 transition-all duration-300"
          >
            Explore Services
            <Target className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="group flex items-center gap-3 px-10 py-4 rounded-xl border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
          >
            Contact Us
            <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </motion.div>

        {/* HUD Crosshair corner accents */}
        <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-accent/20" />
        <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-accent/20" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-600"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">System Ready</span>
        <div className="relative w-[2px] h-12 bg-white/5 overflow-hidden">
           <motion.div 
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1/2 bg-accent"
           />
        </div>
      </motion.div>
    </section>
  );
}

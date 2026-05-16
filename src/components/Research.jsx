import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

export default function Research() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const cardScale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);

  return (
    <section id="research" ref={sectionRef} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80"
          alt="Research technology"
          className="w-full h-full object-cover blur-sm"
          style={{ opacity: 0.1 }}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.9 }} />
      </motion.div>

      <div className="section-padding relative z-10">
        <motion.div
          variants={scrollRevealVariants.blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>R&D</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Research & <span style={{ color: 'var(--accent)' }}>Innovation</span>
          </h2>
        </motion.div>

        <motion.div
          variants={scrollRevealVariants.scaleFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <motion.div style={{ scale: cardScale }}>
            <div
              className="glass-card p-7 sm:p-10 text-center relative overflow-hidden"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, rgba(var(--accent-rgb), 0.05), transparent)` }}
              />
              <div className="relative z-10">
                <div
                  className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  <Lock className="w-6 sm:w-7 h-6 sm:h-7" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Research Access Required</h3>
                <p className="text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  This section is available to authorized personnel only. Request access to view ongoing projects and innovation labs.
                </p>
                <button
                  className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--accent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 25px rgba(var(--accent-rgb), 0.15)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Request Login Access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

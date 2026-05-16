import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Lock, Award, FileCheck } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

const trustPoints = [
  { icon: Lock, title: 'Zero Data Exposure', desc: 'Complete data isolation with zero-trust architecture' },
  { icon: ShieldCheck, title: 'End-to-End Encryption', desc: 'Military-grade encryption across all communications' },
  { icon: Award, title: 'Defense-Grade Standards', desc: 'Compliance with international defense protocols' },
  { icon: FileCheck, title: 'Strict NDA Compliance', desc: 'Rigorous confidentiality and contractual safeguards' },
];

export default function TrustSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(to bottom, var(--bg-primary), rgba(var(--accent-rgb), 0.03), var(--bg-primary))`,
          }}
        />
      </motion.div>

      <div className="section-padding relative z-10">
        <motion.div
          variants={scrollRevealVariants.blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>Trust</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-3xl mx-auto leading-tight" style={{ color: 'var(--text-primary)' }}>
            Why Corporates & Defense Organizations Trust{' '}
            <span style={{ color: 'var(--accent)' }}>SniperAero</span>
          </h2>
        </motion.div>

        <motion.div
          variants={scrollRevealVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {trustPoints.map((item, index) => (
            <motion.div
              key={item.title}
              variants={scrollRevealVariants.staggerChild}
              className="group text-center p-5 sm:p-6 rounded-2xl transition-all duration-500"
              style={{
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-border)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--accent-subtle)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                <item.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-orbitron text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-dimmer)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

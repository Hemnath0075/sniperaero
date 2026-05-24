import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Lock, Award, FileCheck, Server } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

const trustPoints = [
  { icon: Lock, title: 'Zero data exposure', desc: 'Across all R&D programs and operations' },
  { icon: ShieldCheck, title: 'End-to-end encryption', desc: 'Development pipelines with controlled access' },
  { icon: Award, title: 'Defense-grade standards', desc: 'Secure system design aligned with regulations' },
  { icon: FileCheck, title: 'Strict NDA compliance', desc: 'Confidentiality agreements for all engagements' },
  { icon: Server, title: 'Isolated environments', desc: 'Project compartmentation and access control' },
];

export default function TrustSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side — Shield Graphic */}
          <motion.div
            variants={scrollRevealVariants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative flex items-center justify-center"
          >
            {/* Animated shield visualization */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(var(--accent-rgb), 0.15)',
                  borderTopColor: 'rgba(var(--accent-rgb), 0.6)',
                }}
              />
              {/* Middle rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-6 sm:inset-8 rounded-full"
                style={{
                  border: '1px solid rgba(var(--accent-rgb), 0.1)',
                  borderBottomColor: 'rgba(168, 85, 247, 0.5)',
                }}
              />
              {/* Inner pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-12 sm:inset-16 rounded-full"
                style={{
                  border: '2px solid rgba(var(--accent-rgb), 0.3)',
                  background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.08), transparent 70%)',
                }}
              />
              {/* Hexagonal grid background */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
                <defs>
                  <pattern id="hexagons" width="40" height="46" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                    <polygon points="20,0 40,11.5 40,34.5 20,46 0,34.5 0,11.5" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--accent)' }} />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#hexagons)" />
              </svg>

              {/* Shield icon center */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(168, 85, 247, 0.1))',
                  border: '1px solid rgba(var(--accent-rgb), 0.3)',
                  boxShadow: '0 0 60px rgba(var(--accent-rgb), 0.15), inset 0 0 30px rgba(var(--accent-rgb), 0.05)',
                }}
              >
                <Lock className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 10px rgba(var(--accent-rgb), 0.4))' }} />
              </motion.div>

              {/* Scanning line */}
              <motion.div
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute left-[10%] right-[10%] h-[1px]"
                style={{
                  background: `linear-gradient(to right, transparent, rgba(var(--accent-rgb), 0.5), transparent)`,
                  boxShadow: '0 0 8px rgba(var(--accent-rgb), 0.3)',
                }}
              />

              {/* Corner data points */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[9px] font-mono"
                  style={{ color: 'var(--accent)' }}
                >
                  SEC: ACTIVE
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-[9px] font-mono"
                  style={{ color: 'rgba(168, 85, 247, 0.8)' }}
                >
                  ENC: AES-256
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side — Content */}
          <motion.div
            variants={scrollRevealVariants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-5 leading-tight uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
              Why Corporates and Defense Organizations Trust{' '}
              <span style={{ color: 'var(--accent)' }}>SniperAero</span>
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed mb-8" style={{ color: 'var(--text-dim)' }}>
              We operate with a strict confidentiality-first engineering approach. Every project, dataset, and system is handled under controlled access, secure architecture, and end-to-end encryption protocols.
            </p>

            {/* Trust Points List */}
            <div className="space-y-3">
              {trustPoints.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-border)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                  }}
                >
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      border: '1px solid var(--accent-border)',
                    }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold font-inter" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: 'var(--text-dimmer)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-xs sm:text-sm italic font-light"
              style={{ color: 'var(--accent)', opacity: 0.7 }}
            >
              Trust is engineered into every system we build.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

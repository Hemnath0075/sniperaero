import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

export default function LearningHub() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const cardScale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);

  return (
    <section id="learning-hub" ref={sectionRef} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="Learning technology"
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
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>Resources</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Learning <span style={{ color: 'var(--accent)' }}>Hub</span>
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
                style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), transparent)' }}
              />
              <div className="relative z-10">
                <div
                  className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}
                >
                  <BookOpen className="w-6 sm:w-7 h-6 sm:h-7" style={{ color: '#a855f7' }} />
                </div>
                <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Learning Hub</h3>
                <p className="text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  Access our curated learning resources, courseware, and materials. Login required for full access.
                </p>
                <button
                  className="group inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    color: '#a855f7',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(168, 85, 247, 0.15)';
                    e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                  }}
                >
                  Ask for Login Access
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

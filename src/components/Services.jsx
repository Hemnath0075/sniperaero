import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Shield, Cpu, Server } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: Plane,
    title: 'UAV Systems',
    description: 'Advanced UAV, FPV, and VTOL drone solutions with autonomous capabilities, multi-payload integration, AI-driven analytics, air quality monitoring, LiDAR-based surveying, and customized solutions for mission-critical operations.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80',
  },
  {
    icon: Shield,
    title: 'Counter-UAV',
    description: 'Advanced counter-UAV and anti-drone systems with autonomous detection, multi-layer threat analysis, AI-driven tracking, real-time neutralization, and customized security solutions.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  },
  {
    icon: Cpu,
    title: 'IoT & Embedded Systems',
    description: 'End-to-end IoT and embedded solutions including PCB design, firmware development, embedded systems, cloud integration, onboard computing, and FPGA acceleration.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
  {
    icon: Server,
    title: 'System Architecture & Software',
    description: 'Full-stack development, DevOps, Kubernetes, AI/ML integration, cybersecurity, cloud infrastructure, and scalable secure deployments.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowX = useTransform(scrollYProgress, [0, 1], ['60%', '30%']);

  return (
    <section id="services" ref={sectionRef} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background accent - parallax */}
      <motion.div
        style={{ x: glowX }}
        className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[150px] sm:blur-[200px]"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full" style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.03)' }} />
      </motion.div>

      <div className="section-padding">
        {/* Header */}
        <motion.div
          variants={scrollRevealVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>
            What We Do
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Our <span style={{ color: 'var(--accent)' }}>Services</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            Comprehensive solutions across UAV systems, cybersecurity, IoT, and enterprise software
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={scrollRevealVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={scrollRevealVariants.staggerChild}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-border)';
                e.currentTarget.style.boxShadow = `0 0 30px rgba(var(--accent-rgb), 0.1)`;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div className="relative h-36 sm:h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, var(--bg-primary), rgba(var(--accent-rgb), 0.05), transparent)`,
                  }}
                />
                <div
                  className="absolute top-4 left-4 w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center backdrop-blur-sm"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  <service.icon className="w-4 sm:w-5 h-4 sm:h-5" style={{ color: 'var(--accent)' }} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="font-orbitron text-sm sm:text-base font-semibold mb-2 sm:mb-3 group-hover:text-[color:var(--accent)] transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                  {service.description}
                </p>
              </div>

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                style={{
                  background: `linear-gradient(to right, transparent, rgba(var(--accent-rgb), 0), transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

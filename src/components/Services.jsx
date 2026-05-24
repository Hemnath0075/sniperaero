import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Shield, Cpu, Server } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';
import TechCanvas from './TechCanvas';
import FloatingDrone from './FloatingDrone';

const services = [
  {
    icon: Plane,
    title: 'UAV SYSTEMS',
    description: 'Advanced UAV, FPV, and VTOL platforms featuring autonomous navigation, AI-powered analytics, multi-payload integration, air quality monitoring, and LiDAR-based surveying for complex operational environments.',
    image: '/service_uav.png',
  },
  {
    icon: Shield,
    title: 'Counter-UAV',
    description: 'Intelligent counter-UAV and anti-drone systems equipped with autonomous detection, AI-driven target tracking, layered threat assessment, and real-time neutralization for critical security and defense operations.',
    image: '/service_counter_uav.png',
  },
  {
    icon: Cpu,
    title: 'IoT & Embedded',
    description: 'End-to-end IoT and embedded engineering services covering PCB design, firmware development, onboard computing, FPGA acceleration, embedded architecture, and seamless cloud-connected solutions for smart applications.',
    image: '/service_iot.png',
  },
  {
    icon: Server,
    title: 'System Architecture & Scalable Software Solutions',
    description: 'Enterprise-grade software and infrastructure solutions including full-stack development, DevOps, Kubernetes orchestration, AI/ML integration, cybersecurity, ethical hacking, and scalable cloud-native deployments for high-performance environments.',
    image: '/service_software.png',
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
      {/* Tech Canvas Background */}
      <TechCanvas opacity={0.12} />

      {/* Floating Drone */}
      <FloatingDrone position="top-right" size={100} />

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
          {/* <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>
            What We Do
          </span> */}
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

import { motion } from 'framer-motion';
import { Plane, Shield, Cpu, Server } from 'lucide-react';

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[200px]" />

      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Comprehensive solutions across UAV systems, cybersecurity, IoT, and enterprise software
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center backdrop-blur-sm">
                  <service.icon className="w-5 h-5 text-accent" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-orbitron text-base font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/40 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

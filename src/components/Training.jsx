import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, BrainCircuit, Wifi, ShieldCheck, CircuitBoard, Code2 } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

const programs = [
  {
    icon: Rocket,
    title: 'Drone Design and Developement',
    description: 'We provide end-to-end drone design and development, including airframe engineering, propulsion systems, avionics, flight control, autonomous capabilities, multi-payload integration, FPV simulation, coding and programming, FPV piloting, MATLAB-based airflow design and analysis, and fully customized UAV solutions for mission-critical applications.',
    hoverColor: 'rgb(34, 211, 238)',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Ethical Hacking (CEH v13)',
    description: 'We provide advanced cybersecurity and ethical hacking training based on CEH v13, covering network security, penetration testing, vulnerability assessment, malware analysis, and real-world attack simulation, along with hands-on experience in hardware hacking, RF security, drone security, mobile hacking, and modern attack techniques, designed to build industry-ready security professionals.',
    hoverColor: 'rgb(248, 113, 113)',
  },
  {
    icon: BrainCircuit,
    title: 'Autonomous Systems & AI',
    description: 'We provide advanced autonomous systems and AI solutions, including intelligent decision-making, computer vision, real-time data processing, edge AI deployment, multi-agent coordination, reinforcement learning, sensor fusion, predictive analytics, and fully customized solutions for mission-critical applications.',
    hoverColor: 'rgb(192, 132, 252)',
  },
  {
    icon: CircuitBoard,
    title: 'Hardware and IIoT',
    description: 'We provide advanced hardware training covering PCB design, circuit analysis, embedded systems, microcontrollers, sensor integration, debugging, prototyping, and hands-on development, designed to build industry-ready hardware engineers.',
    hoverColor: 'rgb(251, 191, 36)',
  },
  {
    icon: Wifi,
    title: 'Industrial IoT Solutions',
    description: 'We provide advanced Industrial IoT solutions, including smart sensing, real-time monitoring, edge computing, cloud integration, predictive maintenance, industrial automation, digital twin integration, AI-driven analytics, secure connectivity, remote asset management, and fully customized solutions for scalable, mission-critical operations.',
    hoverColor: 'rgb(74, 222, 128)',
  },
  {
    icon: Code2,
    title: 'Programming & Advanced Software Development',
    description: 'We provide comprehensive training in Python, Java, full-stack development, DevOps, AI/ML, data analytics, data science, AWS cloud, API development, microservices architecture, database management, system design, and modern software engineering practices, designed to build industry-ready developers for scalable and high-performance applications.',
    hoverColor: 'rgb(56, 189, 248)',
  },
];

export default function Training() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section id="training" ref={sectionRef} className="relative py-16 sm:py-24">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[140px] sm:blur-[180px]"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full" style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)' }} />
      </motion.div>

      <div className="section-padding">
        <motion.div
          variants={scrollRevealVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>Programs</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Training <span style={{ color: 'var(--accent)' }}>Programs</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            Industry-ready training in UAV, AI, cybersecurity, IoT, and software engineering
          </p>
        </motion.div>

        <motion.div
          variants={scrollRevealVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {programs.map((prog) => (
            <motion.div
              key={prog.title}
              variants={scrollRevealVariants.staggerChild}
              className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-500"
              style={{
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = prog.hoverColor.replace('rgb', 'rgba').replace(')', ', 0.4)');
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
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <prog.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <h3
                className="font-orbitron text-xs sm:text-sm font-semibold mb-1 transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                {prog.title}
              </h3>
              {prog.subtitle && (
                <span
                  className="inline-block text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full mb-3"
                  style={{
                    color: 'rgba(var(--accent-rgb), 0.7)',
                    backgroundColor: 'var(--accent-subtle)',
                  }}
                >
                  {prog.subtitle}
                </span>
              )}
              <p className="text-[11px] sm:text-xs leading-relaxed mt-2" style={{ color: 'var(--text-dim)' }}>{prog.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

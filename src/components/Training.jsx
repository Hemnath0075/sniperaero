import { motion } from 'framer-motion';
import { Rocket, BrainCircuit, Wifi, ShieldCheck, CircuitBoard, Code2 } from 'lucide-react';

const programs = [
  {
    icon: Rocket,
    title: 'Drone Design & Development',
    description: 'Airframe engineering, propulsion, avionics, flight control, autonomous systems, FPV simulation, coding, MATLAB-based airflow design.',
    border: 'hover:border-cyan-400/40',
  },
  {
    icon: BrainCircuit,
    title: 'Autonomous Systems & AI',
    description: 'Intelligent decision-making, computer vision, edge AI, multi-agent coordination, reinforcement learning, sensor fusion.',
    border: 'hover:border-purple-400/40',
  },
  {
    icon: Wifi,
    title: 'Industrial IoT Solutions',
    description: 'Smart sensing, real-time monitoring, edge computing, predictive maintenance, digital twin, AI-driven analytics.',
    border: 'hover:border-green-400/40',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Ethical Hacking',
    subtitle: 'CEH v13',
    description: 'Network security, penetration testing, vulnerability assessment, malware analysis, hardware hacking, RF security, drone security.',
    border: 'hover:border-red-400/40',
  },
  {
    icon: CircuitBoard,
    title: 'Hardware & IIoT',
    description: 'PCB design, circuit analysis, embedded systems, microcontrollers, sensor integration, prototyping.',
    border: 'hover:border-amber-400/40',
  },
  {
    icon: Code2,
    title: 'Programming & Software',
    description: 'Python, Java, full-stack, DevOps, AI/ML, data science, AWS, microservices, system design.',
    border: 'hover:border-sky-400/40',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Training() {
  return (
    <section id="training" className="relative py-24">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[180px]" />
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Programs</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Training <span className="text-accent">Programs</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Industry-ready training in UAV, AI, cybersecurity, IoT, and software engineering
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((prog) => (
            <motion.div
              key={prog.title}
              variants={cardVariants}
              className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:bg-white/[0.04] ${prog.border}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-accent/30 transition-all duration-300">
                <prog.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-orbitron text-sm font-semibold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                {prog.title}
              </h3>
              {prog.subtitle && (
                <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-accent/70 bg-accent/10 px-2 py-0.5 rounded-full mb-3">
                  {prog.subtitle}
                </span>
              )}
              <p className="text-gray-500 text-xs leading-relaxed mt-2">{prog.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

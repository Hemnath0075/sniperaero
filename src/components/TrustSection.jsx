import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Award, FileCheck } from 'lucide-react';

const trustPoints = [
  { icon: Lock, title: 'Zero Data Exposure', desc: 'Complete data isolation with zero-trust architecture' },
  { icon: ShieldCheck, title: 'End-to-End Encryption', desc: 'Military-grade encryption across all communications' },
  { icon: Award, title: 'Defense-Grade Standards', desc: 'Compliance with international defense protocols' },
  { icon: FileCheck, title: 'Strict NDA Compliance', desc: 'Rigorous confidentiality and contractual safeguards' },
];

export default function TrustSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary/30 to-primary" />

      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Trust</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-3xl mx-auto leading-tight">
            Why Corporates & Defense Organizations Trust{' '}
            <span className="text-accent">SniperAero</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {trustPoints.map((item) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="group text-center p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-orbitron text-xs font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 text-[11px] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

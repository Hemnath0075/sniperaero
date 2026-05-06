import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export default function Research() {
  return (
    <section id="research" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80"
          alt="Research technology"
          className="w-full h-full object-cover opacity-10 blur-sm"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">R&D</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Research & <span className="text-accent">Innovation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="glass-card p-10 text-center border border-white/[0.08] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Research Access Required</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                This section is available to authorized personnel only. Request access to view ongoing projects and innovation labs.
              </p>
              <button className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-sm tracking-wide hover:bg-accent/20 hover:border-accent/60 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] transition-all duration-300">
                Request Login Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

/**
 * A small animated drone SVG that floats around with data readouts.
 * Use as a decorative background element in sections.
 */
export default function FloatingDrone({
  size = 120,
  className = '',
  position = 'top-right',
  showData = true,
}) {
  const positionClasses = {
    'top-right': 'top-8 right-8 sm:top-12 sm:right-12',
    'top-left': 'top-8 left-8 sm:top-12 sm:left-12',
    'bottom-right': 'bottom-8 right-8 sm:bottom-12 sm:right-12',
    'bottom-left': 'bottom-8 left-8 sm:bottom-12 sm:left-12',
    'center-left': 'top-1/2 left-4 sm:left-8 -translate-y-1/2',
    'center-right': 'top-1/2 right-4 sm:right-8 -translate-y-1/2',
  };

  return (
    <motion.div
      className={`absolute pointer-events-none z-0 opacity-20 ${positionClasses[position] || ''} ${className}`}
      animate={{
        y: [0, -15, 0, -8, 0],
        x: [0, 5, -3, 8, 0],
        rotate: [0, 1, -1, 0.5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        width={size}
        height={size * 0.55}
        viewBox="0 0 200 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'var(--accent)', filter: `drop-shadow(0 0 12px rgba(var(--accent-rgb), 0.3))` }}
      >
        {/* Main Body */}
        <path d="M80 55L120 55L125 60L75 60L80 55Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M90 50L110 50L115 55L85 55L90 50Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.8" />

        {/* Arms */}
        <path d="M80 55L50 30M80 60L50 85M120 55L150 30M120 60L150 85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Motors */}
        <circle cx="50" cy="30" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="50" cy="85" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="150" cy="30" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="150" cy="85" r="8" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />

        {/* Spinning blades */}
        <motion.circle
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          cx="50" cy="30" r="12" stroke="currentColor" strokeWidth="0.4" strokeDasharray="6 4"
          style={{ transformOrigin: '50px 30px' }}
        />
        <motion.circle
          animate={{ rotate: -360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          cx="50" cy="85" r="12" stroke="currentColor" strokeWidth="0.4" strokeDasharray="6 4"
          style={{ transformOrigin: '50px 85px' }}
        />
        <motion.circle
          animate={{ rotate: -360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          cx="150" cy="30" r="12" stroke="currentColor" strokeWidth="0.4" strokeDasharray="6 4"
          style={{ transformOrigin: '150px 30px' }}
        />
        <motion.circle
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
          cx="150" cy="85" r="12" stroke="currentColor" strokeWidth="0.4" strokeDasharray="6 4"
          style={{ transformOrigin: '150px 85px' }}
        />

        {/* Camera lens */}
        <circle cx="100" cy="58" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="58" r="1.5" fill="currentColor" fillOpacity="0.5" />
      </svg>

      {/* Data readout */}
      {showData && (
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-1 flex gap-4 justify-center"
        >
          <span className="text-[8px] font-mono tracking-wider" style={{ color: 'var(--accent)' }}>
            ALT: 127m
          </span>
          <span className="text-[8px] font-mono tracking-wider" style={{ color: 'var(--accent)' }}>
            SPD: 42km/h
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook for parallax scrolling effect
 * @param {number} speed - Parallax speed multiplier (0.1 = slow, 1 = normal scroll)
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

/**
 * Hook for scroll-triggered reveal animations (IntersectionObserver-based)
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection
 * @param {boolean} options.once - Trigger only once
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * Hook for scroll progress tracking (0 to 1) 
 * Tracks how far through a section the user has scrolled
 */
export function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementHeight = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Progress from 0 (element just entering viewport) to 1 (element fully scrolled past)
      const start = rect.top - windowHeight;
      const end = rect.top + elementHeight;
      const total = end - start;
      const current = -start;
      
      setProgress(Math.max(0, Math.min(1, current / total)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}

/**
 * Framer Motion variants for Apple-style scroll reveals
 */
export const scrollRevealVariants = {
  // Fade up (classic Apple)
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Scale fade (product reveal)
  scaleFade: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Slide from left
  slideLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Slide from right
  slideRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Blur reveal
  blurReveal: {
    hidden: { opacity: 0, filter: 'blur(20px)', y: 30 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  // Stagger container
  staggerContainer: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  },
  // Stagger child
  staggerChild: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
};

import { useEffect, useRef } from 'react';

/**
 * Lightweight animated tech background canvas.
 * Draws floating circuit-like nodes, connecting lines, and a subtle radar sweep.
 * Adapts to CSS custom properties for theme-awareness.
 */
export default function TechCanvas({ className = '', opacity = 0.15 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let nodes = [];
    let radarAngle = 0;

    const getColor = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue('--particle-color').trim() || '0, 212, 255';
    };

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      initNodes();
    };

    class Node {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;
        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
          this.reset();
        }
      }
      draw(color) {
        const o = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
        // Draw a small cross instead of just a dot for a tech feel
        ctx.strokeStyle = `rgba(${color}, ${o})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(this.x - this.size, this.y);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.stroke();
        // Center dot
        ctx.fillStyle = `rgba(${color}, ${o * 1.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initNodes() {
      const count = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new Node());
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getColor();

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw(color);
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${color}, ${0.04 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Radar sweep from center
      radarAngle += 0.005;
      const cx = canvas.width * 0.85;
      const cy = canvas.height * 0.15;
      const radius = Math.min(canvas.width, canvas.height) * 0.2;

      ctx.save();
      ctx.globalAlpha = 0.15;
      // Radar arc
      const gradient = ctx.createConicalGradient
        ? null  // Not available in all browsers
        : ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      if (gradient) {
        gradient.addColorStop(0, `rgba(${color}, 0.1)`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
      }

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, radarAngle, radarAngle + 0.4);
      ctx.closePath();
      ctx.fillStyle = gradient || `rgba(${color}, 0.03)`;
      ctx.fill();

      // Radar circle border
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, 0.08)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.3)`;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(radarAngle) * radius, cy + Math.sin(radarAngle) * radius);
      ctx.strokeStyle = `rgba(${color}, 0.2)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}

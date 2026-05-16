import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { FaInstagram } from "react-icons/fa";
import { scrollRevealVariants } from '../hooks/useScrollAnimation';

const subjects = ['UAV Systems', 'Counter-UAV', 'IoT & Embedded', 'Software', 'Training', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) errs.phone = 'Enter a valid 10-digit phone';
    if (!form.subject) errs.subject = 'Please select a subject';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 4000);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const inputStyle = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    color: 'var(--input-text)',
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-[150px] sm:blur-[200px]"
        style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.03)' }}
      />

      <div className="section-padding relative z-10">
        <motion.div
          variants={scrollRevealVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block" style={{ color: 'var(--accent)' }}>Get In Touch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Contact <span style={{ color: 'var(--accent)' }}>Us</span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>
            Ready to discuss your project? Reach out and our team will get back to you promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Left — Contact Info */}
          <motion.div
            variants={scrollRevealVariants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold mb-1 font-inter" style={{ color: 'var(--text-primary)' }}>Location</h4>
                  <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'var(--text-dim)' }}>CFI, Sudha and Shankar Innovation Hub,<br />IIT Madras, Chennai - 600036</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold mb-1 font-inter" style={{ color: 'var(--text-primary)' }}>Email</h4>
                  <a href="mailto:Manager@sniperaero.com" className="text-[11px] sm:text-xs transition-colors" style={{ color: 'var(--text-dim)' }}>Manager@sniperaero.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    border: '1px solid var(--accent-border)',
                  }}
                >
                  <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold mb-1 font-inter" style={{ color: 'var(--text-primary)' }}>Phone</h4>
                  <a href="tel:9952269356" className="text-[11px] sm:text-xs transition-colors" style={{ color: 'var(--text-dim)' }}>+91 99522 69356</a>
                </div>
              </div>
            </div>

            {/* Trusted By */}
            <div className="pt-5 sm:pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase block mb-3 sm:mb-4" style={{ color: 'var(--text-dimmer)' }}>Trusted By</span>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {['L&T', 'TN Government'].map((name) => (
                  <span
                    key={name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wide"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            variants={scrollRevealVariants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div
              className="glass-card p-5 sm:p-8 relative overflow-hidden"
              style={{ border: '1px solid var(--border-color)' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, rgba(var(--accent-rgb), 0.02), transparent)` }}
              />

              {submitted ? (
                <div className="relative z-10 text-center py-8 sm:py-12">
                  <CheckCircle className="w-12 sm:w-14 h-12 sm:h-14 text-green-400 mx-auto mb-4" />
                  <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-dim)' }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>Full Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-inter focus:outline-none transition-all duration-300 t-input"
                        style={inputStyle}
                      />
                      {errors.name && <p className="text-red-400 text-[10px] sm:text-[11px] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-inter focus:outline-none transition-all duration-300 t-input"
                        style={inputStyle}
                      />
                      {errors.email && <p className="text-red-400 text-[10px] sm:text-[11px] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-inter focus:outline-none transition-all duration-300 t-input"
                        style={inputStyle}
                      />
                      {errors.phone && <p className="text-red-400 text-[10px] sm:text-[11px] mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>Subject</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-inter focus:outline-none transition-all duration-300 t-input"
                        style={inputStyle}
                      >
                        <option value="">Select subject</option>
                        {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                      {errors.subject && <p className="text-red-400 text-[10px] sm:text-[11px] mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 tracking-wide uppercase" style={{ color: 'var(--text-muted)' }}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-inter resize-none focus:outline-none transition-all duration-300 t-input"
                      style={inputStyle}
                    />
                    {errors.message && <p className="text-red-400 text-[10px] sm:text-[11px] mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px rgba(var(--accent-rgb), 0.3)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

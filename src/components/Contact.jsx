import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { FaInstagram } from "react-icons/fa";

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

  const inputBase = 'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300 font-inter';
  const labelBase = 'block text-xs font-semibold text-gray-400 mb-2 tracking-wide uppercase';

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[200px]" />

      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact <span className="text-accent">Us</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Ready to discuss your project? Reach out and our team will get back to you promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1 font-inter">Location</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">CFI, Sudha and Shankar Innovation Hub,<br />IIT Madras, Chennai - 600036</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1 font-inter">Email</h4>
                  <a href="mailto:Manager@sniperaero.com" className="text-gray-500 text-xs hover:text-accent transition-colors">Manager@sniperaero.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1 font-inter">Phone</h4>
                  <a href="tel:9952269356" className="text-gray-500 text-xs hover:text-accent transition-colors">+91 99522 69356</a>
                </div>
              </div>
            </div>

            {/* Trusted By */}
            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-600 block mb-4">Trusted By</span>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-gray-400 tracking-wide">L&T</span>
                <span className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-gray-400 tracking-wide">TN Government</span>
              </div>
            </div>

            {/* Social */}
            {/* <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-600 block mb-4">Follow Us</span>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Linkedin, href: '#' },
                  { Icon: Twitter, href: '#' },
                  { Icon: FaInstagram, href: '#' },
                  { Icon: Youtube, href: '#' },
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-accent hover:border-accent/30 hover:bg-accent/10 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))} */}
              {/* </div> */}
            {/* </div> */}
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 border border-white/[0.08] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent" />

              {submitted ? (
                <div className="relative z-10 text-center py-12">
                  <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className={labelBase}>Full Name</label>
                      <input id="contact-name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputBase} />
                      {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelBase}>Email Address</label>
                      <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className={inputBase} />
                      {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className={labelBase}>Phone Number</label>
                      <input id="contact-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" className={inputBase} />
                      {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className={labelBase}>Subject</label>
                      <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange} className={`${inputBase} ${!form.subject ? 'text-gray-600' : ''}`}>
                        <option value="">Select subject</option>
                        {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                      {errors.subject && <p className="text-red-400 text-[11px] mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelBase}>Message</label>
                    <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your project..." className={`${inputBase} resize-none`} />
                    {errors.message && <p className="text-red-400 text-[11px] mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-primary font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:scale-[1.01] transition-all duration-300"
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

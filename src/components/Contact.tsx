import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useFormSubmission } from '../hooks/useFormSubmission';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { isSubmitting, submitMessage, submitError, submitContactForm, clearMessages } = useFormSubmission();

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shankranand332@gmail.com',
      link: 'mailto:shankranand332@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Mobile / WhatsApp',
      value: '+91 6203447902',
      link: 'https://wa.me/916203447902',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Greater Noida, Uttar Pradesh, India',
      link: null,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/Sruwat',
      username: '@Sruwat',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shankranand-sarswati-53b65622b',
      username: 'shankranand-sarswati',
    },
    {
      icon: ExternalLink,
      label: 'Portfolio',
      url: 'https://advance-portfolio-phi.vercel.app/',
      username: 'Portfolio Website',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    const success = await submitContactForm(formData);
    if (success) {
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" ref={ref} id="contact">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl mb-8">Contact Information</h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                        <p className="text-white">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                        <p className="text-white">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div>
              <h4 className="text-xl mb-6">Connect With Me</h4>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <social.icon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-sm text-gray-400">{social.label}</p>
                      <p className="text-white">{social.username}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl mb-6">Send Me a Message</h3>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-center"
                  >
                    {submitError}
                  </motion.div>
                )}

                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400 text-center"
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-slate-800 text-center text-gray-400"
        >
          <p>&copy; 2025 Shankranand Sarswati. All rights reserved.</p>
          <p className="mt-2"></p>
        </motion.div>
      </div>
    </div>
  );
}
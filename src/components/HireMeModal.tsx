import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useFormSubmission } from '../hooks/useFormSubmission';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  const { isSubmitting, submitMessage, submitError, submitHireMeForm, clearMessages } = useFormSubmission();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    budget: '',
    timeline: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitHireMeForm(formData);
    if (success) {
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          position: '',
          budget: '',
          timeline: '',
          description: '',
        });
        clearMessages();
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Hire Me
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Let's discuss your project</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm text-gray-400 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="Your Company"
                  />
                </div>

                {/* Position */}
                <div>
                  <label htmlFor="position" className="block text-sm text-gray-400 mb-2">
                    Position / Job Title
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                    placeholder="e.g., Senior Developer, Project Manager"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm text-gray-400 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k - $50k">$25k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="$100k+">$100k+</option>
                    <option value="TBD">TBD</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm text-gray-400 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white"
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediate">Immediate (ASAP)</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm text-gray-400 mb-2">
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-300 text-white resize-none"
                    placeholder="Tell me about your project, requirements, and expectations..."
                  />
                </div>

                {/* Messages */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm"
                  >
                    {submitError}
                  </motion.div>
                )}

                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400 text-sm"
                  >
                    {submitMessage}
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

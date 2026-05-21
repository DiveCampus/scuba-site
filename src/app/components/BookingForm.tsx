import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Mail, Phone, User, Users, MessageSquare, Send } from 'lucide-react';

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
    course: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Thank you for your booking request! We will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#18476D] via-[#123a5a] to-[#0b2c45]" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-[#00d4ff]/20 mb-6">
            <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">
              Reserve Your Spot
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Book Your <span className="bg-gradient-to-r from-[#00d4ff] to-[#06b6d4] bg-clip-text text-transparent">Adventure</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Ready to dive in? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#06b6d4]/20 border border-[#00d4ff]/30">
                  <Phone className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Phone</h3>
                  <p className="text-white/70">+971 50 123 4567</p>
                  <p className="text-white/70">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#06b6d4]/20 border border-[#00d4ff]/30">
                  <Mail className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                  <p className="text-white/70">info@aquadive.com</p>
                  <p className="text-white/70">We reply within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#06b6d4]/20 border border-[#00d4ff]/30">
                  <Calendar className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Opening Hours</h3>
                  <p className="text-white/70">Monday - Sunday: 7:00 AM - 8:00 PM</p>
                  <p className="text-white/70">Dive trips daily at 8 AM & 2 PM</p>
                </div>
              </div>
            </div>

            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden rounded-2xl aspect-video">
              <img
                src="/img1.webp"
                alt="Custom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent" />
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-2xl p-8 lg:p-10 backdrop-blur-xl bg-white/5 border border-white/10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent" />

            <div className="relative space-y-6">
              <div>
                <label className="flex items-center gap-2 text-white mb-2 text-sm font-medium">
                  <User className="w-4 h-4 text-[#00d4ff]" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 text-sm font-medium">
                    <Mail className="w-4 h-4 text-[#00d4ff]" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white mb-2 text-sm font-medium">
                    <Phone className="w-4 h-4 text-[#00d4ff]" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white mb-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-[#00d4ff]" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white mb-2 text-sm font-medium">
                    <Users className="w-4 h-4 text-[#00d4ff]" />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-[#0f172a]">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white mb-2 text-sm font-medium block">
                  Select Course
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                >
                  <option value="" className="bg-[#0f172a]">Choose a course...</option>
                  <option value="beginner" className="bg-[#0f172a]">Beginner Open Water</option>
                  <option value="advanced" className="bg-[#0f172a]">Advanced Diving</option>
                  <option value="rescue" className="bg-[#0f172a]">Rescue Diver</option>
                  <option value="divemaster" className="bg-[#0f172a]">Dive Master Pro</option>
                  <option value="experience" className="bg-[#0f172a]">Dive Experience</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white mb-2 text-sm font-medium">
                  <MessageSquare className="w-4 h-4 text-[#00d4ff]" />
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                  placeholder="Any special requests or questions?"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#06b6d4] text-[#0a0e27] font-bold text-lg flex items-center justify-center gap-2 overflow-hidden group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
                <span className="relative">Submit Booking Request</span>
                <Send className="w-5 h-5 relative" />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

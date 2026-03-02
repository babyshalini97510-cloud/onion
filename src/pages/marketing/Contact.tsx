import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-24">
        {/* Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl font-black text-stone-800 tracking-tighter leading-none"
            >
              GET IN <br />
              <span className="text-emerald-600">TOUCH.</span>
            </motion.h1>
            <p className="text-xl text-stone-500 leading-relaxed max-w-md">
              Have questions about our products or want to partner with us? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-lg">Our Office</h3>
                <p className="text-stone-500 leading-relaxed">
                  123 Green Valley Road,<br />
                  Maharashtra, India - 411001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-lg">Email Us</h3>
                <p className="text-stone-500 leading-relaxed">
                  hello@waste2wellness.com<br />
                  support@waste2wellness.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-lg">Call Us</h3>
                <p className="text-stone-500 leading-relaxed">
                  +91 98765 43210<br />
                  Mon - Fri, 9am - 6pm
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-stone-50 rounded-[40px] border border-stone-100 flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="font-bold text-stone-800">Live Chat Available</p>
              <p className="text-stone-500 text-sm">Average response time: 5 mins</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[60px] border border-stone-100 shadow-2xl shadow-stone-200/50"
        >
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Your Message</label>
              <textarea 
                rows={5}
                placeholder="How can we help you?"
                className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              />
            </div>

            <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3">
              Send Message <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

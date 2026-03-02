import { motion } from 'motion/react';
import { TrendingUp, Trash2, Globe, Users, Quote, Heart, Leaf, Briefcase } from 'lucide-react';

export default function Impact() {
  const impacts = [
    { 
      title: 'Farmer Income', 
      value: '250%', 
      desc: 'Average increase in annual income for our partner farmers.', 
      icon: Heart, 
      color: 'text-emerald-600 bg-emerald-50' 
    },
    { 
      title: 'Waste Reduction', 
      value: '400 Tons', 
      desc: 'Agricultural waste prevented from rotting in fields annually.', 
      icon: Leaf, 
      color: 'text-emerald-600 bg-emerald-50' 
    },
    { 
      title: 'Sustainability', 
      value: '100%', 
      desc: 'Eco-friendly process with zero chemical runoff.', 
      icon: Globe, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      title: 'Employment', 
      value: '50+', 
      desc: 'Direct and indirect jobs created in rural Maharashtra.', 
      icon: Briefcase, 
      color: 'text-orange-600 bg-orange-50' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf0] font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-[#4a3728] tracking-tight"
        >
          MAKING A <span className="text-emerald-700">REAL DIFFERENCE.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed"
        >
          Our impact is measured in more than just numbers. It's measured in the smiles 
          of farmers and the health of our planet.
        </motion.p>
      </section>

      {/* Impact Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {impacts.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white rounded-[40px] shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-6"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#4a3728]">{item.title} Improvement</h3>
                <p className="text-stone-500 leading-relaxed">
                  <span className="font-bold text-emerald-700 text-lg mr-1">{item.value}</span>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Farmer Story - Styled to match warm aesthetic */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="bg-white rounded-[60px] shadow-sm overflow-hidden flex flex-col md:flex-row border border-stone-100">
          <div className="md:w-1/2 h-96 md:h-auto">
            <img 
              src="https://picsum.photos/seed/farmer-rajesh/800/1000" 
              alt="Farmer Rajesh" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-8">
            <Quote size={48} className="text-emerald-600 opacity-20" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-[#4a3728] italic">
              "Before Waste2Wellness, I used to dump 30% of my harvest every year. Now, 
              every single onion has value. My children can go to a better school, and 
              I have peace of mind."
            </p>
            <div className="pt-4 border-t border-stone-100">
              <p className="text-xl font-bold text-[#4a3728]">Farmer Rajesh</p>
              <p className="text-emerald-700 font-medium">Onion Farmer, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 text-center space-y-16">
        <h2 className="text-3xl font-bold text-[#4a3728] uppercase tracking-widest">Sustainability Commitments</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'Zero Waste', desc: 'We utilize every part of the onion, from skin to seed.' },
            { title: 'Carbon Negative', desc: 'Preventing methane emissions from rotting agricultural waste.' },
            { title: 'Eco-Packaging', desc: 'Using biodegradable and recyclable materials for all products.' },
          ].map(item => (
            <div key={item.title} className="space-y-4 p-8 bg-white/50 rounded-3xl border border-white">
              <div className="w-3 h-3 bg-emerald-600 rounded-full mx-auto" />
              <h3 className="text-xl font-bold text-[#4a3728]">{item.title}</h3>
              <p className="text-stone-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

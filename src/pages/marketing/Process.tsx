import { motion } from 'motion/react';
import { Truck, Filter, Factory, CheckCircle2, Box } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      title: 'Farmer Sourcing',
      desc: 'We partner with local farmers to collect surplus and non-marketable onions.',
      icon: Truck,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Cleaning & Sorting',
      desc: 'Onions are thoroughly cleaned and sorted to ensure only the best quality is processed.',
      icon: Filter,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Separation',
      desc: 'Onion flesh is separated from seeds, directing them to their respective specialized lines.',
      icon: Factory,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Processing',
      desc: 'Flesh becomes Powder & Paste; Seeds are extracted for Tea & Oil.',
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Packaging',
      desc: 'Final products are eco-packaged and ready for distribution.',
      icon: Box,
      color: 'bg-stone-100 text-stone-600',
    },
  ];

  return (
    <div className="bg-[#fdfcf0] min-h-screen pb-24">
      {/* Header */}
      <section className="py-20 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-6"
        >
          Our <span className="text-emerald-800">Step-by-Step</span> Flow
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-stone-600 max-w-2xl mx-auto text-lg"
        >
          Transparency is at the heart of what we do. Follow the journey from the farm to your home.
        </motion.p>
      </section>

      {/* Timeline Flow */}
      <section className="max-w-5xl mx-auto px-4 relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, idx) => (
            <div key={step.title} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Card */}
              <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:pr-12 md:text-left' : 'md:pl-12 md:text-right'}`}>
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{step.desc}</p>
                </motion.div>
              </div>

              {/* Icon Circle */}
              <div className="relative z-10 flex items-center justify-center md:w-[10%]">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white ${step.color}`}
                >
                  <step.icon size={24} />
                </motion.div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[45%]" />
            </div>
          ))}
        </div>
      </section>

      {/* Specialized Production Lines */}
      <section className="max-w-6xl mx-auto px-4 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#4a3728] rounded-[40px] p-10 md:p-20 text-white shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
            Specialized Production Lines
          </h2>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Flesh Line */}
            <div className="space-y-10">
              <div className="inline-block px-4 py-1 bg-[#fdfcf0]/10 rounded-full text-[#fdfcf0] text-sm font-medium uppercase tracking-widest">
                Onion Flesh Line
              </div>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#fdfcf0]/20 rounded-xl flex items-center justify-center font-bold text-lg">1</div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-2">Drying</h4>
                    <p className="text-[#fdfcf0]/70 text-lg leading-relaxed">Controlled dehydration to preserve nutrients and flavor.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#fdfcf0]/20 rounded-xl flex items-center justify-center font-bold text-lg">2</div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-2">Grinding</h4>
                    <p className="text-[#fdfcf0]/70 text-lg leading-relaxed">Fine milling for powder or blending for fresh paste.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seed Line */}
            <div className="space-y-10">
              <div className="inline-block px-4 py-1 bg-[#fdfcf0]/10 rounded-full text-[#fdfcf0] text-sm font-medium uppercase tracking-widest">
                Onion Seed Line
              </div>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#fdfcf0]/20 rounded-xl flex items-center justify-center font-bold text-lg">1</div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-2">Extraction</h4>
                    <p className="text-[#fdfcf0]/70 text-lg leading-relaxed">Cold-press extraction for oil and careful roasting for tea.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#fdfcf0]/20 rounded-xl flex items-center justify-center font-bold text-lg">2</div>
                  <div>
                    <h4 className="text-2xl font-serif font-bold mb-2">Refining</h4>
                    <p className="text-[#fdfcf0]/70 text-lg leading-relaxed">Natural filtration and stabilization for long shelf life.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

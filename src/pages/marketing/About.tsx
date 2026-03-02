import { motion } from 'motion/react';
import { Target, Eye, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="relative py-32 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Our Story
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-stone-800 tracking-tighter leading-none">
            ROOTED IN <br />
            <span className="text-emerald-600">INNOVATION.</span>
          </h1>
          <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Waste2Wellness was born from a simple observation: the tragedy of agricultural waste 
            and the untapped potential of nature's most common ingredients.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 rotate-12"><Target size={300} /></div>
          <div className="absolute bottom-10 right-10 -rotate-12"><Heart size={300} /></div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 rounded-[60px] border border-stone-100 shadow-xl shadow-stone-200/30 space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-black text-stone-800">OUR MISSION</h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              To eliminate onion wastage globally by creating a circular economy that 
              transforms surplus into high-value wellness products, ensuring farmers 
              receive the true value of their labor.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-emerald-900 p-12 rounded-[60px] text-white space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center">
              <Eye size={32} />
            </div>
            <h2 className="text-4xl font-black">OUR VISION</h2>
            <p className="text-emerald-100/70 text-lg leading-relaxed">
              A world where no agricultural surplus goes to waste, where sustainable 
              innovation drives rural prosperity, and where every household has access 
              to natural, potent wellness solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <h2 className="text-4xl font-black text-stone-800 tracking-tight">OUR CORE VALUES</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'Transparency', desc: 'Full traceability from the farmer to the final product.', icon: ShieldCheck },
            { title: 'Innovation', desc: 'Constantly finding new ways to extract value from nature.', icon: Target },
            { title: 'Empathy', desc: 'Putting the farmer and the consumer at the heart of everything.', icon: Heart },
          ].map(item => (
            <div key={item.title} className="space-y-6">
              <div className="w-20 h-20 bg-stone-50 rounded-3xl flex items-center justify-center mx-auto text-emerald-600">
                <item.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-stone-800">{item.title}</h3>
              <p className="text-stone-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Founder Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-[60px] p-12 md:p-24 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/3">
            <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/founder/600/600" 
                alt="Founder" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-4xl font-black text-stone-800">A MESSAGE FROM OUR FOUNDER</h2>
            <p className="text-stone-600 text-lg leading-relaxed italic">
              "Sustainability isn't just a buzzword for us; it's a necessity. We started 
              Waste2Wellness to solve a real-world problem that affects millions of 
              farmers. Every bottle of oil and every pack of tea represents a step 
              towards a more balanced and prosperous agricultural future."
            </p>
            <div>
              <p className="text-xl font-bold text-stone-800">Dr. Anjali Deshmukh</p>
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

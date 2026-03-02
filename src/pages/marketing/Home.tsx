import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf, ArrowRight, Recycle, TrendingDown, Sprout, Heart, Sparkles, Users } from 'lucide-react';

export default function MarketingHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-32 pb-32 bg-[#FDFBF0] -m-8 p-8 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center rounded-[60px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=1920" 
            alt="Onions" 
            className="w-full h-full object-cover brightness-[0.85] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF0]/90 via-[#FDFBF0]/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E2E8D4] rounded-full text-[#0D7A3F] font-bold text-sm border border-[#D1E0B8]">
              <Leaf size={16} />
              <span>Sustainable Agriculture Innovation</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-[100px] font-black leading-[0.85] tracking-tighter text-[#4A3F2F]">
                From Waste to <br />
                <span className="text-[#0D7A3F]">Wellness</span>
              </h1>
            </div>

            <p className="text-2xl text-[#4A3F2F]/80 max-w-xl leading-relaxed font-medium">
              Turning surplus onions into valuable products. We bridge the gap 
              between agricultural waste and premium wellness solutions.
            </p>

            <div className="flex gap-6 pt-4">
              <button 
                onClick={() => navigate('/marketing/products')}
                className="bg-[#2D4F1E] text-white px-10 py-6 rounded-full font-black text-xl hover:bg-[#1D3F0E] transition-all flex items-center gap-3 shadow-2xl shadow-emerald-900/20"
              >
                Explore Products <ArrowRight size={24} />
              </button>
              <button 
                onClick={() => navigate('/marketing/impact')}
                className="bg-transparent border-2 border-[#2D4F1E] text-[#2D4F1E] px-10 py-6 rounded-full font-black text-xl hover:bg-[#2D4F1E]/5 transition-all"
              >
                Our Process
              </button>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute right-24 top-1/2 -translate-y-1/2 flex items-center gap-8"
          >
            <div className="w-48 h-48 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center text-center p-6 border border-stone-100">
              <p className="text-[10px] font-black text-[#0D7A3F] tracking-widest uppercase mb-1">100% NATURAL</p>
              <p className="text-2xl font-black text-[#4A3F2F] leading-tight">Wellness</p>
            </div>

            <div className="bg-white/40 backdrop-blur-md p-4 rounded-full border border-white/60 flex items-center gap-4 pr-12">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Sprout size={24} className="text-[#0D7A3F]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#4A3F2F]">Onion Products</p>
                <div className="w-48 h-2 bg-white/50 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#0D7A3F]"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution Section */}
      <section className="max-w-7xl mx-auto px-12 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <h2 className="text-[56px] font-black text-[#4A3F2F] leading-tight tracking-tighter">
            The Challenge We Solve
          </h2>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-[#FEE2E2] rounded-2xl flex items-center justify-center shrink-0 text-[#EF4444]">
                <Recycle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#4A3F2F]">Massive Food Waste</h3>
                <p className="text-xl text-[#4A3F2F]/60 leading-relaxed">
                  Millions of tons of surplus onions are discarded annually due to market 
                  fluctuations and short shelf life.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-16 h-16 bg-[#FEE2E2] rounded-2xl flex items-center justify-center shrink-0 text-[#EF4444]">
                <TrendingDown size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#4A3F2F]">Farmer Losses</h3>
                <p className="text-xl text-[#4A3F2F]/60 leading-relaxed">
                  Post-harvest losses directly impact the livelihoods of small-scale farmers 
                  who lack processing facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F1F5E9] rounded-[60px] p-16 space-y-10 border border-[#D1E0B8]">
          <h2 className="text-[56px] font-black text-[#0D7A3F] leading-tight tracking-tighter">
            Our Solution
          </h2>
          <p className="text-2xl text-[#4A3F2F]/70 leading-relaxed font-medium">
            We convert these surplus onions into four high-value products, 
            extending shelf life from weeks to months and creating new 
            revenue streams for rural communities.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { title: 'Food', desc: 'Powder & Paste', icon: Sprout },
              { title: 'Wellness', desc: 'Onion Seed Tea', icon: Heart },
              { title: 'Cosmetic', desc: 'Onion Oil', icon: Sparkles },
              { title: 'Impact', desc: 'Rural Employment', icon: Users },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-[32px] space-y-2 shadow-sm border border-[#E2E8D4]">
                <p className="text-lg font-black text-[#0D7A3F]">{item.title}</p>
                <p className="text-sm font-bold text-[#4A3F2F]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="max-w-7xl mx-auto px-12 space-y-16">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <h2 className="text-[56px] font-black text-[#4A3F2F] leading-tight tracking-tighter">Featured Range</h2>
            <p className="text-2xl text-[#4A3F2F]/60 font-medium">Pure, potent, and sustainably sourced.</p>
          </div>
          <button 
            onClick={() => navigate('/marketing/products')}
            className="flex items-center gap-2 text-xl font-black text-[#0D7A3F] hover:gap-4 transition-all"
          >
            View All Products <ArrowRight />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            { name: 'Pure Onion Seed Oil', price: '₹450', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
            { name: 'Wellness Tea', price: '₹280', img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800' },
          ].map((product) => (
            <motion.div
              key={product.name}
              whileHover={{ y: -10 }}
              className="group cursor-pointer space-y-6"
              onClick={() => navigate('/marketing/products')}
            >
              <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden shadow-xl">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full font-black text-xl text-[#4A3F2F]">
                  {product.price}
                </div>
              </div>
              <div className="px-4 space-y-1">
                <h3 className="text-3xl font-black text-[#4A3F2F]">{product.name}</h3>
                <p className="text-lg font-bold text-[#4A3F2F]/50">100% Organic • Sustainably Sourced</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

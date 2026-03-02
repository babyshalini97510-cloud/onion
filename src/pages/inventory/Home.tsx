import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, ShieldAlert, Zap } from 'lucide-react';

export default function InventoryHome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-6 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-stone-800 leading-tight"
        >
          From <span className="text-emerald-600">Waste</span> to <span className="text-amber-600">Wellness</span>
        </motion.h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Every year, millions of tons of onions go to waste due to surplus production and poor storage. 
          This leads to massive financial losses for farmers and environmental strain.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button 
            onClick={() => navigate('/inventory/processing')}
            className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100"
          >
            Start Processing <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => navigate('/marketing/impact')}
            className="bg-white text-stone-800 border border-stone-200 px-8 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all"
          >
            View Impact
          </button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-4">
          <div className="p-3 bg-red-100 text-red-600 w-fit rounded-2xl">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">The Problem</h2>
          <p className="text-stone-600 leading-relaxed">
            Onion prices fluctuate wildly. During surplus, farmers are forced to dump their harvest, 
            leading to zero income and rotting waste in fields.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 w-fit rounded-2xl">
            <Zap size={24} />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">The Solution</h2>
          <p className="text-stone-600 leading-relaxed">
            By converting surplus onions and seeds into value-added products, we extend shelf life 
            from weeks to years and multiply farmer income by up to 10x.
          </p>
        </div>
      </div>

      <section className="bg-amber-100/50 p-10 rounded-[40px] border border-amber-200/50">
        <h2 className="text-2xl font-bold text-stone-800 mb-8 text-center">Our Value-Added Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Powder', 'Paste', 'Seed Tea', 'Oil'].map((product) => (
            <div key={product} className="bg-white p-6 rounded-2xl text-center shadow-sm border border-amber-100">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf size={20} className="text-amber-600" />
              </div>
              <span className="font-bold text-stone-700">{product}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

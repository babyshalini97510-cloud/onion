import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, MapPin, Weight, CheckCircle2, History } from 'lucide-react';
import { motion } from 'motion/react';

export default function FarmerInput() {
  const { addFarmerInput } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    quantity: '',
    quality: 'Good',
    type: 'Fresh Onion'
  });
  const [recentInputs, setRecentInputs] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInput = { ...formData, id: Date.now(), date: new Date().toLocaleTimeString() };
    addFarmerInput(formData);
    setRecentInputs([newInput, ...recentInputs]);
    setFormData({
      name: '',
      location: '',
      quantity: '',
      quality: 'Good',
      type: 'Fresh Onion'
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Farmer Input Form</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-600 ml-1">Farmer Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Rajesh Kumar"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  required
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-4 pl-12 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="Maharashtra"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Quantity (kg)</label>
              <div className="relative">
                <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  required
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full p-4 pl-12 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Quality</label>
              <select
                value={formData.quality}
                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
              >
                <option>Good</option>
                <option>Premium</option>
                <option>Standard</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-600 ml-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
              >
                <option>Fresh Onion</option>
                <option>Onion Seeds</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          >
            Submit to Processing <CheckCircle2 size={20} />
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <History size={24} />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Recent Submissions</h1>
        </div>

        <div className="space-y-4">
          {recentInputs.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <p>No recent submissions yet.</p>
            </div>
          ) : (
            recentInputs.map((input, idx) => (
              <motion.div
                key={input.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-stone-50 border border-stone-100 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-stone-800">{input.name}</p>
                  <p className="text-xs text-stone-500">{input.location} • {input.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{input.quantity} kg</p>
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">{input.type}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Package, Clock, CheckCircle2, User, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SalesDashboard() {
  const { orders } = useApp();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate credentials here
    setIsAuthorized(true);
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white rounded-[40px] p-10 shadow-2xl border border-stone-100 space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
              <Lock size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-stone-800 tracking-tight">SALES ACCESS</h2>
              <p className="text-stone-500 text-sm font-medium">Please verify your identity to view protected sales data and customer information.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 tracking-widest uppercase ml-1">OFFICIAL EMAIL</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-stone-800 placeholder:text-stone-300"
                placeholder="sales@waste2wellness.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 tracking-widest uppercase ml-1">SECURE PASSWORD</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-stone-800 placeholder:text-stone-300"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-3 group"
            >
              Access Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
              Authorized Personnel Only
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-stone-800 tracking-tight">SALES DASHBOARD</h1>
          <p className="text-stone-500">Monitor orders and manage customer fulfillment.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <ShoppingCart size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Total Orders</p>
              <p className="text-2xl font-black text-stone-800">{orders.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Revenue</p>
              <p className="text-2xl font-black text-stone-800">₹{orders.reduce((sum, o) => sum + o.total, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-stone-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-stone-800">Recent Orders</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-widest">Pending: {orders.filter(o => o.status === 'Pending').length}</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest">Completed: {orders.filter(o => o.status === 'Completed').length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/50 text-[10px] font-black text-stone-400 uppercase tracking-widest border-b border-stone-100">
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-24 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-300">
                        <Clock size={32} />
                      </div>
                      <p className="text-stone-400 font-medium">No orders placed yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={order.id} 
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-8 py-6 font-bold text-stone-800 text-sm">{order.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                          <User size={16} />
                        </div>
                        <span className="font-medium text-stone-600 text-sm">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex -space-x-2">
                        {order.items.map((item: any, i: number) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-stone-100" title={item.name}>
                            <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-emerald-600">₹{order.total}</td>
                    <td className="px-8 py-6 text-stone-400 text-xs font-medium">{order.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

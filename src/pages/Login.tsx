import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '../context/AppContext';
import { Leaf, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const { login, signIn, signUp } = useApp();
  const navigate = useNavigate();
  const [showInventoryLogin, setShowInventoryLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    if (role === UserRole.INVENTORY_MANAGER) {
      setShowInventoryLogin(true);
    } else {
      login(role);
      navigate('/marketing');
    }
  };

  const handleInventoryLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.name);
        alert('Sign up successful! Please check your email for verification (if enabled) or sign in.');
        setIsSignUp(false);
      } else {
        await signIn(formData.email, formData.password);
        login(UserRole.INVENTORY_MANAGER);
        navigate('/inventory');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showInventoryLogin ? (
        <motion.div 
          key="inventory-login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#4a4220] flex items-center justify-center p-4 font-sans"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-md w-full bg-[#f0ede4] rounded-[40px] p-10 shadow-2xl space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center text-[#1a8344]">
                  <ShieldCheck size={56} strokeWidth={1.5} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[#4a3728] tracking-tight">
                {isSignUp ? 'Create Account' : 'Inventory Management'}
              </h1>
              <p className="text-[#718096] text-sm">
                {isSignUp ? 'Join the Waste2Wellness network' : 'Access processing & supply chain tools'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleInventoryLogin} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#4a5568] tracking-widest uppercase ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-[#edf2f7]/50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1a8344] outline-none transition-all text-[#2d3748] placeholder:text-[#a0aec0]"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#4a5568] tracking-widest uppercase ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="admin@waste2wellness.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-[#edf2f7]/50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1a8344] outline-none transition-all text-[#2d3748] placeholder:text-[#a0aec0]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#4a5568] tracking-widest uppercase ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-6 py-4 bg-[#edf2f7]/50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1a8344] outline-none transition-all text-[#2d3748] placeholder:text-[#a0aec0]"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a8344] hover:bg-[#146c36] text-white font-bold py-5 rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all group disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Login to Dashboard')}
                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="space-y-4">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-center text-sm text-[#1a8344] font-bold hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>

              <button 
                onClick={() => setShowInventoryLogin(false)}
                className="w-full text-center text-xs text-[#718096] hover:text-[#4a3728] font-medium transition-colors"
              >
                ← Back to portal selection
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="role-selection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-amber-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-emerald-600 p-8 text-center text-white">
              <div className="flex justify-center mb-4">
                <Leaf size={48} className="text-amber-200" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Waste2Wellness</h1>
              <p className="text-emerald-100 mt-2">Turning agricultural surplus into sustainable wellness solutions.</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-stone-800">Welcome Back</h2>
                <p className="text-stone-500 text-sm">Please select your portal to continue</p>
              </div>

              <button
                onClick={() => handleRoleSelect(UserRole.INVENTORY_MANAGER)}
                className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl group-hover:bg-emerald-200 transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-stone-800">Inventory Manager</span>
                    <span className="text-xs text-stone-500">Manage stock, farmers & processing</span>
                  </div>
                </div>
                <div className="text-stone-400 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect(UserRole.MARKETING_SALES)}
                className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 text-amber-700 rounded-xl group-hover:bg-amber-200 transition-colors">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-stone-800">Marketing & Sales</span>
                    <span className="text-xs text-stone-500">Browse products & manage orders</span>
                  </div>
                </div>
                <div className="text-stone-400 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>

              <div className="pt-4 text-center">
                <p className="text-xs text-stone-400">
                  © 2024 Waste2Wellness. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShoppingCart, Trash2, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export default function Buy() {
  const navigate = useNavigate();
  const { cart, removeFromCart, placeOrder } = useApp();
  const [isOrdered, setIsOrdered] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    placeOrder();
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-8"
        >
          <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-stone-800 tracking-tight">ORDER PLACED!</h1>
            <p className="text-stone-500 leading-relaxed">
              Thank you for your purchase. Your wellness products are on their way! 
              A confirmation email has been sent to you.
            </p>
          </div>
          <button 
            onClick={() => navigate('/marketing')}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center space-y-8"
        >
          <div className="w-32 h-32 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-300 relative">
            <ShoppingCart size={64} />
            <div className="absolute -top-2 -right-2 bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <ShoppingBag size={24} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-stone-800 tracking-tight">YOUR CART IS EMPTY</h1>
            <p className="text-stone-500 leading-relaxed">
              Looks like you haven't added any wellness products to your cart yet. 
              Start shopping to support our farmers!
            </p>
          </div>

          <div className="pt-8 space-y-4">
            <button 
              onClick={() => navigate('/marketing/products')}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3"
            >
              Start Shopping <ShoppingBag size={20} />
            </button>
            <button 
              onClick={() => navigate('/marketing')}
              className="w-full bg-white text-stone-600 py-5 rounded-2xl font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-3"
            >
              <ArrowLeft size={20} /> Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black text-stone-800 tracking-tight">YOUR CART</h1>
            <span className="text-stone-400 font-bold">{cart.length} Items</span>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-50">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-stone-800">{item.name}</h3>
                  <p className="text-sm text-stone-400 font-medium">{item.size} • Qty: {item.quantity}</p>
                  <p className="text-emerald-600 font-bold">₹{item.price * item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/marketing/products')}
            className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"
          >
            <ArrowLeft size={18} /> Continue Shopping
          </button>
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="p-8 bg-stone-900 rounded-[40px] text-white space-y-8 shadow-2xl shadow-stone-200">
            <h2 className="text-2xl font-bold tracking-tight">ORDER SUMMARY</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-stone-400 font-medium">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-stone-400 font-medium">
                <span>Shipping</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="pt-4 border-t border-stone-800 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-3"
            >
              Place Order <CreditCard size={20} />
            </button>

            <p className="text-[10px] text-stone-500 text-center uppercase tracking-widest font-bold">
              Secure SSL Encrypted Checkout
            </p>
          </div>

          <div className="p-8 bg-emerald-50 rounded-[40px] space-y-4">
            <div className="flex items-center gap-3 text-emerald-700 font-bold">
              <ShoppingBag size={20} />
              <span>Farmer Impact</span>
            </div>
            <p className="text-sm text-emerald-600/80 leading-relaxed font-medium">
              This purchase will directly contribute to increasing farmer income by up to 250% 
              and preventing agricultural waste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

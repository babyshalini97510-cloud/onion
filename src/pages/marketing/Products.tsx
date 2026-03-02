import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, ArrowRight, Check, MessageSquare, X, Send, TrendingDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

export default function Products() {
  const { addToCart, marketplaceListings, reviews, addReview, user } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [addedId, setAddedId] = useState<string | number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const baseProducts = [
    { id: 1, name: 'Pure Onion Seed Oil', size: '100ml', price: 450, onlinePrice: 899, category: 'Oil', rating: 4.9, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Premium Onion Powder', size: '100g', price: 150, onlinePrice: 299, category: 'Powder', rating: 4.8, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Premium Onion Powder', size: '250g', price: 350, onlinePrice: 599, category: 'Powder', rating: 4.8, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Onion Seed Wellness Tea', size: '100g', price: 280, onlinePrice: 450, category: 'Tea', rating: 4.7, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'Premium Onion Powder', size: '500g', price: 650, onlinePrice: 999, category: 'Powder', rating: 4.8, image: 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'Fresh Onion Paste', size: '250g', price: 120, onlinePrice: 199, category: 'Paste', rating: 4.6, image: 'https://images.unsplash.com/photo-1590593162211-f98f7f462389?auto=format&fit=crop&q=80&w=800' },
  ];

  const marketProducts = marketplaceListings.map(listing => ({
    id: listing.id,
    name: listing.name,
    size: `${listing.amount}kg`,
    price: listing.type === 'oil' ? 4500 : 1200, 
    onlinePrice: listing.type === 'oil' ? 7500 : 2500,
    category: listing.type.charAt(0).toUpperCase() + listing.type.slice(1),
    rating: 5.0,
    image: listing.type === 'oil' ? 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=800'
  }));

  const products = [...baseProducts, ...marketProducts];

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    
    addReview({
      productId: selectedProduct.id,
      userName: user?.name || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    });
    setNewReview({ rating: 5, comment: '' });
  };

  const filteredProducts = products.filter(p => 
    (filter === 'All' || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-stone-800 tracking-tight">OUR PREMIUM RANGE</h1>
        <p className="text-stone-500 max-w-xl mx-auto">
          Direct from farmers to you. We cut out the middlemen to give you the best quality at the lowest prices.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-stone-50 p-6 rounded-[32px] border border-stone-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'Oil', 'Powder', 'Tea', 'Paste'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                filter === cat 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                  : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-stone-500">
          <Filter size={18} />
          <span>Sort by: Popularity</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const savings = Math.round(((product.onlinePrice - product.price) / product.onlinePrice) * 100);
            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-6 bg-stone-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-stone-800 shadow-sm">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      {product.rating}
                    </div>
                    <div className="bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-widest shadow-lg">
                      <TrendingDown size={12} />
                      Save {savings}%
                    </div>
                    <div className="bg-stone-800 text-white px-3 py-1 rounded-full flex items-center gap-1 text-[8px] font-black uppercase tracking-widest shadow-lg">
                      <CheckCircle2 size={10} className="text-emerald-400" />
                      Quality Guaranteed
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 flex gap-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-4 bg-white/90 backdrop-blur-sm text-stone-800 rounded-2xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white"
                    >
                      <MessageSquare size={24} />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`absolute bottom-6 right-6 p-4 rounded-2xl shadow-xl translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${
                      addedId === product.id ? 'bg-emerald-500 text-white opacity-100' : 'bg-emerald-600 text-white opacity-0'
                    }`}
                  >
                    {addedId === product.id ? <Check size={24} /> : <ShoppingCart size={24} />}
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-stone-800">{product.name}</h3>
                      <p className="text-stone-500 text-sm font-medium">{product.size} • {product.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-emerald-600 text-xl leading-none">₹{product.price}</div>
                      <div className="flex flex-col items-end mt-1">
                        <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest leading-none mb-0.5">Market Price</span>
                        <div className="text-stone-400 text-xs line-through font-bold leading-none">₹{product.onlinePrice}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden">
                    <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-stone-800">{selectedProduct.name}</h2>
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Product Reviews</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Review Form */}
                <form onSubmit={handleAddReview} className="bg-stone-50 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-stone-800">Rate Product Quality</h3>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">Verified Purchase</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`p-1 transition-colors ${newReview.rating >= star ? 'text-amber-500' : 'text-stone-300'}`}
                      >
                        <Star size={24} fill={newReview.rating >= star ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <textarea 
                      placeholder="Tell us about the quality, texture, and effectiveness..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full p-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:border-emerald-500 min-h-[100px] text-sm"
                    />
                    <button 
                      type="submit"
                      className="absolute bottom-4 right-4 bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>

                {/* Review List */}
                <div className="space-y-6">
                  <h3 className="font-bold text-stone-800 flex items-center gap-2">
                    Customer Feedback
                    <span className="px-2 py-0.5 bg-stone-100 rounded-full text-[10px] text-stone-500">
                      {reviews.filter(r => r.productId === selectedProduct.id).length}
                    </span>
                  </h3>
                  <div className="space-y-6">
                    {reviews.filter(r => r.productId === selectedProduct.id).length === 0 ? (
                      <div className="text-center py-12 text-stone-400 italic text-sm">
                        No reviews yet. Be the first to share your thoughts!
                      </div>
                    ) : (
                      reviews.filter(r => r.productId === selectedProduct.id).map((review, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold uppercase">
                                {review.userName.charAt(0)}
                              </div>
                              <span className="font-bold text-stone-800 text-sm">{review.userName}</span>
                            </div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase">{review.date}</span>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={10} className={s <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-200'} />
                            ))}
                          </div>
                          <p className="text-stone-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-300">
            <Search size={40} />
          </div>
          <p className="text-stone-500 font-bold">No products found matching your search.</p>
          <button onClick={() => {setSearch(''); setFilter('All');}} className="text-emerald-600 font-bold hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

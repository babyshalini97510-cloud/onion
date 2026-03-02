import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Package, ShoppingBag, Scale, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InventoryStock() {
  const { inventory, marketplaceListings, pushToMarket } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    description: ''
  });

  const valueAddedItems = [
    { label: 'POWDER', value: inventory.powder, type: 'powder' },
    { label: 'PASTE', value: inventory.paste, type: 'paste' },
    { label: 'TEA', value: inventory.tea, type: 'tea' },
    { label: 'OIL', value: inventory.oil, type: 'oil' },
  ];

  const handleOpenModal = (item: any) => {
    setSelectedProduct(item);
    setFormData({
      name: `Premium Onion ${item.label.charAt(0) + item.label.slice(1).toLowerCase()}`,
      weight: item.value.toString(),
      description: ''
    });
    setIsModalOpen(true);
  };

  const handlePushToMarket = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      pushToMarket(
        selectedProduct.type, 
        parseFloat(formData.weight), 
        formData.name, 
        formData.description
      );
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="space-y-8 bg-[#FDFBF0] -m-8 p-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Raw Materials Card */}
        <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm text-center space-y-6">
          <div className="w-24 h-24 bg-[#F9F6E5] rounded-[32px] flex items-center justify-center mx-auto">
            <Scale size={48} className="text-[#8B7E3D]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-[#4A3F2F]">Raw Materials</h2>
            <p className="text-[#8C97A7] text-lg">Unprocessed surplus stock</p>
          </div>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="bg-[#FDFBF0] p-6 rounded-3xl border border-[#F2EED7] space-y-1">
              <p className="text-[10px] font-black text-[#8C97A7] tracking-widest uppercase">ONIONS</p>
              <p className="text-4xl font-black text-[#4A3F2F]">{inventory.rawOnions} <span className="text-xl font-bold">kg</span></p>
            </div>
            <div className="bg-[#FDFBF0] p-6 rounded-3xl border border-[#F2EED7] space-y-1">
              <p className="text-[10px] font-black text-[#8C97A7] tracking-widest uppercase">SEEDS</p>
              <p className="text-4xl font-black text-[#4A3F2F]">{inventory.onionSeeds} <span className="text-xl font-bold">kg</span></p>
            </div>
          </div>
        </div>

        {/* Value-Added Stock Card */}
        <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm text-center space-y-6">
          <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto">
            <Package size={64} className="text-[#0D7A3F]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-[#4A3F2F]">Value-Added Stock</h2>
            <p className="text-[#8C97A7] text-lg">Finished products ready for market</p>
          </div>
          <div className="grid grid-cols-4 gap-3 pt-4">
            {valueAddedItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleOpenModal(item)}
                disabled={item.value <= 0}
                className="bg-[#F1F9F4] p-4 rounded-2xl border border-[#D1EAD9] text-left relative group hover:border-[#0D7A3F] transition-all"
              >
                <Plus size={14} className="absolute top-3 right-3 text-[#0D7A3F]" />
                <p className="text-[9px] font-black text-[#0D7A3F] tracking-wider mb-2">{item.label}</p>
                <p className="text-2xl font-black text-[#4A3F2F] mb-1">{item.value.toFixed(1)}</p>
                <p className="text-[8px] font-bold text-[#4A3F2F] uppercase opacity-60">CLICK TO SELL</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Listings Card */}
      <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-[#4A3F2F]">Marketplace Listings</h2>
            <p className="text-[#8C97A7] text-lg">Products currently pushed to the marketing portal</p>
          </div>
          <div className="p-3 bg-white border border-[#F2EED7] rounded-2xl text-[#D4C485]">
            <ShoppingBag size={32} />
          </div>
        </div>

        <div className="border-2 border-dashed border-[#F2EED7] rounded-[32px] py-12 text-center">
          {marketplaceListings.length === 0 ? (
            <div className="py-12">
              <p className="text-[#8C97A7] text-lg font-medium">
                No active listings. Click on a product above to push to market.
              </p>
            </div>
          ) : (
            <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceListings.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#FDFBF0] p-6 rounded-3xl border border-[#F2EED7] text-left space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-[#4A3F2F] uppercase text-sm">{listing.name}</p>
                      <p className="text-[#8C97A7] text-xs">{listing.date}</p>
                    </div>
                    <p className="text-2xl font-black text-[#0D7A3F]">{listing.amount} <span className="text-sm">kg</span></p>
                  </div>
                  <p className="text-xs text-[#8C97A7] line-clamp-2">{listing.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#F9F8F3] w-full max-w-lg rounded-[40px] p-12 shadow-2xl space-y-10 relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-10 right-10 text-[#94A3B8] hover:text-[#4A3F2F] transition-colors"
              >
                <X size={28} />
              </button>

              <h3 className="text-[32px] font-black text-[#4A3F2F]">Push to Market</h3>

              <form onSubmit={handlePushToMarket} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[#334155] tracking-widest uppercase ml-1">PRODUCT NAME</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl outline-none focus:border-[#0D7A3F] transition-all text-lg text-[#1E293B]"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[#334155] tracking-widest uppercase ml-1">WEIGHT TO LIST (KG)</label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    max={selectedProduct?.value}
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl outline-none focus:border-[#0D7A3F] transition-all text-lg text-[#1E293B]"
                    placeholder={`Max: ${selectedProduct?.value} kg`}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[#334155] tracking-widest uppercase ml-1">MARKETING DESCRIPTION</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl outline-none focus:border-[#0D7A3F] transition-all resize-none text-lg text-[#1E293B]"
                    placeholder="Describe the product for potential buyers..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D7A3F] text-white py-6 rounded-3xl font-black text-xl hover:bg-[#0a6132] transition-all shadow-xl shadow-emerald-100 mt-4"
                >
                  Confirm Market Listing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function InventoryDashboard() {
  const { inventory, processingBatches } = useApp();

  const stats = [
    { label: 'TOTAL PROCESSED', value: '150 kg', color: 'text-[#4A3F2F]' },
    { label: 'WASTE REDUCED', value: '147 kg', color: 'text-[#0D7A3F]' },
    { label: 'EST. PROFIT', value: '₹10,350', color: 'text-[#4A3F2F]' },
    { label: 'ACTIVE BATCHES', value: processingBatches.length.toString(), color: 'text-[#2563EB]' },
  ];

  const chartData = [
    { name: 'Powder', value: 45, color: '#A89932' },
    { name: 'Paste', value: 30, color: '#6B5E1F' },
    { name: 'Tea', value: 15, color: '#10B981' },
    { name: 'Oil', value: 10, color: '#6B2D1F' },
  ];

  const inventoryItems = [
    { name: 'Raw Onions', value: inventory.rawOnions, max: 500, color: '#A89932' },
    { name: 'Onion Seeds', value: inventory.onionSeeds, max: 500, color: '#A89932' },
    { name: 'Powder', value: inventory.powder, max: 100, color: '#A89932' },
    { name: 'Paste', value: inventory.paste, max: 100, color: '#A89932' },
    { name: 'Tea', value: inventory.tea, max: 50, color: '#A89932' },
    { name: 'Oil', value: inventory.oil, max: 20, color: '#A89932' },
  ];

  return (
    <div className="space-y-8 bg-[#FDFBF0] -m-8 p-8 min-h-screen">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 space-y-2"
          >
            <p className="text-[10px] font-black text-[#8C97A7] tracking-widest uppercase">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Conversion Mix */}
        <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm space-y-8">
          <h2 className="text-2xl font-bold text-[#4A3F2F]">Product Conversion Mix</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  align="center" 
                  iconType="circle"
                  formatter={(value) => <span className="text-[#8C97A7] font-bold text-sm ml-2 mr-4">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm space-y-8">
          <h2 className="text-2xl font-bold text-[#4A3F2F]">Inventory Status</h2>
          <div className="space-y-8">
            {inventoryItems.map((item) => (
              <div key={item.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-[#4A3F2F]">{item.name}</span>
                  <span className="text-sm font-black text-[#4A3F2F]">{item.value.toFixed(1)} kg</span>
                </div>
                <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / item.max) * 100}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

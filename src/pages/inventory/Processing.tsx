import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Processing() {
  const { processingBatches, advanceBatch, completedBatches } = useApp();

  const getSegments = (batch: any) => {
    const stages: Record<string, number> = {
      'Sorting': 0,
      'Cleaning': 1,
      'Drying': 2,
      'Grinding': 3,
      'Extraction': 1,
      'Filtration': 2,
      'Completed': 4
    };
    return stages[batch.stage] || 1;
  };

  return (
    <div className="space-y-8 bg-[#FDFBF0] -m-8 p-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {processingBatches.map((batch) => {
            const filledSegments = getSegments(batch);
            return (
              <motion.div
                key={batch.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm space-y-8"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-[#0D7A3F] tracking-widest uppercase">{batch.type} BATCH</p>
                    <h2 className="text-3xl font-black text-[#4A3F2F]">{batch.input}</h2>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[11px] font-black text-[#8C97A7] tracking-widest uppercase">EST. OUTPUT</p>
                    <p className="text-2xl font-black text-[#4A3F2F]">{batch.output}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-[#8C97A7]">Current Stage</span>
                    <span className="text-sm font-black text-[#0D7A3F]">{batch.stage}</span>
                  </div>
                  
                  {/* Segmented Progress Bar */}
                  <div className="space-y-3">
                    <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(filledSegments / 4) * 100}%` }}
                        className="h-full bg-[#10B981]"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 rounded-full ${i < filledSegments ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => advanceBatch(batch.id)}
                  className="w-full bg-[#0D7A3F] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#0a6132] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-50"
                >
                  {batch.nextStage === 'Completed' ? (
                    <>Complete Production <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                  ) : (
                    <>Advance to {batch.nextStage} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Completed Production Card */}
      <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm min-h-[160px] space-y-8">
        <h2 className="text-2xl font-bold text-[#4A3F2F]">Completed Production</h2>
        <div className="space-y-4">
          {completedBatches.length > 0 && (
            <div className="grid gap-4">
              {completedBatches.map((batch, idx) => (
                <motion.div
                  key={`${batch.id}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-6 bg-[#FDFBF0] rounded-3xl border border-[#F2EED7]"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl text-[#0D7A3F] shadow-sm">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="font-black text-[#4A3F2F] uppercase text-sm">{batch.type} BATCH</p>
                      <p className="text-xs text-[#8C97A7]">{batch.input}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[#0D7A3F]">{batch.output}</p>
                    <p className="text-[10px] font-bold text-[#8C97A7] uppercase">{batch.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

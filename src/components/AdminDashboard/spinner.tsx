import { motion } from "framer-motion";

export function SpinnerLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <motion.div
          className="h-5 w-5 rounded-full border-2 border-slate-200 border-t-slate-900"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
    </div>
  );
}

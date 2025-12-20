"use client";

import { useState } from "react";
import { User, ChevronDown, Plus } from "lucide-react";
// import AddAgentModal from "@/app/modals/AddAgentModal";

export default function Topbar() {
  const [openAddAgent, setOpenAddAgent] = useState(false);

  return (
    <>
      <header
        className="
          fixed top-0 right-0 
          md:left-66
          left-0 
          z-30
          h-16
          bg-slate-800/40 
          backdrop-blur-xl 
          border-b border-white/10
        "
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* LEFT: LOGO / TITLE */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
            <span className="text-lg font-bold text-white tracking-wide">
              LOGO
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* ADD AGENT BUTTON */}
            {/* <button
              onClick={() => setOpenAddAgent(true)}
              className="
                hidden sm:flex items-center gap-2
                px-4 py-2 rounded-xl
                bg-gradient-to-r from-blue-500 to-emerald-500
                text-white text-sm font-medium
                hover:opacity-90 transition
                shadow-lg shadow-blue-500/30
              "
            >
              <Plus size={16} />
              Add Agent
            </button> */}

            {/* AGENT INFO */}
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-medium text-white">
                John Doe
              </span>
              <span className="text-xs text-slate-400">
                Platinum Agent
              </span>
            </div>

            {/* Avatar */}
            <div
              className="
                w-10 h-10 
                rounded-full 
                bg-gradient-to-br from-blue-500 to-emerald-500
                flex items-center justify-center
                border border-white/20
                shadow-lg shadow-blue-500/30
                cursor-pointer
                hover:scale-105 transition-transform
              "
              aria-label="User profile"
            >
              <User size={18} className="text-white" />
            </div>

            {/* Dropdown Icon */}
            <ChevronDown
              size={16}
              className="text-slate-400 hidden sm:block"
            />
          </div>
        </div>
      </header>

      {/* ADD AGENT MODAL */}
      {/* <AddAgentModal
        open={openAddAgent}
        onClose={() => setOpenAddAgent(false)}
      /> */}
    </>
  );
}

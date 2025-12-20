"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Trophy,
  Target,
  TrendingUp,
  Gift,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Target, label: "Missions", active: false },
  { icon: TrendingUp, label: "Deals Feed", active: false },
  { icon: Trophy, label: "Leaderboard", active: false },
  { icon: Gift, label: "Rewards", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-0 z-50 md:hidden bg-slate-800/80 backdrop-blur-sm p-2 rounded-xl border border-white/10 hover:bg-slate-700/80 transition-colors"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-70 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 z-40 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Think</h1>
            <p className="text-sm text-slate-400 mt-1">Insurance First</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    item.active
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
                  }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Card */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-slate-400">Pro Member</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}

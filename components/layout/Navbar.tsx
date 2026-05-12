"use client";

import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
  title: string;
}

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 h-16 bg-[#0d0c18]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-white font-semibold text-lg hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-1.5 w-52">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-300 placeholder-slate-500 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-400 rounded-full ring-2 ring-[#0d0c18]" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.06] transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
            SC
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-200 leading-none">Sophia Carter</p>
            <p className="text-xs text-slate-500 mt-0.5">Admin</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:block" />
        </button>
      </div>
    </header>
  );
}

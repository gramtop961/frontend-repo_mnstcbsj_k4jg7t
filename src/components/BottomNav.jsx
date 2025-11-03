import React from 'react';
import { Home, Image, Heart, User, Settings } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active = false }) => (
  <button
    className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl active:scale-95 transition-transform ${
      active ? 'text-white' : 'text-neutral-300'
    }`}
    aria-label={label}
    style={{ minWidth: 56, minHeight: 56 }}
  >
    <Icon size={22} />
    <span className="text-[11px] leading-none">{label}</span>
  </button>
);

const BottomNav = () => {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] sm:w-[420px] z-50">
      <div className="backdrop-blur-xl bg-neutral-900/70 border border-white/10 rounded-2xl px-3 py-2 flex items-center justify-between shadow-lg">
        <NavButton icon={Home} label="Home" active />
        <NavButton icon={Image} label="Gallery" />
        <NavButton icon={Heart} label="Likes" />
        <NavButton icon={User} label="Profile" />
        <NavButton icon={Settings} label="Settings" />
      </div>
    </nav>
  );
};

export default BottomNav;

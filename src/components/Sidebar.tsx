import { LayoutDashboard, FilePlus, FileText, LogOut, User as UserIcon, ShieldAlert, Server } from 'lucide-react';
import { ViewState, UserRole } from '../types';

export default function Sidebar({ 
  currentView, 
  onNavigate,
  onLogout,
  role
}: { 
  currentView: ViewState; 
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  role: UserRole;
}) {
  const citizenItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submit-complaint', label: 'E-Sikayat (Submit)', icon: FilePlus },
    { id: 'tracking', label: 'Track Complaints', icon: FileText },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
  ];

  const officerItems = [
    { id: 'officer-dashboard', label: 'Official Reporting', icon: LayoutDashboard },
    { id: 'officer-cases', label: 'Department Cases', icon: ShieldAlert },
    { id: 'system-status', label: 'System Health', icon: Server },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
  ];

  const navItems = role === 'officer' ? officerItems : citizenItems;

  return (
    <nav className="w-64 bg-[#00401A] flex flex-col py-6 px-4 shrink-0 h-full shadow-xl">
      <div className="space-y-1 mb-8">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          {role === 'officer' ? 'Department Panel' : 'Services'}
        </p>
        {navItems.map((item) => {
          const active = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {active && <span className="w-1.5 h-1.5 rounded-full bg-white absolute left-2"></span>}
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Secure Logout
        </button>
      </div>
    </nav>
  );
}

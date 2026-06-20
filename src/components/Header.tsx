import { Landmark, User as UserIcon, ShieldCheck } from 'lucide-react';
import { User } from '../types';

export default function Header({ user }: { user: User }) {
  const isOfficer = user.role === 'officer';
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#00401A] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <Landmark className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-none flex items-center gap-2">Citizen Portal <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">KPK & StellarScorps</span></h1>
          <p className="text-xs text-slate-500 mt-1">Government of Khyber Pakhtunkhwa | {isOfficer ? 'Officer Portal' : 'Citizen Services'}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-700">{user.name}</p>
          <p className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1 justify-end mt-0.5 ${isOfficer ? 'bg-slate-100 text-slate-700' : 'bg-slate-100 text-slate-700'}`}>
            <ShieldCheck className="w-3 h-3"/> {isOfficer ? 'GOVT OFFICIAL' : 'VERIFIED'}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 shadow-sm ${isOfficer ? 'bg-slate-50 border-slate-200' : 'bg-slate-100 border-slate-200'}`}>
          <UserIcon className={`w-5 h-5 ${isOfficer ? 'text-slate-600' : 'text-slate-400'}`}/>
        </div>
      </div>
    </header>
  );
}

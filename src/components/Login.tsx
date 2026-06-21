import { useState } from 'react';
import { Lock, CreditCard, Mail, Briefcase, User as UserIcon } from 'lucide-react';
import { UserRole } from '../types';
import logo from '../assets/images/govt_shield_logo_1782017190474.jpg';

/**
 * Login Component - Unified authentication interface for citizens and government officials.
 * Utilizes a toggleable state view allowing a switch between role paradigms securely.
 * 
 * @param onLogin - Callback prop communicating the authenticated session's exact user role up to app core.
 */
export default function Login({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const [role, setRole] = useState<UserRole>('citizen');
  const [cnic, setCnic] = useState('17301-1234567-1');
  const [email, setEmail] = useState('officer.desc@kp.gov.pk');
  const [password, setPassword] = useState('password123');

  /**
   * Toggles the auth context form, cleaning up old text fields visually to avoid
   * confusion for cross-state variables.
   */
  const handleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      {/* Top Header */}
      <header className="absolute top-0 w-full p-6 sm:p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm overflow-hidden border border-slate-200">
            <img src={logo} alt="Government Shield Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#0f172a] uppercase border-l-2 border-[#eab308] pl-3">Citizen Portal</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          
          <div className="mb-6 hidden sm:block">
            <h2 className="text-2xl font-semibold text-[#0f172a] tracking-tight">System Login</h2>
            <p className="text-sm text-slate-500 mt-1">Please enter your credentials to securely access your portal</p>
          </div>

          <div className="flex bg-slate-50 p-1 rounded-sm mb-6 border border-slate-200 w-full">
            <button 
              onClick={() => handleSwitch('citizen')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-sm transition-colors ${role === 'citizen' ? 'bg-white text-[#0f172a] border border-slate-200 shadow-sm' : 'text-slate-500 hover:text-[#0f172a]'}`}
            >
              <UserIcon className="w-4 h-4" /> Citizen
            </button>
            <button 
              onClick={() => handleSwitch('officer')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-sm transition-colors ${role === 'officer' ? 'bg-[#0f172a] text-[#eab308] shadow-sm' : 'text-slate-500 hover:text-[#0f172a]'}`}
            >
              <Briefcase className="w-4 h-4" /> Officer
            </button>
          </div>

          <div className="bg-white py-6 p-1 sm:p-8 sm:border sm:border-slate-200 rounded-sm">
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
              
              {role === 'citizen' ? (
                <div className="space-y-1">
                  <label htmlFor="cnic" className="block text-sm font-bold text-[#0f172a] uppercase tracking-wide">
                    CNIC Number
                  </label>
                  <div className="relative border-b-2 border-slate-200 focus-within:border-[#0f172a] transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <CreditCard className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input
                      id="cnic"
                      type="text"
                      required
                      value={cnic}
                      onChange={e => setCnic(e.target.value)}
                      className="block w-full pl-9 py-2.5 bg-transparent outline-none sm:text-base font-mono font-medium text-[#0f172a]"
                      placeholder="17301-1234567-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-bold text-[#0f172a] uppercase tracking-wide">
                    Official Email
                  </label>
                  <div className="relative border-b-2 border-slate-200 focus-within:border-[#0f172a] transition-colors">
                    <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                      <Mail className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="block w-full pl-9 py-2.5 bg-transparent outline-none sm:text-base font-medium text-[#0f172a]"
                      placeholder="officer.desc@kp.gov.pk"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-bold text-[#0f172a] uppercase tracking-wide">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-slate-500 hover:text-[#0f172a]">Recover</a>
                </div>
                <div className="relative border-b-2 border-slate-200 focus-within:border-[#0f172a] transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full pl-9 py-2.5 bg-transparent outline-none sm:text-base text-[#0f172a]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold text-[#eab308] tracking-widest uppercase transition-colors focus:outline-none bg-[#0f172a] hover:bg-black rounded-sm shadow-sm"
                >
                  Proceed securely
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-5 px-8 border-t border-slate-200 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider bg-slate-50">
        <p>Ministry of Digital Innovation</p>
        <p className="mt-2 sm:mt-0">© {new Date().getFullYear()} KP Government. All rights reserved.</p>
      </footer>
    </div>
  );
}

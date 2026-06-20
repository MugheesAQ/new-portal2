import { useState } from 'react';
import { Landmark, Lock, CreditCard, ShieldCheck, Mail, Briefcase, User as UserIcon } from 'lucide-react';
import { UserRole } from '../types';

export default function Login({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const [role, setRole] = useState<UserRole>('citizen');
  const [cnic, setCnic] = useState('17301-1234567-1');
  const [email, setEmail] = useState('officer.desc@kp.gov.pk');
  const [password, setPassword] = useState('password123');

  const handleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#00401A] rounded-2xl flex items-center justify-center shadow-lg">
            <Landmark className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#00401A] tracking-tight">
          Citizen Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 font-medium">
          Govt of Khyber Pakhtunkhwa x StellarScorps
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        
        <div className="flex bg-slate-200 p-1 rounded-xl mb-6 border border-slate-300 w-full">
          <button 
            onClick={() => handleSwitch('citizen')}
            className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-bold rounded-lg transition-colors ${role === 'citizen' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <UserIcon className="w-4 h-4" /> Citizen Login
          </button>
          <button 
            onClick={() => handleSwitch('officer')}
            className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-bold rounded-lg transition-colors ${role === 'officer' ? 'bg-[#00401A] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Briefcase className="w-4 h-4" /> Officer Login
          </button>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(role); }}>
            
            {role === 'citizen' ? (
              <div>
                <label htmlFor="cnic" className="block text-sm font-medium text-slate-700">
                  CNIC Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="cnic"
                    type="text"
                    required
                    value={cnic}
                    onChange={e => setCnic(e.target.value)}
                    className="focus:ring-[#00401A] focus:border-[#00401A] block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border outline-none font-mono font-medium"
                    placeholder="17301-1234567-1"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Official Gov Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="focus:ring-[#00401A] focus:border-[#00401A] block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border outline-none font-medium"
                    placeholder="officer.desc@kp.gov.pk"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="focus:ring-[#00401A] focus:border-[#00401A] block w-full pl-10 sm:text-sm border-slate-300 rounded-lg py-2.5 border outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00401A] focus:ring-[#00401A] border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                  Remember my device
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#00401A] hover:text-[#002b12] hover:underline">
                  Reset Password
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === 'officer' ? 'bg-[#00401A] hover:bg-[#002b12] focus:ring-[#00401A]' : 'bg-[#00401A] hover:bg-[#002b12] focus:ring-[#00401A]'}`}
              >
                Secure Sign In ({role === 'officer' ? 'Official' : 'Citizen'})
              </button>
            </div>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 py-3 rounded-lg border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            Verified by DESC Identity Provider
          </div>
        </div>
      </div>
    </div>
  );
}

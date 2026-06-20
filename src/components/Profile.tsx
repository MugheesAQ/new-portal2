import { User } from '../types';
import { ShieldCheck, Mail, MapPin, Phone, CreditCard, Briefcase, User as UserIcon } from 'lucide-react';

export default function Profile({ user }: { user: User }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b border-slate-200 pb-4">
        My Profile
      </h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-[#00401A] border-b border-slate-200"></div>
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-12 w-24 h-24 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 flex items-center justify-center">
            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
              <UserIcon className="w-10 h-10 text-slate-400" />
            </div>
          </div>
          
          <div className="pt-16 pb-6 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                {user.name}
                <ShieldCheck className="w-5 h-5 text-slate-700" />
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">
                {user.role === 'officer' ? 'Government Official' : 'Verified Citizen'}
              </p>
            </div>
            
            <div className="px-4 py-1.5 rounded-full text-xs font-bold border bg-slate-100 text-slate-700 border-slate-200">
              Identity Verified by DESC
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Personal Information</h3>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">CNIC / Registration Number</p>
                  <p className="font-mono text-sm font-medium text-slate-800">{user.cnic}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <Mail className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Email Address</p>
                  <p className="text-sm font-medium text-slate-800">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Contact & Work</h3>
               
               <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <Phone className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Phone Number</p>
                  <p className="text-sm font-medium text-slate-800">{user.phone || '+92 300 0000000'}</p>
                </div>
              </div>

              {user.role === 'citizen' ? (
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                     <MapPin className="w-4 h-4 text-slate-500" />
                   </div>
                   <div>
                     <p className="text-xs font-semibold text-slate-400 uppercase">Primary Address</p>
                     <p className="text-sm font-medium text-slate-800">{user.address || 'Peshawar, Khyber Pakhtunkhwa'}</p>
                   </div>
                 </div>
              ) : (
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                     <Briefcase className="w-4 h-4 text-slate-500" />
                   </div>
                   <div>
                     <p className="text-xs font-semibold text-slate-400 uppercase">Department</p>
                     <p className="text-sm font-medium text-slate-800">{user.department || 'Municipal Services'}</p>
                   </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

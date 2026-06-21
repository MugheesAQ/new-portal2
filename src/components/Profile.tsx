import { useState, useRef } from 'react';
import { User } from '../types';
import { ShieldCheck, Mail, MapPin, Phone, CreditCard, Briefcase, User as UserIcon, Camera } from 'lucide-react';

/**
 * Profile Utility View - Renders securely scoped data relating to the authenticated user.
 * Implements a hidden input trigger for live client-side profile picture binding via `URL.createObjectURL()`.
 * 
 * @param user - Core authenticated data identity mapped onto interface layouts.
 */
export default function Profile({ user }: { user: User }) {
  const [avatar, setAvatar] = useState<string | undefined>(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b border-slate-200 pb-4">
        My Profile
      </h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-[#0f172a] border-b border-slate-200"></div>
        <div className="px-8 pb-8 relative">
          <div 
            className="absolute -top-12 w-24 h-24 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 flex items-center justify-center group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden relative">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-10 h-10 text-slate-400" />
              )}
              <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
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

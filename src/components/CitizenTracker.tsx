import { useState } from 'react';
import { Search, User, MapPin, Phone, Mail, Activity, Eye, FileText, Clock } from 'lucide-react';

/**
 * Mock structural data representing live users connected to the portal ecosystem.
 * Stores comprehensive audit data such as tracking addresses, views, identifiers.
 */
const MOCK_CITIZENS = [
  {
    id: 'CIT-8923-41',
    name: 'Ahmed Khan',
    cnic: '42101-1234567-1',
    phone: '+92 300 1234567',
    email: 'ahmed.k@example.com',
    address: 'Block 4, Clifton, Karachi',
    currentViews: ['Dashboard', 'Track Complaints'],
    lastActive: 'Just now',
    totalComplaints: 3,
    openComplaints: 1,
    status: 'Online',
  },
  {
    id: 'CIT-7142-99',
    name: 'Fatima Ali',
    cnic: '42201-9876543-2',
    phone: '+92 333 9876543',
    email: 'fatima.a@example.com',
    address: 'DHA Phase 6, Karachi',
    currentViews: ['E-Sikayat (Submit)'],
    lastActive: '2 mins ago',
    totalComplaints: 5,
    openComplaints: 2,
    status: 'Online',
  },
  {
    id: 'CIT-2211-55',
    name: 'Muhammad Usman',
    cnic: '42301-5555555-5',
    phone: '+92 345 5555555',
    email: 'usman.m@example.com',
    address: 'Gulshan-e-Iqbal, Karachi',
    currentViews: ['Offline'],
    lastActive: '2 days ago',
    totalComplaints: 1,
    openComplaints: 0,
    status: 'Offline',
  }
];

/**
 * Citizen Tracker Component - Auditing and telemetry UI for strict official monitoring.
 * Facilitates quick record searching and produces detailed insights into explicit active citizen network connections.
 */
export default function CitizenTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCitizen, setSelectedCitizen] = useState<typeof MOCK_CITIZENS[0] | null>(null);

  const filteredCitizens = MOCK_CITIZENS.filter(c => 
    c.cnic.includes(searchQuery) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Citizen Activity Tracker
          </h2>
          <p className="text-sm text-slate-500 mt-1">Monitor active sessions and track citizen application usage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search by ID, CNIC or Name..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border-slate-300 rounded-lg shadow-sm focus:border-[#0f172a] focus:ring-[#0f172a] sm:text-sm border outline-none font-medium"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {filteredCitizens.length === 0 ? (
               <div className="p-8 text-center text-slate-500 text-sm">No citizens found matching your criteria.</div>
            ) : (
              filteredCitizens.map(citizen => (
                <button 
                  key={citizen.id} 
                  onClick={() => setSelectedCitizen(citizen)}
                  className={`w-full text-left p-4 rounded-xl border mb-2 transition-all ${
                    selectedCitizen?.id === citizen.id 
                      ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-md' 
                      : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-mono font-bold ${selectedCitizen?.id === citizen.id ? 'text-slate-300' : 'text-slate-500'}`}>{citizen.id}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${citizen.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${selectedCitizen?.id === citizen.id ? 'text-slate-300' : 'text-slate-400'}`}>
                        {citizen.status}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold">{citizen.name}</h4>
                  <p className={`text-xs mt-1 ${selectedCitizen?.id === citizen.id ? 'text-slate-300' : 'text-slate-500'}`}>{citizen.cnic}</p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedCitizen ? (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
               <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
                     <User className="w-6 h-6 text-slate-500" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-slate-800">{selectedCitizen.name}</h3>
                     <p className="text-sm font-mono font-medium text-slate-500">{selectedCitizen.id} • {selectedCitizen.cnic}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${selectedCitizen.status === 'Online' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCitizen.status === 'Online' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {selectedCitizen.status}
                   </span>
                   <p className="text-xs text-slate-400 mt-2">Active: {selectedCitizen.lastActive}</p>
                 </div>
               </div>
               
               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                 <div className="space-y-6">
                   <div>
                     <h4 className="text-xs font-bold tracking-widest text-[#0f172a] uppercase border-b border-slate-200 pb-2 mb-4">Contact Information</h4>
                     <div className="space-y-4">
                       <div className="flex items-start gap-3">
                         <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                         <div>
                           <p className="text-xs font-semibold text-slate-500">Phone Number</p>
                           <p className="text-sm font-medium text-slate-700">{selectedCitizen.phone}</p>
                         </div>
                       </div>
                       <div className="flex items-start gap-3">
                         <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                         <div>
                           <p className="text-xs font-semibold text-slate-500">Email Address</p>
                           <p className="text-sm font-medium text-slate-700">{selectedCitizen.email}</p>
                         </div>
                       </div>
                       <div className="flex items-start gap-3">
                         <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                         <div>
                           <p className="text-xs font-semibold text-slate-500">Registered Address</p>
                           <p className="text-sm font-medium text-slate-700">{selectedCitizen.address}</p>
                         </div>
                       </div>
                     </div>
                   </div>

                   <div>
                     <h4 className="text-xs font-bold tracking-widest text-[#0f172a] uppercase border-b border-slate-200 pb-2 mb-4">History Overview</h4>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 items-center justify-between">
                         <div className="flex items-center gap-2 mb-2">
                           <FileText className="w-4 h-4 text-slate-500" />
                           <p className="text-xs font-semibold text-slate-500 uppercase">Total</p>
                         </div>
                         <p className="text-2xl font-bold text-slate-800">{selectedCitizen.totalComplaints}</p>
                       </div>
                       <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 items-center justify-between">
                         <div className="flex items-center gap-2 mb-2">
                           <Clock className="w-4 h-4 text-orange-600" />
                           <p className="text-xs font-semibold text-orange-700 uppercase">Open</p>
                         </div>
                         <p className="text-2xl font-bold text-orange-800">{selectedCitizen.openComplaints}</p>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div>
                    <h4 className="text-xs font-bold tracking-widest text-[#0f172a] uppercase border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" /> 
                      Live Telemetry
                    </h4>
                    <div className="bg-slate-900 rounded-xl p-4 shadow-inner min-h-[300px] border border-slate-800 overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
                      
                      {selectedCitizen.status === 'Online' ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-800 pb-2">
                            <span>SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> CONNECTED</span>
                          </div>
                          <div className="space-y-3">
                            <p className="text-xs text-slate-500 font-mono uppercase">Current View Location:</p>
                            {selectedCitizen.currentViews.map((v, i) => (
                               <div key={i} className="flex flex-col gap-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                 <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                                   <Eye className="w-4 h-4" />
                                   /{v.toLowerCase().replace(/\s+/g, '-')}
                                 </div>
                                 <div className="text-[10px] text-slate-500 flex justify-between">
                                    <span>Rendering component...</span>
                                    <span>{new Date().toLocaleTimeString()}</span>
                                 </div>
                               </div>
                            ))}
                            
                            <div className="mt-4 pt-4 border-t border-slate-800">
                               <p className="text-xs text-slate-500 font-mono mb-2 uppercase">Recent Interactions:</p>
                               <div className="font-mono text-[10px] space-y-1">
                                  <p className="text-slate-400"><span className="text-blue-400">INFO</span> [UI] Form input focus detected</p>
                                  <p className="text-slate-400"><span className="text-blue-400">INFO</span> [NET] Fetching dashboard metrics...</p>
                                  <p className="text-emerald-400"><span className="text-emerald-500">OK</span> [NET] 200 OK /api/metrics</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
                           <Activity className="w-8 h-8 text-slate-700 mb-2" />
                           <p className="text-sm font-mono font-medium">No active session</p>
                           <p className="text-xs font-mono text-slate-500">User is currently offline</p>
                        </div>
                      )}
                    </div>
                 </div>
               </div>
             </div>
          ) : (
             <div className="bg-slate-50 rounded-2xl border border-slate-200 border-dashed h-[600px] flex flex-col items-center justify-center text-slate-400">
               <Activity className="w-12 h-12 mb-4 text-slate-300" />
               <p className="font-medium">Select a citizen to view their activity in real-time</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

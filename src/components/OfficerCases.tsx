import { Complaint, ComplaintStatus } from '../types';
import { Search, FileText, CheckCircle, XCircle, Clock, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function OfficerCases({ complaints, onUpdateStatus }: { complaints: Complaint[], onUpdateStatus: (id: string, status: ComplaintStatus, notes: string) => void }) {
  const [selectedCase, setSelectedCase] = useState<Complaint | null>(null);
  const [notes, setNotes] = useState('');

  const handleStatusUpdate = (status: ComplaintStatus) => {
    if (selectedCase) {
      onUpdateStatus(selectedCase.id, status, notes);
      setSelectedCase(null);
      setNotes('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Department Cases</h2>
          <p className="text-sm text-slate-500 mt-1">Review, approve, reject or escalate citizen complaints.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search cases..." 
            className="w-full pl-9 pr-4 py-2 border-slate-300 rounded-lg shadow-sm focus:border-[#00401A] focus:ring-[#00401A] sm:text-sm border outline-none font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden h-[600px] flex flex-col">
           <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-sm text-slate-700 flex justify-between items-center shrink-0">
             Active Queue
             <span className="bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded text-xs">{complaints.length}</span>
           </div>
           
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {complaints.length === 0 ? (
                <div className="text-center font-medium text-slate-400 text-sm mt-10">No cases in queue.</div>
             ) : complaints.map(c => (
               <button 
                  key={c.id} 
                  onClick={() => { setSelectedCase(c); setNotes(c.officerNotes || ''); }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedCase?.id === c.id ? 'bg-[#00401A] text-white border-[#00401A] shadow-md' : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-mono font-bold ${selectedCase?.id === c.id ? 'text-slate-300' : 'text-slate-700'}`}>{c.id}</span>
                    <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                      selectedCase?.id === c.id ? 'bg-white/20 text-white' : 
                      c.status === 'NEW' ? 'bg-slate-100 text-slate-600' :
                      c.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      c.status === 'ESCALATED' ? 'bg-orange-100 text-orange-700' :
                      c.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold line-clamp-1 mb-1 ${selectedCase?.id === c.id ? 'text-white' : 'text-slate-800'}`}>{c.headline}</h4>
                  <p className={`text-xs line-clamp-1 ${selectedCase?.id === c.id ? 'text-slate-400' : 'text-slate-500'}`}>{c.description}</p>
               </button>
             ))}
           </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
           {selectedCase ? (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center gap-3 mb-6">
                 <span className="bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider">{selectedCase.id}</span>
                 <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">{selectedCase.category}</span>
               </div>
               
               <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{selectedCase.headline}</h2>
               <div className="text-sm text-slate-500 mb-6 flex items-center gap-4">
                 <span>Reported by: <strong className="text-slate-700">{selectedCase.citizenName || 'Verified Citizen'}</strong></span>
                 <span>Date: <strong className="text-slate-700">{new Date(selectedCase.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</strong></span>
               </div>

               <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Complaint Description</h4>
                 <p className="text-sm text-slate-700 leading-relaxed font-medium">{selectedCase.description}</p>
               </div>

               {selectedCase.status !== 'RESOLVED' && selectedCase.status !== 'REJECTED' && (
                 <div className="space-y-4">
                   <label className="block text-sm font-bold text-slate-700">Officer Investigation Notes / Action Taken</label>
                   <textarea 
                     rows={4}
                     value={notes}
                     onChange={e => setNotes(e.target.value)}
                     placeholder="Enter resolution notes or reason for rejection/escalation..."
                     className="w-full border-slate-300 rounded-lg shadow-sm focus:border-[#00401A] focus:ring-[#00401A] sm:text-sm py-3 px-3 border outline-none font-medium text-slate-700"
                   />
                   
                   <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
                      {selectedCase.status === 'NEW' && (
                        <button onClick={() => handleStatusUpdate('IN_PROGRESS')} className="flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                          <Clock className="w-4 h-4" /> Begin Investigation
                        </button>
                      )}
                      
                      <button onClick={() => handleStatusUpdate('RESOLVED')} className="flex items-center gap-2 bg-[#00401A] text-white hover:bg-[#002b12] px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">
                        <CheckCircle className="w-4 h-4" /> Approve & Resolve
                      </button>
                      
                      <button onClick={() => handleStatusUpdate('REJECTED')} className="flex items-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                        <XCircle className="w-4 h-4" /> Reject Invalid
                      </button>
                      
                      <button onClick={() => handleStatusUpdate('ESCALATED')} className="flex items-center gap-2 bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors ml-auto">
                        <ShieldAlert className="w-4 h-4" /> Escalate Issue
                      </button>
                   </div>
                 </div>
               )}

               {(selectedCase.status === 'RESOLVED' || selectedCase.status === 'REJECTED' || selectedCase.officerNotes) && (
                 <div className="mt-8 border-t border-slate-200 pt-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Previous Notes</h4>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-lg">
                      {selectedCase.officerNotes || 'No notes provided.'}
                    </p>
                 </div>
               )}
             </div>
           ) : (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[600px] flex flex-col items-center justify-center text-slate-500">
                <FileText className="w-12 h-12 text-slate-200 mb-4" />
                <p className="font-medium text-sm">Select a case from the queue to view details.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

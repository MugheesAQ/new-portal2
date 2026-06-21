import { Complaint } from '../types';
import { Search, Loader2, ShieldCheck, ShieldAlert, FileText, XCircle } from 'lucide-react';

export default function Tracking({ complaints }: { complaints: Complaint[] }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Tracking & History</h2>
          <p className="text-sm text-slate-500 mt-1">Track the status of your submitted complaints in real-time.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID or keyword..." 
            className="w-full pl-9 pr-4 py-2 border-slate-300 rounded-lg shadow-sm focus:border-[#0f172a] focus:ring-[#0f172a] sm:text-sm border outline-none font-medium"
          />
        </div>
      </div>

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="bg-white p-16 flex flex-col items-center justify-center rounded-2xl border border-slate-200 shadow-sm gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
               <FileText className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium text-sm">No records found your history.</p>
          </div>
        ) : complaints.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6 hover:border-slate-300 transition-colors">
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded shadow-sm">{c.id}</span>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase bg-slate-100 px-2 py-0.5 rounded">{c.category}</span>
                <span className="text-xs text-slate-400 ml-auto font-medium">Logged on {new Date(c.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">{c.headline}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{c.description}</p>
            </div>

            <div className="md:w-64 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-3">
               <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-sm border ${
                  c.status === 'NEW' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                  c.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  c.status === 'ESCALATED' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  c.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {c.status === 'NEW' && <ShieldAlert className="w-3.5 h-3.5" />}
                  {c.status === 'IN_PROGRESS' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {c.status === 'ESCALATED' && <ShieldAlert className="w-3.5 h-3.5" />}
                  {c.status === 'REJECTED' && <XCircle className="w-3.5 h-3.5" />}
                  {c.status === 'RESOLVED' && <ShieldCheck className="w-3.5 h-3.5" />}
                  {c.status.replace('_', ' ')}
                </span>
                
                {c.status !== 'RESOLVED' && c.status !== 'REJECTED' ? (
                  <p className="text-[10px] text-slate-500 text-right font-medium">Est. Resolution: 7-14 Days</p>
                ) : c.status === 'RESOLVED' ? (
                  <p className="text-[10px] text-slate-700 font-bold text-right bg-slate-100 px-2 py-1 rounded border border-slate-200">Resolved on {new Date(c.resolvedAt || '').toLocaleDateString()}</p>
                ) : (
                  <p className="text-[10px] text-slate-700 font-bold text-right bg-slate-100 px-2 py-1 rounded border border-slate-200">Request Rejected</p>
                )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

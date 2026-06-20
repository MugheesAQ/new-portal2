import { Complaint } from '../types';
import { ShieldAlert, CheckCircle, Clock, FileText } from 'lucide-react';

export default function Dashboard({ complaints, onNavigate }: { complaints: Complaint[], onNavigate: (v: string) => void }) {
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;
  const activeCount = complaints.filter(c => c.status !== 'RESOLVED').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b border-slate-200 pb-4">
        Citizen Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <FileText className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">Total Submissions</p>
          </div>
          <div className="mt-5">
            <h3 className="text-4xl font-bold text-slate-800">{complaints.length}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Clock className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">In Progress</p>
          </div>
          <div className="mt-5">
            <h3 className="text-4xl font-bold text-slate-800">{activeCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <CheckCircle className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">Resolved Cases</p>
          </div>
          <div className="mt-5">
            <h3 className="text-4xl font-bold text-slate-800">{resolvedCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col mt-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-slate-400" />
            Recent Activity
          </h2>
          <button 
            onClick={() => onNavigate('tracking')}
            className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="p-0 overflow-hidden rounded-b-2xl">
          {complaints.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">No complaints found. Generate a new request to see it here.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 bg-white">
                  <th className="py-3 px-6 font-semibold">Tracking ID</th>
                  <th className="py-3 px-6 font-semibold">Category</th>
                  <th className="py-3 px-6 font-semibold">Headline</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 text-right font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600 bg-white">
                {complaints.slice(0, 5).map(c => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-700 text-xs">{c.id}</td>
                    <td className="py-4 px-6 font-medium text-slate-700">{c.category}</td>
                    <td className="py-4 px-6 truncate max-w-[200px]">{c.headline}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${
                        c.status === 'NEW' ? 'bg-slate-50 text-slate-600 border-slate-200' :
                        c.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        c.status === 'ESCALATED' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        c.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-xs text-slate-400 font-medium">
                      {new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

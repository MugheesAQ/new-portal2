import { Complaint, ViewState } from '../types';
import { ShieldAlert, CheckCircle, Clock, FileText, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Mock historical data structured directly for Recharts binding.
 * Evaluates simulated performance aggregates across months to render the comparative trends chart.
 */
const MOCK_MONTHLY_DATA = [
  { name: 'Jan', Infrastructure: 12, Healthcare: 8, 'Law & Order': 4, Education: 3 },
  { name: 'Feb', Infrastructure: 15, Healthcare: 6, 'Law & Order': 7, Education: 4 },
  { name: 'Mar', Infrastructure: 10, Healthcare: 12, 'Law & Order': 5, Education: 2 },
  { name: 'Apr', Infrastructure: 18, Healthcare: 15, 'Law & Order': 6, Education: 5 },
  { name: 'May', Infrastructure: 8, Healthcare: 9, 'Law & Order': 3, Education: 7 },
  { name: 'Jun', Infrastructure: 14, Healthcare: 11, 'Law & Order': 8, Education: 6 },
];

/**
 * Dashboard Component - The initial citizen landing surface showing metric overviews alongside a live list of recent activities.
 * It visualizes a multi-bar chart identifying historical request types for analytics purposes.
 * 
 * @param complaints - External array of complaint parameters specific to user scopes.
 * @param onNavigate - Routing dispatcher navigating deep contexts upon interactions.
 */
export default function Dashboard({ complaints, onNavigate }: { complaints: Complaint[], onNavigate: (v: ViewState) => void }) {
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;
  const activeCount = complaints.filter(c => c.status !== 'RESOLVED').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[400px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl shrink-0">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-slate-400" />
              Service Requests by Category
            </h2>
          </div>
          <div className="flex-1 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="Infrastructure" stackId="a" fill="#0f172a" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Healthcare" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Education" stackId="a" fill="#eab308" />
                <Bar dataKey="Law & Order" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[400px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl shrink-0">
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
          <div className="flex-1 overflow-auto rounded-b-2xl">
            {complaints.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm flex flex-col items-center justify-center h-full">
                No complaints found. Generate a new request to see it here.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white shadow-sm z-10">
                  <tr className="text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 bg-slate-50/50">
                    <th className="py-3 px-6 font-semibold">Tracking ID</th>
                    <th className="py-3 px-6 font-semibold">Headline</th>
                    <th className="py-3 px-6 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600 bg-white">
                  {complaints.slice(0, 5).map(c => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-slate-700 text-xs">{c.id}</td>
                      <td className="py-4 px-6 truncate max-w-[150px] font-medium text-slate-700" title={c.headline}>{c.headline}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap font-bold tracking-wider border ${
                          c.status === 'NEW' ? 'bg-slate-50 text-slate-600 border-slate-200' :
                          c.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          c.status === 'ESCALATED' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                          c.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {c.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

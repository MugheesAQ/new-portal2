import { useState } from 'react';
import { Complaint } from '../types';
import { AlertCircle, FilePlus, Send } from 'lucide-react';

const CATEGORIES = [
  'Municipal Services',
  'Health Department',
  'Education',
  'Land Records',
  'Police & Security',
  'Infrastructure',
  'Other'
];

export default function SubmitComplaint({ onSubmit }: { onSubmit: (c: Partial<Complaint>) => void }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category,
      headline,
      description
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-[#0f172a]" />
            New Complaint (E-Sikayat)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please provide accurate details. False reporting may lead to administrative action.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Department / Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border-slate-300 rounded-lg shadow-sm focus:border-[#0f172a] focus:ring-[#0f172a] sm:text-sm py-2.5 px-3 border bg-white outline-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject / Headline</label>
            <input 
              required
              type="text"
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              placeholder="Brief summary of the issue"
              className="w-full border-slate-300 rounded-lg shadow-sm focus:border-[#0f172a] focus:ring-[#0f172a] sm:text-sm py-2.5 px-3 border outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Detailed Description</label>
            <textarea 
              required
              rows={6}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Provide all relevant details, location, and dates..."
              className="w-full border-slate-300 rounded-lg shadow-sm focus:border-[#0f172a] focus:ring-[#0f172a] sm:text-sm py-3 px-3 border outline-none"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3 border border-slate-200">
            <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <p className="font-bold mb-1">Before submitting:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs font-medium">
                <li>Ensure all details are factual and clear.</li>
                <li>Your verified identity and timestamp will be logged with this submission.</li>
                <li>You can track the progress using the generated Complaint ID in the Tracking tab.</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-[#0f172a] text-[#eab308] px-6 py-2.5 rounded-sm font-bold hover:bg-black focus:ring-4 focus:ring-[#0f172a]/20 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
              Submit securely
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

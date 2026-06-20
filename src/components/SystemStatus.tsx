import { Server, Activity, Database, HardDrive, Cpu, Network, CheckCircle, RefreshCcw } from 'lucide-react';

export default function SystemStatus() {
  const containers = [
    { name: 'desc-frontend-main', image: 'nginx:alpine', status: 'Running', cpu: '2.4%', mem: '128MB', uptime: '14d 6h' },
    { name: 'desc-api-gateway', image: 'node:18', status: 'Running', cpu: '14.2%', mem: '450MB', uptime: '14d 6h' },
    { name: 'desc-auth-service', image: 'go:1.21', status: 'Running', cpu: '0.8%', mem: '64MB', uptime: '30d 12h' },
    { name: 'desc-db-primary', image: 'postgres:15', status: 'Running', cpu: '34.5%', mem: '4.2GB', uptime: '90d 1h' },
    { name: 'desc-redis-cache', image: 'redis:7', status: 'Running', cpu: '1.2%', mem: '1.1GB', uptime: '45d 8h' },
    { name: 'desc-worker-queue', image: 'node:18', status: 'Running', cpu: '8.4%', mem: '512MB', uptime: '2d 4h' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">System Information</h2>
          <p className="text-sm text-slate-500 mt-1">Infrastructure vitals and active container tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            All Systems Operational
          </div>
          <button className="flex items-center justify-center p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Server className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">Active Nodes</p>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-800">3</h3>
            <p className="text-sm text-slate-500 mb-1 font-medium">/ 3 Healthy</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Database className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">Database Status</p>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <CheckCircle className="w-5 h-5 text-green-600" /> Synced
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">Replication Lag: 14ms</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Cpu className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">Cluster CPU</p>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-800">42<span className="text-lg text-slate-500">%</span></h3>
          </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
             <div className="bg-slate-800 h-1.5 rounded-full" style={{ width: '42%' }}></div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <HardDrive className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">Memory Alloc</p>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-800">6.4<span className="text-lg text-slate-500">GB</span></h3>
          </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
             <div className="bg-slate-800 h-1.5 rounded-full" style={{ width: '64%' }}></div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
           <h3 className="font-bold text-slate-800">Container Instances</h3>
           <Network className="w-5 h-5 text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Container Name</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Image</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">CPU</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Memory</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Uptime</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-700 bg-white">
              {containers.map((container, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-bold text-slate-800">{container.name}</td>
                  <td className="py-4 px-6 text-slate-500 font-mono text-xs">{container.image}</td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200 w-fit">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {container.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">{container.cpu}</td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-500">{container.mem}</td>
                  <td className="py-4 px-6 text-slate-500">{container.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

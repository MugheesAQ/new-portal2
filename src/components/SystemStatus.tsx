import { Server, Activity, Database, HardDrive, Cpu, Network, CheckCircle, RefreshCcw, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Mock representation of active internal microservices executing logic on container environments
 */
const INITIAL_CONTAINERS = [
  { name: 'desc-frontend-main', image: 'nginx:alpine', status: 'Running', cpu: 2.4, mem: 128, uptime: '14d 6h' },
  { name: 'desc-api-gateway', image: 'node:18', status: 'Running', cpu: 14.2, mem: 450, uptime: '14d 6h' },
  { name: 'desc-auth-service', image: 'go:1.21', status: 'Running', cpu: 0.8, mem: 64, uptime: '30d 12h' },
  { name: 'desc-db-primary', image: 'postgres:15', status: 'Running', cpu: 34.5, mem: 4200, uptime: '90d 1h' },
  { name: 'desc-redis-cache', image: 'redis:7', status: 'Running', cpu: 1.2, mem: 1100, uptime: '45d 8h' },
  { name: 'desc-worker-queue', image: 'node:18', status: 'Running', cpu: 8.4, mem: 512, uptime: '2d 4h' },
];

/**
 * System Status Component - Diagnostic UI giving operations management teams continuous observation 
 * of underlying system resources. Leverages effect intervals to simulate live data aggregation.
 */
export default function SystemStatus() {
  const [containers, setContainers] = useState(INITIAL_CONTAINERS);
  const [clusterCpu, setClusterCpu] = useState(42);
  const [clusterMem, setClusterMem] = useState(6.4);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const simulateTick = () => {
    setContainers(prev => prev.map(c => ({
      ...c,
      cpu: Math.max(0.1, +(c.cpu + (Math.random() * 4 - 2)).toFixed(1)),
      mem: Math.max(10, Math.round(c.mem + (Math.random() * 20 - 10)))
    })));
    setClusterCpu(prev => Math.max(5, Math.min(95, Math.round(prev + (Math.random() * 10 - 5)))));
    setClusterMem(prev => Math.max(2, Math.min(16, +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1))));
  };

  useEffect(() => {
    const interval = setInterval(simulateTick, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    simulateTick();
    setTimeout(() => setIsRefreshing(false), 600);
  };

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
          <button 
            onClick={handleRefresh}
            className={`flex items-center justify-center p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors ${isRefreshing ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
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
          <p className="text-xs text-slate-500 mt-2 font-medium">Replication Lag: {Math.max(10, Math.floor(Math.random() * 20))}ms</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Cpu className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">Cluster CPU</p>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-800">{clusterCpu}<span className="text-lg text-slate-500">%</span></h3>
          </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
             <div className="bg-slate-800 h-1.5 rounded-full transition-all duration-700 ease-out" style={{ width: `${clusterCpu}%` }}></div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <HardDrive className="w-5 h-5 text-slate-700" />
             </div>
             <p className="text-sm font-bold text-slate-600 uppercase tracking-tight">Memory Alloc</p>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-slate-800">{clusterMem}<span className="text-lg text-slate-500">GB</span></h3>
          </div>
           <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
             <div className="bg-slate-800 h-1.5 rounded-full transition-all duration-700 ease-out" style={{ width: `${(clusterMem / 16) * 100}%` }}></div>
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
                  <td className="py-4 px-6 transition-all duration-300">
                    <span className={container.cpu > 20 ? 'text-orange-600 font-bold' : ''}>{container.cpu.toFixed(1)}%</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-500 transition-all duration-300">
                    {container.mem >= 1024 ? `${(container.mem / 1024).toFixed(1)}GB` : `${container.mem}MB`}
                  </td>
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

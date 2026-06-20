import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Landmark, FileText, Database, Cloud, FileJson, CheckCircle, FolderClosed, FolderOpen, FileCode2, ChevronRight, ChevronDown, Package } from 'lucide-react';
import { docsList } from './data/docsProvider';
import { backendSourceCode, FileNode } from './data/backendSource';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function App() {
  const [activeTab, setActiveTab] = useState<'docs' | 'code'>('code');
  const [activeDocId, setActiveDocId] = useState(docsList[0].id);
  const [activeFile, setActiveFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['backend', 'backend/api-gateway', 'backend/auth-service', 'backend/complaint-service']));

  const activeDoc = docsList.find(d => d.id === activeDocId);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getIcon = (id: string, active: boolean) => {
    const className = `w-4 h-4 ${active ? 'text-green-400' : ''}`;
    switch (id) {
      case '01-Solution-Architecture.md': return <Landmark className={className} />;
      case '02-Folder-Structure.md': return <FileText className={className} />;
      case '03-AWS-Architecture.md': return <Cloud className={className} />;
      case '04-Kubernetes-Architecture.md': return <FileJson className={className} />;
      case '05-Database-ERD.md': return <Database className={className} />;
      default: return <FileText className={className} />;
    }
  };

  const renderFileTree = (nodes: FileNode[] | undefined, path: string = '') => {
    if (!nodes) return null;
    return nodes.map((node, i) => {
      const currentPath = path ? `${path}/${node.name}` : node.name;
      const isExpanded = expandedFolders.has(currentPath);
      
      if (node.type === 'folder') {
        return (
          <div key={currentPath} className="ml-3">
            <button 
              onClick={() => toggleFolder(currentPath)}
              className="flex items-center gap-1.5 py-1 px-2 text-sm text-slate-300 hover:text-white w-full text-left rounded hover:bg-slate-800 transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              {isExpanded ? <FolderOpen className="w-4 h-4 text-blue-400" /> : <FolderClosed className="w-4 h-4 text-blue-400" />}
              <span className="truncate">{node.name}</span>
            </button>
            {isExpanded && node.children && renderFileTree(node.children, currentPath)}
          </div>
        );
      }

      const isActive = activeFile === node;
      return (
        <div key={currentPath} className="ml-3">
          <button 
            onClick={() => setActiveFile(node)}
            className={`flex items-center gap-2 py-1 px-6 text-sm w-full text-left rounded transition-colors ${isActive ? 'bg-slate-800 text-green-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="truncate">{node.name}</span>
          </button>
        </div>
      );
    });
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Top Government Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#00401A] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 leading-none">DESC Digital Innovation Center</h1>
            <p className="text-xs text-slate-500 mt-1">Government of Khyber Pakhtunkhwa | Mardan Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-700">Team</p>
            <p className="text-[10px] uppercase tracking-wider text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded">Architects & Engineers</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-slate-400"/>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-72 bg-slate-900 flex flex-col pt-4 overflow-hidden shrink-0 border-r border-slate-800">
          
          {/* Tab Selector */}
          <div className="flex px-4 mb-4 gap-2">
            <button 
              onClick={() => setActiveTab('docs')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-colors ${activeTab === 'docs' ? 'bg-[#00401A] text-white border-[#00401A]' : 'bg-transparent text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'}`}
            >
              Architecture
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'code' ? 'bg-[#00401A] text-white border-[#00401A]' : 'bg-transparent text-slate-400 border-slate-700 hover:text-white hover:border-slate-500'}`}
            >
              <Package className="w-3.5 h-3.5" /> Source
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {activeTab === 'docs' ? (
              <div className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Phase 1 Complete
                </p>
                {docsList.map((doc) => {
                  const active = activeDocId === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                        active
                          ? 'bg-white/10 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-green-400 absolute left-1.5"></span>}
                      <span className={`flex items-center gap-3 ${active ? 'pl-2' : ''}`}>
                        {getIcon(doc.id, active)}
                        <span className="truncate">{doc.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="font-mono text-sm">
                <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 mb-3 flex items-center gap-2 font-sans">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  Full Project Generated
                </p>
                {renderFileTree(backendSourceCode)}
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="bg-slate-800 p-4 border-t border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-3">Deployment Status</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-left gap-2">
                  <span className="text-xs text-slate-300 leading-tight">Phase 1: Architecture</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></span>
                </div>
                <div className="flex justify-between items-center text-left gap-2">
                  <span className="text-xs text-slate-300 leading-tight">Phase 2: Microservices</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></span>
                </div>
                <div className="flex justify-between items-center text-left gap-2">
                  <span className="text-xs text-slate-300 leading-tight">Phase 3: Infrastructure</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></span>
                </div>
                <div className="flex justify-between items-center text-left gap-2">
                  <span className="text-xs text-slate-300 leading-tight">Phase 4: Pipelines</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-[10px] text-green-400 text-left font-bold tracking-wider">PROJECT GENERATED</p>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden bg-slate-50 flex flex-col relative">
          {activeTab === 'docs' ? (
             <div className="flex-1 overflow-y-auto p-8">
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col p-8 max-w-5xl mx-auto min-h-full">
                 <div className="border-b border-slate-100 pb-6 mb-6">
                   <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                     {activeDoc?.title}
                   </h2>
                   <p className="text-sm text-slate-500 mt-2">
                     Project documentation reviewing the conceptual definitions and infrastructure schema.
                   </p>
                 </div>
                 
                 <div className="text-slate-600 text-sm leading-relaxed
                   [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-800 [&_h1]:mb-6
                   [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-200
                   [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3
                   [&_p]:mb-4
                   [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1
                   [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                   [&_pre]:bg-slate-50 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-slate-200 [&_pre]:overflow-x-auto [&_pre]:mb-6
                   [&_code]:text-xs [&_code]:font-mono [&_code]:text-slate-800
                   [&_a]:text-[#00401A] [&_a]:underline
                   [&_strong]:font-semibold [&_strong]:text-slate-800"
                 >
                   {activeDoc && (
                     <ReactMarkdown>{activeDoc.content}</ReactMarkdown>
                   )}
                 </div>
               </div>
             </div>
          ) : activeFile ? (
             <div className="flex-1 flex flex-col bg-[#1E1E1E]">
               <div className="h-10 bg-[#252526] border-b border-[#3c3c3c] flex items-center px-4 shrink-0 transition-all">
                 <div className="flex items-center gap-2 text-[#9cdcfe] text-sm font-mono">
                    <FileCode2 className="w-4 h-4 text-slate-400" />
                    {activeFile.name}
                 </div>
                 <div className="ml-auto flex items-center gap-2">
                   <span className="text-[10px] text-green-400 uppercase tracking-wider font-sans bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded flex items-center gap-1.5"><CheckCircle className="w-3 h-3" /> Fully Generated</span>
                 </div>
               </div>
               <div className="flex-1 overflow-auto text-sm">
                 <SyntaxHighlighter 
                   language={activeFile.language || 'java'} 
                   style={vscDarkPlus}
                   customStyle={{ margin: 0, background: 'transparent', padding: '1rem', height: '100%' }}
                   showLineNumbers={true}
                 >
                   {activeFile.content || '// Content empty for '+activeFile.name}
                 </SyntaxHighlighter>
               </div>
             </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#1E1E1E] text-slate-500 flex-col gap-4">
              <Package className="w-16 h-16 opacity-20" />
              <p className="font-mono text-sm">Select a file from the explorer to view the generated source code</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


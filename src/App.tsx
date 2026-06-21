import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SubmitComplaint from './components/SubmitComplaint';
import Tracking from './components/Tracking';
import Profile from './components/Profile';
import OfficerCases from './components/OfficerCases';
import SystemStatus from './components/SystemStatus';
import CitizenTracker from './components/CitizenTracker';
import { User, Complaint, ViewState, UserRole, ComplaintStatus } from './types';

// Mock initial data
const MOCK_CITIZEN: User = {
  id: 'usr_xyz123',
  name: 'Waqas Ahmed',
  email: 'waqas.ahmed@example.com',
  cnic: '17301-1234567-1',
  phone: '+92 312 3456789',
  address: 'Hayatabad Phase 4, Peshawar',
  role: 'citizen'
};

const MOCK_OFFICER: User = {
  id: 'off_abc999',
  name: 'Tariq Mehmood',
  email: 'officer.desc@kp.gov.pk',
  cnic: '17301-9999999-9',
  phone: '+92 345 9876543',
  role: 'officer',
  department: 'DESC Citizen Support & General Review'
};

const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'DESC-2024-882',
    citizenId: 'usr_xyz123',
    citizenName: 'Waqas Ahmed',
    category: 'Municipal Services',
    headline: 'Garbage Collection Irregular in Sector D',
    description: 'The municipal garbage collection truck has not visited Sector D for the past 5 days causing a severe health hazard. Immediate action is requested.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'DESC-2024-850',
    citizenId: 'usr_xyz123',
    citizenName: 'Waqas Ahmed',
    category: 'Land Records',
    headline: 'E-Fard issuance delayed significantly',
    description: 'Applied for E-Fard via the portal 3 weeks ago but no response was received. Status stuck on pending review. Please expedite.',
    status: 'ESCALATED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    officerNotes: 'Escalated to higher authorities in Land Record Management due to a systematic delay.'
  },
  {
    id: 'DESC-2024-801',
    citizenId: 'usr_xyz123',
    citizenName: 'Waqas Ahmed',
    category: 'Education',
    headline: 'Teacher Absenteeism in Govt School',
    description: 'Reporting prolonged absences of teaching staff at GPS No. 2.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    officerNotes: 'Investigation performed. Notice issued to the staff and attendance system updated.'
  }
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);

  const handleLogin = (role: UserRole) => {
    if (role === 'officer') {
      setUser(MOCK_OFFICER);
      setCurrentView('officer-dashboard');
    } else {
      setUser(MOCK_CITIZEN);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const handleAddComplaint = (c: Partial<Complaint>) => {
    const newComplaint: Complaint = {
      id: `DESC-2024-${Math.floor(Math.random() * 900) + 100}`,
      citizenId: user!.id,
      citizenName: user!.name,
      category: c.category!,
      headline: c.headline!,
      description: c.description!,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    
    setComplaints(prev => [newComplaint, ...prev]);
    setCurrentView('tracking');
  };

  const handleUpdateStatus = (id: string, status: ComplaintStatus, notes: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          officerNotes: notes || c.officerNotes,
          resolvedAt: status === 'RESOLVED' ? new Date().toISOString() : c.resolvedAt
        };
      }
      return c;
    }));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Determine complaints context
  // If citizen, only show their own
  // If officer, show all
  const filteredComplaints = user.role === 'citizen' 
    ? complaints.filter(c => c.citizenId === user.id)
    : complaints;

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <Header user={user} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          onNavigate={setCurrentView} 
          onLogout={handleLogout} 
          role={user.role}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          {user.role === 'citizen' && currentView === 'dashboard' && (
            <Dashboard complaints={filteredComplaints} onNavigate={setCurrentView} />
          )}
          {user.role === 'citizen' && currentView === 'submit-complaint' && (
            <SubmitComplaint onSubmit={handleAddComplaint} />
          )}
          {user.role === 'citizen' && currentView === 'tracking' && (
            <Tracking complaints={filteredComplaints} />
          )}
          {currentView === 'profile' && (
            <Profile user={user} />
          )}
          
          {user.role === 'officer' && (currentView === 'officer-dashboard' || currentView === 'dashboard') && (
            <Dashboard complaints={filteredComplaints} onNavigate={(v) => setCurrentView('officer-cases')} />
          )}
          {user.role === 'officer' && currentView === 'officer-cases' && (
            <OfficerCases complaints={filteredComplaints} onUpdateStatus={handleUpdateStatus} />
          )}
          {user.role === 'officer' && currentView === 'system-status' && (
            <SystemStatus />
          )}
          {user.role === 'officer' && currentView === 'citizen-tracker' && (
            <CitizenTracker />
          )}
        </main>
      </div>
    </div>
  );
}

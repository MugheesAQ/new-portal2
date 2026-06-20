export type UserRole = 'citizen' | 'officer';

export type User = {
  id: string;
  name: string;
  email: string;
  cnic: string;
  phone?: string;
  address?: string;
  role: UserRole;
  department?: string;
};

export type ComplaintStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED' | 'REJECTED';

export type Complaint = {
  id: string;
  citizenId: string;
  citizenName?: string;
  category: string;
  headline: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  resolvedAt?: string;
  officerNotes?: string;
};

export type ViewState = 'dashboard' | 'submit-complaint' | 'tracking' | 'profile' | 'officer-dashboard' | 'officer-cases' | 'system-status';

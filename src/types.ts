/**
 * Defines shared interfaces mapped systematically across component parameters globally. 
 */
export type UserRole = 'citizen' | 'officer';

/**
 * Core authentication payload definition describing an active user entity constraint format.
 */
export type User = {
  id: string;
  name: string;
  email: string;
  cnic: string;
  phone?: string;
  address?: string;
  role: UserRole;
  department?: string;
  avatar?: string;
};

/**
 * Valid strict string sequences determining complaint pipeline progress
 */
export type ComplaintStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED' | 'REJECTED';

/**
 * Represents the fundamental schema of a formally submitted problem query within the portal network.
 */
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

/**
 * Valid strict router values limiting main Application components view capabilities. 
 */
export type ViewState = 'dashboard' | 'submit-complaint' | 'tracking' | 'profile' | 'officer-dashboard' | 'officer-cases' | 'system-status' | 'citizen-tracker';
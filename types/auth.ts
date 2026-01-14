export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  date_of_birth?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile?: UserProfile;
}
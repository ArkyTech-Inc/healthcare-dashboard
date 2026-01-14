export interface Patient {
  id: string;
  user_id?: string;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  blood_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  phone: string;
  email?: string;
  address_line1?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  allergies?: string[];
  current_medications?: string[];
  chronic_conditions?: string[];
  insurance_provider?: string;
  insurance_policy_number?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
export type MedicalRecordType =
  | 'consultation'
  | 'diagnosis'
  | 'prescription'
  | 'lab_result'
  | 'imaging'
  | 'procedure'
  | 'vaccination'
  | 'admission'
  | 'discharge'
  | 'referral';

export type RecordStatus = 'draft' | 'pending' | 'completed' | 'cancelled' | 'amended';

export interface MedicalRecord {
  id: string;
  patient_id: string;
  provider_id: string;
  record_type: MedicalRecordType;
  record_date: string;
  record_time?: string;
  status: RecordStatus;
  chief_complaint?: string;
  present_illness?: string;
  physical_examination?: string;
  diagnosis: string;
  diagnosis_codes?: string[];
  treatment_plan?: string;
  prescriptions?: any;
  lab_orders?: any;
  vital_signs?: {
    blood_pressure?: string;
    heart_rate?: number;
    temperature?: number;
    respiratory_rate?: number;
    oxygen_saturation?: number;
    weight?: number;
    height?: number;
  };
  follow_up_required?: boolean;
  follow_up_date?: string;
  follow_up_notes?: string;
  attachments?: any[];
  related_records?: string[];
  billing_codes?: string[];
  total_cost?: number;
  is_confidential?: boolean;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface MedicalRecordWithRelations extends MedicalRecord {
  patient?: {
    first_name: string;
    last_name: string;
    mrn: string;
  };
  provider?: {
    full_name: string;
  };
}

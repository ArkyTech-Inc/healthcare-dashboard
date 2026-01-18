export interface Appointment {
  id: string;
  patient_id: string;
  provider_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  appointment_type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason?: string;
  notes?: string;
  medical_record_id?: string;
  reminder_sent?: boolean;
  reminder_sent_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface AppointmentWithRelations extends Appointment {
  patient?: {
    first_name: string;
    last_name: string;
    mrn: string;
    phone: string;
  };
  provider?: {
    full_name: string;
    specialty: string;
  };
}
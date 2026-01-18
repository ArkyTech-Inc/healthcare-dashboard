import { z } from 'zod';

export const appointmentSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  provider_id: z.string().min(1, 'Provider is required'),
  appointment_date: z.string().min(1, 'Appointment date is required'),
  appointment_time: z.string().min(1, 'Appointment time is required'),
  duration_minutes: z.number().min(15).max(480).default(30),
  appointment_type: z.string().min(1, 'Appointment type is required'),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show']).default('scheduled'),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

export type AppointmentFormSchema = z.infer<typeof appointmentSchema>;
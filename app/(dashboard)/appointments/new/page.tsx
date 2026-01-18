import {AppointmentForm} from "@/components/appointments/appointment-form"

export default function NewAppointmentPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Schedule New Appointment</h1>
        <p className="text-gray-600 mt-2">Create a new appointment for a patient</p>
      </div>
      <AppointmentForm />
    </div>
  )
}

import PatientForm from "@/components/patients/patient-form"

export default function NewPatientPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Patient</h1>
        <p className="text-gray-600 mt-2">Add a new patient to the system</p>
      </div>
      <PatientForm mode="create" />
    </div>
  )
}

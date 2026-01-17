import { MedicalRecordForm } from "@/components/medical-records/medical-record-form"

export default function NewMedicalRecordPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Medical Record</h1>
        <p className="text-gray-600 mt-2">Add a new medical record for a patient</p>
      </div>
      <MedicalRecordForm />
    </div>
  )
}

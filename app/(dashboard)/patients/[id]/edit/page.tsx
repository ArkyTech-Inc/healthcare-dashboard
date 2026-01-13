import { notFound } from "next/navigation"
import PatientForm from "@/components/patients/patient-form"

// Mock patient data - same as detail page
const mockPatients = {
  "1": {
    id: "1",
    mrn: "MR-001234",
    first_name: "Sarah",
    last_name: "Johnson",
    date_of_birth: "1985-03-15",
    gender: "female",
    blood_type: "O+",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    address: {
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postal_code: "10001",
      country: "USA",
    },
    emergency_contact: {
      name: "John Johnson",
      relationship: "Brother",
      phone: "(555) 123-4568",
    },
    allergies: ["Penicillin", "Latex"],
    current_medications: ["Lisinopril", "Metformin"],
    chronic_conditions: ["Type 2 Diabetes", "Hypertension"],
    past_surgeries: ["Appendectomy (2010)"],
    insurance: {
      provider: "BlueCross BlueShield",
      policy_number: "BC1234567",
      group_number: "GRP789",
      expiry_date: "2025-12-31",
    },
    height_cm: 168,
    weight_kg: 68,
    notes: "Patient reports good compliance with medications",
  },
}

export default function EditPatientPage({ params }: { params: { id: string } }) {
  const patient = mockPatients[params.id as keyof typeof mockPatients]

  if (!patient) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Patient: {patient.first_name} {patient.last_name}
        </h1>
        <p className="text-gray-600 mt-2">Update patient information</p>
      </div>
      <PatientForm mode="edit" patient={patient} />
    </div>
  )
}

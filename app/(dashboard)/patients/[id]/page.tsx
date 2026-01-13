import { notFound } from "next/navigation"
import PatientDetail from "@/components/patients/patient-detail"

// Mock patient data - replace with actual database query
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

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = mockPatients[params.id as keyof typeof mockPatients]

  if (!patient) {
    notFound()
  }

  return (
    <div className="max-w-4xl">
      <PatientDetail patient={patient} />
    </div>
  )
}

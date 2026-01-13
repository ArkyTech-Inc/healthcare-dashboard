"use client"

import Link from "next/link"
import { Edit, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PatientData {
  id: string
  mrn: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: string
  blood_type: string
  phone: string
  email: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  emergency_contact: {
    name: string
    relationship: string
    phone: string
  }
  allergies: string[]
  current_medications: string[]
  chronic_conditions: string[]
  past_surgeries: string[]
  insurance: {
    provider: string
    policy_number: string
    group_number: string
    expiry_date: string
  }
  height_cm: number
  weight_kg: number
  notes: string
}

interface PatientDetailProps {
  patient: PatientData
}

export default function PatientDetail({ patient }: PatientDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/patients">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {patient.first_name} {patient.last_name}
            </h1>
            <p className="text-gray-600 mt-1">MRN: {patient.mrn}</p>
          </div>
        </div>
        <Link href={`/patients/${patient.id}/edit`}>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="First Name" value={patient.first_name} />
          <InfoField label="Last Name" value={patient.last_name} />
          <InfoField label="Date of Birth" value={patient.date_of_birth} />
          <InfoField label="Gender" value={patient.gender} />
          <InfoField label="Blood Type" value={patient.blood_type} />
          <InfoField label="Height" value={`${patient.height_cm} cm`} />
          <InfoField label="Weight" value={`${patient.weight_kg} kg`} />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Phone" value={patient.phone} />
          <InfoField label="Email" value={patient.email} />
          <div className="md:col-span-2">
            <InfoField
              label="Address"
              value={`${patient.address.line1}${patient.address.line2 ? ", " + patient.address.line2 : ""}, ${patient.address.city}, ${patient.address.state} ${patient.address.postal_code}`}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Name" value={patient.emergency_contact.name} />
          <InfoField label="Relationship" value={patient.emergency_contact.relationship} />
          <InfoField label="Phone" value={patient.emergency_contact.phone} />
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Medical Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.length > 0 ? (
                patient.allergies.map((allergy) => (
                  <span key={allergy} className="inline-block px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    {allergy}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">No allergies reported</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Current Medications</p>
            <div className="flex flex-wrap gap-2">
              {patient.current_medications.length > 0 ? (
                patient.current_medications.map((med) => (
                  <span key={med} className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {med}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">No current medications</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Chronic Conditions</p>
            <div className="flex flex-wrap gap-2">
              {patient.chronic_conditions.length > 0 ? (
                patient.chronic_conditions.map((condition) => (
                  <span
                    key={condition}
                    className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                  >
                    {condition}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">No chronic conditions</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Past Surgeries</p>
            <div className="flex flex-wrap gap-2">
              {patient.past_surgeries.length > 0 ? (
                patient.past_surgeries.map((surgery) => (
                  <span
                    key={surgery}
                    className="inline-block px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    {surgery}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">No past surgeries</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Insurance Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoField label="Provider" value={patient.insurance.provider} />
          <InfoField label="Policy Number" value={patient.insurance.policy_number} />
          <InfoField label="Group Number" value={patient.insurance.group_number} />
          <InfoField label="Expiry Date" value={patient.insurance.expiry_date} />
        </div>
      </div>

      {/* Notes */}
      {patient.notes && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
          <p className="text-gray-600">{patient.notes}</p>
        </div>
      )}
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-gray-900 mt-1">{value}</p>
    </div>
  )
}

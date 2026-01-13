"use client"

import Link from "next/link"
import { Plus, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockPrescriptions = [
  {
    id: "1",
    patient_name: "Sarah Johnson",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    issued_date: "2025-01-10",
    status: "active",
  },
  {
    id: "2",
    patient_name: "Michael Chen",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    issued_date: "2025-01-09",
    status: "active",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  expired: "bg-red-100 text-red-800",
  filled: "bg-blue-100 text-blue-800",
}

export default function PrescriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-2">Manage patient prescriptions</p>
        </div>
        <Link href="/prescriptions/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Prescription
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Pill className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{prescription.patient_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{prescription.medication}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {prescription.dosage} - {prescription.frequency}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${statusColors[prescription.status as keyof typeof statusColors]}`}
                >
                  {prescription.status}
                </span>
                <p className="text-xs text-gray-500">{prescription.issued_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockRecords = [
  {
    id: "1",
    patient_name: "Sarah Johnson",
    record_date: "2025-01-10",
    record_type: "consultation",
    diagnosis: "Hypertension",
  },
  {
    id: "2",
    patient_name: "Michael Chen",
    record_date: "2025-01-09",
    record_type: "lab_result",
    diagnosis: "Elevated cholesterol",
  },
]

const recordTypeColors = {
  consultation: "bg-blue-50 text-blue-700",
  lab_result: "bg-green-50 text-green-700",
  imaging: "bg-purple-50 text-purple-700",
  prescription: "bg-orange-50 text-orange-700",
}

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-2">Manage patient medical records and documents</p>
        </div>
        <Link href="/medical-records/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Record
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-100">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{record.patient_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{record.diagnosis}</p>
                  <p className="text-xs text-gray-500 mt-2">{record.record_date}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${recordTypeColors[record.record_type as keyof typeof recordTypeColors]}`}
              >
                {record.record_type.replace("_", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

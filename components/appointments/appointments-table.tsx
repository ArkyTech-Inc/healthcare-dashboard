"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, User, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockAppointments = [
  {
    id: "1",
    patient_name: "Sarah Johnson",
    provider_name: "Dr. Smith",
    appointment_date: "2025-01-15",
    appointment_time: "09:00 AM",
    reason: "Annual checkup",
    status: "scheduled",
  },
  {
    id: "2",
    patient_name: "Michael Chen",
    provider_name: "Dr. Johnson",
    appointment_date: "2025-01-16",
    appointment_time: "02:00 PM",
    reason: "Follow-up visit",
    status: "scheduled",
  },
  {
    id: "3",
    patient_name: "Emma Davis",
    provider_name: "Dr. Smith",
    appointment_date: "2025-01-14",
    appointment_time: "10:30 AM",
    reason: "Emergency visit",
    status: "completed",
  },
]

const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

interface AppointmentsTableProps {
  searchQuery: string
}

export default function AppointmentsTable({ searchQuery }: AppointmentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter(
      (apt) =>
        apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.appointment_date.includes(searchQuery),
    )
  }, [searchQuery])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.patient_name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[appointment.status as keyof typeof statusColors]}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{appointment.appointment_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{appointment.appointment_time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{appointment.patient_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{appointment.provider_name}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-600">No appointments found</p>
        </div>
      )}
    </div>
  )
}

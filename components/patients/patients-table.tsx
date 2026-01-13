"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock patient data
const allPatients = [
  {
    id: "1",
    mrn: "MR-001234",
    first_name: "Sarah",
    last_name: "Johnson",
    date_of_birth: "1985-03-15",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    blood_type: "O+",
  },
  {
    id: "2",
    mrn: "MR-001235",
    first_name: "Michael",
    last_name: "Chen",
    date_of_birth: "1972-07-22",
    phone: "(555) 234-5678",
    email: "m.chen@email.com",
    blood_type: "AB-",
  },
  {
    id: "3",
    mrn: "MR-001236",
    first_name: "Emma",
    last_name: "Davis",
    date_of_birth: "1990-11-08",
    phone: "(555) 345-6789",
    email: "emma.d@email.com",
    blood_type: "A+",
  },
  {
    id: "4",
    mrn: "MR-001237",
    first_name: "Robert",
    last_name: "Wilson",
    date_of_birth: "1968-05-30",
    phone: "(555) 456-7890",
    email: "r.wilson@email.com",
    blood_type: "B+",
  },
]

interface PatientsTableProps {
  searchQuery: string
}

export default function PatientsTable({ searchQuery }: PatientsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredPatients = useMemo(() => {
    return allPatients.filter(
      (patient) =>
        patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredPatients.slice(start, start + itemsPerPage)
  }, [filteredPatients, currentPage])

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">MRN</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">DOB</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Blood Type</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{patient.mrn}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {patient.first_name} {patient.last_name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{patient.date_of_birth}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.blood_type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/patients/${patient.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <Link href={`/patients/${patient.id}/edit`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-600" />
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <p className="text-gray-600">No patients found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of {filteredPatients.length} patients
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="px-3 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

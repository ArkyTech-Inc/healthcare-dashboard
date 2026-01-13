"use client"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const recentPatients = [
  {
    id: 1,
    mrn: "MR-001234",
    name: "Sarah Johnson",
    dob: "1985-03-15",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    bloodType: "O+",
    status: "stable",
  },
  {
    id: 2,
    mrn: "MR-001235",
    name: "Michael Chen",
    dob: "1972-07-22",
    phone: "(555) 234-5678",
    email: "m.chen@email.com",
    bloodType: "AB-",
    status: "monitoring",
  },
  {
    id: 3,
    mrn: "MR-001236",
    name: "Emma Davis",
    dob: "1990-11-08",
    phone: "(555) 345-6789",
    email: "emma.d@email.com",
    bloodType: "A+",
    status: "critical",
  },
  {
    id: 4,
    mrn: "MR-001237",
    name: "Robert Wilson",
    dob: "1968-05-30",
    phone: "(555) 456-7890",
    email: "r.wilson@email.com",
    bloodType: "B+",
    status: "stable",
  },
  {
    id: 5,
    mrn: "MR-001238",
    name: "Lisa Martinez",
    dob: "1988-09-12",
    phone: "(555) 567-8901",
    email: "l.martinez@email.com",
    bloodType: "O-",
    status: "stable",
  },
]

const statusColors = {
  critical: "bg-red-100 text-red-800",
  monitoring: "bg-yellow-100 text-yellow-800",
  stable: "bg-green-100 text-green-800",
}

export default function RecentPatients() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Recent Patients</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">MRN</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">DOB</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Blood Type</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900 font-medium">{patient.mrn}</td>
                <td className="px-6 py-4 text-gray-900">{patient.name}</td>
                <td className="px-6 py-4 text-gray-600">{patient.dob}</td>
                <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                <td className="px-6 py-4 text-gray-600">{patient.bloodType}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[patient.status as keyof typeof statusColors]}`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

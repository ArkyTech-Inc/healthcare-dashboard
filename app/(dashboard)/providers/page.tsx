"use client"

import Link from "next/link"
import { Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockProviders = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    specialization: "General Medicine",
    phone: "(555) 123-4567",
    email: "dr.smith@clinic.com",
    license_number: "LIC-12345",
  },
  {
    id: "2",
    name: "Dr. John Johnson",
    specialization: "Cardiology",
    phone: "(555) 234-5678",
    email: "dr.johnson@clinic.com",
    license_number: "LIC-12346",
  },
]

export default function ProvidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Providers</h1>
          <p className="text-gray-600 mt-2">Manage healthcare providers</p>
        </div>
        <Link href="/providers/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Provider
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                <p className="text-sm text-gray-600">{provider.specialization}</p>
                <div className="space-y-1 mt-3 text-xs text-gray-600">
                  <p>Phone: {provider.phone}</p>
                  <p>Email: {provider.email}</p>
                  <p>License: {provider.license_number}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

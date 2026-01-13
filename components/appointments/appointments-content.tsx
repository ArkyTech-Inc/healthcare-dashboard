"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AppointmentsTable from "@/components/appointments/appointments-table"

export default function AppointmentsContent() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">Manage patient appointments and schedules</p>
        </div>
        <Link href="/appointments/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by patient name or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12"
        />
      </div>

      <AppointmentsTable searchQuery={searchQuery} />
    </div>
  )
}

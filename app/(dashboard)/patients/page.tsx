"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PatientsTable from "@/components/patients/patients-table"

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-2">Manage patient records and information</p>
        </div>
        <Link href="/patients/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Patient
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name, MRN, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12"
        />
      </div>

      {/* Table */}
      <PatientsTable searchQuery={searchQuery} />
    </div>
  )
}

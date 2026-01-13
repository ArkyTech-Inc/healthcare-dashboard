"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function RecordSearch() {
  const [query, setQuery] = useState("")

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Search patients by name, MRN, or condition..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-12 bg-white"
      />
    </div>
  )
}

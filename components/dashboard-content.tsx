"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MessageSquare,
  Phone,
  FileText,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample patient data
const recentPatients = [
  { id: 1, name: "James Morrison", age: 45, condition: "Hypertension", lastVisit: "2 days ago", status: "stable" },
  { id: 2, name: "Sarah Chen", age: 32, condition: "Type 2 Diabetes", lastVisit: "1 week ago", status: "monitoring" },
  {
    id: 3,
    name: "Michael Rodriguez",
    age: 58,
    condition: "Heart Disease",
    lastVisit: "3 days ago",
    status: "critical",
  },
  { id: 4, name: "Emma Thompson", age: 28, condition: "Migraine", lastVisit: "4 days ago", status: "stable" },
  { id: 5, name: "David Kumar", age: 51, condition: "Asthma", lastVisit: "1 day ago", status: "stable" },
]

const systemStats = [
  { label: "Total Patients", value: "2,847", icon: Users, trend: "+12%" },
  { label: "Appointments Today", value: "24", icon: Calendar, trend: "+3" },
  { label: "System Health", value: "99.8%", icon: Activity, trend: "Excellent" },
  { label: "Avg Response Time", value: "142ms", icon: TrendingUp, trend: "-5%" },
]

const quickActions = [
  { icon: Plus, label: "New Patient", color: "bg-blue-50 text-blue-600" },
  { icon: MessageSquare, label: "Send Message", color: "bg-green-50 text-green-600" },
  { icon: Phone, label: "Schedule Call", color: "bg-purple-50 text-purple-600" },
  { icon: FileText, label: "View Records", color: "bg-orange-50 text-orange-600" },
]

export default function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(recentPatients)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredPatients(recentPatients)
    } else {
      setFilteredPatients(
        recentPatients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(query.toLowerCase()) ||
            patient.condition.toLowerCase().includes(query.toLowerCase()),
        ),
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-700"
      case "monitoring":
        return "bg-yellow-100 text-yellow-700"
      case "stable":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Healthcare Dashboard</h1>
        <p className="text-gray-600">Manage patients and monitor system performance</p>
      </div>

      {/* Search and Quick Actions */}
      <div className="grid gap-6 mb-8">
        {/* Record Search */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Patient Record Search</CardTitle>
            <CardDescription>Find patients by name or medical condition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by patient name or condition..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className={`h-24 flex flex-col items-center justify-center gap-2 ${action.color} border border-gray-200 hover:shadow-md transition-shadow`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <p className="text-xs font-semibold text-blue-600">{stat.trend}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Patients */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
          <CardDescription>
            {searchQuery
              ? `Found ${filteredPatients.length} patient${filteredPatients.length !== 1 ? "s" : ""}`
              : `Showing ${filteredPatients.length} recent patients`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Age</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Condition</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Last Visit</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{patient.name}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.age}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.condition}</td>
                      <td className="px-4 py-3 text-gray-600">{patient.lastVisit}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}
                        >
                          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No patients found matching your search</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

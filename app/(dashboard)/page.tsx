"use client"

import { Activity, Users, Calendar, AlertCircle } from "lucide-react"
import StatCard from "@/components/dashboard/stat-card"
import RecentPatients from "@/components/dashboard/recent-patients"
import QuickActions from "@/components/dashboard/quick-actions"
import RecordSearch from "@/components/dashboard/record-search"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back to MedLedger</p>
      </div>

      {/* Search */}
      <div>
        <RecordSearch />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value="2,543" trend="+12%" icon={Users} color="blue" />
        <StatCard title="Today's Appointments" value="18" trend="+5%" icon={Calendar} color="green" />
        <StatCard title="System Health" value="99.8%" trend="↑" icon={Activity} color="emerald" />
        <StatCard title="Average Response" value="240ms" trend="-8%" icon={AlertCircle} color="purple" />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Patients */}
      <RecentPatients />
    </div>
  )
}

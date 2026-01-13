import type React from "react"
import DashboardNav from "@/components/layouts/dashboard-nav"
import UserNav from "@/components/auth/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Check authentication status here
  // For now, we'll assume authenticated

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">MedLedger</h1>
          </div>
          <DashboardNav />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <UserNav />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

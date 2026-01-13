"use client"

import Link from "next/link"
import { Plus, MessageSquare, Phone, Files } from "lucide-react"

const actions = [
  {
    icon: Plus,
    label: "New Patient",
    href: "/patients/new",
    description: "Add a new patient record",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: MessageSquare,
    label: "Send Message",
    href: "#",
    description: "Send message to staff",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    icon: Phone,
    label: "Schedule Call",
    href: "#",
    description: "Schedule appointment",
    color: "bg-orange-600 hover:bg-orange-700",
  },
  {
    icon: Files,
    label: "View Records",
    href: "/medical-records",
    description: "Access medical records",
    color: "bg-purple-600 hover:bg-purple-700",
  },
]

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.label} href={action.href}>
              <button className="w-full text-left p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group">
                <div
                  className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{action.label}</h3>
                <p className="text-xs text-gray-600 mt-1">{action.description}</p>
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Users, Calendar, FileText, Pill, UserCircle, Shield } from "lucide-react"

const navItems = [
  { href: "/dashboard/", label: "Dashboard", icon: Activity },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/medical-records", label: "Medical Records", icon: FileText },
  { href: "/prescriptions", label: "Prescriptions", icon: Pill },
  { href: "/providers", label: "Providers", icon: UserCircle },
  { href: "/audit-logs", label: "Audit Logs", icon: Shield },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

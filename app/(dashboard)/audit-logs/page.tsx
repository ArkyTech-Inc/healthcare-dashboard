"use client"

const mockLogs = [
  {
    id: "1",
    timestamp: "2025-01-15 14:32:45",
    user_email: "admin@clinic.com",
    action: "CREATE",
    resource_type: "patient",
    details: "Created patient Sarah Johnson (MR-001234)",
  },
  {
    id: "2",
    timestamp: "2025-01-15 13:21:00",
    user_email: "dr.smith@clinic.com",
    action: "UPDATE",
    resource_type: "medical_record",
    details: "Updated medical record for patient Michael Chen",
  },
  {
    id: "3",
    timestamp: "2025-01-15 11:15:30",
    user_email: "admin@clinic.com",
    action: "DELETE",
    resource_type: "prescription",
    details: "Deleted prescription for patient Emma Davis",
  },
]

const actionColors = {
  CREATE: "bg-green-100 text-green-800",
  UPDATE: "bg-blue-100 text-blue-800",
  DELETE: "bg-red-100 text-red-800",
  VIEW: "bg-gray-100 text-gray-800",
}

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-2">View system activity and user actions</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Timestamp</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Resource</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-600 text-xs">{log.timestamp}</td>
                  <td className="px-6 py-4 text-gray-900 text-sm">{log.user_email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${actionColors[log.action as keyof typeof actionColors]}`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm capitalize">{log.resource_type.replace("_", " ")}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

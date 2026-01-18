"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Eye, Edit, Plus, X } from "lucide-react";
import type { AppointmentWithRelations } from "@/types/appointment";

export function AppointmentsTable() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  async function fetchAppointments() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const result = await response.json();

      if (response.ok) {
        setAppointments(result.data || []);
      } else {
        setError(result.error || "Failed to load appointments");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function cancelAppointment(id: string) {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function formatTime(time: string) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <Button onClick={fetchAppointments}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no-show">No Show</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/appointments/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-white">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {statusFilter !== "all"
              ? `No ${statusFilter} appointments found`
              : "No appointments yet. Schedule your first appointment."}
          </p>
          <Link href="/appointments/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <div>
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTime(appointment.appointment_time)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {appointment.patient ? (
                      <div>
                        <div className="font-medium">
                          {appointment.patient.first_name}{" "}
                          {appointment.patient.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.patient.mrn}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unknown</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {appointment.provider?.profiles?.full_name || (
                      <span className="text-gray-400">Unknown</span>
                    )}
                    {appointment.provider?.specialty && (
                      <div className="text-sm text-gray-500 capitalize">
                        {appointment.provider.specialty.replace('_', ' ')}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="capitalize">
                    {appointment.appointment_type}
                  </TableCell>
                  <TableCell>{appointment.duration_minutes} min</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/appointments/${appointment.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {appointment.status !== "cancelled" &&
                        appointment.status !== "completed" && (
                          <>
                            <Link href={`/appointments/${appointment.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelAppointment(appointment.id)}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {appointments.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {appointments.length} appointment
          {appointments.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
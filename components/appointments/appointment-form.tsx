"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { Appointment } from "@/types/appointment";

interface AppointmentFormProps {
  appointment?: Appointment;
  mode?: "create" | "edit";
  patientId?: string;
}

export function AppointmentForm({
  appointment,
  mode = "create",
  patientId,
}: AppointmentFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [patients, setPatients] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    patient_id: patientId || appointment?.patient_id || "",
    provider_id: appointment?.provider_id || "",
    appointment_date:
      appointment?.appointment_date || new Date().toISOString().split("T")[0],
    appointment_time: appointment?.appointment_time || "09:00",
    duration_minutes: appointment?.duration_minutes?.toString() || "30",
    appointment_type: appointment?.appointment_type || "consultation",
    status: appointment?.status || "scheduled",
    reason: appointment?.reason || "",
    notes: appointment?.notes || "",
  });

  useEffect(() => {
    fetchPatients();
    fetchProviders();
  }, []);

  async function fetchPatients() {
    try {
      const response = await fetch("/api/patients?limit=100");
      const result = await response.json();
      if (response.ok) {
        setPatients(result.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  }

  async function fetchProviders() {
    try {
      const response = await fetch("/api/providers?limit=100");
      const result = await response.json();
      if (response.ok) {
        setProviders(result.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch providers:", error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!formData.patient_id || !formData.provider_id) {
      setError("Patient and Provider are required");
      return;
    }

    startTransition(async () => {
      try {
        const url =
          mode === "create"
            ? "/api/appointments"
            : `/api/appointments/${appointment?.id}`;
        const method = mode === "create" ? "POST" : "PUT";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          router.push("/appointments");
          router.refresh();
        } else {
          setError(result.error || "An error occurred");
        }
      } catch (err: any) {
        setError(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="patient_id">Patient *</Label>
          <Select
            name="patient_id"
            value={formData.patient_id}
            onValueChange={(value) =>
              setFormData({ ...formData, patient_id: value })
            }
            disabled={!!patientId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.first_name} {patient.last_name} ({patient.mrn})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="provider_id">Provider *</Label>
          <Select
            name="provider_id"
            value={formData.provider_id}
            onValueChange={(value) =>
              setFormData({ ...formData, provider_id: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.full_name} - {provider.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="appointment_date">Date *</Label>
          <Input
            id="appointment_date"
            name="appointment_date"
            type="date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="appointment_time">Time *</Label>
          <Input
            id="appointment_time"
            name="appointment_time"
            type="time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="duration_minutes">Duration (minutes)</Label>
          <Select
            name="duration_minutes"
            value={formData.duration_minutes}
            onValueChange={(value) =>
              setFormData({ ...formData, duration_minutes: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="appointment_type">Type *</Label>
          <Select
            name="appointment_type"
            value={formData.appointment_type}
            onValueChange={(value) =>
              setFormData({ ...formData, appointment_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="procedure">Procedure</SelectItem>
              <SelectItem value="lab-work">Lab Work</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="vaccination">Vaccination</SelectItem>
              <SelectItem value="physical">Physical Exam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {mode === "edit" && (
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="reason">Reason for Visit</Label>
        <Textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={2}
          placeholder="E.g., Annual checkup, follow-up from previous visit..."
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional notes..."
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? mode === "create"
              ? "Scheduling..."
              : "Updating..."
            : mode === "create"
            ? "Schedule Appointment"
            : "Update Appointment"}
        </Button>
      </div>
    </form>
  );
}
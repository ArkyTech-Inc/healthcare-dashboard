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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { MedicalRecord } from "@/types/medical-record";

interface MedicalRecordFormProps {
  record?: MedicalRecord;
  mode?: "create" | "edit";
  patientId?: string;
}

export function MedicalRecordForm({
  record,
  mode = "create",
  patientId,
}: MedicalRecordFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [patients, setPatients] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    patient_id: patientId || record?.patient_id || "",
    provider_id: record?.provider_id || "",
    record_type: record?.record_type || "consultation",
    record_date: record?.record_date || new Date().toISOString().split("T")[0],
    record_time: record?.record_time || "",
    status: record?.status || "completed",
    chief_complaint: record?.chief_complaint || "",
    present_illness: record?.present_illness || "",
    physical_examination: record?.physical_examination || "",
    diagnosis: record?.diagnosis || "",
    diagnosis_codes: record?.diagnosis_codes?.join(", ") || "",
    treatment_plan: record?.treatment_plan || "",
    vital_signs_bp: record?.vital_signs?.blood_pressure || "",
    vital_signs_hr: record?.vital_signs?.heart_rate?.toString() || "",
    vital_signs_temp: record?.vital_signs?.temperature?.toString() || "",
    vital_signs_rr: record?.vital_signs?.respiratory_rate?.toString() || "",
    vital_signs_spo2: record?.vital_signs?.oxygen_saturation?.toString() || "",
    vital_signs_weight: record?.vital_signs?.weight?.toString() || "",
    vital_signs_height: record?.vital_signs?.height?.toString() || "",
    follow_up_required: record?.follow_up_required || false,
    follow_up_date: record?.follow_up_date || "",
    follow_up_notes: record?.follow_up_notes || "",
    is_confidential: record?.is_confidential || false,
    notes: record?.notes || "",
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
      // Fetch providers from profiles where role is doctor
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
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
            ? "/api/medical-records"
            : `/api/medical-records/${record?.id}`;
        const method = mode === "create" ? "POST" : "PUT";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          router.push("/medical-records");
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Basic Information</h2>
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
            <Label htmlFor="record_type">Record Type *</Label>
            <Select
              name="record_type"
              value={formData.record_type}
              onValueChange={(value) =>
                setFormData({ ...formData, record_type: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="diagnosis">Diagnosis</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="lab_result">Lab Result</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="procedure">Procedure</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="admission">Admission</SelectItem>
                <SelectItem value="discharge">Discharge</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="amended">Amended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="record_date">Record Date *</Label>
            <Input
              id="record_date"
              name="record_date"
              type="date"
              value={formData.record_date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="record_time">Time</Label>
            <Input
              id="record_time"
              name="record_time"
              type="time"
              value={formData.record_time}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Clinical Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Clinical Information</h2>
        
        <div>
          <Label htmlFor="chief_complaint">Chief Complaint</Label>
          <Textarea
            id="chief_complaint"
            name="chief_complaint"
            value={formData.chief_complaint}
            onChange={handleChange}
            rows={2}
            placeholder="Patient's main concern..."
          />
        </div>

        <div>
          <Label htmlFor="present_illness">History of Present Illness</Label>
          <Textarea
            id="present_illness"
            name="present_illness"
            value={formData.present_illness}
            onChange={handleChange}
            rows={3}
            placeholder="Detailed history..."
          />
        </div>

        <div>
          <Label htmlFor="physical_examination">Physical Examination</Label>
          <Textarea
            id="physical_examination"
            name="physical_examination"
            value={formData.physical_examination}
            onChange={handleChange}
            rows={3}
            placeholder="Examination findings..."
          />
        </div>

        <div>
          <Label htmlFor="diagnosis">Diagnosis *</Label>
          <Textarea
            id="diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            rows={2}
            required
            placeholder="Primary and secondary diagnoses..."
          />
        </div>

        <div>
          <Label htmlFor="diagnosis_codes">Diagnosis Codes (ICD-10)</Label>
          <Input
            id="diagnosis_codes"
            name="diagnosis_codes"
            value={formData.diagnosis_codes}
            onChange={handleChange}
            placeholder="e.g., J00, R50.9 (comma-separated)"
          />
        </div>

        <div>
          <Label htmlFor="treatment_plan">Treatment Plan</Label>
          <Textarea
            id="treatment_plan"
            name="treatment_plan"
            value={formData.treatment_plan}
            onChange={handleChange}
            rows={3}
            placeholder="Medications, procedures, recommendations..."
          />
        </div>
      </div>

      {/* Vital Signs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Vital Signs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="vital_signs_bp">Blood Pressure</Label>
            <Input
              id="vital_signs_bp"
              name="vital_signs_bp"
              value={formData.vital_signs_bp}
              onChange={handleChange}
              placeholder="120/80"
            />
          </div>

          <div>
            <Label htmlFor="vital_signs_hr">Heart Rate (bpm)</Label>
            <Input
              id="vital_signs_hr"
              name="vital_signs_hr"
              type="number"
              value={formData.vital_signs_hr}
              onChange={handleChange}
              placeholder="72"
            />
          </div>

          <div>
            <Label htmlFor="vital_signs_temp">Temperature (°F)</Label>
            <Input
              id="vital_signs_temp"
              name="vital_signs_temp"
              type="number"
              step="0.1"
              value={formData.vital_signs_temp}
              onChange={handleChange}
              placeholder="98.6"
            />
          </div>

          <div>
            <Label htmlFor="vital_signs_rr">Resp. Rate</Label>
            <Input
              id="vital_signs_rr"
              name="vital_signs_rr"
              type="number"
              value={formData.vital_signs_rr}
              onChange={handleChange}
              placeholder="16"
            />
          </div>

          <div>
            <Label htmlFor="vital_signs_spo2">O₂ Saturation (%)</Label>
            <Input
              id="vital_signs_spo2"
              name="vital_signs_spo2"
              type="number"
              value={formData.vital_signs_spo2}
              onChange={handleChange}
              placeholder="98"
            />
          </div>

          <div>
            <Label htmlFor="vital_signs_weight">Weight (kg)</Label>
            <Input
              id="vital_signs_weight"
              name="vital_signs_weight"
              type="number"
              step="0.1"
              value={formData.vital_signs_weight}
              onChange={handleChange}
              placeholder="70"
            />
          </div>

          <div>
            <Label htmlFor="vital_signs_height">Height (cm)</Label>
            <Input
              id="vital_signs_height"
              name="vital_signs_height"
              type="number"
              step="0.1"
              value={formData.vital_signs_height}
              onChange={handleChange}
              placeholder="170"
            />
          </div>
        </div>
      </div>

      {/* Follow-up */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Follow-up</h2>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="follow_up_required"
            checked={formData.follow_up_required}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, follow_up_required: checked as boolean })
            }
          />
          <Label htmlFor="follow_up_required">Follow-up Required</Label>
        </div>

        {formData.follow_up_required && (
          <>
            <div>
              <Label htmlFor="follow_up_date">Follow-up Date</Label>
              <Input
                id="follow_up_date"
                name="follow_up_date"
                type="date"
                value={formData.follow_up_date}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="follow_up_notes">Follow-up Notes</Label>
              <Textarea
                id="follow_up_notes"
                name="follow_up_notes"
                value={formData.follow_up_notes}
                onChange={handleChange}
                rows={2}
                placeholder="Instructions for follow-up..."
              />
            </div>
          </>
        )}
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Additional Information</h2>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_confidential"
            checked={formData.is_confidential}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_confidential: checked as boolean })
            }
          />
          <Label htmlFor="is_confidential">Mark as Confidential</Label>
        </div>

        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional information..."
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Record"
            : "Update Record"}
        </Button>
      </div>
    </form>
  );
}  

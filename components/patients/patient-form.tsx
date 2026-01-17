"use client";

import { useState, useTransition } from "react";
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
import type { Patient } from "@/types/patient";

interface PatientFormProps {
  patient?: Patient;
  mode?: "create" | "edit";
}

export function PatientForm({ patient, mode = "create" }: PatientFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    first_name: patient?.first_name || "",
    last_name: patient?.last_name || "",
    date_of_birth: patient?.date_of_birth || "",
    gender: patient?.gender || "male",
    blood_type: patient?.blood_type || "unknown",
    phone: patient?.phone || "",
    email: patient?.email || "",
    address_line1: patient?.address_line1 || "",
    city: patient?.city || "",
    state: patient?.state || "",
    postal_code: patient?.postal_code || "",
    emergency_contact_name: patient?.emergency_contact_name || "",
    emergency_contact_phone: patient?.emergency_contact_phone || "",
    allergies: patient?.allergies?.join(", ") || "",
    current_medications: patient?.current_medications?.join(", ") || "",
    chronic_conditions: patient?.chronic_conditions?.join(", ") || "",
    insurance_provider: patient?.insurance_provider || "",
    insurance_policy_number: patient?.insurance_policy_number || "",
  });

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

    startTransition(async () => {
      try {
        const url =
          mode === "create" ? "/api/patients" : `/api/patients/${patient?.id}`;
        const method = mode === "create" ? "POST" : "PUT";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          router.push("/patients");
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

      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">First Name *</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="last_name">Last Name *</Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="date_of_birth">Date of Birth *</Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender *</Label>
            <Select
              name="gender"
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="blood_type">Blood Type *</Label>
            <Select
              name="blood_type"
              value={formData.blood_type}
              onValueChange={(value) =>
                setFormData({ ...formData, blood_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Unknown</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address_line1">Address</Label>
            <Input
              id="address_line1"
              name="address_line1"
              value={formData.address_line1}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergency_contact_name">Contact Name *</Label>
            <Input
              id="emergency_contact_name"
              name="emergency_contact_name"
              value={formData.emergency_contact_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="emergency_contact_phone">Contact Phone *</Label>
            <Input
              id="emergency_contact_phone"
              name="emergency_contact_phone"
              type="tel"
              value={formData.emergency_contact_phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Medical Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Separate with commas"
            />
          </div>

          <div>
            <Label htmlFor="current_medications">Current Medications</Label>
            <Input
              id="current_medications"
              name="current_medications"
              value={formData.current_medications}
              onChange={handleChange}
              placeholder="Separate with commas"
            />
          </div>

          <div>
            <Label htmlFor="chronic_conditions">Chronic Conditions</Label>
            <Input
              id="chronic_conditions"
              name="chronic_conditions"
              value={formData.chronic_conditions}
              onChange={handleChange}
              placeholder="Separate with commas"
            />
          </div>
        </div>
      </div>

      {/* Insurance */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Insurance Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="insurance_provider">Insurance Provider</Label>
            <Input
              id="insurance_provider"
              name="insurance_provider"
              value={formData.insurance_provider}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="insurance_policy_number">Policy Number</Label>
            <Input
              id="insurance_policy_number"
              name="insurance_policy_number"
              value={formData.insurance_policy_number}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Patient"
            : "Update Patient"}
        </Button>
      </div>
    </form>
  );
}

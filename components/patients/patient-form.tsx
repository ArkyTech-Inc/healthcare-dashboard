"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PatientFormProps {
  mode: "create" | "edit"
  patient?: any
}

export default function PatientForm({ mode, patient }: PatientFormProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: patient?.first_name || "",
    last_name: patient?.last_name || "",
    date_of_birth: patient?.date_of_birth || "",
    gender: patient?.gender || "prefer_not_to_say",
    blood_type: patient?.blood_type || "unknown",
    phone: patient?.phone || "",
    email: patient?.email || "",
    address_line1: patient?.address?.line1 || "",
    address_line2: patient?.address?.line2 || "",
    city: patient?.city || "",
    state: patient?.state || "",
    postal_code: patient?.postal_code || "",
    country: patient?.country || "USA",
    emergency_contact_name: patient?.emergency_contact?.name || "",
    emergency_contact_relationship: patient?.emergency_contact?.relationship || "",
    emergency_contact_phone: patient?.emergency_contact?.phone || "",
    allergies: patient?.allergies?.join(", ") || "",
    current_medications: patient?.current_medications?.join(", ") || "",
    chronic_conditions: patient?.chronic_conditions?.join(", ") || "",
    insurance_provider: patient?.insurance?.provider || "",
    insurance_policy_number: patient?.insurance?.policy_number || "",
    height_cm: patient?.height_cm || "",
    weight_kg: patient?.weight_kg || "",
    notes: patient?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!formData.first_name || !formData.last_name || !formData.phone) {
        setError("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      // Simulate API call
      setTimeout(() => {
        router.push("/patients")
        router.refresh()
      }, 500)
    } catch (err) {
      setError("Failed to save patient. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            required
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          <FormField
            label="Last Name"
            required
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
          <FormField
            label="Date of Birth"
            type="date"
            value={formData.date_of_birth}
            onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
          />
          <SelectField
            label="Gender"
            value={formData.gender}
            onChange={(value) => setFormData({ ...formData, gender: value })}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
              { value: "prefer_not_to_say", label: "Prefer not to say" },
            ]}
          />
          <SelectField
            label="Blood Type"
            value={formData.blood_type}
            onChange={(value) => setFormData({ ...formData, blood_type: value })}
            options={[
              { value: "O+", label: "O+" },
              { value: "O-", label: "O-" },
              { value: "A+", label: "A+" },
              { value: "A-", label: "A-" },
              { value: "B+", label: "B+" },
              { value: "B-", label: "B-" },
              { value: "AB+", label: "AB+" },
              { value: "AB-", label: "AB-" },
              { value: "unknown", label: "Unknown" },
            ]}
          />
          <FormField
            label="Height (cm)"
            type="number"
            value={formData.height_cm}
            onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
          />
          <FormField
            label="Weight (kg)"
            type="number"
            value={formData.weight_kg}
            onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Phone"
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormField
            label="Address Line 1"
            value={formData.address_line1}
            onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
          />
          <FormField
            label="Address Line 2"
            value={formData.address_line2}
            onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
          />
          <FormField
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <FormField
            label="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
          <FormField
            label="Postal Code"
            value={formData.postal_code}
            onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
          />
          <FormField
            label="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Name"
            required
            value={formData.emergency_contact_name}
            onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
          />
          <FormField
            label="Relationship"
            value={formData.emergency_contact_relationship}
            onChange={(e) => setFormData({ ...formData, emergency_contact_relationship: e.target.value })}
          />
          <FormField
            label="Phone"
            required
            type="tel"
            value={formData.emergency_contact_phone}
            onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
          />
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Medical Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <FormField
            label="Allergies"
            placeholder="Penicillin, Latex, etc. (comma-separated)"
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          />
          <FormField
            label="Current Medications"
            placeholder="Lisinopril, Metformin, etc. (comma-separated)"
            value={formData.current_medications}
            onChange={(e) => setFormData({ ...formData, current_medications: e.target.value })}
          />
          <FormField
            label="Chronic Conditions"
            placeholder="Type 2 Diabetes, Hypertension, etc. (comma-separated)"
            value={formData.chronic_conditions}
            onChange={(e) => setFormData({ ...formData, chronic_conditions: e.target.value })}
          />
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Insurance Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Provider"
            value={formData.insurance_provider}
            onChange={(e) => setFormData({ ...formData, insurance_provider: e.target.value })}
          />
          <FormField
            label="Policy Number"
            value={formData.insurance_policy_number}
            onChange={(e) => setFormData({ ...formData, insurance_policy_number: e.target.value })}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Notes</h2>
        <Textarea
          placeholder="Any additional notes about the patient..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="min-h-24"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : mode === "create" ? "Create Patient" : "Update Patient"}
        </Button>
      </div>
    </form>
  )
}

function FormField({
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string
  required?: boolean
  type?: string
  placeholder?: string
  value: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

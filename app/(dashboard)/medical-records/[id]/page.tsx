import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Trash2 } from "lucide-react";

export default async function MedicalRecordDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: record, error } = await supabase
    .from("medical_records")
    .select(
      `
      *,
      patient:patients(first_name, last_name, mrn, date_of_birth, gender),
      provider:healthcare_providers(user_id, profiles:user_id(full_name))
    `
    )
    .eq("id", params.id)
    .single();

  if (error || !record) {
    notFound();
  }

  function formatRecordType(type: string) {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "amended":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/medical-records">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Record</h1>
            <p className="text-gray-600 mt-1">
              {new Date(record.record_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/medical-records/${record.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Patient</label>
            <p className="text-gray-900 font-medium">
              {record.patient
                ? `${record.patient.first_name} ${record.patient.last_name}`
                : "Unknown"}
            </p>
            {record.patient && (
              <p className="text-sm text-gray-500">MRN: {record.patient.mrn}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600">Provider</label>
            <p className="text-gray-900 font-medium">
              {record.provider?.profiles?.full_name || "Unknown"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Record Type</label>
            <div className="mt-1">
              <Badge variant="outline">{formatRecordType(record.record_type)}</Badge>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <div className="mt-1">
              <Badge className={getStatusColor(record.status)}>
                {record.status}
              </Badge>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Date</label>
            <p className="text-gray-900 font-medium">
              {new Date(record.record_date).toLocaleDateString()}
            </p>
          </div>
          {record.record_time && (
            <div>
              <label className="text-sm text-gray-600">Time</label>
              <p className="text-gray-900 font-medium">{record.record_time}</p>
            </div>
          )}
        </div>
      </div>

      {/* Clinical Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Clinical Information
        </h2>
        <div className="space-y-4">
          {record.chief_complaint && (
            <div>
              <label className="text-sm text-gray-600">Chief Complaint</label>
              <p className="text-gray-900 mt-1">{record.chief_complaint}</p>
            </div>
          )}

          {record.present_illness && (
            <div>
              <label className="text-sm text-gray-600">
                History of Present Illness
              </label>
              <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                {record.present_illness}
              </p>
            </div>
          )}

          {record.physical_examination && (
            <div>
              <label className="text-sm text-gray-600">Physical Examination</label>
              <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                {record.physical_examination}
              </p>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Diagnosis</label>
            <p className="text-gray-900 mt-1 whitespace-pre-wrap">
              {record.diagnosis}
            </p>
            {record.diagnosis_codes && record.diagnosis_codes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {record.diagnosis_codes.map((code, index) => (
                  <Badge key={index} variant="secondary">
                    {code}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {record.treatment_plan && (
            <div>
              <label className="text-sm text-gray-600">Treatment Plan</label>
              <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                {record.treatment_plan}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Vital Signs */}
      {record.vital_signs && Object.keys(record.vital_signs).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Vital Signs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {record.vital_signs.blood_pressure && (
              <div>
                <label className="text-sm text-gray-600">Blood Pressure</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.blood_pressure}
                </p>
              </div>
            )}
            {record.vital_signs.heart_rate && (
              <div>
                <label className="text-sm text-gray-600">Heart Rate</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.heart_rate} bpm
                </p>
              </div>
            )}
            {record.vital_signs.temperature && (
              <div>
                <label className="text-sm text-gray-600">Temperature</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.temperature}°F
                </p>
              </div>
            )}
            {record.vital_signs.respiratory_rate && (
              <div>
                <label className="text-sm text-gray-600">Respiratory Rate</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.respiratory_rate} /min
                </p>
              </div>
            )}
            {record.vital_signs.oxygen_saturation && (
              <div>
                <label className="text-sm text-gray-600">O₂ Saturation</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.oxygen_saturation}%
                </p>
              </div>
            )}
            {record.vital_signs.weight && (
              <div>
                <label className="text-sm text-gray-600">Weight</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.weight} kg
                </p>
              </div>
            )}
            {record.vital_signs.height && (
              <div>
                <label className="text-sm text-gray-600">Height</label>
                <p className="text-gray-900 font-medium">
                  {record.vital_signs.height} cm
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Follow-up */}
      {record.follow_up_required && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Follow-up Required
          </h2>
          <div className="space-y-3">
            {record.follow_up_date && (
              <div>
                <label className="text-sm text-gray-600">Follow-up Date</label>
                <p className="text-gray-900 font-medium">
                  {new Date(record.follow_up_date).toLocaleDateString()}
                </p>
              </div>
            )}
            {record.follow_up_notes && (
              <div>
                <label className="text-sm text-gray-600">Follow-up Notes</label>
                <p className="text-gray-900 mt-1">{record.follow_up_notes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Notes */}
      {record.notes && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Notes
          </h2>
          <p className="text-gray-900 whitespace-pre-wrap">{record.notes}</p>
        </div>
      )}

      {/* Metadata */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Created:</span>{" "}
            <span className="text-gray-900">
              {new Date(record.created_at).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Last Updated:</span>{" "}
            <span className="text-gray-900">
              {new Date(record.updated_at).toLocaleString()}
            </span>
          </div>
          {record.is_confidential && (
            <div className="col-span-2">
              <Badge variant="destructive">Confidential Record</Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

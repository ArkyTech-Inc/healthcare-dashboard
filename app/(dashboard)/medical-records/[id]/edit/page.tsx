import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MedicalRecordForm } from "@/components/medical-records/medical-record-form";

export default async function EditMedicalRecordPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: record, error } = await supabase
    .from("medical_records")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !record) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Medical Record</h1>
        <p className="text-gray-600 mt-1">
          Update medical record from {new Date(record.record_date).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <MedicalRecordForm record={record} mode="edit" />
      </div>
    </div>
  );
}
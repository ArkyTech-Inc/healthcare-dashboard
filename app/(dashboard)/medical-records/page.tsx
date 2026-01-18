import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MedicalRecordsTable } from "@/components/medical-records/medical-records-table";

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">Patient medical history and clinical documentation</p>
        </div>
       
      </div>

      <MedicalRecordsTable />
    </div>
  );
}

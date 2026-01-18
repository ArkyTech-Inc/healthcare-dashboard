"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Eye, Edit, FileText, Plus } from "lucide-react";
import type { MedicalRecordWithRelations } from "@/types/medical-record";

export function MedicalRecordsTable() {
  const router = useRouter();
  const [records, setRecords] = useState<MedicalRecordWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recordTypeFilter, setRecordTypeFilter] = useState<string>("all");

  useEffect(() => {
    fetchRecords();
  }, [recordTypeFilter]);

  async function fetchRecords() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (recordTypeFilter !== "all") {
        params.set("record_type", recordTypeFilter);
      }

      const response = await fetch(`/api/medical-records?${params.toString()}`);
      const result = await response.json();

      if (response.ok) {
        setRecords(result.data || []);
      } else {
        setError(result.error || "Failed to load medical records");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  function formatRecordType(type: string) {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
        <Button onClick={fetchRecords}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select value={recordTypeFilter} onValueChange={setRecordTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="diagnosis">Diagnosis</SelectItem>
              <SelectItem value="prescription">Prescription</SelectItem>
              <SelectItem value="lab_result">Lab Result</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="procedure">Procedure</SelectItem>
              <SelectItem value="vaccination">Vaccination</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Link href="/medical-records/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </Link>
      </div>

      {records.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-white">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {recordTypeFilter !== "all"
              ? `No ${formatRecordType(recordTypeFilter).toLowerCase()} records found`
              : "No medical records yet. Create your first record."}
          </p>
          <Link href="/medical-records/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create First Record
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {new Date(record.record_date).toLocaleDateString()}
                    {record.record_time && (
                      <div className="text-xs text-gray-500">
                        {record.record_time}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.patient ? (
                      <div>
                        <div className="font-medium">
                          {record.patient.first_name} {record.patient.last_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.patient.mrn}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unknown Patient</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {formatRecordType(record.record_type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={record.diagnosis}>
                      {record.diagnosis}
                    </div>
                    {record.diagnosis_codes && record.diagnosis_codes.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {record.diagnosis_codes.join(", ")}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.provider?.full_name || (
                      <span className="text-gray-400">Unknown</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/medical-records/${record.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/medical-records/${record.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {records.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {records.length} record{records.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
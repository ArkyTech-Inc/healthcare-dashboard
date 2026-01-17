"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Search, Eye, Edit, Plus } from "lucide-react";
import type { Patient } from "@/types/patient";

export function PatientsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    fetchPatients();
  }, [searchParams]);

  async function fetchPatients() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const search = searchParams.get("search");
      if (search) params.set("search", search);

      const response = await fetch(`/api/patients?${params.toString()}`);
      const result = await response.json();

      if (response.ok) {
        setPatients(result.data || []);
      } else {
        setError(result.error || "Failed to load patients");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    router.push(`/patients?${params.toString()}`);
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
      <div className="p-8 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, MRN, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
          {searchQuery && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                router.push("/patients");
              }}
            >
              Clear
            </Button>
          )}
        </form>

        <Link href="/patients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Patient
          </Button>
        </Link>
      </div>

      {patients.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-gray-600 mb-4">
            {searchQuery
              ? "No patients found matching your search"
              : "No patients yet. Create your first patient record."}
          </p>
          <Link href="/patients/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add First Patient
            </Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MRN</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.mrn}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {patient.first_name} {patient.last_name}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {patient.gender}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(patient.date_of_birth).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{patient.phone}</div>
                      {patient.email && (
                        <div className="text-sm text-gray-500">
                          {patient.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{patient.blood_type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/patients/${patient.id}/edit`}>
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
    </div>
  );
}

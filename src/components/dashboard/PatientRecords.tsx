import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Mail, Phone } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  lastScan: string;
  totalScans: number;
  status: string;
  riskLevel: string;
}

const mockPatients: Patient[] = [
  { id: "PAT-101", name: "John Doe", age: 58, email: "john.doe@email.com", phone: "+1-555-0101", lastScan: "2024-01-15", totalScans: 5, status: "Active", riskLevel: "Low" },
  { id: "PAT-102", name: "Jane Smith", age: 62, email: "jane.smith@email.com", phone: "+1-555-0102", lastScan: "2024-01-14", totalScans: 8, status: "Active", riskLevel: "None" },
  { id: "PAT-103", name: "Mike Johnson", age: 55, email: "mike.j@email.com", phone: "+1-555-0103", lastScan: "2024-01-14", totalScans: 3, status: "Active", riskLevel: "Medium" },
  { id: "PAT-104", name: "Sarah Williams", age: 67, email: "sarah.w@email.com", phone: "+1-555-0104", lastScan: "2024-01-13", totalScans: 12, status: "Active", riskLevel: "High" },
  { id: "PAT-105", name: "David Brown", age: 51, email: "david.b@email.com", phone: "+1-555-0105", lastScan: "2024-01-13", totalScans: 2, status: "Active", riskLevel: "None" },
  { id: "PAT-106", name: "Emma Davis", age: 64, email: "emma.d@email.com", phone: "+1-555-0106", lastScan: "2024-01-12", totalScans: 15, status: "Active", riskLevel: "High" },
  { id: "PAT-107", name: "Tom Wilson", age: 59, email: "tom.w@email.com", phone: "+1-555-0107", lastScan: "2024-01-12", totalScans: 6, status: "Active", riskLevel: "Low" },
  { id: "PAT-108", name: "Lisa Anderson", age: 53, email: "lisa.a@email.com", phone: "+1-555-0108", lastScan: "2024-01-11", totalScans: 4, status: "Active", riskLevel: "None" },
];

interface PatientRecordsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PatientRecords = ({ searchQuery, onSearchChange }: PatientRecordsProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "None": return "bg-success/10 text-success border-success/20";
      case "Low": return "bg-warning/10 text-warning border-warning/20";
      case "Medium": return "bg-accent/10 text-accent border-accent/20";
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const filteredPatients = mockPatients.filter(patient => {
    return patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
           patient.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleExport = () => {
    const csvContent = [
      ["Patient ID", "Name", "Age", "Email", "Phone", "Last Scan", "Total Scans", "Risk Level"],
      ...filteredPatients.map(p => [p.id, p.name, p.age, p.email, p.phone, p.lastScan, p.totalScans, p.riskLevel])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patient-records.csv";
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>Manage patient information and scan history</CardDescription>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name, ID, or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Scan</TableHead>
                <TableHead>Total Scans</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">Age: {patient.age}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        {patient.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {patient.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.lastScan}</TableCell>
                  <TableCell>{patient.totalScans}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskColor(patient.riskLevel)}>
                      {patient.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No patients found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

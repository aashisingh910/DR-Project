import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Eye, Filter } from "lucide-react";

interface Scan {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  severity: string;
  confidence: number;
  image: string;
}

const mockScans: Scan[] = [
  { id: "SCN-001", patientId: "PAT-101", patientName: "John Doe", date: "2024-01-15", severity: "Mild", confidence: 92.5, image: "fundus-001.jpg" },
  { id: "SCN-002", patientId: "PAT-102", patientName: "Jane Smith", date: "2024-01-14", severity: "No DR", confidence: 96.8, image: "fundus-002.jpg" },
  { id: "SCN-003", patientId: "PAT-103", patientName: "Mike Johnson", date: "2024-01-14", severity: "Moderate", confidence: 88.3, image: "fundus-003.jpg" },
  { id: "SCN-004", patientId: "PAT-104", patientName: "Sarah Williams", date: "2024-01-13", severity: "Severe", confidence: 94.1, image: "fundus-004.jpg" },
  { id: "SCN-005", patientId: "PAT-105", patientName: "David Brown", date: "2024-01-13", severity: "No DR", confidence: 97.2, image: "fundus-005.jpg" },
  { id: "SCN-006", patientId: "PAT-106", patientName: "Emma Davis", date: "2024-01-12", severity: "Proliferative", confidence: 91.7, image: "fundus-006.jpg" },
  { id: "SCN-007", patientId: "PAT-107", patientName: "Tom Wilson", date: "2024-01-12", severity: "Mild", confidence: 89.9, image: "fundus-007.jpg" },
  { id: "SCN-008", patientId: "PAT-108", patientName: "Lisa Anderson", date: "2024-01-11", severity: "No DR", confidence: 95.4, image: "fundus-008.jpg" },
];

interface ScanHistoryProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
}

export const ScanHistory = ({ searchQuery, onSearchChange, dateRange, onDateRangeChange }: ScanHistoryProps) => {
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "No DR": return "bg-success/10 text-success border-success/20";
      case "Mild": return "bg-warning/10 text-warning border-warning/20";
      case "Moderate": return "bg-accent/10 text-accent border-accent/20";
      case "Severe": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Proliferative": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const filteredScans = mockScans.filter(scan => {
    const matchesSearch = scan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scan.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scan.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === "all" || scan.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const handleExport = () => {
    const csvContent = [
      ["Scan ID", "Patient ID", "Patient Name", "Date", "Severity", "Confidence", "Image"],
      ...filteredScans.map(s => [s.id, s.patientId, s.patientName, s.date, s.severity, s.confidence, s.image])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scan-history.csv";
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Scan History</CardTitle>
            <CardDescription>Complete record of all retinal scans and analyses</CardDescription>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name, ID, or scan ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="No DR">No DR</SelectItem>
              <SelectItem value="Mild">Mild</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Severe">Severe</SelectItem>
              <SelectItem value="Proliferative">Proliferative</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              type="date"
              value={dateRange.from}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
              className="w-full sm:w-auto"
            />
            <Input
              type="date"
              value={dateRange.to}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scan ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{scan.patientName}</div>
                      <div className="text-sm text-muted-foreground">{scan.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{scan.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSeverityColor(scan.severity)}>
                      {scan.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{scan.confidence.toFixed(1)}%</TableCell>
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

        {filteredScans.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No scans found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};

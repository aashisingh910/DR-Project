import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", scans: 85, detected: 28, normal: 57 },
  { month: "Feb", scans: 92, detected: 31, normal: 61 },
  { month: "Mar", scans: 108, detected: 38, normal: 70 },
  { month: "Apr", scans: 95, detected: 33, normal: 62 },
  { month: "May", scans: 118, detected: 42, normal: 76 },
  { month: "Jun", scans: 125, detected: 45, normal: 80 },
];

const severityData = [
  { name: "No DR", value: 65, color: "hsl(var(--success))" },
  { name: "Mild", value: 15, color: "hsl(var(--warning))" },
  { name: "Moderate", value: 12, color: "hsl(var(--accent))" },
  { name: "Severe", value: 5, color: "hsl(var(--destructive))" },
  { name: "Proliferative", value: 3, color: "hsl(var(--primary))" },
];

const weeklyTrends = [
  { day: "Mon", scans: 18, accuracy: 94.2 },
  { day: "Tue", scans: 22, accuracy: 95.1 },
  { day: "Wed", scans: 20, accuracy: 93.8 },
  { day: "Thu", scans: 25, accuracy: 96.3 },
  { day: "Fri", scans: 28, accuracy: 94.7 },
  { day: "Sat", scans: 15, accuracy: 95.5 },
  { day: "Sun", scans: 12, accuracy: 94.9 },
];

interface AnalyticsProps {
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
}

export const Analytics = ({ dateRange, onDateRangeChange }: AnalyticsProps) => {
  const handleExport = () => {
    const csvContent = [
      ["Month", "Total Scans", "Detected", "Normal"],
      ...monthlyData.map(d => [d.month, d.scans, d.detected, d.normal])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics-report.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Track detection trends and performance metrics</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
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
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Monthly Scan Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Scan Trends</CardTitle>
          <CardDescription>Total scans and detection rates over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="scans" stroke="hsl(var(--primary))" strokeWidth={2} name="Total Scans" />
              <Line type="monotone" dataKey="detected" stroke="hsl(var(--accent))" strokeWidth={2} name="DR Detected" />
              <Line type="monotone" dataKey="normal" stroke="hsl(var(--success))" strokeWidth={2} name="Normal" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>Breakdown by DR severity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Daily scans and accuracy metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Bar dataKey="scans" fill="hsl(var(--primary))" name="Daily Scans" />
                <Bar dataKey="accuracy" fill="hsl(var(--accent))" name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

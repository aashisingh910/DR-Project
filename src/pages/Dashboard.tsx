import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScanHistory } from "@/components/dashboard/ScanHistory";
import { PatientRecords } from "@/components/dashboard/PatientRecords";
import { Analytics } from "@/components/dashboard/Analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Activity, Users, FileText, TrendingUp } from "lucide-react";

// Dashboard component
const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      title: "Total Scans",
      value: "1,234",
      change: "+12.5%",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Patients",
      value: "856",
      change: "+8.2%",
      icon: Users,
      color: "text-accent",
    },
    {
      title: "Reports Generated",
      value: "1,180",
      change: "+15.3%",
      icon: FileText,
      color: "text-success",
    },
    {
      title: "Detection Rate",
      value: "34.5%",
      change: "-2.1%",
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor diabetic retinopathy detection analytics and patient data
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="scans">Scan History</TabsTrigger>
              <TabsTrigger value="patients">Patient Records</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <Analytics 
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </TabsContent>

            <TabsContent value="scans" className="space-y-6">
              <ScanHistory 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <PatientRecords 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

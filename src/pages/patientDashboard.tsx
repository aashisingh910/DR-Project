// Dashboard.tsx
import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

// Types
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: 'stable' | 'moderate' | 'severe';
  nextAppointment?: string;
}

interface AnalysisResult {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  severity: 'No DR' | 'Mild' | 'Moderate' | 'Severe' | 'PDR';
  confidence: number;
  imageCount: number;
  downloadUrl: string;
  processingTime: number;
}

interface Statistics {
  totalPatients: number;
  totalAnalysis: number;
  averageSeverity: string;
  monthlyGrowth: number;
}

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [userType] = useState<'doctor' | 'patient'>('doctor'); // This would come from auth context

  // Mock data - in real app, this would come from API
  const patients: Patient[] = [
    { id: '1', name: 'John Smith', age: 45, gender: 'Male', lastVisit: '2024-01-15', status: 'moderate', nextAppointment: '2024-02-15' },
    { id: '2', name: 'Maria Garcia', age: 62, gender: 'Female', lastVisit: '2024-01-10', status: 'stable', nextAppointment: '2024-03-10' },
    { id: '3', name: 'Robert Johnson', age: 58, gender: 'Male', lastVisit: '2024-01-08', status: 'severe', nextAppointment: '2024-01-25' },
    { id: '4', name: 'Sarah Chen', age: 35, gender: 'Female', lastVisit: '2024-01-05', status: 'moderate', nextAppointment: '2024-02-05' },
    { id: '5', name: 'David Wilson', age: 71, gender: 'Male', lastVisit: '2024-01-03', status: 'stable' },
  ];

  const analysisResults: AnalysisResult[] = [
    { id: '1', patientId: '1', patientName: 'John Smith', date: '2024-01-15', severity: 'Moderate', confidence: 87.5, imageCount: 2, downloadUrl: '#', processingTime: 4.8 },
    { id: '2', patientId: '2', patientName: 'Maria Garcia', date: '2024-01-10', severity: 'Mild', confidence: 92.1, imageCount: 1, downloadUrl: '#', processingTime: 3.2 },
    { id: '3', patientId: '3', patientName: 'Robert Johnson', date: '2024-01-08', severity: 'Severe', confidence: 95.3, imageCount: 3, downloadUrl: '#', processingTime: 5.1 },
    { id: '4', patientId: '1', patientName: 'John Smith', date: '2023-12-15', severity: 'Moderate', confidence: 85.7, imageCount: 2, downloadUrl: '#', processingTime: 4.5 },
    { id: '5', patientId: '4', patientName: 'Sarah Chen', date: '2024-01-05', severity: 'Mild', confidence: 88.9, imageCount: 1, downloadUrl: '#', processingTime: 3.8 },
    { id: '6', patientId: '5', patientName: 'David Wilson', date: '2024-01-03', severity: 'No DR', confidence: 96.2, imageCount: 1, downloadUrl: '#', processingTime: 2.9 },
  ];

  const statistics: Statistics = {
    totalPatients: 127,
    totalAnalysis: 384,
    averageSeverity: 'Mild',
    monthlyGrowth: 12.5
  };

  // Severity over time data
  const severityOverTime = [
    { date: '2023-07', Mild: 12, Moderate: 8, Severe: 3, PDR: 1 },
    { date: '2023-08', Mild: 14, Moderate: 9, Severe: 2, PDR: 2 },
    { date: '2023-09', Mild: 16, Moderate: 10, Severe: 4, PDR: 1 },
    { date: '2023-10', Mild: 18, Moderate: 11, Severe: 3, PDR: 2 },
    { date: '2023-11', Mild: 15, Moderate: 12, Severe: 5, PDR: 1 },
    { date: '2023-12', Mild: 20, Moderate: 13, Severe: 4, PDR: 2 },
    { date: '2024-01', Mild: 22, Moderate: 14, Severe: 3, PDR: 3 },
  ];

  // Severity distribution
  const severityDistribution = [
    { name: 'No DR', value: 45, color: '#10b981' },
    { name: 'Mild', value: 25, color: '#3b82f6' },
    { name: 'Moderate', value: 15, color: '#f59e0b' },
    { name: 'Severe', value: 10, color: '#ef4444' },
    { name: 'PDR', value: 5, color: '#7c3aed' },
  ];

  // Patient progression data
  const patientProgression = [
    { date: '2023-07', severity: 1 },
    { date: '2023-08', severity: 1 },
    { date: '2023-09', severity: 2 },
    { date: '2023-10', severity: 2 },
    { date: '2023-11', severity: 3 },
    { date: '2023-12', severity: 3 },
    { date: '2024-01', severity: 2 },
  ];

  // Filter results based on selections
  const filteredResults = analysisResults.filter(result => {
    if (selectedPatient !== 'all' && result.patientId !== selectedPatient) {
      return false;
    }
    // Add date range filtering logic here
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'No DR': return 'bg-green-100 text-green-800';
      case 'Mild': return 'bg-blue-100 text-blue-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Severe': return 'bg-orange-100 text-orange-800';
      case 'PDR': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} patients
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track and analyze diabetic retinopathy screening results
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Analysis</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalAnalysis}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Severity</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.averageSeverity}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold text-gray-900">+{statistics.monthlyGrowth}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="flex flex-wrap gap-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>

              {userType === 'doctor' && (
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Patients</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              )}

              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="xl:col-span-2 space-y-8">
            {/* Severity Over Time Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Severity Over Time</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">Monthly</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Quarterly</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={severityOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Mild" fill="#3b82f6" name="Mild" />
                  <Bar dataKey="Moderate" fill="#f59e0b" name="Moderate" />
                  <Bar dataKey="Severe" fill="#ef4444" name="Severe" />
                  <Bar dataKey="PDR" fill="#7c3aed" name="PDR" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Patient Progression */}
            {selectedPatient !== 'all' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Progression</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={patientProgression}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 4]} tickCount={5} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="severity" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      name="Severity Level"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Right Column - Patient List & Distribution */}
          <div className="space-y-8">
            {/* Severity Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Severity Distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {severityDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Patients (for doctors) */}
            {userType === 'doctor' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {patients.slice(0, 4).map(patient => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-600">
                          {patient.age}y • {patient.gender} • Last visit: {patient.lastVisit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                        {patient.nextAppointment && (
                          <span className="text-xs text-gray-500">
                            Next: {patient.nextAppointment}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Analysis Results */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Analysis Results</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              New Analysis
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Severity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Confidence</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Images</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(result => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{result.patientName}</p>
                        <p className="text-sm text-gray-600">ID: {result.patientId}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{result.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{result.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{result.imageCount} images</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          onClick={() => {/* Download logic */}}
                        >
                          Download
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No analysis results found for the selected filters.
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Upload New Images</h3>
            <p className="text-gray-600 text-sm mb-4">Start a new analysis with patient fundus images</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">
              Upload & Analyze
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Generate Report</h3>
            <p className="text-gray-600 text-sm mb-4">Create comprehensive patient reports</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">
              Create Report
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Schedule Appointment</h3>
            <p className="text-gray-600 text-sm mb-4">Book follow-up appointments for patients</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors w-full">
              Schedule Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
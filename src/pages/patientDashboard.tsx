// src/pages/patientDashboard.tsx
import React, { useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

interface DiseaseProgress {
  month: string;
  severity: number;
}

interface Report {
  id: string;
  date: string;
  severity: string;
  confidence: number;
  doctor: string;
  medications: string[];
  precautions: string[];
  reportUrl: string;
}

const PatientDashboard: React.FC = () => {
  const [patient] = useState({
    name: "Aashi Singh",
    age: 52,
    gender: "Female",
    condition: "Diabetic Retinopathy",
    currentSeverity: "Moderate NPDR",
    diagnosisDate: "2023-05-14",
    medications: ["Metformin", "Fenofibrate", "Anti-VEGF Injections"],
    precautions: [
      "Regular blood sugar monitoring",
      "Avoid smoking and alcohol",
      "Low glycemic diet",
      "Quarterly retinal check-ups",
    ],
    doctor: "Dr. Rohan Mehta (Ophthalmologist)",
  });

  const diseaseProgress: DiseaseProgress[] = [
    { month: "3 Months Ago", severity: 4 },
    { month: "6 Months Ago", severity: 5 },
    { month: "12 Months Ago", severity: 6 },
    { month: "Today", severity: 3 },
  ];

  const reports: Report[] = [
    {
      id: "RPT-001",
      date: "2024-12-01",
      severity: "Moderate NPDR",
      confidence: 91,
      doctor: "Dr. Rohan Mehta",
      medications: ["Metformin", "Anti-VEGF Injection"],
      precautions: ["Control sugar levels", "Avoid high salt diet"],
      reportUrl: "#",
    },
    {
      id: "RPT-002",
      date: "2024-06-01",
      severity: "Severe NPDR",
      confidence: 88,
      doctor: "Dr. Rohan Mehta",
      medications: ["Metformin", "Fenofibrate"],
      precautions: ["Monitor blood pressure", "Avoid smoking"],
      reportUrl: "#",
    },
  ];

  const severityDistribution = [
    { name: "No DR", value: 20, color: "#10b981" },
    { name: "Mild", value: 25, color: "#3b82f6" },
    { name: "Moderate", value: 30, color: "#f59e0b" },
    { name: "Severe", value: 15, color: "#ef4444" },
    { name: "PDR", value: 10, color: "#7c3aed" },
  ];

  const getSeverityLabel = (level: number) => {
    if (level <= 2) return "No DR";
    if (level <= 3) return "Mild";
    if (level <= 4) return "Moderate";
    if (level <= 5) return "Severe";
    return "PDR";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {patient.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Patient ID: P-2024-001 | Age: {patient.age} | Gender: {patient.gender}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Download Last Report
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Book Appointment
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Current Severity</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {patient.currentSeverity}
            </p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Diagnosis Date</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {patient.diagnosisDate}
            </p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Treating Doctor</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {patient.doctor}
            </p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-gray-500 text-sm">Condition</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {patient.condition}
            </p>
          </div>
        </div>

        {/* Disease Progress Chart */}
        <div className="bg-white rounded-xl p-6 border shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Disease Progression Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={diseaseProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 6]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="severity"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-3">
            (Scale: 1 = No DR, 6 = PDR). Improvement seen after 12 months of treatment.
          </p>
        </div>

        {/* Severity Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Severity Distribution of Past Analyses
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
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
          </div>

          {/* Doctor Recommendation */}
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Doctor’s Recommendations
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Continue Metformin and diet control</li>
              <li>Anti-VEGF injections every 6 months</li>
              <li>Quarterly retinal scan to track changes</li>
              <li>Maintain HbA1c below 7%</li>
              <li>
                Recommended Glasses:{" "}
                <span className="font-semibold text-blue-600">
                  +1.75D Blue-light Blocking Lenses
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl p-6 border shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Saved Reports</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Upload New Analysis
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-gray-600">Date</th>
                <th className="p-3 text-gray-600">Severity</th>
                <th className="p-3 text-gray-600">Confidence</th>
                <th className="p-3 text-gray-600">Doctor</th>
                <th className="p-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{r.date}</td>
                  <td className="p-3 text-yellow-700 font-medium">{r.severity}</td>
                  <td className="p-3">{r.confidence}%</td>
                  <td className="p-3">{r.doctor}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:underline">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Medications & Precautions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Medications
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {patient.medications.map((med, i) => (
                <li key={i}>{med}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Precautions
            </h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              {patient.precautions.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

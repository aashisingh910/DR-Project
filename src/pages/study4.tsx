// Study.tsx
import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Types
interface PerformanceData {
  technique: string;
  accuracy: number;
  f1Score: number;
  sensitivity: number;
  precision: number;
}

interface DRData {
  category: string;
  count: number;
  percentage: number;
}

interface ComparisonData {
  model: string;
  accuracy: number;
  f1Score: number;
}

const Study: React.FC = () => {
  const [selectedValidation, setSelectedValidation] = useState<string>('10-fold');

  // Performance data for different techniques (10-fold cross-validation)
  const performanceData: PerformanceData[] = [
    { technique: 'KNN', accuracy: 78.22, f1Score: 85.72, sensitivity: 85.04, precision: 86.37 },
    { technique: 'ANN', accuracy: 80.78, f1Score: 87.04, sensitivity: 86.12, precision: 87.99 },
    { technique: 'SVM', accuracy: 82.03, f1Score: 87.91, sensitivity: 87.13, precision: 88.71 },
    { technique: 'VGG16', accuracy: 84.59, f1Score: 89.63, sensitivity: 88.75, precision: 90.52 },
    { technique: 'VGG19', accuracy: 86.94, f1Score: 91.31, sensitivity: 90.35, precision: 92.28 },
    { technique: 'InceptionV3', accuracy: 88.72, f1Score: 91.38, sensitivity: 91.47, precision: 91.13 },
    { technique: 'I-DBN', accuracy: 91.28, f1Score: 94.14, sensitivity: 93.46, precision: 94.14 },
    { technique: 'I-Deep-Forest', accuracy: 92.94, f1Score: 95.31, sensitivity: 95.67, precision: 94.95 },
    { technique: 'I-LS-SVM', accuracy: 90.06, f1Score: 93.29, sensitivity: 92.13, precision: 94.49 }
  ];

  // DR Symptoms distribution
  const drSymptomsData: DRData[] = [
    { category: 'Micro-aneurysms (MA)', count: 224, percentage: 7 },
    { category: 'Hemorrhages (HEM)', count: 189, percentage: 6 },
    { category: 'Exudates (EX)', count: 157, percentage: 5 },
    { category: 'Cotton Wool Spots (CWS)', count: 122, percentage: 4 },
    { category: 'No Symptoms', count: 2308, percentage: 78 }
  ];

  // Model comparison data
  const modelComparison: ComparisonData[] = [
    { model: 'Traditional ML', accuracy: 82.03, f1Score: 87.91 },
    { model: 'Deep Learning', accuracy: 88.72, f1Score: 91.38 },
    { model: 'Proposed Models', accuracy: 91.43, f1Score: 94.25 }
  ];

  // Validation method comparison
  const validationComparison = [
    { method: '70/30 Split', accuracy: 85.91, f1Score: 87.48 },
    { method: '80/20 Split', accuracy: 87.41, f1Score: 89.11 },
    { method: '5-fold CV', accuracy: 90.46, f1Score: 92.50 },
    { method: '10-fold CV', accuracy: 91.28, f1Score: 94.14 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Severity Analysis of Diabetic Retinopathy in Retinal Images using various digital SVM Classifiers
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive analysis of machine learning and deep learning approaches 
            for automated diabetic retinopathy detection using retinal fundus images
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">91.28%</div>
            <div className="text-gray-600 mt-2">Best Accuracy (I-DBN)</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600">95.31%</div>
            <div className="text-gray-600 mt-2">Best F1-Score (I-Deep-Forest)</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">95.67%</div>
            <div className="text-gray-600 mt-2">Best Sensitivity (I-Deep-Forest)</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600">94.95%</div>
            <div className="text-gray-600 mt-2">Best Precision (I-Deep-Forest)</div>
          </div>
        </div>

        {/* Validation Method Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Validation Method</h2>
          <div className="flex space-x-4">
            {['70/30 Split', '80/20 Split', '5-fold CV', '10-fold CV'].map((method) => (
              <button
                key={method}
                onClick={() => setSelectedValidation(method)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedValidation === method
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Model Performance Comparison ({selectedValidation})
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="technique" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#0088FE" name="Accuracy (%)" />
                <Bar dataKey="f1Score" fill="#00C49F" name="F1-Score (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sensitivity vs Precision ({selectedValidation})
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="technique" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sensitivity" fill="#FF8042" name="Sensitivity (%)" />
                <Bar dataKey="precision" fill="#8884D8" name="Precision (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DR Symptoms Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Diabetic Retinopathy Symptoms Distribution
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={drSymptomsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {drSymptomsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {drSymptomsData.map((symptom, index) => (
                <div key={symptom.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-gray-700">{symptom.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{symptom.count} images</span>
                    <span className="text-gray-500 ml-2">({symptom.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Type Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Performance by Model Type (10-fold Cross Validation)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#0088FE" name="Accuracy (%)" />
              <Bar dataKey="f1Score" fill="#00C49F" name="F1-Score (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Validation Method Impact */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Impact of Validation Methods on I-DBN Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={validationComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#0088FE" name="Accuracy (%)" strokeWidth={2} />
              <Line type="monotone" dataKey="f1Score" stroke="#00C49F" name="F1-Score (%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Best Performing Models</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>I-Deep-Forest: 92.94% Accuracy, 95.31% F1-Score</li>
                  <li>I-DBN: 91.28% Accuracy, 94.14% F1-Score</li>
                  <li>I-LS-SVM: 90.06% Accuracy, 93.29% F1-Score</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Validation Impact</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>10-fold cross-validation provides most reliable results</li>
                  <li>6-9% improvement over simple train/test splits</li>
                  <li>Better generalization and reduced overfitting</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Technical Innovations</h3>
                <ul className="list-disc list-inside text-purple-700 space-y-1">
                  <li>Adaptive learning strategy for DBN</li>
                  <li>BAT algorithm for feature selection</li>
                  <li>Improved LS-SVM with penalty factor</li>
                  <li>Multi-grained scanning for feature extraction</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Clinical Significance</h3>
                <ul className="list-disc list-inside text-orange-700 space-y-1">
                  <li>Early detection of diabetic retinopathy</li>
                  <li>Automated screening reduces manual effort</li>
                  <li>High accuracy enables reliable diagnosis</li>
                  <li>Potential for integration in healthcare systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;

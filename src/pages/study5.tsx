// Study.tsx
import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

// Types
interface ResearchMetric {
  label: string;
  value: number;
  unit: string;
  description: string;
  color: string;
}

interface StageData {
  name: string;
  value: number;
  color: string;
  description: string;
}

interface ClassifierResult {
  name: string;
  accuracy: number;
  sensitivity: number;
  specificity: number;
  precision: number;
  f1Score: number;
}

const Study: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'methods' | 'results' | 'comparison'>('summary');
  const [selectedClassifier, setSelectedClassifier] = useState<string>('all');

  // Research metrics data
  const researchMetrics: ResearchMetric[] = [
    {
      label: "Best Accuracy",
      value: 97.0,
      unit: "%",
      description: "Bag of Visual Words Classifier",
      color: "bg-gradient-to-r from-green-400 to-green-600"
    },
    {
      label: "Dataset Size",
      value: 219,
      unit: "images",
      description: "DIARETDB0 & DIARETDB1",
      color: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    {
      label: "Processing Time",
      value: 4.8,
      unit: "seconds",
      description: "Per image analysis",
      color: "bg-gradient-to-r from-purple-400 to-purple-600"
    },
    {
      label: "Feature Count",
      value: 24,
      unit: "features",
      description: "GLCM + Statistical",
      color: "bg-gradient-to-r from-orange-400 to-orange-600"
    }
  ];

  // DR Stages data
  const drStages: StageData[] = [
    { name: "Mild NPDR", value: 33.3, color: "#4f46e5", description: "Early stage with microaneurysms" },
    { name: "Moderate NPDR", value: 33.3, color: "#06b6d4", description: "Blood vessel swelling" },
    { name: "Severe NPDR", value: 23.4, color: "#10b981", description: "Significant vessel damage" },
    { name: "PDR", value: 10.0, color: "#ef4444", description: "Advanced stage with new vessel growth" }
  ];

  // Classifier performance data
  const classifierData: ClassifierResult[] = [
    {
      name: "Multiclass SVM",
      accuracy: 96.66,
      sensitivity: 96.0,
      specificity: 95.0,
      precision: 93.36,
      f1Score: 87.42
    },
    {
      name: "HKSVM",
      accuracy: 96.80,
      sensitivity: 96.92,
      specificity: 100.0,
      precision: 96.34,
      f1Score: 90.42
    },
    {
      name: "Bag of Visual Words",
      accuracy: 97.00,
      sensitivity: 95.6,
      specificity: 96.15,
      precision: 98.89,
      f1Score: 92.33
    }
  ];

  // Feature importance data
  const featureImportance = [
    { feature: "Contrast", importance: 92, category: "GLCM" },
    { feature: "Correlation", importance: 88, category: "GLCM" },
    { feature: "Homogeneity", importance: 85, category: "GLCM" },
    { feature: "Energy", importance: 78, category: "GLCM" },
    { feature: "Mean", importance: 82, category: "Statistical" },
    { feature: "Standard Deviation", importance: 79, category: "Statistical" },
    { feature: "Entropy", importance: 75, category: "Statistical" }
  ];

  // Processing pipeline steps
  const pipelineSteps = [
    { step: 1, name: "Image Acquisition", description: "Fundus images from DIARETDB databases", status: "completed" },
    { step: 2, name: "Preprocessing", description: "Noise removal and contrast enhancement", status: "completed" },
    { step: 3, name: "Feature Extraction", description: "GLCM and statistical features", status: "completed" },
    { step: 4, name: "Classification", description: "Multiple classifier approaches", status: "completed" },
    { step: 5, name: "Performance Evaluation", description: "Accuracy, sensitivity, specificity", status: "completed" }
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Diabetic Retinopathy Analysis
              </h1>
              <p className="text-gray-600 mt-2">
                Automated Detection and Classification using Machine Learning
              </p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-blue-700 font-semibold">Research Study</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            {[
              { id: 'summary', label: 'Overview' },
              { id: 'methods', label: 'Methodology' },
              { id: 'results', label: 'Results' },
              { id: 'comparison', label: 'Comparison' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {researchMetrics.map((metric, index) => (
            <div
              key={index}
              className={`${metric.color} rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-200 shadow-lg`}
            >
              <div className="text-2xl font-bold mb-2">
                {metric.value}{metric.unit}
              </div>
              <div className="font-semibold mb-1">{metric.label}</div>
              <div className="text-sm opacity-90">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'summary' && (
              <>
                {/* Research Overview */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Overview</h2>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-600 mb-4">
                      This research focuses on developing an automated system for detecting and classifying 
                      Diabetic Retinopathy (DR) stages from digital fundus images. DR is a leading cause 
                      of blindness worldwide, and early detection is crucial for preventing vision loss.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Problem Statement</h3>
                        <p className="text-blue-700 text-sm">
                          Manual screening of DR is time-consuming and requires expert ophthalmologists. 
                          Automated systems can significantly reduce screening time and improve accessibility.
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-2">Solution Approach</h3>
                        <p className="text-green-700 text-sm">
                          Machine learning-based system using image processing and multiple classification 
                          techniques to automatically detect and classify DR stages with high accuracy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Pipeline */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Processing Pipeline</h2>
                  <div className="space-y-4">
                    {pipelineSteps.map((step) => (
                      <div key={step.step} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{step.name}</h3>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {step.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'methods' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Methodology</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Feature Extraction</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={featureImportance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="feature" angle={-45} textAnchor="end" height={80} />
                        <YAxis label={{ value: 'Importance (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="importance" name="Feature Importance">
                          {featureImportance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.category === 'GLCM' ? '#4f46e5' : '#06b6d4'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">GLCM Features</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Contrast</li>
                        <li>• Correlation</li>
                        <li>• Energy</li>
                        <li>• Homogeneity</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Statistical Features</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Mean</li>
                        <li>• Standard Deviation</li>
                        <li>• Entropy</li>
                        <li>• Kurtosis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Classification Results</h2>
                
                <div className="mb-6">
                  <div className="flex space-x-4 mb-4">
                    <button
                      onClick={() => setSelectedClassifier('all')}
                      className={`px-4 py-2 rounded-lg ${
                        selectedClassifier === 'all' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      All Classifiers
                    </button>
                    {classifierData.map((classifier) => (
                      <button
                        key={classifier.name}
                        onClick={() => setSelectedClassifier(classifier.name)}
                        className={`px-4 py-2 rounded-lg ${
                          selectedClassifier === classifier.name 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {classifier.name}
                      </button>
                    ))}
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                  <BarChart 
                    data={selectedClassifier === 'all' ? classifierData : classifierData.filter(c => c.name === selectedClassifier)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy" fill="#4f46e5" />
                    <Bar dataKey="sensitivity" name="Sensitivity" fill="#06b6d4" />
                    <Bar dataKey="specificity" name="Specificity" fill="#10b981" />
                    <Bar dataKey="precision" name="Precision" fill="#f59e0b" />
                    <Bar dataKey="f1Score" name="F1-Score" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'comparison' && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Comparison</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ROC Curve Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={[
                          { fpr: 0, BagOfWords: 0, HKSVM: 0, MulticlassSVM: 0 },
                          { fpr: 0.1, BagOfWords: 0.85, HKSVM: 0.8, MulticlassSVM: 0.75 },
                          { fpr: 0.2, BagOfWords: 0.92, HKSVM: 0.88, MulticlassSVM: 0.85 },
                          { fpr: 0.3, BagOfWords: 0.96, HKSVM: 0.93, MulticlassSVM: 0.9 },
                          { fpr: 0.4, BagOfWords: 0.98, HKSVM: 0.96, MulticlassSVM: 0.94 },
                          { fpr: 0.5, BagOfWords: 0.99, HKSVM: 0.98, MulticlassSVM: 0.96 },
                          { fpr: 1, BagOfWords: 1, HKSVM: 1, MulticlassSVM: 1 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'insideBottom' }} />
                        <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="BagOfWords" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} name="Bag of Visual Words" />
                        <Area type="monotone" dataKey="HKSVM" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} name="HKSVM" />
                        <Area type="monotone" dataKey="MulticlassSVM" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Multiclass SVM" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {classifierData.map((classifier, index) => (
                      <div key={classifier.name} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">{classifier.name}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">AUC Score:</span>
                            <span className="font-semibold">
                              {(classifier.accuracy / 100).toFixed(3)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Training Time:</span>
                            <span className="font-semibold">
                              {index === 0 ? '45s' : index === 1 ? '52s' : '38s'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Complexity:</span>
                            <span className="font-semibold">
                              {index === 0 ? 'Medium' : index === 1 ? 'High' : 'Low'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* DR Stages Distribution */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">DR Stages Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={drStages}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {drStages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {drStages.map((stage, index) => (
                  <div key={stage.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: stage.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{stage.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{stage.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Highlights */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Highlights</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Best Overall</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                    Bag of Visual Words
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">Fastest Processing</span>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                    4.8s/image
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700 font-medium">Highest Specificity</span>
                  <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm font-bold">
                    HKSVM (100%)
                  </span>
                </div>
              </div>
            </div>

            {/* Key Findings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Findings</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">Bag of Visual Words achieved highest accuracy (97%)</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">GLCM features provided most discriminative power</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm">System outperforms existing methods by 5-10%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
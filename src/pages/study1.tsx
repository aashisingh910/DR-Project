import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const Study: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'methods' | 'results' | 'comparison'>('overview');

  // Data for charts
  const performanceData = [
    { stage: 'No DR', sensitivity: 97.7, specificity: 96.25, accuracy: 97.0 },
    { stage: 'Mild DR', sensitivity: 99.0, specificity: 98.6, accuracy: 99.0 },
    { stage: 'Moderate DR', sensitivity: 98.6, specificity: 97.0, accuracy: 98.55 },
    { stage: 'Severe DR', sensitivity: 96.0, specificity: 98.86, accuracy: 95.55 },
    { stage: 'Proliferative DR', sensitivity: 99.0, specificity: 99.1, accuracy: 100 }
  ];

  const comparisonData = [
    { method: 'ResNet50', accuracy: 75.0, precision: 0.64, fmeasure: 0.54 },
    { method: 'Ensemble DL', accuracy: 81.85, precision: 0.79, fmeasure: 0.56 },
    { method: 'CABNet', accuracy: 86.18, precision: 0, fmeasure: 0 },
    { method: 'EfficientNet', accuracy: 89.29, precision: 0.89, fmeasure: 0.89 },
    { method: 'Xception', accuracy: 82.0, precision: 0.69, fmeasure: 0.66 },
    { method: 'Proposed CNN+RF', accuracy: 98.02, precision: 0.98, fmeasure: 0.97 }
  ];

  const methodComparisonData = [
    { method: 'DWT + KKR', sensitivity: 88.47, accuracy: 97.94, database: 'DIARETDB1' },
    { method: 'CNN + RF', sensitivity: 97.27, accuracy: 98.02, database: 'EyePACS' }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learning based system for Automated Screening of Diabetic Retinopathy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced image processing and convolutional neural networks for early detection 
            and classification of diabetic retinopathy stages
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {['overview', 'methods', 'results', 'comparison'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Overview</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Problem Statement</h3>
                    <p className="text-gray-700">
                      Diabetic Retinopathy (DR) is a leading cause of blindness worldwide. 
                      Early detection through regular screening is crucial, but manual diagnosis 
                      is time-consuming and requires expert ophthalmologists.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Key Objectives</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Automate DR detection and severity classification</li>
                      <li>Achieve high accuracy, sensitivity, and specificity</li>
                      <li>Compare traditional vs. deep learning approaches</li>
                      <li>Enable early diagnosis to prevent vision loss</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Databases Used</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">DIARETDB1:</span>
                        <span className="text-gray-700 ml-2">89 fundus images for binary classification</span>
                      </div>
                      <div>
                        <span className="font-medium">EyePACS:</span>
                        <span className="text-gray-700 ml-2">620 images for multi-class classification</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">DR Stages Classified</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-700">0 - No DR</div>
                      <div className="text-gray-700">1 - Mild DR</div>
                      <div className="text-gray-700">2 - Moderate DR</div>
                      <div className="text-gray-700">3 - Severe DR</div>
                      <div className="text-gray-700">4 - Proliferative DR</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'methods' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodologies</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Method 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    Method 1: DWT with KKR Algorithm
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">1</span>
                      <span className="text-gray-700">Preprocessing with median filtering and contrast enhancement</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">2</span>
                      <span className="text-gray-700">K-means segmentation for blood vessel extraction</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">3</span>
                      <span className="text-gray-700">Discrete Meyer Wavelet Transform for feature extraction</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">4</span>
                      <span className="text-gray-700">K-means Kernel SVM with RBF for classification</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance (DIARETDB1):</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Sensitivity: <span className="font-bold">88.47%</span></div>
                      <div>Accuracy: <span className="font-bold">97.94%</span></div>
                    </div>
                  </div>
                </div>

                {/* Method 2 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-green-900 mb-3">
                    Method 2: CNN with Random Forest
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">1</span>
                      <span className="text-gray-700">Custom CNN architecture for automatic feature extraction</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">2</span>
                      <span className="text-gray-700">Convolutional and pooling layers with ReLU activation</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">3</span>
                      <span className="text-gray-700">Max pooling for dimensionality reduction</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">4</span>
                      <span className="text-gray-700">Random Forest classifier for final classification</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance (EyePACS):</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>Sensitivity: <span className="font-bold">97.27%</span></div>
                      <div>Specificity: <span className="font-bold">98.25%</span></div>
                      <div>Accuracy: <span className="font-bold">98.02%</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method Comparison Chart */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Method Performance Comparison</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={methodComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="method" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sensitivity" fill="#8884d8" name="Sensitivity (%)" />
                      <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Experimental Results</h2>
              
              {/* Performance Metrics Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Multi-class Classification Performance by DR Stage
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sensitivity" fill="#8884d8" name="Sensitivity (%)" />
                      <Bar dataKey="specificity" fill="#82ca9d" name="Specificity (%)" />
                      <Bar dataKey="accuracy" fill="#ffc658" name="Accuracy (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">CNN Architecture Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Input Size:</span>
                      <span className="font-medium">224×224×3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Convolutional Layers:</span>
                      <span className="font-medium">6 layers</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pooling Type:</span>
                      <span className="font-medium">Max Pooling</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Learning Rate:</span>
                      <span className="font-medium">0.001</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Epochs:</span>
                      <span className="font-medium">2000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Average Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sensitivity:</span>
                      <span className="font-medium text-green-600">97.27%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Specificity:</span>
                      <span className="font-medium text-green-600">98.25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span className="font-medium text-green-600">98.02%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precision:</span>
                      <span className="font-medium text-green-600">0.98</span>
                    </div>
                    <div className="flex justify-between">
                      <span>F-Measure:</span>
                      <span className="font-medium text-green-600">0.97</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Comparative Analysis</h2>
              
              {/* Comparison with Existing Methods */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Comparison with State-of-the-Art Methods
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="method" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy (%)" />
                      <Bar dataKey="precision" fill="#82ca9d" name="Precision (×100)" />
                      <Bar dataKey="fmeasure" fill="#ffc658" name="F-Measure (×100)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Key Findings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Superior Performance</h4>
                        <p className="text-sm text-gray-700">Proposed CNN+RF achieves 98.02% accuracy, outperforming existing methods</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Robust Multi-class Classification</h4>
                        <p className="text-sm text-gray-700">Effectively classifies all 5 DR stages with high precision</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Early Detection Capability</h4>
                        <p className="text-sm text-gray-700">High sensitivity enables detection in early stages to prevent vision loss</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Clinical Applicability</h4>
                        <p className="text-sm text-gray-700">Automated system reduces dependency on expert ophthalmologists</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Conclusion Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
          <div className="space-y-3">
            <p className="text-blue-100">
              The research demonstrates that both proposed methods are highly effective for automated 
              Diabetic Retinopathy detection. The CNN-based model with Random Forest classifier 
              shows superior performance for multi-class severity classification, achieving:
            </p>
            <div className="grid md:grid-cols-4 gap-4 text-center mt-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-2xl font-bold">98.02%</div>
                <div className="text-sm opacity-90">Accuracy</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-2xl font-bold">97.27%</div>
                <div className="text-sm opacity-90">Sensitivity</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-2xl font-bold">98.25%</div>
                <div className="text-sm opacity-90">Specificity</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="text-2xl font-bold">0.98</div>
                <div className="text-sm opacity-90">Precision</div>
              </div>
            </div>
            <p className="text-blue-100 mt-4">
              This automated solution offers a robust, scalable approach for early DR diagnosis, 
              potentially helping millions of diabetic patients worldwide through timely intervention 
              and prevention of vision loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
// Study.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
}
 from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Data for graphs
const performanceData = [
  { method: 'PCNN (MAs)', sensitivity: 87.69, specificity: 92.44, accuracy: 90.07 },
  { method: 'Neuro-Fuzzy (Exudates)', sensitivity: 92.7, specificity: 95.6, accuracy: 93.34 },
  { method: 'CNN (Haemorrhages)', sensitivity: 89.0, specificity: 90.0, accuracy: 89.5 },
  { method: 'ResNet (Binary)', sensitivity: 97.8, specificity: 97.8, accuracy: 97.8 },
  { method: 'ResNet (Multi-class)', sensitivity: 82.65, specificity: 82.65, accuracy: 82.65 },
];

const datasetDistribution = [
  { name: 'Normal', value: 1805 },
  { name: 'Mild', value: 370 },
  { name: 'Moderate', value: 999 },
  { name: 'Severe', value: 193 },
  { name: 'Proliferative', value: 295 },
];

const stagesData = [
  { stage: 'No DR', description: 'No apparent retinopathy', patients: 65.3 },
  { stage: 'Mild NPDR', description: 'Microaneurysms only', patients: 6.2 },
  { stage: 'Moderate NPDR', description: 'More than microaneurysms but less than severe', patients: 13.2 },
  { stage: 'Severe NPDR', description: 'Extensive hemorrhages, venous beading, IRMA', patients: 2.1 },
  { stage: 'PDR', description: 'Neovascularization, vitreous hemorrhage', patients: 1.9 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Study: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Diabetic Retinopathy Detection System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Design of Efficient Classifiers for Diabetic Retinopathy
        </Typography>
      </Paper>

      {/* Summary Section */}
      <Grid container spacing={3}>
        {/* Key Findings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Findings
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  "PCNN achieved 87.69% sensitivity in MA detection",
                  "Neuro-Fuzzy system reached 93.34% accuracy for exudates",
                  "CNN-based hemorrhage segmentation: 89% precision",
                  "ResNet binary classification: 97.8% accuracy",
                  "Multi-class DR staging: 82.65% accuracy"
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        backgroundColor: 'primary.main',
                        borderRadius: '50%',
                        mr: 2,
                      }}
                    />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Dataset Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dataset Distribution (APTOS)
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={datasetDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {datasetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Comparison */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Comparison Across Methods
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sensitivity" fill="#8884d8" name="Sensitivity (%)" />
                  <Bar dataKey="specificity" fill="#82ca9d" name="Specificity (%)" />
                  <Bar dataKey="accuracy" fill="#ffc658" name="Accuracy (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* DR Stages Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Diabetic Retinopathy Stages
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Stage</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">% Patients</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stagesData.map((stage, index) => (
                      <TableRow key={stage.stage}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                backgroundColor: COLORS[index],
                                borderRadius: '50%',
                                mr: 1,
                              }}
                            />
                            {stage.stage}
                          </Box>
                        </TableCell>
                        <TableCell>{stage.description}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {stage.patients}%
                            <LinearProgress
                              variant="determinate"
                              value={stage.patients}
                              sx={{ ml: 1, width: 60, height: 6 }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Methodology Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Methodology Overview
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  {
                    technique: "PCNN for Microaneurysms",
                    accuracy: "90.07%",
                    color: "#0088FE"
                  },
                  {
                    technique: "Neuro-Fuzzy for Exudates",
                    accuracy: "93.34%",
                    color: "#00C49F"
                  },
                  {
                    technique: "CNN for Haemorrhages",
                    accuracy: "89.50%",
                    color: "#FFBB28"
                  },
                  {
                    technique: "ResNet for Classification",
                    accuracy: "97.80%",
                    color: "#FF8042"
                  }
                ].map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{item.technique}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {item.accuracy}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={parseFloat(item.accuracy)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: item.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Conclusion Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Conclusion & Impact
              </Typography>
              <Typography variant="body2" paragraph>
                The developed automated system demonstrates high accuracy in detecting diabetic retinopathy 
                symptoms across multiple stages. The integration of PCNN, Neuro-Fuzzy systems, and deep learning 
                architectures provides a comprehensive solution for early detection and classification of DR, 
                potentially reducing vision loss through timely intervention.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    Clinical Impact:
                  </Typography>
                  <Typography variant="body2">
                    • Early detection of DR symptoms<br/>
                    • Reduced screening costs<br/>
                    • Automated mass screening capability<br/>
                    • Objective diagnosis standardization
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    Technical Innovation:
                  </Typography>
                  <Typography variant="body2">
                    • Hybrid PCNN for MA detection<br/>
                    • Neuro-Fuzzy for exudate identification<br/>
                    • CNN-based hemorrhage segmentation<br/>
                    • ResNet for multi-class classification
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Study;
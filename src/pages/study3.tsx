// Study.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Visibility,
  Warning,
  TrendingUp,
  Science,
  Biotech,
} from '@mui/icons-material';

// Data for graphs
const drStagesData = [
  { stage: 'No DR', count: 1805, percentage: 49.3, color: '#4CAF50' },
  { stage: 'Mild DR', count: 370, percentage: 10.1, color: '#8BC34A' },
  { stage: 'Moderate DR', count: 999, percentage: 27.3, color: '#FFC107' },
  { stage: 'Severe DR', count: 193, percentage: 5.3, color: '#FF9800' },
  { stage: 'Proliferative DR', count: 295, percentage: 8.1, color: '#F44336' },
];

const performanceComparison = [
  { method: 'OSR-FCA Segmentation', accuracy: 97.16, sensitivity: 83.7, specificity: 98.7 },
  { method: 'RMMCL Classification', accuracy: 97.27, sensitivity: 95.0, specificity: 98.9 },
  { method: 'CNN with CLAHE', accuracy: 96.89, sensitivity: 97.34, specificity: 97.49 },
  { method: 'Traditional FCM', accuracy: 92.0, sensitivity: 81.0, specificity: 92.0 },
];

const lesionTypes = [
  { name: 'Microaneurysms', count: 81, description: 'Early stage vascular changes' },
  { name: 'Haemorrhages', count: 80, description: 'Bleeding in retinal layers' },
  { name: 'Hard Exudates', count: 81, description: 'Lipid deposits from leaky vessels' },
  { name: 'Soft Exudates', count: 40, description: 'Nerve fiber layer infarcts' },
];

const methodologySteps = [
  {
    step: 1,
    title: 'Image Pre-processing',
    description: 'CLAHE enhancement with RSO optimization',
    techniques: ['Grayscale conversion', 'Histogram equalization', 'Noise reduction']
  },
  {
    step: 2,
    title: 'Segmentation',
    description: 'OSR-FCA for precise lesion detection',
    techniques: ['Fuzzy clustering', 'Outlier removal', 'Spatial information']
  },
  {
    step: 3,
    title: 'Classification',
    description: 'RMMCL with HCPSO optimization',
    techniques: ['Relevance mapping', 'Multi-class labeling', 'Deep learning']
  }
];

const riskFactors = [
  'Duration of diabetes',
  'Poor blood sugar control',
  'High blood pressure',
  'High cholesterol',
  'Tobacco use',
  'Pregnancy'
];

const Study: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 'lg', margin: '0 auto' }}>
      {/* Header Section */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Typography variant="h3" component="h1" gutterBottom color="white" fontWeight="bold">
          Diabetic Retinopathy Detection System
        </Typography>
        <Typography variant="h6" color="white" sx={{ opacity: 0.9 }}>
          Automatic Grading of Vessel Turocity in Retinal Fundus Images
        </Typography>
      </Paper>

      {/* Executive Summary */}
      <Grid container spacing={4}>
        {/* Key Statistics */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Study Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Diabetic Retinopathy (DR) is a leading cause of blindness worldwide, 
                    affecting millions of diabetic patients. This research presents an 
                    automated system for early detection and classification of DR stages 
                    using advanced image processing and deep learning techniques.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip icon={<Science />} label="3 Novel Algorithms" color="primary" />
                    <Chip icon={<Biotech />} label="Multi-stage Classification" color="secondary" />
                    <Chip icon={<TrendingUp />} label="97%+ Accuracy" color="success" />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Achievements
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp color="success" />
                  </ListItemIcon>
                  <ListItemText primary="97.27% Classification Accuracy" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Visibility color="info" />
                  </ListItemIcon>
                  <ListItemText primary="83.7% Segmentation Sensitivity" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText primary="Early Stage Detection" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* DR Stages Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                DR Stages Distribution (IDRiD Dataset)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={drStagesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" name="Percentage (%)" fill="#8884d8">
                    {drStagesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Comparison */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" name="Accuracy (%)" fill="#4CAF50" />
                  <Bar dataKey="sensitivity" name="Sensitivity (%)" fill="#2196F3" />
                  <Bar dataKey="specificity" name="Specificity (%)" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Methodology Steps */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Research Methodology
              </Typography>
              <Grid container spacing={3}>
                {methodologySteps.map((step) => (
                  <Grid item xs={12} md={4} key={step.step}>
                    <Paper sx={{ p: 2, height: '100%', background: '#f8f9fa' }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Step {step.step}: {step.title}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {step.description}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Techniques:
                      </Typography>
                      <List dense>
                        {step.techniques.map((tech, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={`• ${tech}`} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Lesion Types */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Retinal Lesion Types
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lesion Type</TableCell>
                      <TableCell align="right">Count</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lesionTypes.map((lesion) => (
                      <TableRow key={lesion.name}>
                        <TableCell>{lesion.name}</TableCell>
                        <TableCell align="right">{lesion.count}</TableCell>
                        <TableCell>{lesion.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Factors */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                DR Risk Factors
              </Typography>
              <Grid container spacing={1}>
                {riskFactors.map((factor, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Chip
                      label={factor}
                      variant="outlined"
                      color="warning"
                      size="small"
                      sx={{ m: 0.5 }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Regular screening and early detection are crucial for preventing 
                  vision loss in diabetic patients.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Algorithm Performance Over Time */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Algorithm Performance Evolution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={[
                  { iteration: 1, accuracy: 85, sensitivity: 78, specificity: 82 },
                  { iteration: 2, accuracy: 89, sensitivity: 82, specificity: 87 },
                  { iteration: 3, accuracy: 92, sensitivity: 86, specificity: 91 },
                  { iteration: 4, accuracy: 95, sensitivity: 90, specificity: 94 },
                  { iteration: 5, accuracy: 97, sensitivity: 95, specificity: 98 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="iteration" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="accuracy" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="sensitivity" stackId="1" stroke="#2196F3" fill="#2196F3" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="specificity" stackId="1" stroke="#FF9800" fill="#FF9800" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Conclusion */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Research Impact & Conclusion
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" paragraph>
                    The proposed automated DR detection system demonstrates exceptional 
                    performance in classifying diabetic retinopathy stages with over 97% accuracy. 
                    The integration of OSR-FCA segmentation and RMMCL classification provides 
                    a robust framework for early diagnosis and intervention.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Key innovations include the Rat Swarm Optimization for CLAHE enhancement, 
                    Outlier-based Sparse Regularization for precise segmentation, and 
                    Relevance Mapping for multi-class classification.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Clinical Significance:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="• Enables mass screening of diabetic patients" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Reduces ophthalmologist workload" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Facilitates early intervention to prevent blindness" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="• Provides objective, reproducible diagnosis" />
                    </ListItem>
                  </List>
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
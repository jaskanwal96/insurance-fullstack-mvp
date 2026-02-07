// Customer policy detail page

import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { getPolicyById } from '../../data/mockPolicies';

const PolicyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const policy = id ? getPolicyById(id) : undefined;

  if (!policy) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customer/policies')}
          sx={{ mb: 3 }}
        >
          Back to Policies
        </Button>
        <Alert severity="error">
          Policy not found. The policy you're looking for doesn't exist or has been removed.
        </Alert>
      </Container>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Life Insurance': '#1976d2',
      'Motor Insurance': '#388e3c',
      'Home Insurance': '#f57c00',
      'Disaster Insurance': '#d32f2f',
      'Health Insurance': '#7b1fa2',
      'Travel Insurance': '#0097a7',
      'Business Insurance': '#5d4037',
    };
    return colors[category] || '#757575';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/customer/policies')}
        sx={{ mb: 3 }}
      >
        Back to Policies
      </Button>

      {/* Policy Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Chip
                  label={policy.category}
                  sx={{
                    bgcolor: getCategoryColor(policy.category),
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                  color={getStatusColor(policy.status) as 'success' | 'error' | 'warning' | 'default'}
                  variant="outlined"
                />
              </Stack>
              <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                {policy.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                {policy.summary}
              </Typography>
            </Box>
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Monthly Premium
              </Typography>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                ${policy.premium.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Policy Information */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CategoryIcon color="primary" />
                Policy Details
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
              >
                {policy.details}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Policy Summary Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Policy Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <MoneyIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Coverage Amount
                    </Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={600}>
                    ${policy.coverageAmount.toLocaleString()}
                  </Typography>
                </Box>

                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Coverage Period
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={500}>
                    {formatDate(policy.startDate)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">to</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatDate(policy.endDate)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PolicyDetail;

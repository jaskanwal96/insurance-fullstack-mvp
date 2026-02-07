import React from 'react';
import {
  Box, Grid, Card, CardContent, CardActionArea, Typography, Chip, Stack
} from '@mui/material';

// Use the same color logic you already wrote
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'success';
    case 'expired': return 'error';
    case 'pending': return 'warning';
    default: return 'default';
  }
};

interface PolicyDashboardViewProps {
  policies: any[];
  onPolicyClick: (id: string) => void;
}

export const PolicyDashboardView: React.FC<PolicyDashboardViewProps> = ({ policies, onPolicyClick }) => {
  if (policies.length === 0) {
    return (
      <Card sx={{ p: 6, textAlign: 'center' }}>
        <Typography color="text.secondary">No policies found matching your criteria.</Typography>
      </Card>
    );
  }

  return (
    <Grid container spacing={3}>
      {policies.map((policy) => (
        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={policy.id}>
          <Card
            sx={{
              height: '100%',
              transition: '0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
            }}
          >
            <CardActionArea onClick={() => onPolicyClick(policy.id)} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                  <Chip
                    label={policy.category}
                    size="small"
                    sx={{ bgcolor: getCategoryColor(policy.category), color: 'white' }}
                  />
                  <Chip
                    label={policy.status}
                    size="small"
                    color={getStatusColor(policy.status) as any}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="h6" fontWeight={600} gutterBottom>{policy.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{policy.summary}</Typography>
                <Box>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption">Premium</Typography>
                    <Typography variant="body2" fontWeight={600} color="primary">${policy.premium}/mo</Typography>
                  </Stack>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
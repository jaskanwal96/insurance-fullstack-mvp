// Customer dashboard page

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { policyService, type Policy } from '../../services/policyService';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  Description as PolicyIcon,
} from '@mui/icons-material';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await policyService.getPolicies();
        setPolicies(data);
      } catch (err) {
        console.error('Failed to fetch policies:', err);
        setError(err instanceof Error ? err.message : 'Failed to load policies');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          Welcome, {user?.name ?? 'Customer'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your insurance policies and claims from your dashboard
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Policies Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          My Policies
        </Typography>

        {policies.length === 0 ? (
          <Alert severity="info">
            You don't have any policies yet.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {policies.map((policy) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={policy.id}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  height: '100%',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: 'primary.main',
                        }}
                      >
                        <PolicyIcon />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                          {policy.name}
                        </Typography>
                        <Chip
                          label={`Policy #${policy.id}`}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {policy.summary}
                    </Typography>

                    <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                      {policy.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CustomerDashboard;

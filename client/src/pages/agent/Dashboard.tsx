import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  People as CustomersIcon,
  Description as PolicyIcon,
  Assignment as ClaimsIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { customerService, type Customer } from '@/services/customerService';

const AgentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await customerService.getCustomers();
        setCustomers(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const dashboardCards = [
    {
      title: 'Customers',
      description: 'Total assigned clients',
      count: loading ? '...' : customers.length.toString(),
      icon: <CustomersIcon sx={{ fontSize: 32 }} />,
      color: '#1976d2',
    },
    {
      title: 'Active Policies',
      description: 'Currently active plans',
      count: '850',
      icon: <PolicyIcon sx={{ fontSize: 32 }} />,
      color: '#9c27b0',
    },
    {
      title: 'Open Claims',
      description: 'Pending review',
      count: '12',
      icon: <ClaimsIcon sx={{ fontSize: 32 }} />,
      color: '#ed6c02',
    },
  ];

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
          Welcome, {user?.name || 'Agent'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here is what's happening with your portfolio today.
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {dashboardCards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: `${card.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    color: card.color,
                  }}
                >
                  {card.icon}
                </Box>

                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {card.count}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {card.title}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Customer List Section */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        {customers.length > 0 ? 'Your Customers' : 'Customer List'}
      </Typography>

      {customers.length === 0 ? (
        <Alert severity="info">
          No customers assigned yet.
        </Alert>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eef0f2', borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, py: 2 }}>Customer Details</TableCell>
                <TableCell sx={{ fontWeight: 600, py: 2 }}>Customer Number</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, py: 2 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40, fontSize: '0.9rem' }}>
                        {customer.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                          {customer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {customer.userNumber}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => navigate(`/agent/customers/${customer.id}/policies`)}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '10px',
                        bgcolor: '#f0f7ff',
                        color: 'primary.main',
                        '&:hover': { bgcolor: '#e0efff' }
                      }}
                    >
                      View Policies
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AgentDashboard;
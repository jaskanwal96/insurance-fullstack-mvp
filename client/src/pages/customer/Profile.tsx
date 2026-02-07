// Customer profile page

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const CustomerProfile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account information
        </Typography>
      </Box>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 600,
                mr: 3,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || <PersonIcon />}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={600}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customer Account
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email Address
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {user?.email || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Full Name
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {user?.name || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CustomerProfile;

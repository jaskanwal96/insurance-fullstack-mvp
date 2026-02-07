// Forgot password page component

import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
} from '@mui/material';
import { ROUTES } from '../../../config/routes.config';

const ForgotPassword = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0066b3 0%, #004080 100%)',
        p: 3,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Password reset page coming soon...
          </Typography>
          <Link
            href={ROUTES.LOGIN}
            sx={{
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;

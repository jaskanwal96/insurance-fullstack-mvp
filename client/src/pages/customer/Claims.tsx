// Customer claims page

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

const CustomerClaims = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          My Claims
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your insurance claims
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Your claims will be displayed here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CustomerClaims;

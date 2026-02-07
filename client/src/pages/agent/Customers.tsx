// Agent customers management page

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

const AgentCustomers = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          Customers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your customer base
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Customer list will be displayed here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AgentCustomers;

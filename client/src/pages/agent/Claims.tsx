// Agent claims management page

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

const AgentClaims = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          Claims
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Process and track insurance claims
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Claims list will be displayed here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AgentClaims;

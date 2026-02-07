import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, IconButton, Box } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { PolicyDashboardView } from '@/components/policies/PolicyDashboardView';
import { mockPolicies } from '@/data/mockPolicies'; // Replace with real API later

const AgentPolicies = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // For now, filtering mock data to simulate "User's policies"
  // In real life: const { data: policies } = useFetch(`/api/agent/customers/${userId}/policies`);
  const userPolicies = mockPolicies.slice(0, 2); 

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate(-1)}><BackIcon /></IconButton>
        <Typography variant="h4" fontWeight={700}>Customer {userId}'s Policies</Typography>
      </Box>
      
      <PolicyDashboardView 
        policies={userPolicies} 
        onPolicyClick={(id) => navigate(`/agent/policies/${id}`)} 
      />
    </Container>
  );
};

export default AgentPolicies;
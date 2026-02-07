import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { mockPolicies, searchPolicies, filterPoliciesByCategory } from '../../data/mockPolicies';
import { POLICY_CATEGORIES } from '../../types/policy';
// Import your universal component
import { PolicyDashboardView } from '@/components/policies/PolicyDashboardView';

const CustomerPolicies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Logic for filtering remains in the page controller
  const filteredPolicies = useMemo(() => {
    let result = mockPolicies;
    if (categoryFilter && categoryFilter !== 'All') {
      result = filterPoliciesByCategory(categoryFilter, result);
    }
    if (searchQuery.trim()) {
      result = searchPolicies(searchQuery, result);
    }
    return result;
  }, [searchQuery, categoryFilter]);

  const handlePolicyClick = (policyId: string) => {
    // Universal navigation logic
    navigate(`/user/policies/${policyId}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
          My Policies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your insurance policies
        </Typography>
      </Box>

      {/* Search and Filter Bar (Page Specific) */}
      <Card sx={{ mb: 4, p: 2, borderRadius: 3 }} elevation={0} variant="outlined">
        <Card sx={{ mb: 4, p: 2, borderRadius: 3 }} elevation={0} variant="outlined">
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="category-filter-label">Filter by Category</InputLabel>
                <Select
                  labelId="category-filter-label"
                  value={categoryFilter}
                  label="Filter by Category"
                  onChange={(e) => setCategoryFilter(e.target.value as string)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  {POLICY_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={{ md: 'right' }}
              >
                {filteredPolicies.length} result(s)
              </Typography>
            </Grid>
          </Grid>
        </Card>

      </Card>

      {/* Universal Component Implementation */}
      <PolicyDashboardView
        policies={filteredPolicies}
        onPolicyClick={handlePolicyClick}
      />
    </Container>
  );
};

export default CustomerPolicies;
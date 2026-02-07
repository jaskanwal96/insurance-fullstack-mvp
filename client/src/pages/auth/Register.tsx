// Registration page component

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
  CheckCircle as CheckCircleIcon,
  SupportAgent as AgentIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../../config/routes.config';

const Register = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleRoleChange = (_event: React.MouseEvent<HTMLElement>, newRole: string | null) => {
    if (newRole !== null) {
      setFormData((prev) => ({
        ...prev,
        role: newRole,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter a password');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role as 'customer' | 'agent',
    });

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  // Success Screen
  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0066b3 0%, #004c8c 50%, #003366 100%)',
          p: 3,
        }}
      >
        <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 4, textAlign: 'center' }}>
          <CardContent sx={{ p: 5 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main' }} />
            </Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Registration Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Your account has been created successfully. You can now sign in with your credentials.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              size="large"
              href={ROUTES.LOGIN}
              sx={{ py: 1.5 }}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0066b3 0%, #004c8c 50%, #003366 100%)',
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent sx={{ p: 5 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                component="img"
                src="/images/logo.png"
                alt="MetLife Logo"
                sx={{ height: 48, width: 'auto' }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none'; }}
              />
              <Typography variant="h5" fontWeight={700} color="primary">
                MetLife Insurance
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in your details to get started
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Full Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isLoading}
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Role Selection */}
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Account Type
              </Typography>
              <ToggleButtonGroup
                value={formData.role}
                exclusive
                onChange={handleRoleChange}
                fullWidth
                sx={{
                  '& .MuiToggleButton-root': {
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                  },
                  '& .Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  },
                }}
              >
                <ToggleButton value="customer">
                  <PersonIcon sx={{ mr: 1 }} />
                  Customer
                </ToggleButton>
                <ToggleButton value="agent">
                  <AgentIcon sx={{ mr: 1 }} />
                  Agent
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              disabled={isLoading}
              helperText="Must be at least 8 characters"
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" tabIndex={-1}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={isLoading}
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" tabIndex={-1}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Terms & Conditions */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{' '}
                  <Link href="#" sx={{ textDecoration: 'none' }}>Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" sx={{ textDecoration: 'none' }}>Privacy Policy</Link>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, mb: 3 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  href={ROUTES.LOGIN}
                  sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;

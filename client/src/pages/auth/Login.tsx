// Login page component

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
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../../config/routes.config';

const Login = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    console.log('🔵 Login: Attempting login...');
    const result = await login(formData.email, formData.password);
    console.log('🔵 Login: Result received:', result);

    if (result.success) {
      const role = result.user?.role;
      if (role === 'agent') {
        window.location.href = ROUTES.AGENT_DASHBOARD;
      } else {
        window.location.href = ROUTES.CUSTOMER_DASHBOARD;
      }
    } else {
      console.log('🔴 Login: Setting error:', result.error);
      setError(result.error || 'Invalid email or password');
    }
  };

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
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your account
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Error Alert */}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-message': {
                    width: '100%',
                  }
                }}
                variant="filled"
              >
                {error}
              </Alert>
            )}

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

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Options Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                variant="body2"
                sx={{ fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                mb: 3,
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Footer */}
            <Box sx={{ textAlign: 'center', pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  href={ROUTES.REGISTER}
                  sx={{ fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>

            {/* Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2.5 }}>
              <InfoIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
              <Typography variant="caption" color="text.disabled">
                Login as Customer or Agent using your registered email
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

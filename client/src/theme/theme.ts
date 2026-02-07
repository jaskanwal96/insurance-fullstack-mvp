// Material UI Theme Configuration
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066b3',
      light: '#3387d6',
      dark: '#004c8c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b7280',
      light: '#9ca3af',
      dark: '#4b5563',
    },
    error: {
      main: '#dc2626',
      light: '#f87171',
      dark: '#b91c1c',
    },
    success: {
      main: '#16a34a',
      light: '#4ade80',
      dark: '#15803d',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0066b3 0%, #004c8c 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0077cc 0%, #005599 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1f2937',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;

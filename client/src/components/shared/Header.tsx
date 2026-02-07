// Header component with navigation and logout

import { useState } from 'react';
import type React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  Container,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Description as PolicyIcon,
  Assignment as ClaimsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../../config/routes.config';

const Header = () => {
  const { user, logout, isAuthenticated, getUserRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    window.location.href = ROUTES.LOGIN;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const role = getUserRole();
  const dashboardRoute = role === 'agent' ? ROUTES.AGENT_DASHBOARD : ROUTES.CUSTOMER_DASHBOARD;

  if (!isAuthenticated) {
    return null;
  }

  const agentNavItems = [
    { label: 'Dashboard', href: ROUTES.AGENT_DASHBOARD, icon: <DashboardIcon /> },
    { label: 'Customers', href: ROUTES.AGENT_CUSTOMERS, icon: <PeopleIcon /> },
    { label: 'Policies', href: ROUTES.AGENT_POLICIES, icon: <PolicyIcon /> },
    { label: 'Claims', href: ROUTES.AGENT_CLAIMS, icon: <ClaimsIcon /> },
  ];

  const customerNavItems = [
    { label: 'Dashboard', href: ROUTES.CUSTOMER_DASHBOARD, icon: <DashboardIcon /> },
    { label: 'My Policies', href: ROUTES.CUSTOMER_POLICIES, icon: <PolicyIcon /> },
    { label: 'My Claims', href: ROUTES.CUSTOMER_CLAIMS, icon: <ClaimsIcon /> },
  ];

  const navItems = role === 'agent' ? agentNavItems : customerNavItems;

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          MetLife Insurance
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={1}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 70 }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              component="a"
              href={dashboardRoute}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 },
              }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="MetLife Logo"
                sx={{ height: 40 }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                MetLife Insurance
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component="a"
                    href={item.href}
                    sx={{
                      px: 2,
                      py: 1,
                      color: 'text.secondary',
                      fontWeight: 500,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'grey.100',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* User Menu */}
            <Box>
              <Button
                onClick={handleMenuOpen}
                sx={{
                  px: 1.5,
                  py: 1,
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    borderColor: 'grey.300',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() ?? user?.email?.charAt(0)?.toUpperCase() ?? 'U'}
                </Avatar>
                <Box sx={{ ml: 1.5, display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    {user?.name ?? 'User'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                    {role === 'agent' ? 'Agent' : 'Customer'}
                  </Typography>
                </Box>
                <ArrowDownIcon sx={{ ml: 0.5, color: 'grey.500', display: { xs: 'none', sm: 'block' } }} />
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 220,
                    borderRadius: 3,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5, bgcolor: 'grey.50' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Divider />
                {role === 'customer' && (
                  <MenuItem
                    component="a"
                    href={ROUTES.CUSTOMER_PROFILE}
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;

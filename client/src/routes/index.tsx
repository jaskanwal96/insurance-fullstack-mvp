// Main router configuration
// Define routes for auth, customer, and agent views

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes.config';
import { useAuth } from '../hooks/useAuth';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Customer pages
import CustomerDashboard from '../pages/customer/Dashboard';
import CustomerPolicies from '../pages/customer/Policies';
import PolicyDetail from '../pages/customer/PolicyDetail';
import CustomerClaims from '../pages/customer/Claims';
import CustomerProfile from '../pages/customer/Profile';

// Agent pages
import AgentDashboard from '../pages/agent/Dashboard';
<Route path="/agent/customers/:userId/policies" element={<AgentPolicies />} />
import AgentCustomers from '../pages/agent/Customers';
import AgentPolicies from '../pages/agent/Policies';
import AgentClaims from '../pages/agent/Claims';

// Shared components
import Header from '../components/shared/Header';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

const AppRoutes = () => {
  const { isAuthenticated, isLoading, getUserRole } = useAuth();

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route
            path={ROUTES.LOGIN}
            element={isAuthenticated ? <Navigate to={getUserRole() === 'agent' ? ROUTES.AGENT_DASHBOARD : ROUTES.CUSTOMER_DASHBOARD} /> : <Login />}
          />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

          {/* Customer routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
              <Route path={ROUTES.CUSTOMER_DASHBOARD} element={<CustomerDashboard />} />
              <Route path={ROUTES.CUSTOMER_POLICIES} element={<CustomerPolicies />} />
              <Route path={ROUTES.CUSTOMER_POLICY_DETAIL} element={<PolicyDetail />} />
              <Route path={ROUTES.CUSTOMER_CLAIMS} element={<CustomerClaims />} />
              <Route path={ROUTES.CUSTOMER_PROFILE} element={<CustomerProfile />} />
              {/* User routes (alias for customer) */}
              <Route path={ROUTES.USER_POLICIES} element={<CustomerPolicies />} />
              <Route path={ROUTES.USER_POLICY_DETAIL} element={<PolicyDetail />} />
            </Route>
          </Route>

          {/* Agent routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleBasedRoute allowedRoles={['agent']} />}>
              <Route path={ROUTES.AGENT_DASHBOARD} element={<AgentDashboard />} />
              <Route path={ROUTES.AGENT_CUSTOMERS} element={<AgentCustomers />} />
              <Route path={ROUTES.AGENT_POLICIES} element={<AgentPolicies />} />
              <Route path={ROUTES.AGENT_CLAIMS} element={<AgentClaims />} />
            </Route>
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRoutes;

// Role-based route wrapper
// Restricts access based on user role (customer/agent)

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../config/routes.config';

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const { getUserRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const userRole = getUserRole();

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'agent') {
      return <Navigate to={ROUTES.AGENT_DASHBOARD} replace />;
    }
    return <Navigate to={ROUTES.CUSTOMER_DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;

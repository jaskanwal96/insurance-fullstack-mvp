// Route configuration
// Define all application routes
export const ROUTES = {
    // Auth routes
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',

    // Customer routes
    CUSTOMER_DASHBOARD: '/customer/dashboard',
    CUSTOMER_POLICIES: '/customer/policies',
    CUSTOMER_POLICY_DETAIL: '/customer/policies/:id',
    CUSTOMER_CLAIMS: '/customer/claims',
    CUSTOMER_PROFILE: '/customer/profile',

    // User routes (alias for customer)
    USER_POLICIES: '/user/policies',
    USER_POLICY_DETAIL: '/user/policies/:id',

    // Agent routes
    AGENT_DASHBOARD: '/agent/dashboard',
    AGENT_CUSTOMERS: '/agent/customers',
    AGENT_CLAIMS: '/agent/claims',
    AGENT_POLICIES: '/agent/customers/:userId/policies',
} as const;


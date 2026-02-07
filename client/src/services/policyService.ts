// Policy service
// API calls for policy management

import api from './api';

export interface Policy {
    id: number;
    name: string;
    summary: string;
    details: string;
}

export const policyService = {
    /**
     * Get policies for a customer
     * For users: automatically returns their own policies
     * For agents: requires customerId parameter
     */
    async getPolicies(customerId?: number): Promise<Policy[]> {
        const params = customerId ? `?customerId=${customerId}` : '';
        return await api.get<Policy[]>(`getPolicies${params}`);
    },
};

export default policyService;

// Customer service
// API calls for customer management (agent view)

import api from './api';

export interface Customer {
    id: number;
    name: string;
    email: string;
    userNumber: string;
}

export const customerService = {
    /**
     * Get list of customers (Agent only)
     */
    async getCustomers(): Promise<Customer[]> {
        return await api.get<Customer[]>('customer');
    },
};

export default customerService;

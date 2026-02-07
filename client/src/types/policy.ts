// Policy type definitions

export type PolicyCategory = 
  | 'Life Insurance'
  | 'Motor Insurance'
  | 'Home Insurance'
  | 'Disaster Insurance'
  | 'Health Insurance'
  | 'Travel Insurance'
  | 'Business Insurance';

export interface ClaimDetail {
  id: string;
  claimNumber: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  amount: number;
  dateSubmitted: string;
  description: string;
}

export interface Policy {
  id: string;
  name: string;
  category: PolicyCategory;
  summary: string;
  details: string;
  premium: number;
  coverageAmount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  claims: ClaimDetail[];
}

export const POLICY_CATEGORIES: PolicyCategory[] = [
  'Life Insurance',
  'Motor Insurance',
  'Home Insurance',
  'Disaster Insurance',
  'Health Insurance',
  'Travel Insurance',
  'Business Insurance',
];

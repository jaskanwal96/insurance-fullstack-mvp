// Mock data for policies

import type { Policy } from '../types/policy';

export const mockPolicies: Policy[] = [
  {
    id: '1',
    name: 'MetLife Term Life Plan',
    category: 'Life Insurance',
    summary: 'Comprehensive term life insurance providing financial security for your loved ones.',
    details: `This term life insurance policy provides a death benefit to your beneficiaries if you pass away during the policy term. 
    
Key Features:
• Guaranteed death benefit of up to $500,000
• Level premiums throughout the term
• Option to convert to permanent life insurance
• Accelerated death benefit rider included
• No medical exam required for coverage up to $100,000

This policy is ideal for individuals who want affordable life insurance protection for a specific period, such as until children are grown or a mortgage is paid off.`,
    premium: 45.99,
    coverageAmount: 500000,
    startDate: '2024-01-15',
    endDate: '2034-01-15',
    status: 'active',
    claims: [
      {
        id: 'c1',
        claimNumber: 'CLM-2024-001',
        status: 'approved',
        amount: 5000,
        dateSubmitted: '2024-06-15',
        description: 'Partial benefit claim for critical illness diagnosis',
      },
    ],
  },
  {
    id: '2',
    name: 'Auto Shield Premium',
    category: 'Motor Insurance',
    summary: 'Complete auto insurance coverage for your vehicle with roadside assistance.',
    details: `Comprehensive motor insurance that covers damage to your vehicle and liability for third-party injuries and property damage.

Key Features:
• Collision coverage up to $50,000
• Comprehensive coverage for theft, vandalism, and natural disasters
• Personal injury protection
• 24/7 roadside assistance
• Rental car reimbursement
• Uninsured/underinsured motorist coverage

Additional Benefits:
• Accident forgiveness after 5 years claim-free
• Multi-vehicle discount available
• Safe driver rewards program`,
    premium: 125.50,
    coverageAmount: 50000,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    status: 'active',
    claims: [
      {
        id: 'c2',
        claimNumber: 'CLM-2024-015',
        status: 'in-review',
        amount: 3500,
        dateSubmitted: '2024-09-20',
        description: 'Windshield replacement due to road debris damage',
      },
      {
        id: 'c3',
        claimNumber: 'CLM-2024-008',
        status: 'approved',
        amount: 8200,
        dateSubmitted: '2024-05-10',
        description: 'Fender repair after minor collision in parking lot',
      },
    ],
  },
  {
    id: '3',
    name: 'Home Guardian Plus',
    category: 'Home Insurance',
    summary: 'Protect your home and belongings with our comprehensive homeowners insurance.',
    details: `Complete homeowners insurance protecting your dwelling, personal property, and providing liability coverage.

Key Features:
• Dwelling coverage up to replacement cost
• Personal property coverage at actual cash value
• Liability protection up to $300,000
• Additional living expenses if your home becomes uninhabitable
• Medical payments coverage for guest injuries

Optional Add-ons Included:
• Water backup coverage
• Identity theft protection
• Home business coverage
• Scheduled personal property for valuables`,
    premium: 189.00,
    coverageAmount: 350000,
    startDate: '2023-08-01',
    endDate: '2024-08-01',
    status: 'expired',
    claims: [],
  },
  {
    id: '4',
    name: 'Natural Disaster Shield',
    category: 'Disaster Insurance',
    summary: 'Specialized coverage for earthquakes, floods, and other natural disasters.',
    details: `Protect your property from natural disasters not typically covered by standard homeowners insurance.

Key Features:
• Earthquake damage coverage
• Flood damage protection
• Mudslide and landslide coverage
• Hurricane wind damage
• Volcanic eruption coverage

Coverage Details:
• Dwelling repair or replacement
• Personal property replacement
• Temporary relocation expenses
• Debris removal costs
• Building code upgrade coverage

Deductible options available: 2%, 5%, 10%, or 15% of dwelling coverage.`,
    premium: 78.25,
    coverageAmount: 200000,
    startDate: '2024-02-01',
    endDate: '2025-02-01',
    status: 'active',
    claims: [
      {
        id: 'c4',
        claimNumber: 'CLM-2024-022',
        status: 'pending',
        amount: 15000,
        dateSubmitted: '2024-10-05',
        description: 'Basement flooding damage from heavy rainfall',
      },
    ],
  },
  {
    id: '5',
    name: 'Family Health Shield',
    category: 'Health Insurance',
    summary: 'Comprehensive health insurance for you and your entire family.',
    details: `A complete health insurance plan covering medical, surgical, and hospitalization expenses for your entire family.

Key Features:
• Annual coverage limit of $1,000,000
• In-network and out-of-network coverage
• Preventive care at 100% coverage
• Prescription drug coverage
• Mental health and substance abuse treatment
• Maternity and newborn care

Included Benefits:
• Annual wellness visits
• Immunizations
• Cancer screenings
• Chronic disease management
• Telehealth consultations
• Emergency room coverage worldwide`,
    premium: 450.00,
    coverageAmount: 1000000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    claims: [
      {
        id: 'c5',
        claimNumber: 'CLM-2024-045',
        status: 'approved',
        amount: 1250,
        dateSubmitted: '2024-03-15',
        description: 'Annual physical examination and lab work',
      },
      {
        id: 'c6',
        claimNumber: 'CLM-2024-067',
        status: 'approved',
        amount: 3800,
        dateSubmitted: '2024-07-22',
        description: 'Outpatient surgery - minor procedure',
      },
    ],
  },
  {
    id: '6',
    name: 'Globe Trotter Travel Insurance',
    category: 'Travel Insurance',
    summary: 'Worldwide travel protection for business and leisure trips.',
    details: `Comprehensive travel insurance providing coverage for unexpected events during domestic and international trips.

Key Features:
• Trip cancellation/interruption coverage up to $10,000
• Medical emergency coverage up to $100,000
• Emergency medical evacuation
• Baggage loss/delay coverage
• 24/7 travel assistance hotline

Additional Coverage:
• Rental car damage waiver
• Flight accident coverage
• Missed connection reimbursement
• Travel delay expenses
• Personal liability abroad

Pre-existing condition coverage available with early enrollment.`,
    premium: 29.99,
    coverageAmount: 100000,
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    status: 'active',
    claims: [],
  },
  {
    id: '7',
    name: 'Small Business Protection',
    category: 'Business Insurance',
    summary: 'All-in-one insurance package designed for small business owners.',
    details: `A comprehensive business owner's policy (BOP) combining property and liability coverage for small to medium businesses.

Key Features:
• Commercial property coverage up to $500,000
• General liability coverage up to $1,000,000
• Business interruption insurance
• Equipment breakdown coverage
• Cyber liability protection

Additional Options:
• Professional liability (E&O)
• Workers' compensation
• Commercial auto coverage
• Employment practices liability
• Product liability coverage

Tailored for businesses with up to 100 employees and $5 million in annual revenue.`,
    premium: 275.00,
    coverageAmount: 500000,
    startDate: '2024-04-01',
    endDate: '2025-04-01',
    status: 'active',
    claims: [
      {
        id: 'c7',
        claimNumber: 'CLM-2024-033',
        status: 'rejected',
        amount: 25000,
        dateSubmitted: '2024-08-12',
        description: 'Property damage claim - excluded peril',
      },
    ],
  },
  {
    id: '8',
    name: 'Senior Life Whole Policy',
    category: 'Life Insurance',
    summary: 'Permanent whole life insurance with cash value accumulation for seniors.',
    details: `A whole life insurance policy providing lifelong coverage with a guaranteed death benefit and cash value component.

Key Features:
• Guaranteed lifetime coverage
• Fixed premiums that never increase
• Cash value accumulation
• Tax-deferred growth
• Dividend eligibility (participating policy)

Benefits:
• Guaranteed death benefit of $100,000
• Policy loans against cash value
• Accelerated death benefit for terminal illness
• Waiver of premium rider available
• No medical exam for ages 50-85

This policy is ideal for final expense planning, estate preservation, and leaving a legacy for loved ones.`,
    premium: 185.00,
    coverageAmount: 100000,
    startDate: '2023-11-01',
    endDate: '2099-11-01',
    status: 'active',
    claims: [],
  },
];

// Helper function to get policy by ID
export const getPolicyById = (id: string): Policy | undefined => {
  return mockPolicies.find(policy => policy.id === id);
};

// Helper function to search policies
export const searchPolicies = (query: string, policies: Policy[]): Policy[] => {
  const lowerQuery = query.toLowerCase();
  return policies.filter(
    policy =>
      policy.name.toLowerCase().includes(lowerQuery) ||
      policy.category.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to filter policies by category
export const filterPoliciesByCategory = (category: string, policies: Policy[]): Policy[] => {
  if (!category || category === 'All') {
    return policies;
  }
  return policies.filter(policy => policy.category === category);
};

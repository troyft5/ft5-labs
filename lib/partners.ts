export interface PartnerData {
  name: string
  company: string
  type: string
  tagline: string
  heroMessage: string
  incentive?: string
}

export const partnersData: Record<string, PartnerData> = {
  // Add your referral partners here. URL: /partners/[key]
  // Example: /partners/smith-cpa
  'smith-cpa': {
    name: 'John Smith',
    company: 'Smith & Associates CPA',
    type: 'CPA Firm',
    tagline: 'Your accounting team referred you to FinTech 5 because they know there\'s a better way.',
    heroMessage: 'If you\'re paying more than 2% effective rate, you\'re paying too much. Your CPA team already ran the math.',
    incentive: 'Free priority audit — 24hr turnaround for Smith & Associates clients.',
  },
  'apex-insurance': {
    name: 'Apex Insurance Group',
    company: 'Apex Insurance Group',
    type: 'Insurance Broker',
    tagline: 'Apex Insurance referred you because protecting your margins is part of their job too.',
    heroMessage: 'Reducing payment processing costs is one of the fastest ways to improve your business\'s financial health.',
    incentive: 'Priority consultation for Apex referrals — no waitlist.',
  },
  'meridian-advisors': {
    name: 'Meridian Financial Advisors',
    company: 'Meridian Financial Advisors',
    type: 'Financial Advisory',
    tagline: 'Meridian sent you here because statement optimization belongs in every financial review.',
    heroMessage: 'Most merchants don\'t know their effective rate. Meridian does — and they know you deserve better.',
  },
}

export const defaultPartner: PartnerData = {
  name: 'A Trusted Partner',
  company: 'Our Partner Network',
  type: 'Referral Partner',
  tagline: 'You were referred to FinTech 5 by someone who knows what overpaying on processing fees really costs.',
  heroMessage: 'Most businesses overpay on processing by 10–18%. The first step to fixing it is a free statement audit.',
}

export function getPartner(slug: string): PartnerData {
  return partnersData[slug] ?? defaultPartner
}

export interface PartnerData {
  name: string
  company: string
  type: string
  tagline: string
  heroMessage: string
  incentive?: string
}

export const partnersData: Record<string, PartnerData> = {
  'partner-soundcovelabs': {
    name: 'Sound Cove Labs',
    company: 'Sound Cove Labs',
    type: 'Technology Partner',
    tagline: "You're probably overpaying for payment processing right now. Sound Cove Labs sent you here because they've seen what we do for businesses like yours.",
    heroMessage: 'Book a 15-minute call. We will review your merchant statements, identify unnecessary costs, and share real-world ideas for improvement.',
  },
  'partner-black-tie-funding': {
    name: 'Black Tie Funding',
    company: 'Black Tie Funding',
    type: 'Funding Partner',
    tagline: 'Black Tie Funding sent you here because effortless, transparent payments go hand-in-hand with smart funding.',
    heroMessage: 'FinTech 5 and Black Tie Funding are working together to make a difference for merchants — one swipe at a time.',
  },
  'marc-horowitz': {
    name: 'Marc Horowitz',
    company: 'Marc Horowitz',
    type: 'Referral Partner',
    tagline: 'Marc Horowitz sent you here because he knows the difference between a fair processing rate and one that quietly drains your margin.',
    heroMessage: 'FinTech 5 is proudly working together with Marc Horowitz to make a difference for merchants one swipe at a time.',
  },
  'blueoceanmarketingco': {
    name: 'Christina Koch',
    company: 'Blue Ocean Marketing Co',
    type: 'Marketing Partner',
    tagline: 'Christina Koch at Blue Ocean Marketing Co sent you here because growing your business means protecting your margins at every layer.',
    heroMessage: 'FinTech 5 is proudly working together with Blue Ocean Marketing Co to make a difference for merchants one swipe at a time.',
  },
  'partner-ts-studio-three-49-sales-marketing': {
    name: 'Studio Three 49',
    company: 'Studio Three 49',
    type: 'Creative Partner',
    tagline: 'Studio Three 49 sent you here because the brands they build deserve a payment stack that keeps up.',
    heroMessage: 'FinTech 5 is proudly working together with Studio Three 49 to make a difference for merchants one swipe at a time.',
  },
  'partner-av-akoode': {
    name: 'Akoode',
    company: 'Akoode',
    type: 'Technology Partner',
    tagline: 'Akoode sent you here because smarter technology and smarter payment processing belong together.',
    heroMessage: 'FinTech 5 is proudly working together with Akoode to make a difference for merchants one swipe at a time.',
  },
  'partner-jg-archetypebookkeeping': {
    name: 'Archetype Bookkeeping',
    company: 'Archetype Bookkeeping',
    type: 'Bookkeeping Partner',
    tagline: 'Archetype Bookkeeping sent you here because your books look better when your processing fees are fair.',
    heroMessage: 'FinTech 5 is proudly working together with Archetype Bookkeeping to make a difference for merchants one swipe at a time.',
  },
  'partner-amazing7studios': {
    name: 'Amazing 7 Studios',
    company: 'Amazing 7 Studios',
    type: 'Creative Partner',
    tagline: 'Amazing 7 Studios sent you here because the businesses they work with deserve better than hidden processing fees.',
    heroMessage: 'FinTech 5 is proudly working together with Amazing 7 Studios to make a difference for merchants one swipe at a time.',
  },
  'partner-ap-triple-a-technologies': {
    name: 'Triple A Technologies',
    company: 'Triple A Technologies',
    type: 'Technology Partner',
    tagline: 'Triple A Technologies sent you here because every tech stack deserves a payment layer that actually works for you.',
    heroMessage: 'FinTech 5 is proudly working together with Triple A Technologies to make a difference for merchants one swipe at a time.',
  },
  'partner-mc-finding-your-way-coaching': {
    name: 'Finding Your Way Coaching',
    company: 'Finding Your Way Coaching',
    type: 'Business Coach',
    tagline: 'Finding Your Way Coaching sent you here because reducing unnecessary costs is part of building a better business.',
    heroMessage: 'FinTech 5 is proudly working together with Finding Your Way Coaching to make a difference for merchants one swipe at a time.',
  },
  'partner-nr-numanrasheed': {
    name: 'Numan Rasheed',
    company: 'Numan Rasheed',
    type: 'Referral Partner',
    tagline: 'Numan Rasheed sent you here because he knows what fair payment processing actually looks like.',
    heroMessage: 'FinTech 5 is proudly working together with Numan Rasheed to make a difference for merchants one swipe at a time.',
  },
  'partner-sa-shawonahmed': {
    name: 'Shawon Ahmed',
    company: 'Shawon Ahmed',
    type: 'Referral Partner',
    tagline: 'Shawon Ahmed sent you here because he knows the difference between a fair deal and an expensive one.',
    heroMessage: 'FinTech 5 is proudly working together with Shawon Ahmed to make a difference for merchants one swipe at a time.',
  },
  'partner-kn-norrisdesign': {
    name: 'Norris Design',
    company: 'Norris Design',
    type: 'Design Partner',
    tagline: 'Norris Design sent you here because the businesses they build deserve a payment setup that works as hard as they do.',
    heroMessage: 'FinTech 5 is proudly working together with Norris Design to make a difference for merchants one swipe at a time.',
  },
  'partner-js-sarrismarketing': {
    name: 'Sarris Marketing',
    company: 'Sarris Marketing',
    type: 'Marketing Partner',
    tagline: 'Sarris Marketing sent you here because growing businesses need every dollar working for them — not going to a processor.',
    heroMessage: 'FinTech 5 is proudly working together with Sarris Marketing to make a difference for merchants one swipe at a time.',
  },
  'partner-pfg-preferredfundinggroup': {
    name: 'Preferred Funding Group',
    company: 'Preferred Funding Group',
    type: 'Funding Partner',
    tagline: 'Preferred Funding Group sent you here because smarter funding and smarter payment processing go hand in hand.',
    heroMessage: 'FinTech 5 is proudly working together with Preferred Funding Group to make a difference for merchants one swipe at a time.',
  },
  'partner-np-m4rr': {
    name: 'Marketing 4 Real Results',
    company: 'Marketing 4 Real Results',
    type: 'Marketing Partner',
    tagline: 'Marketing 4 Real Results sent you here because real results include keeping more of what you earn.',
    heroMessage: 'FinTech 5 is proudly working together with Marketing 4 Real Results to make a difference for merchants one swipe at a time.',
  },
}

export const defaultPartner: PartnerData = {
  name: 'A Trusted Partner',
  company: 'Our Partner Network',
  type: 'Referral Partner',
  tagline: 'You were referred to FinTech 5 by someone who knows what overpaying on processing fees really costs.',
  heroMessage: 'Most businesses overpay on processing by 15–30%. The first step to fixing it is a free statement audit.',
}

// Clean aliases for future use — both old and new slugs resolve to the same partner
export const slugAliases: Record<string, string> = {
  'soundcovelabs':                  'partner-soundcovelabs',
  'black-tie-funding':              'partner-black-tie-funding',
  'blue-ocean-marketing':           'blueoceanmarketingco',
  'studio-three-49':                'partner-ts-studio-three-49-sales-marketing',
  'akoode':                         'partner-av-akoode',
  'archetype-bookkeeping':          'partner-jg-archetypebookkeeping',
  'amazing7studios':                'partner-amazing7studios',
  'triple-a-technologies':          'partner-ap-triple-a-technologies',
  'finding-your-way-coaching':      'partner-mc-finding-your-way-coaching',
  'numan-rasheed':                  'partner-nr-numanrasheed',
  'shawon-ahmed':                   'partner-sa-shawonahmed',
  'norris-design':                  'partner-kn-norrisdesign',
  'sarris-marketing':               'partner-js-sarrismarketing',
  'preferred-funding-group':        'partner-pfg-preferredfundinggroup',
  'm4rr':                           'partner-np-m4rr',
}

export function getPartner(slug: string): PartnerData {
  const resolved = slugAliases[slug] ?? slug
  return partnersData[resolved] ?? defaultPartner
}

export function getAllPartnerSlugs(): string[] {
  return Object.keys(partnersData)
}

import { getPartner, getAllPartnerSlugs } from '@/lib/partners'
import PartnerClient from './PartnerClient'

export function generateStaticParams() {
  return getAllPartnerSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const partner = getPartner(slug)
  return {
    // absolute: this title is already brand-complete ("Company × FinTech 5 | ...");
    // opt out of the root layout's `%s | FinTech 5` template so it isn't appended twice.
    title: { absolute: `${partner.company} × FinTech 5 | Free Payment Processing Audit` },
    description: `${partner.company} referred you to FinTech 5. Get a free merchant statement audit and see how much you are overpaying. No cost. No obligation.`,
    robots: { index: false, follow: false },
  }
}

export default async function PartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PartnerClient slug={slug} />
}

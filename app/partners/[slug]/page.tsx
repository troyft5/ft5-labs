import { getPartner, getAllPartnerSlugs } from '@/lib/partners'
import PartnerClient from './PartnerClient'

export function generateStaticParams() {
  return getAllPartnerSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const partner = getPartner(params.slug)
  return {
    title: `${partner.company} × FinTech 5 | Free Payment Processing Audit`,
    description: `${partner.company} referred you to FinTech 5. Get a free merchant statement audit and see how much you are overpaying. No cost. No obligation.`,
    robots: { index: false, follow: false },
  }
}

export default function PartnerPage({ params }: { params: { slug: string } }) {
  return <PartnerClient slug={params.slug} />
}

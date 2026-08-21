// Lead form is client-side. Cache the shell briefly so TTFB stays fast after deploys.
export const revalidate = 120

import { Suspense } from 'react'
import EstimatePageClient from './EstimatePageClient'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EstimatePageClient />
    </Suspense>
  )
}

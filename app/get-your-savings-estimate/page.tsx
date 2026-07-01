// This page contains a lead-capture form hitting a live external CRM — it must
// never be served as a stale cached snapshot (Next.js was caching it for up to
// a year by default, which meant real visitors could load old JS referencing
// an outdated deploy while direct API tests always hit the current server).
export const dynamic = 'force-dynamic'

import EstimatePageClient from './EstimatePageClient'

export default function Page() {
  return <EstimatePageClient />
}

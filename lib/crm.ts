/**
 * FT5 CRM client — replaces lib/hubspot.ts.
 * Calls the FT5 CRM (app.fintech5group.com), a Cloudflare Pages Function,
 * via a shared-secret server-to-server endpoint. Never called from the browser.
 */
const CRM_BASE = process.env.CRM_API_URL ?? 'https://app.fintech5group.com'

export type LeadProps = {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  businessName?: string
  industry?: string
  message?: string
  monthlyVolume?: string
  currentProcessor?: string
  hardwareType?: string
  cardMethod?: string
  createDeal?: boolean
  statementFile?: { name: string; content: string; type: string }
  sourceUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export function crmContactUrl(contactId: string) {
  // Role-agnostic — /crm/contacts/:id redirects to the right role-prefixed
  // page (agent/admin/super_admin) based on whoever actually clicks it.
  return `${CRM_BASE}/crm/contacts/${contactId}`
}

async function postLead(type: 'contact' | 'estimate' | 'newsletter', props: LeadProps): Promise<{ contactId: string | null }> {
  const key = process.env.WEBSITE_API_KEY
  if (!key) { console.warn('[crm] WEBSITE_API_KEY not set'); return { contactId: null } }

  try {
    const res = await fetch(`${CRM_BASE}/api/public/website-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Website-Key': key },
      body: JSON.stringify({
        type,
        email: props.email,
        firstName: props.firstName,
        lastName: props.lastName,
        phone: props.phone,
        businessName: props.businessName,
        industry: props.industry,
        message: props.message,
        monthlyVolume: props.monthlyVolume,
        currentProcessor: props.currentProcessor,
        hardwareType: props.hardwareType,
        cardMethod: props.cardMethod,
        createDeal: props.createDeal,
        statementFile: props.statementFile,
        source_url: props.sourceUrl,
        utm_source: props.utmSource,
        utm_medium: props.utmMedium,
        utm_campaign: props.utmCampaign,
      }),
    })
    if (!res.ok) {
      console.error('[crm] website-lead failed', res.status, await res.text().catch(() => ''))
      return { contactId: null }
    }
    const data = await res.json() as { contact_id?: string }
    return { contactId: data.contact_id ?? null }
  } catch (err) {
    console.error('[crm] website-lead error', err)
    return { contactId: null }
  }
}

/** Newsletter signup — no deal, just a contact record. */
export async function upsertContact(props: Pick<LeadProps, 'email' | 'firstName' | 'lastName'>): Promise<void> {
  await postLead('newsletter', props)
}

/** Contact form / savings estimate — creates contact (+ company, + deal). */
export async function submitLead(type: 'contact' | 'estimate', props: LeadProps): Promise<string | null> {
  const { contactId } = await postLead(type, props)
  return contactId
}

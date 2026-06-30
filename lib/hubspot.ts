const BASE = 'https://api.hubapi.com'

type ContactProps = {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  company?: string
  lifecyclestage?: 'subscriber' | 'lead' | 'opportunity' | 'customer'
  hs_lead_status?: string
}

export async function upsertContact(props: ContactProps): Promise<void> {
  const token = process.env.HUBSPOT_TOKEN
  if (!token) {
    console.warn('[hubspot] HUBSPOT_TOKEN not set — skipping CRM push')
    return
  }

  const properties: Record<string, string> = {}
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined && v !== '') properties[k] = v
  }

  const res = await fetch(`${BASE}/crm/v3/objects/contacts/batch/upsert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      inputs: [{ idProperty: 'email', id: props.email, properties }],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[hubspot] upsert failed', res.status, body)
  }
}

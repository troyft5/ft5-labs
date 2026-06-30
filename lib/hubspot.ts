const BASE = 'https://api.hubapi.com'

export type ContactProps = {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  company?: string
  industry?: string
  message?: string
  lifecyclestage?: 'subscriber' | 'lead' | 'opportunity' | 'customer'
  hs_lead_status?: string
  monthly_processing_volume?: string
  current_processor?: string
  hardware_type?: string
  card_acceptance_method?: string
}

const CUSTOM_PROPERTIES = [
  { name: 'monthly_processing_volume', label: 'Monthly Processing Volume', type: 'string', fieldType: 'text' },
  { name: 'current_processor',         label: 'Current Processor',          type: 'string', fieldType: 'text' },
  { name: 'hardware_type',             label: 'Hardware / Terminal Type',   type: 'string', fieldType: 'text' },
  {
    name: 'card_acceptance_method', label: 'Card Acceptance Method', type: 'enumeration', fieldType: 'select',
    options: [
      { label: 'In-Person', value: 'in-person', displayOrder: 0 },
      { label: 'Online',    value: 'online',    displayOrder: 1 },
      { label: 'Both',      value: 'both',      displayOrder: 2 },
    ],
  },
]

let propertiesReady = false

async function ensureProperties(tok: string): Promise<void> {
  if (propertiesReady) return
  await Promise.all(
    CUSTOM_PROPERTIES.map(async (def) => {
      const check = await fetch(`${BASE}/crm/v3/properties/contacts/${def.name}`, {
        headers: { Authorization: `Bearer ${tok}` },
      })
      if (check.ok) return
      await fetch(`${BASE}/crm/v3/properties/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` },
        body: JSON.stringify({ ...def, groupName: 'contactinformation' }),
      })
    })
  )
  propertiesReady = true
}

export async function upsertContact(props: ContactProps): Promise<void> {
  const tok = process.env.HUBSPOT_TOKEN
  if (!tok) {
    console.warn('[hubspot] HUBSPOT_TOKEN not set — skipping CRM push')
    return
  }

  await ensureProperties(tok)

  const properties: Record<string, string> = {}
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined && v !== '') properties[k] = v
  }

  const res = await fetch(`${BASE}/crm/v3/objects/contacts/batch/upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` },
    body: JSON.stringify({
      inputs: [{ idProperty: 'email', id: props.email, properties }],
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[hubspot] upsert failed', res.status, body)
  }
}

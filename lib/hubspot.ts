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
  // custom properties (created via setupHubSpotProperties)
  monthly_processing_volume?: string
  current_processor?: string
  hardware_type?: string
  card_acceptance_method?: string
}

function token() {
  return process.env.HUBSPOT_TOKEN
}

export async function upsertContact(props: ContactProps): Promise<void> {
  const tok = token()
  if (!tok) {
    console.warn('[hubspot] HUBSPOT_TOKEN not set — skipping CRM push')
    return
  }

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

type PropertyDef = {
  name: string
  label: string
  type: string
  fieldType: string
  groupName: string
  options?: { label: string; value: string; displayOrder: number }[]
}

async function createProperty(tok: string, def: PropertyDef): Promise<void> {
  const check = await fetch(`${BASE}/crm/v3/properties/contacts/${def.name}`, {
    headers: { Authorization: `Bearer ${tok}` },
  })
  if (check.ok) return // already exists

  const res = await fetch(`${BASE}/crm/v3/properties/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` },
    body: JSON.stringify(def),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[hubspot] create property failed', def.name, res.status, body)
  } else {
    console.log('[hubspot] created property:', def.name)
  }
}

export async function setupHubSpotProperties(): Promise<void> {
  const tok = token()
  if (!tok) {
    console.warn('[hubspot] HUBSPOT_TOKEN not set — skipping property setup')
    return
  }

  const props: PropertyDef[] = [
    {
      name: 'monthly_processing_volume',
      label: 'Monthly Processing Volume',
      type: 'string',
      fieldType: 'text',
      groupName: 'contactinformation',
    },
    {
      name: 'current_processor',
      label: 'Current Processor',
      type: 'string',
      fieldType: 'text',
      groupName: 'contactinformation',
    },
    {
      name: 'hardware_type',
      label: 'Hardware / Terminal Type',
      type: 'string',
      fieldType: 'text',
      groupName: 'contactinformation',
    },
    {
      name: 'card_acceptance_method',
      label: 'Card Acceptance Method',
      type: 'enumeration',
      fieldType: 'select',
      groupName: 'contactinformation',
      options: [
        { label: 'In-Person', value: 'in-person', displayOrder: 0 },
        { label: 'Online', value: 'online', displayOrder: 1 },
        { label: 'Both', value: 'both', displayOrder: 2 },
      ],
    },
  ]

  await Promise.all(props.map(p => createProperty(tok, p)))
}

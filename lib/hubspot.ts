const BASE       = 'https://api.hubapi.com'
const PORTAL_ID  = '47439115'
const PIPELINE   = 'default'       // FinTech 5 Client Acquisition pipeline
const STAGE_LEADS = '249977987'    // Leads (first stage)
const OWNER_ID   = '1137717668'   // Troy Maceira

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

// ── custom properties (auto-created on first submission) ──────────────────────

const CUSTOM_CONTACT_PROPS = [
  { name: 'monthly_processing_volume', label: 'Monthly Processing Volume', type: 'string',      fieldType: 'text'   },
  { name: 'current_processor',         label: 'Current Processor',          type: 'string',      fieldType: 'text'   },
  { name: 'hardware_type',             label: 'Hardware / Terminal Type',   type: 'string',      fieldType: 'text'   },
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
    CUSTOM_CONTACT_PROPS.map(async (def) => {
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

// ── helpers ───────────────────────────────────────────────────────────────────

function auth(tok: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}` }
}

export function contactUrl(contactId: string) {
  return `https://app.hubspot.com/contacts/${PORTAL_ID}/contact/${contactId}`
}

async function upsertContactRecord(tok: string, props: ContactProps): Promise<string | null> {
  const properties: Record<string, string> = { hubspot_owner_id: OWNER_ID }
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined && v !== '') properties[k] = v
  }

  const res = await fetch(`${BASE}/crm/v3/objects/contacts/batch/upsert`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({ inputs: [{ idProperty: 'email', id: props.email, properties }] }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[hubspot] contact upsert failed', res.status, body)
    return null
  }

  const data = await res.json() as { results?: { id: string }[] }
  return data.results?.[0]?.id ?? null
}

async function findOrCreateCompany(tok: string, name: string, phone?: string): Promise<string | null> {
  const search = await fetch(`${BASE}/crm/v3/objects/companies/search`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'name', operator: 'EQ', value: name }] }],
      properties: ['name'],
      limit: 1,
    }),
  })

  if (search.ok) {
    const data = await search.json() as { results?: { id: string }[] }
    if (data.results && data.results.length > 0) return data.results[0].id
  }

  const props: Record<string, string> = { name }
  if (phone) props.phone = phone

  const create = await fetch(`${BASE}/crm/v3/objects/companies`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({ properties: props }),
  })

  if (!create.ok) {
    const body = await create.text().catch(() => '')
    console.error('[hubspot] company create failed', create.status, body)
    return null
  }

  const data = await create.json() as { id: string }
  return data.id ?? null
}

async function associateContactToCompany(tok: string, contactId: string, companyId: string): Promise<void> {
  await fetch(`${BASE}/crm/v3/associations/contacts/companies/batch/create`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({
      inputs: [{ from: { id: contactId }, to: { id: companyId }, type: 'contact_to_company' }],
    }),
  })
}

async function uploadFile(tok: string, file: { name: string; content: string; type: string }): Promise<string | null> {
  try {
    const buffer = Buffer.from(file.content, 'base64')
    const blob = new Blob([buffer], { type: file.type })
    const form = new FormData()
    form.append('file', blob, file.name)
    form.append('options', JSON.stringify({ access: 'PRIVATE', overwrite: false, duplicateValidationStrategy: 'NONE', duplicateValidationScope: 'ENTIRE_PORTAL' }))
    form.append('folderPath', '/ft5-statements')

    const res = await fetch(`${BASE}/files/v3/files`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tok}` },
      body: form,
    })
    if (!res.ok) {
      const err = await res.text().catch(() => '')
      console.error('[hubspot] file upload failed', res.status, err)
      return null
    }
    const data = await res.json() as { id: string; url?: string }
    return data.url ?? `https://app.hubspot.com/files/${PORTAL_ID}/file/${data.id}`
  } catch (err) {
    console.error('[hubspot] file upload error', err)
    return null
  }
}

async function logEmail(tok: string, contactId: string, companyId: string | null, subject: string, body: string): Promise<void> {
  const associations = [
    { to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 197 }] },
    ...(companyId ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 185 }] }] : []),
  ]
  const res = await fetch(`${BASE}/crm/v3/objects/emails`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({
      properties: {
        hs_email_direction: 'EMAIL',
        hs_email_status: 'SENT',
        hs_email_subject: subject,
        hs_email_body: body,
        hs_timestamp: new Date().toISOString(),
      },
      associations,
    }),
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    console.error('[hubspot] email log failed', res.status, err)
  }
}

async function createNote(tok: string, contactId: string, companyId: string | null, body: string): Promise<void> {
  const associations = [
    { to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] },
    ...(companyId ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 190 }] }] : []),
  ]
  const res = await fetch(`${BASE}/crm/v3/objects/notes`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({
      properties: { hs_note_body: body, hs_timestamp: new Date().toISOString() },
      associations,
    }),
  })
  if (!res.ok) {
    const err = await res.text().catch(() => '')
    console.error('[hubspot] note create failed', res.status, err)
  }
}

async function createDeal(tok: string, dealName: string, contactId: string, companyId: string | null, volume?: string): Promise<void> {
  const closeDate = new Date()
  closeDate.setDate(closeDate.getDate() + 30)

  const associations = [
    { to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] },
    ...(companyId ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 5 }] }] : []),
  ]

  const properties: Record<string, string> = {
    dealname:  dealName,
    pipeline:  PIPELINE,
    dealstage: STAGE_LEADS,
    closedate: closeDate.toISOString(),
  }
  if (volume) properties.description = `Monthly volume: ${volume}`

  const res = await fetch(`${BASE}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: auth(tok),
    body: JSON.stringify({ properties, associations }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error('[hubspot] deal create failed', res.status, body)
  }
}

// ── public API ────────────────────────────────────────────────────────────────

export async function upsertContact(props: ContactProps): Promise<void> {
  const tok = process.env.HUBSPOT_TOKEN
  if (!tok) { console.warn('[hubspot] HUBSPOT_TOKEN not set'); return }
  await ensureProperties(tok)
  await upsertContactRecord(tok, props)
}

export async function submitLead(props: ContactProps & { businessName?: string; createDeal?: boolean; statementFile?: { name: string; content: string; type: string } }): Promise<string | null> {
  const tok = process.env.HUBSPOT_TOKEN
  if (!tok) { console.warn('[hubspot] HUBSPOT_TOKEN not set'); return null }

  await ensureProperties(tok)

  const { businessName, createDeal: shouldCreateDeal, statementFile, ...contactProps } = props
  if (businessName) contactProps.company = businessName

  const contactId = await upsertContactRecord(tok, contactProps)
  if (!contactId) return null

  let companyId: string | null = null
  if (businessName) {
    companyId = await findOrCreateCompany(tok, businessName, props.phone)
    if (companyId) await associateContactToCompany(tok, contactId, companyId)
  }

  if (shouldCreateDeal) {
    const dealName = businessName
      ? `${businessName} — Savings Estimate`
      : `${props.firstname || props.email} — Contact`
    await createDeal(tok, dealName, contactId, companyId, props.monthly_processing_volume)
  }

  const fileUrl = statementFile ? await uploadFile(tok, statementFile) : null

  const noteLines = [
    `<b>Submission Details</b>`,
    `Email: ${props.email}`,
    props.phone                     ? `Phone: ${props.phone}` : null,
    businessName                    ? `Business: ${businessName}` : null,
    props.industry                  ? `Industry: ${props.industry}` : null,
    props.monthly_processing_volume ? `Monthly Volume: ${props.monthly_processing_volume}` : null,
    props.current_processor         ? `Current Processor: ${props.current_processor}` : null,
    props.hardware_type             ? `Hardware / Terminal: ${props.hardware_type}` : null,
    props.card_acceptance_method    ? `Card Method: ${props.card_acceptance_method}` : null,
    props.message                   ? `Message: ${props.message}` : null,
    fileUrl                         ? `Statement: <a href="${fileUrl}">${statementFile!.name}</a>` : null,
  ].filter(Boolean).join('<br>')

  const emailSubject = businessName
    ? `New Savings Estimate Request — ${businessName}`
    : `New Contact — ${props.firstname || props.email}`

  await Promise.all([
    createNote(tok, contactId, companyId, noteLines),
    logEmail(tok, contactId, companyId, emailSubject, noteLines),
  ])

  return contactId
}

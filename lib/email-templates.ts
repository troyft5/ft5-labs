/**
 * Shared HTML email templates — table/inline-style only (Outlook-safe, no
 * flexbox/grid). Two shapes: confirmationEmail (visitor-facing, dark/brand
 * theme) and internalNotificationEmail (agent-facing, light "document" theme
 * for fast scanning). Both routes through here so contact/estimate/future
 * forms stay visually consistent instead of drifting into copy-pasted HTML.
 */

const GREEN = '#4e9000'
const GREEN_BRIGHT = '#16a34a'
const BG = '#0a1208'

const WORDMARK_DARK = `<span style="font-size:22px;font-weight:900;font-style:italic;color:#ffffff;letter-spacing:-0.5px">Fin<span style="color:#6fc200">Tech</span> 5</span>`

function esc(s: string) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// ── Visitor-facing confirmation ──────────────────────────────────────────

export function confirmationEmail(opts: {
  firstName: string
  heading: string
  body: string
  stepsTitle: string
  steps: string[]
}) {
  const { firstName, heading, body, stepsTitle, steps } = opts
  // Steps are authored HTML (links); do not escape.
  const stepsHtml = steps.map((s, i) => `
    <tr>
      <td width="28" valign="top" style="padding:0 10px 14px 0">
        <table cellpadding="0" cellspacing="0" width="22" height="22" style="background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.3);border-radius:50%">
          <tr><td align="center" style="font-size:11px;font-weight:900;color:${GREEN_BRIGHT}">${i + 1}</td></tr>
        </table>
      </td>
      <td style="padding:0 0 14px;font-size:13px;color:#475569;line-height:1.5">${s}</td>
    </tr>
  `).join('')

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG}">
    <tr><td style="padding:20px 30px">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>${WORDMARK_DARK}</td>
        <td align="right" style="font-size:10px;font-weight:800;color:#6fc200;text-transform:uppercase;letter-spacing:0.14em">✓ Received</td>
      </tr></table>
    </td></tr>
  </table>
  <div style="background:linear-gradient(135deg,#f0fdf4,#ffffff);border-bottom:1px solid #dcfce7;padding:26px 30px 22px">
    <h1 style="font-size:24px;font-weight:900;margin:0;color:#0f172a;line-height:1.25">${esc(heading)}</h1>
  </div>
  <div style="padding:22px 30px 30px">
    <p style="color:#64748b;line-height:1.65;margin:0 0 24px;font-size:14px">${body}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:24px">
      <tr><td style="padding:20px 22px">
        <p style="margin:0 0 14px;font-size:11px;font-weight:800;color:${GREEN_BRIGHT};text-transform:uppercase;letter-spacing:0.12em">${esc(stepsTitle)}</p>
        <table cellpadding="0" cellspacing="0">${stepsHtml}</table>
      </td></tr>
    </table>

    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:10px">
        <a href="https://fintech5group.com" style="display:inline-block;background:${GREEN};color:#ffffff;font-weight:800;font-size:13.5px;padding:13px 26px;border-radius:9px;text-decoration:none">Visit FinTech 5</a>
      </td>
      <td>
        <a href="tel:7323001072" style="display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;color:#334155;font-weight:700;font-size:13.5px;padding:13px 22px;border-radius:9px;text-decoration:none">Call (732) 300-1072</a>
      </td>
    </tr></table>
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-top:1px solid #e2e8f0">
    <tr><td style="padding:16px 30px">
      <p style="margin:0;font-size:10.5px;color:#94a3b8;letter-spacing:0.02em">
        No consulting fees ever &nbsp;·&nbsp; No obligation to switch &nbsp;·&nbsp; Response within 1 business day
      </p>
      <p style="margin:8px 0 0;font-size:10.5px;color:#94a3b8">
        FinTech 5 Group · info@fintech5group.com · (732) 300-1072<br>
        Hi ${esc(firstName)} — you're receiving this because you reached out through fintech5group.com.
      </p>
    </td></tr>
  </table>
</div>`
}

// ── Internal agent notification ──────────────────────────────────────────

export function internalNotificationEmail(opts: {
  category: string          // e.g. "New Contact", "Savings Estimate Request"
  headline: string          // e.g. business name or contact name
  rows: Array<{ label: string; value: string; highlight?: boolean }>
  crmUrl?: string | null
  replyToEmail?: string
}) {
  const { category, headline, rows, crmUrl, replyToEmail } = opts
  const rowsHtml = rows.map(r => `
    <tr>
      <td style="padding:13px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:36%;font-size:12.5px;vertical-align:top">${esc(r.label)}</td>
      <td style="padding:13px 0;border-bottom:1px solid #f1f5f9;font-weight:${r.highlight ? 800 : 600};color:${r.highlight ? '#15803d' : '#0f172a'};font-size:${r.highlight ? '15px' : '13.5px'}">${r.value}</td>
    </tr>
  `).join('')

  const buttons = [
    crmUrl ? `<a href="${crmUrl}" style="display:inline-block;background:${GREEN};color:#ffffff;font-weight:800;font-size:12.5px;padding:11px 22px;border-radius:9px;text-decoration:none;margin-right:8px">Open in FT5 CRM →</a>` : '',
    replyToEmail ? `<a href="mailto:${esc(replyToEmail)}" style="display:inline-block;background:#f1f5f9;color:#334155;font-weight:700;font-size:12.5px;padding:11px 20px;border-radius:9px;text-decoration:none">Reply directly</a>` : '',
  ].filter(Boolean).join('')

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG}">
    <tr><td style="padding:20px 30px">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td>${WORDMARK_DARK}</td>
        <td align="right" style="font-size:10px;font-weight:800;color:#6fc200;text-transform:uppercase;letter-spacing:0.14em">New Activity</td>
      </tr></table>
    </td></tr>
  </table>
  <div style="background:linear-gradient(135deg,#f0fdf4,#ffffff);border-bottom:1px solid #dcfce7;padding:22px 30px">
    <p style="margin:0;font-size:10.5px;font-weight:800;color:#15803d;text-transform:uppercase;letter-spacing:0.12em">${esc(category)}</p>
    <p style="margin:6px 0 0;font-size:23px;font-weight:900;color:#0f1a0f;line-height:1.2">${esc(headline)}</p>
  </div>
  <div style="padding:6px 30px 26px">
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${rowsHtml}</table>
    ${buttons ? `<div style="margin-top:22px">${buttons}</div>` : ''}
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-top:1px solid #e2e8f0">
    <tr><td style="padding:14px 30px">
      <p style="margin:0;font-size:10.5px;color:#94a3b8">FinTech 5 Group · Internal Notification · fintech5group.com</p>
    </td></tr>
  </table>
</div>`
}

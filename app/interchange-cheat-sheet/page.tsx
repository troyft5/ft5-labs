import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026 Interchange Rate Cheat Sheet | FinTech 5',
  description: 'The exact rates Visa and Mastercard charge — before your processor marks them up.',
  robots: { index: false },
}

const visaRates = [
  { type: 'CPS Retail (Chip/Tap)',          rate: '1.51% + $0.10', notes: 'Card present, PIN or tap' },
  { type: 'CPS Retail (Swiped)',             rate: '1.51% + $0.10', notes: 'Magnetic stripe, card present' },
  { type: 'CPS Key-Entered',                rate: '1.80% + $0.10', notes: 'Card present, manually keyed' },
  { type: 'Card-Not-Present',               rate: '1.80% + $0.10', notes: 'E-commerce, phone orders' },
  { type: 'CPS Hotel / Car Rental',         rate: '1.54% + $0.10', notes: 'Lodging & auto industry' },
  { type: 'Rewards Card (Retail)',          rate: '1.65% + $0.10', notes: 'Consumer rewards, card present' },
  { type: 'Rewards Card (CNP)',             rate: '1.95% + $0.10', notes: 'Consumer rewards, card-not-present' },
  { type: 'Signature Preferred (Retail)',   rate: '2.10% + $0.10', notes: 'High-tier consumer rewards' },
  { type: 'Signature Preferred (CNP)',      rate: '2.40% + $0.10', notes: 'High-tier rewards, e-commerce' },
  { type: 'Business Card (Retail)',         rate: '2.20% + $0.10', notes: 'Commercial/business cards' },
  { type: 'Business Card (CNP)',            rate: '2.50% + $0.10', notes: 'Business cards, card-not-present' },
  { type: 'Corporate / Purchasing Card',   rate: '2.65% + $0.10', notes: 'Large B2B purchasing cards' },
  { type: 'Debit (Regulated / PIN)',        rate: '0.05% + $0.22', notes: 'Banks >$10B assets, PIN debit' },
  { type: 'Debit (Regulated / Sig)',        rate: '0.05% + $0.22', notes: 'Banks >$10B assets, signature' },
  { type: 'Debit (Unregulated / PIN)',      rate: '1.15% + $0.15', notes: 'Small bank / credit union debit' },
]

const mastercardRates = [
  { type: 'Merit I (Card Present)',         rate: '1.48% + $0.10', notes: 'Basic consumer, chip/swipe' },
  { type: 'Merit III (Retail)',             rate: '1.58% + $0.10', notes: 'Qualified retail, card present' },
  { type: 'Electronic (CNP)',               rate: '1.73% + $0.10', notes: 'Standard e-commerce' },
  { type: 'World Card (Retail)',            rate: '1.82% + $0.10', notes: 'World/World Elite, card present' },
  { type: 'World Card (CNP)',               rate: '2.20% + $0.10', notes: 'World/World Elite, e-commerce' },
  { type: 'World Elite (Retail)',           rate: '2.00% + $0.10', notes: 'Top-tier consumer rewards' },
  { type: 'World Elite (CNP)',              rate: '2.50% + $0.10', notes: 'Top-tier rewards, card-not-present' },
  { type: 'Business Card (Retail)',         rate: '2.05% + $0.10', notes: 'Commercial cards, card present' },
  { type: 'Business Card (CNP)',            rate: '2.65% + $0.10', notes: 'Commercial cards, e-commerce' },
  { type: 'Corporate / Purchasing Card',   rate: '2.65% + $0.10', notes: 'Large B2B / government purchasing' },
  { type: 'Debit (Regulated / PIN)',        rate: '0.05% + $0.22', notes: 'Banks >$10B assets' },
  { type: 'Debit (Unregulated)',            rate: '1.05% + $0.15', notes: 'Small bank / credit union debit' },
]

const redFlags = [
  { flag: 'Effective rate > 3%',           why: 'Anything above 2.8% for a mixed card volume is being padded — either tiered buckets or a fat processor margin.' },
  { flag: 'Flat-rate pricing',             why: '"2.6% + $0.10 on everything" sounds simple but costs you on debit and cheap consumer cards where true interchange is under 1.6%.' },
  { flag: 'Tiered pricing (Qual/Mid/Non)', why: 'Processors classify cards into buckets and profit on the spread. Rewards and CNP cards get dumped in the expensive Non-Qual tier.' },
  { flag: 'Monthly minimum fees',          why: 'A processor charging a "monthly minimum" is penalizing low-volume months. IC+ has no minimums.' },
  { flag: 'PCI non-compliance fee',        why: 'Legitimate processors charge PCI compliance — not non-compliance. Non-compliance fees are manufactured revenue.' },
  { flag: 'Equipment lease / rental',      why: 'A $49/month terminal lease over 4 years = $2,352 for a $300 machine. FinTech 5 provides hardware free.' },
  { flag: 'Early termination fee',         why: 'No reputable IC+ processor needs to trap you with a contract penalty. Exit clauses signal a bad deal.' },
]

export default function InterchangeCheatSheet() {
  return (
    <div className="cheatsheet-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cheatsheet-page {
          font-family: 'Inter', system-ui, sans-serif;
          background: #fff;
          color: #0f172a;
          min-height: 100vh;
        }

        .sheet {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        /* ── Header ── */
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          padding-bottom: 28px;
          border-bottom: 3px solid #4e9000;
          margin-bottom: 36px;
        }
        .logo-text {
          font-size: 22px;
          font-weight: 900;
          font-style: italic;
          color: #0f1a0f;
          letter-spacing: -0.5px;
        }
        .logo-text span { color: #4e9000; }
        .header-title h1 {
          font-size: 30px;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .header-title p {
          font-size: 13px;
          color: #64748b;
        }
        .badge {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
          white-space: nowrap;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── Section ── */
        .section { margin-bottom: 36px; }
        .section-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #4e9000;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        /* ── Tables ── */
        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        th {
          background: #0f1a0f;
          color: #fff;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 8px 12px;
          text-align: left;
        }
        th:last-child { color: #94a3b8; }
        tr:nth-child(even) td { background: #f8fafc; }
        td {
          padding: 8px 12px;
          border-bottom: 1px solid #f1f5f9;
          color: #1e293b;
          vertical-align: top;
        }
        td.rate {
          font-weight: 700;
          color: #15803d;
          white-space: nowrap;
        }
        td.notes { color: #64748b; font-size: 11.5px; }

        /* ── Red flags ── */
        .flags { display: grid; gap: 10px; }
        .flag-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 16px;
          align-items: start;
          padding: 12px 14px;
          border-radius: 8px;
          background: #fff8f8;
          border: 1px solid #fecaca;
        }
        .flag-label {
          font-weight: 700;
          font-size: 12.5px;
          color: #dc2626;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .flag-label::before { content: '⚑'; font-size: 11px; margin-top: 1px; }
        .flag-why { font-size: 12px; color: #475569; line-height: 1.5; }

        /* ── Explainer box ── */
        .explainer {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-left: 4px solid #4e9000;
          border-radius: 8px;
          padding: 16px 18px;
          margin-bottom: 36px;
        }
        .explainer h4 { font-size: 13px; font-weight: 700; color: #15803d; margin-bottom: 6px; }
        .explainer p { font-size: 12.5px; color: #334155; line-height: 1.6; }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: #94a3b8;
        }
        .footer strong { color: #4e9000; }

        /* ── CTA ── */
        .cta-box {
          background: #0f1a0f;
          border-radius: 12px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }
        .cta-box h4 { color: #fff; font-size: 15px; font-weight: 900; margin-bottom: 4px; }
        .cta-box p { color: #94a3b8; font-size: 12px; }
        .cta-box a {
          background: #4e9000;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
        }

        @media print {
          .cheatsheet-page { background: #fff; }
          .sheet { padding: 24px; }
          .no-print { display: none !important; }
          @page { margin: 0.6in; size: letter; }
        }

        @media (max-width: 640px) {
          .sheet { padding: 24px 16px; }
          .header { flex-direction: column; }
          .flag-row { grid-template-columns: 1fr; }
          .cta-box { flex-direction: column; }
        }
      `}</style>

      <div className="sheet">

        {/* Header */}
        <div className="header">
          <div>
            <div className="logo-text">Fin<span>Tech</span> 5</div>
          </div>
          <div className="header-title">
            <h1>2026 Interchange Rate Cheat Sheet</h1>
            <p>The exact rates Visa &amp; Mastercard charge — before your processor marks them up.</p>
          </div>
          <div className="badge">Free Guide</div>
        </div>

        {/* Explainer */}
        <div className="explainer">
          <h4>What is interchange?</h4>
          <p>
            Interchange is the fee paid to the card-issuing bank every time a card is used. It is set by Visa and Mastercard — not your processor.
            Your processor pays interchange and then charges <em>you</em> interchange plus their own markup. On Interchange+ (IC+) pricing,
            those two numbers are disclosed separately. On flat-rate or tiered pricing, they are blended — and the processor profits on the spread.
            The rates below are the <strong>baseline costs</strong>. If your effective rate is materially higher, your processor is keeping the difference.
          </p>
        </div>

        {/* Visa Table */}
        <div className="section">
          <div className="section-label">Visa — Key Interchange Categories</div>
          <table>
            <thead>
              <tr>
                <th>Card / Transaction Type</th>
                <th>Interchange Rate</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {visaRates.map((r, i) => (
                <tr key={i}>
                  <td>{r.type}</td>
                  <td className="rate">{r.rate}</td>
                  <td className="notes">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mastercard Table */}
        <div className="section">
          <div className="section-label">Mastercard — Key Interchange Categories</div>
          <table>
            <thead>
              <tr>
                <th>Card / Transaction Type</th>
                <th>Interchange Rate</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {mastercardRates.map((r, i) => (
                <tr key={i}>
                  <td>{r.type}</td>
                  <td className="rate">{r.rate}</td>
                  <td className="notes">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Red Flags */}
        <div className="section">
          <div className="section-label">7 Red Flags on Your Statement</div>
          <div className="flags">
            {redFlags.map((f, i) => (
              <div key={i} className="flag-row">
                <div className="flag-label">{f.flag}</div>
                <div className="flag-why">{f.why}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-box no-print">
          <div>
            <h4>Ready to see your actual effective rate?</h4>
            <p>Upload your merchant statement — we return a full audit with competitive bids in the same day. Free.</p>
          </div>
          <a href="/get-your-savings-estimate">Get Free Audit →</a>
        </div>

        {/* Footer */}
        <div className="footer">
          <div>© 2026 FinTech 5 Group · <strong>fintech5group.com</strong> · (646) 941-7853</div>
          <div>Rates are approximate. Actual interchange varies by card type, industry, and transaction data quality.</div>
        </div>

      </div>
    </div>
  )
}

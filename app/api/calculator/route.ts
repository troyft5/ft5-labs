import { NextRequest, NextResponse } from 'next/server'

// ─── DATA TABLES (server-only — never sent to client) ───────────────────────

const INDUSTRIES: Record<string, {
  name: string
  avgRate: { low: number; mid: number; high: number }
  avgTicket: number
  debitMix: number
  netMargin: number
  dpFit: string
  dpNote: string
  intel: string[]
}> = {
  retail:    { name:'Retail / In-Store',         avgRate:{low:2.2,mid:2.5,high:2.9}, avgTicket:45,   debitMix:35, netMargin:2.5,  dpFit:'good',     dpNote:'Retail is an excellent fit — customers already expect cash and card pricing.',              intel:['debit_pin','seasonal_volume'] },
  restaurant:{ name:'Restaurant / Food Service', avgRate:{low:2.4,mid:2.7,high:3.1}, avgTicket:35,   debitMix:30, netMargin:4.0,  dpFit:'moderate', dpNote:'Works well, but tip adjustment rules require careful implementation to avoid downgrades.',  intel:['tip_downgrade','amex_rates'] },
  ecommerce: { name:'E-Commerce / Online',       avgRate:{low:2.7,mid:3.1,high:3.5}, avgTicket:85,   debitMix:20, netMargin:6.5,  dpFit:'poor',     dpNote:"Dual pricing doesn't work online — no cash option available. Focus on IC+ optimization.", intel:['avs_savings','level2_cnp','chargeback_rates'] },
  service:   { name:'Professional Services',     avgRate:{low:2.4,mid:2.8,high:3.2}, avgTicket:250,  debitMix:15, netMargin:17.0, dpFit:'good',     dpNote:'Excellent fit — clients on larger invoices readily understand card convenience fees.',       intel:['ach_alternative','level2_cnp'] },
  healthcare:{ name:'Healthcare / Medical',      avgRate:{low:2.3,mid:2.6,high:3.0}, avgTicket:150,  debitMix:25, netMargin:7.5,  dpFit:'moderate', dpNote:'Works well for copays, but insurance-funded transactions require careful handling.',         intel:['fsa_hsa','healthcare_mcc'] },
  b2b:       { name:'B2B / Wholesale',           avgRate:{low:2.0,mid:2.4,high:2.8}, avgTicket:1500, debitMix:5,  netMargin:12.0, dpFit:'good',     dpNote:'Strong fit — B2B buyers expect and understand convenience fees on large purchases.',        intel:['level2','level3','ach_alternative'] },
  gas:       { name:'Gas Station / Convenience', avgRate:{low:2.0,mid:2.3,high:2.6}, avgTicket:40,   debitMix:45, netMargin:2.0,  dpFit:'good',     dpNote:'Customers are highly familiar with cash vs card pricing at the pump and counter.',         intel:['fleet_cards','debit_routing','regulated_debit'] },
  education: { name:'Education',                 avgRate:{low:2.3,mid:2.6,high:3.0}, avgTicket:500,  debitMix:20, netMargin:8.0,  dpFit:'moderate', dpNote:'Verify state regulations and card network rules before implementing surcharge programs.',    intel:['convenience_fee','level2_cnp'] },
  other:     { name:'Other',                     avgRate:{low:2.4,mid:2.7,high:3.1}, avgTicket:75,   debitMix:30, netMargin:8.0,  dpFit:'moderate', dpNote:'Fit depends on your business model and ability to offer a cash payment alternative.',        intel:[] },
}

const INTEL_TIPS: Record<string, { title: string; body: string; badge: string }> = {
  debit_pin:        { title:'PIN Debit Routing Opportunity',           body:'Many retailers are overpaying on debit by not leveraging PIN debit routing. PIN debit routes over EFT networks (STAR, PULSE, NYCE) at flat fees vs. percentage-based interchange — often saving $0.10-0.30 per transaction.',                                                     badge:'Save $0.10-0.30/tx' },
  seasonal_volume:  { title:'Volume Tiering Negotiation',              body:'Retail merchants with seasonal volume spikes can negotiate tiered rates that reward peak months. Bring 12-month statements to any negotiation — we do this for you.',                                                                                                                 badge:'Negotiate leverage' },
  tip_downgrade:    { title:'Tip Adjustment Interchange Risk',         body:'If a final tipped amount exceeds the authorized amount by more than 20%, the transaction can downgrade from Qualified to Mid or Non-Qualified interchange — often adding 0.75-1.5% to that transaction cost.',                                                                        badge:'Common bleed source' },
  amex_rates:       { title:'Amex OptBlue vs. Direct',                 body:'Restaurants on Amex OptBlue through their processor typically pay 2.3-3.0%. Direct Amex contract merchants over $1M/year often get better rates. Ask us which applies.',                                                                                                             badge:'Rate dependent' },
  avs_savings:      { title:'AVS & CVV Verification Required',         body:"E-commerce transactions without AVS (Address Verification) and CVV can downgrade to higher interchange categories. Ensure your gateway is sending these fields on every transaction.",                                                                                                 badge:'Prevent downgrades' },
  level2_cnp:       { title:'Level II Data for CNP Transactions',      body:'Card-not-present commercial card transactions with Level II data (tax ID, customer code) can save 0.40-0.80% off interchange vs. standard e-commerce categories.',                                                                                                                   badge:'0.40-0.80% savings' },
  chargeback_rates: { title:'Chargeback Threshold Management',         body:"Visa's chargeback threshold is 1.0% of transactions (0.9% for Early Warning). Exceeding it triggers the VDMP program with additional fees of $10-25 per chargeback.",                                                                                                                badge:'Risk management' },
  ach_alternative:  { title:'ACH as a Lower-Cost Alternative',         body:'For recurring invoices or large transactions, ACH (bank transfer) costs $0.25-0.75 flat vs. 2-3% for cards. On a $5,000 invoice, that\'s $100-150 in savings per transaction.',                                                                                                    badge:'Near-zero cost' },
  fsa_hsa:          { title:'FSA/HSA Cards — Special Interchange',     body:'FSA and HSA debit cards process on healthcare-specific interchange categories (HC Regulated, HC Unregulated). Proper MCC coding (5047, 5912, 8011-8099) is required to access these rates.',                                                                                         badge:'MCC dependent' },
  healthcare_mcc:   { title:'MCC Coding Directly Impacts Rates',       body:'Healthcare providers with incorrect MCC codes can pay 0.30-0.60% more than properly coded merchants. Common miscodes: billed as 7299 (services) instead of 8099 (healthcare).',                                                                                                     badge:'Easy fix, big savings' },
  level2:           { title:'Level II Data — Corporate Cards',         body:'B2B merchants sending Level II data on corporate and purchasing card transactions save 0.50-1.00% per transaction. Required fields: customer code, tax amount, PO number.',                                                                                                           badge:'0.50-1.00% savings' },
  level3:           { title:'Level III Data — Government & Large PO',  body:'Level III line-item data on government procurement and large corporate cards can reduce interchange by an additional 0.40-0.70% on top of Level II savings.',                                                                                                                        badge:'0.40-0.70% more' },
  fleet_cards:      { title:'Fleet Card Interchange Complexity',       body:'WEX, Voyager, Mastercard Fleet, and Visa Fleet cards have specific interchange categories (2.15-2.50%) but require sending odometer, vehicle ID, and driver data. Missing these fields = downgrades.',                                                                               badge:'Data required' },
  debit_routing:    { title:'Regulated Debit = Big Savings at the Pump', body:'Gas stations with high debit mix benefit significantly from Durbin-regulated debit routing ($0.21 + 0.05% per tx). At a $45 average ticket, that\'s approximately 0.52% effective rate vs. 1.5%+ unregulated.',                                                                  badge:'High debit impact' },
  regulated_debit:  { title:'Durbin Amendment Compliance',             body:'Debit cards from banks over $10B in assets are Durbin-regulated with a federal cap of $0.21 + 0.05%. Ensure your processor is routing these correctly — some processors keep the spread.',                                                                                           badge:'Federal cap: $0.21+0.05%' },
  convenience_fee:  { title:'Compliant Convenience Fee Programs',      body:'Educational institutions can implement compliant card network convenience fee programs for tuition payments — but rules differ by state and card network. We navigate this for you.',                                                                                                  badge:'State rules vary' },
}

const JUNK_FEES = [
  { id:'pci',    name:'PCI Non-Compliance Fee',        range:'$20–$99/mo',        note:'Often charged even when you ARE compliant. Ask your processor for proof.' },
  { id:'stmt',   name:'Monthly Statement Fee',         range:'$7–$20/mo',         note:'Pure margin for the processor. No legitimate cost justification.' },
  { id:'annual', name:'Annual / Membership Fee',       range:'$99–$299/yr',       note:'Typically buried in Year 2 of a contract after initial waiver.' },
  { id:'batch',  name:'Daily Batch / Settlement Fee',  range:'$0.10–$0.25/batch', note:'Charged per day you settle, regardless of transaction count.' },
  { id:'minmon', name:'Monthly Minimum Fee',           range:'$25–$50/mo',        note:'Triggered if your processing volume falls below a threshold.' },
  { id:'irs',    name:'IRS 1099-K Reporting Fee',      range:'$30–$60/yr',        note:'Processors charging for this are padding fees — it should be $0.' },
  { id:'gate',   name:'Bundled Gateway Fee',           range:'$15–$35/mo',        note:'Sometimes charged on top of your existing payment gateway subscription.' },
  { id:'regul',  name:'Regulatory / NABU / FANF Fee',  range:'Varies',            note:'Pass-through fees that some processors mark up above actual cost.' },
  { id:'amex',   name:'Amex Separate Brand Fee',       range:'Varies',            note:"If you're on OptBlue, Amex fees should be bundled in your rate — not extra." },
  { id:'etf',    name:'Early Termination Clause',      range:'$200–$800',         note:"Not a monthly fee — a buyout if you switch. Know your contract term." },
]

// ─── INTERCHANGE ENGINE ──────────────────────────────────────────────────────

const IC_CARD_MIX: Record<string, number[]> = {
  retail:    [ 0.18, 0.19, 0.19, 0.21, 0.09, 0.08, 0.06 ],
  restaurant:[ 0.14, 0.16, 0.17, 0.20, 0.11, 0.08, 0.14 ],
  ecommerce: [ 0.09, 0.10, 0.20, 0.26, 0.14, 0.14, 0.07 ],
  service:   [ 0.07, 0.07, 0.18, 0.23, 0.14, 0.22, 0.09 ],
  healthcare:[ 0.12, 0.14, 0.20, 0.22, 0.11, 0.10, 0.11 ],
  b2b:       [ 0.02, 0.03, 0.08, 0.13, 0.07, 0.58, 0.09 ],
  gas:       [ 0.25, 0.24, 0.19, 0.16, 0.07, 0.05, 0.04 ],
  education: [ 0.11, 0.12, 0.18, 0.23, 0.12, 0.15, 0.09 ],
  other:     [ 0.15, 0.17, 0.19, 0.22, 0.10, 0.12, 0.05 ],
}

const IC_LOOKUP: Record<string, [number, number, number | null]> = {
  regDbt_cp:  [0.05, 0.21, null], regDbt_cnp: [0.05, 0.21, null],
  exmDbt_retail_cp: [0.93, 0.15, null], exmDbt_restaurant_cp: [1.19, 0.10, null],
  exmDbt_gas_cp: [0.75, 0.16, 0.95], exmDbt_default_cp: [0.93, 0.15, null],
  exmDbt_cnp: [1.65, 0.15, null],
  ccStd_retail_cp: [1.56, 0.10, null], ccStd_restaurant_cp: [1.98, 0.07, null],
  ccStd_gas_cp: [1.15, 0.25, 1.10], ccStd_healthcare_cp: [1.29, 0.05, null],
  ccStd_education_cp: [1.29, 0.05, null], ccStd_b2b_cp: [1.56, 0.10, null],
  ccStd_default_cp: [1.51, 0.10, null], ccStd_cnp: [1.97, 0.10, null],
  ccRew_retail_cp: [1.70, 0.10, null], ccRew_restaurant_cp: [2.43, 0.07, null],
  ccRew_gas_cp: [1.15, 0.25, 1.10], ccRew_healthcare_cp: [1.43, 0.05, null],
  ccRew_education_cp: [1.43, 0.05, null], ccRew_default_cp: [1.73, 0.10, null],
  ccRew_cnp: [2.15, 0.10, null],
  ccPrem_retail_cp: [2.30, 0.10, null], ccPrem_restaurant_cp: [2.60, 0.07, null],
  ccPrem_gas_cp: [1.15, 0.25, 1.10], ccPrem_healthcare_cp: [2.30, 0.10, null],
  ccPrem_education_cp: [2.15, 0.10, null], ccPrem_default_cp: [2.30, 0.10, null],
  ccPrem_cnp: [2.60, 0.10, null],
  bizCrd_cp: [2.25, 0.10, null], bizCrd_cnp: [2.65, 0.10, null],
  bizCrd_b2b_l2_cp: [2.00, 0.10, null], bizCrd_b2b_l2_cnp: [2.40, 0.10, null],
  amex_retail: [1.60, 0.00, null], amex_restaurant: [1.60, 0.00, null],
  amex_healthcare: [1.34, 0.00, null], amex_b2b: [1.60, 0.00, null],
  amex_education: [1.60, 0.00, null], amex_default: [1.60, 0.00, null],
}

const ASSESSMENT_RATES: Record<string, number> = {
  regDbt: 0.130, exmDbt: 0.130, ccStd: 0.145,
  ccRew: 0.145, ccPrem: 0.145, bizCrd: 0.145,
  // Amex OptBlue network fee: 0.165% (corrected from 0.120%)
  amex: 0.165,
}

function icEffective(pct: number, perTx: number, avgTx: number, cap: number | null): number {
  let cost = pct + (perTx / avgTx * 100)
  if (cap !== null) cost = Math.min(cost, (cap / avgTx) * 100)
  return cost
}

function calcBlendedIC(industry: string, avgTx: number, entryMethod: string, userDebitPct: number) {
  const isCP = entryMethod === 'in-person'
  const isMixed = entryMethod === 'mixed'
  const baseMix = IC_CARD_MIX[industry] ?? IC_CARD_MIX.other
  const userDebitFrac = userDebitPct / 100
  const assumedDebitFrac = baseMix[0] + baseMix[1]
  let regDbtFrac: number, exmDbtFrac: number
  if (assumedDebitFrac > 0) {
    const debitScale = userDebitFrac / assumedDebitFrac
    regDbtFrac = baseMix[0] * debitScale
    exmDbtFrac = baseMix[1] * debitScale
  } else {
    regDbtFrac = userDebitFrac * 0.65
    exmDbtFrac = userDebitFrac * 0.35
  }
  const ccFrac = 1 - userDebitFrac
  const creditSubtotal = baseMix[2] + baseMix[3] + baseMix[4] + baseMix[5] + baseMix[6]
  const ccStdFrac  = creditSubtotal > 0 ? (baseMix[2] / creditSubtotal) * ccFrac : 0
  const ccRewFrac  = creditSubtotal > 0 ? (baseMix[3] / creditSubtotal) * ccFrac : 0
  const ccPremFrac = creditSubtotal > 0 ? (baseMix[4] / creditSubtotal) * ccFrac : 0
  const bizCrdFrac = creditSubtotal > 0 ? (baseMix[5] / creditSubtotal) * ccFrac : 0
  const amexFrac   = creditSubtotal > 0 ? (baseMix[6] / creditSubtotal) * ccFrac : 0
  const isBizL2 = industry === 'b2b'

  function getRate(cardType: string, cp: boolean): [number, number, number | null] {
    const method = cp ? 'cp' : 'cnp'
    const keys = [`${cardType}_${industry}_${method}`, `${cardType}_default_${method}`, `${cardType}_${method}`]
    for (const k of keys) if (IC_LOOKUP[k]) return IC_LOOKUP[k]
    return [2.00, 0.10, null]
  }

  function blendedForCP(cp: boolean) {
    const [rR, rT, rC] = getRate('regDbt', cp)
    const [eR, eT, eC] = getRate('exmDbt', cp)
    const [sR, sT, sC] = getRate('ccStd', cp)
    const [wR, wT, wC] = getRate('ccRew', cp)
    const [pR, pT, pC] = getRate('ccPrem', cp)
    const bizKey = isBizL2 ? (cp ? 'bizCrd_b2b_l2_cp' : 'bizCrd_b2b_l2_cnp') : (cp ? 'bizCrd_cp' : 'bizCrd_cnp')
    const [bR, bT, bC] = IC_LOOKUP[bizKey] ?? [2.25, 0.10, null]
    const amexKey = `amex_${industry}`
    const [aR, aT, aC] = IC_LOOKUP[amexKey] ?? IC_LOOKUP['amex_default']
    const slots = [
      { frac: regDbtFrac,  r: rR, t: rT, cap: rC, assess: ASSESSMENT_RATES.regDbt },
      { frac: exmDbtFrac,  r: eR, t: eT, cap: eC, assess: ASSESSMENT_RATES.exmDbt },
      { frac: ccStdFrac,   r: sR, t: sT, cap: sC, assess: ASSESSMENT_RATES.ccStd  },
      { frac: ccRewFrac,   r: wR, t: wT, cap: wC, assess: ASSESSMENT_RATES.ccRew  },
      { frac: ccPremFrac,  r: pR, t: pT, cap: pC, assess: ASSESSMENT_RATES.ccPrem },
      { frac: bizCrdFrac,  r: bR, t: bT, cap: bC, assess: ASSESSMENT_RATES.bizCrd },
      { frac: amexFrac,    r: aR, t: aT, cap: aC, assess: ASSESSMENT_RATES.amex   },
    ]
    let blendedIC = 0, blendedAssess = 0
    for (const s of slots) {
      const eff = icEffective(s.r, s.t, avgTx, s.cap)
      blendedIC     += s.frac * eff
      blendedAssess += s.frac * s.assess
    }
    return { blendedIC, blendedAssess }
  }

  let result: { blendedIC: number; blendedAssess: number }
  if (isMixed) {
    const cp  = blendedForCP(true)
    const cnp = blendedForCP(false)
    result = {
      blendedIC:     cp.blendedIC     * 0.55 + cnp.blendedIC     * 0.45,
      blendedAssess: cp.blendedAssess * 0.55 + cnp.blendedAssess * 0.45,
    }
  } else {
    result = blendedForCP(isCP)
  }
  return result
}

function calcAll(vol: number, avgTx: number, debitPct: number, cp: string, industry: string, currentFees?: number) {
  const numTx = vol / avgTx
  const isOnline = cp === 'online'
  const isMixed = cp === 'mixed'
  const bench = INDUSTRIES[industry] ?? INDUSTRIES.other
  const icResult = calcBlendedIC(industry, avgTx, isOnline ? 'online' : isMixed ? 'mixed' : 'in-person', debitPct)
  const effectiveIC = icResult.blendedIC
  const ASSESSMENT  = icResult.blendedAssess

  // Flat rate: in-person uses $0.10/tx (Square/Clover market rate); online uses $0.30/tx (Stripe/PayPal)
  const flatPct  = isOnline ? 2.9 : (isMixed ? 2.75 : 2.6)
  const flatPerTx = isOnline ? 0.30 : (isMixed ? 0.20 : 0.10)
  const flatMo  = (vol * flatPct / 100) + (numTx * flatPerTx)
  const flatEff = (flatMo / vol) * 100

  const icMarkup  = vol < 25000 ? 0.75 : vol < 75000 ? 0.70 : vol < 150000 ? 0.65 : vol < 300000 ? 0.55 : 0.45
  const icPerTx   = 0.10
  const icMonthly = 25
  const icMo  = (vol * (effectiveIC + icMarkup + ASSESSMENT) / 100) + (numTx * icPerTx) + icMonthly
  const icEff = (icMo / vol) * 100

  const tq = isOnline ? 0.40 : 0.45
  const tmq = 0.35
  const tnq = 1 - tq - tmq
  const tieredMo =
    (vol * tq * 1.89 / 100) + (numTx * tq * 0.19) +
    (vol * tmq * 2.60 / 100) + (numTx * tmq * 0.25) +
    (vol * tnq * 3.50 / 100) + (numTx * tnq * 0.30) + 40
  const tieredEff = (tieredMo / vol) * 100

  const ft5MarkupLow  = vol < 25000 ? 0.55 : vol < 75000 ? 0.45 : vol < 150000 ? 0.35 : vol < 300000 ? 0.28 : 0.20
  const ft5MarkupHigh = ft5MarkupLow + 0.10
  const ft5PerTx   = 0.10
  const ft5Monthly = 22.95
  const ft5MoLow  = (vol * (effectiveIC + ft5MarkupLow  + ASSESSMENT) / 100) + (numTx * ft5PerTx) + ft5Monthly
  const ft5MoHigh = (vol * (effectiveIC + ft5MarkupHigh + ASSESSMENT) / 100) + (numTx * ft5PerTx) + ft5Monthly
  const ft5MoMid  = (ft5MoLow + ft5MoHigh) / 2
  const ft5RateLow  = (ft5MoLow  / vol) * 100
  const ft5RateHigh = (ft5MoHigh / vol) * 100

  const dualMo       = 50
  const dualEff      = (dualMo / vol) * 100
  const dualCustomer = vol * 0.04

  let currentMo: number | null = null
  let currentEff: number | null = null
  let overpayMo: number | null = null
  let overpayAnnual: number | null = null
  if (currentFees && currentFees > 0) {
    currentMo     = currentFees
    currentEff    = (currentFees / vol) * 100
    overpayMo     = currentMo - ft5MoMid
    overpayAnnual = overpayMo * 12
  }

  const traditional = [
    { key: 'flat',   mo: flatMo,   eff: flatEff   },
    { key: 'ic',     mo: icMo,     eff: icEff     },
    { key: 'tiered', mo: tieredMo, eff: tieredEff },
  ].sort((a, b) => a.mo - b.mo)
  const winner = traditional[0]
  const loser  = traditional[2]

  const annualVol           = vol * 12
  const estAnnualProfit     = annualVol * bench.netMargin / 100
  const processCostPctProfit = ((icMo * 12) / estAnnualProfit) * 100
  const ft5SaveAnnual       = overpayAnnual !== null ? overpayAnnual : (loser.mo - ft5MoMid) * 12
  const ft5SavePctProfit    = (ft5SaveAnnual / estAnnualProfit) * 100

  // Intel tips for this industry (resolved server-side)
  const intelTips = bench.intel.map(k => ({ key: k, ...(INTEL_TIPS[k] ?? { title: k, body: '', badge: '' }) }))

  // Benchmark percentile
  const bestRate   = winner.eff
  const rateRange  = bench.avgRate.high - bench.avgRate.low
  const percentile = Math.max(0, Math.min(100, Math.round((1 - (bestRate - bench.avgRate.low) / rateRange) * 100)))

  return {
    vol, avgTx, debitPct, cp, industry,
    bench: { ...bench, percentile },
    flat:   { mo: flatMo,   annual: flatMo   * 12, eff: flatEff   },
    ic:     { mo: icMo,     annual: icMo     * 12, eff: icEff,   effectiveIC, ASSESSMENT, markup: icMarkup },
    tiered: { mo: tieredMo, annual: tieredMo * 12, eff: tieredEff, tq, tmq, tnq },
    ft5: {
      moLow: ft5MoLow, moHigh: ft5MoHigh, moMid: ft5MoMid,
      rateLow: ft5RateLow, rateHigh: ft5RateHigh,
      markupLow: ft5MarkupLow, markupHigh: ft5MarkupHigh,
    },
    dual:    { mo: dualMo, eff: dualEff, customer: dualCustomer, fit: bench.dpFit, note: bench.dpNote },
    current: { mo: currentMo, eff: currentEff, overpayMo, overpayAnnual },
    winner,
    loser,
    profit:  { margin: bench.netMargin, processCostPctProfit, ft5SaveAnnual, ft5SavePctProfit, estAnnualProfit },
    junkFees: JUNK_FEES,
    intelTips,
    b2b: industry === 'b2b' ? {
      l2SaveMo: vol * 0.0075,
      l3SaveMo: vol * 0.0055,
    } : null,
  }
}

// ─── RATE LIMITER (simple in-memory, resets on cold start) ──────────────────
const ipCounts = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 30   // requests
const WINDOW_MS  = 60_000 // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipCounts.get(ip)
  if (!entry || now > entry.reset) {
    ipCounts.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// ─── ROUTE HANDLER ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  let body: {
    vol?: unknown; avgTx?: unknown; debitPct?: unknown
    cp?: unknown; industry?: unknown; currentFees?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const vol        = Number(body.vol)        || 0
  const avgTx      = Number(body.avgTx)      || 0
  const debitPct   = Number(body.debitPct)   || 30
  const cp         = ['in-person', 'online', 'mixed'].includes(String(body.cp)) ? String(body.cp) : 'in-person'
  const industry   = INDUSTRIES[String(body.industry)] ? String(body.industry) : 'other'
  const currentFees = body.currentFees ? Number(body.currentFees) : undefined

  if (vol <= 0) return NextResponse.json({ error: 'Invalid volume.' }, { status: 400 })
  if (avgTx <= 0) return NextResponse.json({ error: 'Invalid average transaction.' }, { status: 400 })

  const results = calcAll(vol, avgTx, debitPct, cp, industry, currentFees)
  return NextResponse.json(results)
}

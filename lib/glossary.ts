export type GlossaryTerm = {
  term: string
  slug: string
  category: 'pricing' | 'fees' | 'processing' | 'fraud' | 'compliance' | 'infrastructure'
  shortDef: string   // one sentence — used in index cards and meta description
  body: string[]     // paragraphs
  relatedSlugs?: string[]
  merchantImpact?: string  // "Why this matters to you" — optional callout
}

export const glossaryData: GlossaryTerm[] = [
  // ── PRICING ──────────────────────────────────────────────────────────────
  {
    term: 'Interchange-Plus Pricing',
    slug: 'interchange-plus-pricing',
    category: 'pricing',
    shortDef: 'A transparent pricing model that passes interchange at cost and adds a fixed processor markup — the lowest-cost structure for most merchants.',
    body: [
      'Interchange-plus (IC+) pricing separates your processing bill into two clearly labeled components: the interchange fee set by Visa or Mastercard, and the processor\'s markup. Both are shown on your statement. Nothing is bundled or hidden.',
      'In practice your statement might show "Interchange + 0.25% + $0.10/transaction." The interchange component flows through at cost — the processor earns nothing on it. The 0.25% and $0.10 are the processor\'s margin, which is fully negotiable.',
      'This contrasts sharply with tiered pricing, where a processor bundles interchange and markup into a single "qualified rate" and you have no way to verify what you\'re actually paying for the interchange portion. On IC+, you can verify every number against published Visa and Mastercard interchange tables.',
      'IC+ is the standard pricing model used by large merchants, and is increasingly available to smaller businesses. Any merchant processing over $15,000/month should be on IC+ or negotiating toward it.',
    ],
    merchantImpact: 'If you\'re on tiered or flat-rate pricing, switching to IC+ is typically the single highest-impact change you can make to your processing costs. FT5 clients average 30–60% lower markup after competitive bidding on IC+ terms.',
    relatedSlugs: ['tiered-pricing', 'flat-rate-pricing', 'interchange', 'acquirer-markup', 'effective-rate'],
  },
  {
    term: 'Tiered Pricing',
    slug: 'tiered-pricing',
    category: 'pricing',
    shortDef: 'A pricing model that groups transactions into qualified, mid-qualified, and non-qualified buckets — making your true cost impossible to verify.',
    body: [
      'Tiered pricing bundles interchange, assessments, and processor markup into a single rate per bucket. Your processor decides which transactions fall into which tier — and the criteria are written into your agreement in ways most merchants never read.',
      'A typical structure has three tiers: qualified (lowest rate, usually swiped consumer debit/credit), mid-qualified (higher rate, often keyed-entry or rewards cards), and non-qualified (highest rate, business cards, foreign cards, anything that "downgrades"). Some processors use four or five tiers.',
      'The problem: there is no independent way to verify whether a transaction was correctly bucketed. The processor controls both the classification rules and the billing. Rewards cards, which now represent the majority of consumer spending, almost always land in mid-qual or non-qual — meaning the rate you were sold rarely applies to most of your actual transactions.',
      'Tiered pricing is the most common pricing model in the US market. It is also the most profitable structure for processors — which is why it is so widely sold.',
    ],
    merchantImpact: 'If your statement shows a "qualified rate" alongside "mid-qual" and "non-qual" surcharges, you\'re on tiered pricing. Upload your statement to see what IC+ would cost you.',
    relatedSlugs: ['interchange-plus-pricing', 'flat-rate-pricing', 'downgrade', 'effective-rate'],
  },
  {
    term: 'Flat-Rate Pricing',
    slug: 'flat-rate-pricing',
    category: 'pricing',
    shortDef: 'A single fixed rate applied to every transaction regardless of card type — simple to understand, but rarely the lowest cost at meaningful volume.',
    body: [
      'Flat-rate pricing charges a single blended percentage (and sometimes a per-transaction fee) on every card, regardless of whether the transaction is a basic debit card or a premium rewards card. Square charges 2.6% + $0.10. Stripe charges 2.9% + $0.30. The rate never changes.',
      'The appeal is simplicity. You always know what you\'ll pay. There is no statement analysis required, no downgrade fees, no tiered surprises.',
      'The cost: flat-rate processors profit by averaging. Basic debit interchange is roughly 0.05–0.80% depending on the Durbin status of the card. Rewards card interchange runs 1.5–2.3%. When a processor charges you 2.6% on everything, it is covering its costs on the expensive transactions by overcharging on the cheap ones. The bigger your volume, the more you overpay.',
      'For businesses doing under $5,000/month, flat-rate pricing may be acceptable given the simplicity. Above that, the premium compounds quickly. A merchant doing $100,000/month on flat-rate vs. a competitive IC+ rate typically overpays by $800–$2,000 per month.',
    ],
    merchantImpact: 'Flat-rate is designed for the smallest businesses. If you\'re beyond startup stage, you\'re likely subsidizing Square\'s or Stripe\'s margins. The fee calculator shows you the exact delta.',
    relatedSlugs: ['interchange-plus-pricing', 'tiered-pricing', 'effective-rate', 'interchange'],
  },
  {
    term: 'Effective Rate',
    slug: 'effective-rate',
    category: 'pricing',
    shortDef: 'Your total processing cost divided by your gross card volume — the only honest apples-to-apples comparison across pricing models.',
    body: [
      'Effective rate = total processing fees ÷ total card volume. If you paid $2,400 in fees on $100,000 in card sales, your effective rate is 2.4%.',
      'It is the only number that lets you compare pricing across different models. A processor quoting 1.69% + $0.10/transaction and a processor offering 2.3% flat rate both sound like different things — your effective rate at your actual transaction mix is what tells you which is cheaper.',
      'To calculate it from your statement: add up every fee (discount, transaction fees, monthly fees, PCI fee, statement fee, everything) and divide by your total card volume for the same period.',
      'Industry benchmarks for card-present retail: below 2.1% is competitive. 2.1–2.5% is typical but improvable. Above 2.5% indicates significant overpayment. Card-not-present merchants run 0.4–0.6% higher due to elevated interchange categories.',
    ],
    merchantImpact: 'Most merchants have never calculated their effective rate. It usually comes as a surprise. The FT5 calculator does it automatically — enter your volume and fees to see where you stand.',
    relatedSlugs: ['interchange-plus-pricing', 'tiered-pricing', 'flat-rate-pricing', 'acquirer-markup', 'junk-fees'],
  },
  {
    term: 'Acquirer Markup',
    slug: 'acquirer-markup',
    category: 'pricing',
    shortDef: 'The processor\'s margin added on top of interchange — the only part of your processing cost that is negotiable.',
    body: [
      'Your processing bill has two layers. The first is interchange — set by Visa and Mastercard, non-negotiable, identical regardless of which processor you use. The second is the acquirer markup — the processor\'s fee for authorizing, settling, and supporting your account.',
      'On an IC+ statement, the markup is visible. On tiered or flat-rate statements, it is buried inside blended rates. Either way, it is the only component of your processing cost that can actually be lowered through negotiation.',
      'Typical acquirer markups for IC+ merchants: 0.10–0.35% + $0.05–$0.15/transaction for card-present retail. E-commerce and keyed-entry merchants typically pay 0.15–0.50% + $0.10–$0.20/transaction. Markups for merchants who have never been competitively bid often sit at the high end of these ranges or above.',
      'When FT5 runs a competitive bid, we send your processing profile to 10+ processors simultaneously. The competition forces markups down. Clients typically see markup reductions of 30–60%.',
    ],
    merchantImpact: 'Interchange is your floor. The markup is your negotiation. Most merchants have never had their account competitively bid — meaning they\'re paying whatever the original sales rep quoted.',
    relatedSlugs: ['interchange', 'interchange-plus-pricing', 'effective-rate', 'network-assessment'],
  },

  // ── FEES ─────────────────────────────────────────────────────────────────
  {
    term: 'Interchange',
    slug: 'interchange',
    category: 'fees',
    shortDef: 'The per-transaction fee set by Visa and Mastercard, paid to the card-issuing bank — the largest and non-negotiable component of processing costs.',
    body: [
      'Interchange is paid by your acquiring bank to the bank that issued the card your customer used. Visa and Mastercard publish interchange tables annually — there are hundreds of rate categories depending on card type, transaction type, and merchant category code (MCC).',
      'Common consumer credit card interchange rates for card-present transactions range from roughly 1.51% + $0.10 (basic Visa credit) to 2.30% + $0.10 (premium rewards cards). Debit cards with PIN entry can be as low as $0.21 + 0.05% under Durbin regulations. Card-not-present interchange runs approximately 0.4–0.6% higher than card-present.',
      'Interchange is identical regardless of which processor you use. It flows through every processor at the same cost. On IC+ pricing, it is passed through at cost with no markup. On tiered or flat-rate pricing, it is bundled into blended rates where the processor\'s share is not visible.',
      'Because interchange is non-negotiable, the focus in competitive bidding is always on the markup layer above it. Understanding interchange helps you verify that your processor is passing it through correctly on IC+ and not adding margin on top.',
    ],
    merchantImpact: 'Interchange is your floor. You cannot go below it — but you should never pay more than it plus a competitive markup. IC+ pricing gives you full visibility into both numbers.',
    relatedSlugs: ['interchange-plus-pricing', 'network-assessment', 'acquirer-markup', 'durbin-amendment', 'downgrade'],
  },
  {
    term: 'Network Assessment',
    slug: 'network-assessment',
    category: 'fees',
    shortDef: 'Small percentage fees charged by Visa, Mastercard, and other card networks on every transaction — separate from interchange and non-negotiable.',
    body: [
      'In addition to interchange, Visa and Mastercard charge their own assessment fees on every transaction processed on their networks. These are often called "dues and assessments" on your statement.',
      'Current rates (approximate): Visa charges 0.14% on credit and 0.13% on debit transactions. Mastercard charges 0.1375% on credit. American Express charges 0.165% on OptBlue transactions. These numbers update periodically and vary slightly by transaction type and volume tier.',
      'Assessments are non-negotiable — the same for every processor. On IC+ statements they appear as a separate line item. On tiered pricing they are folded into the qualified rate.',
      'While assessments are small individually, they represent a meaningful portion of total processing costs at volume. On $1 million in Visa credit volume, assessments alone are approximately $1,400/year.',
    ],
    relatedSlugs: ['interchange', 'interchange-plus-pricing', 'acquirer-markup'],
  },
  {
    term: 'Junk Fees',
    slug: 'junk-fees',
    category: 'fees',
    shortDef: 'Low-dollar recurring fees added to merchant statements that are not required by card networks — pure processor margin with no corresponding service.',
    body: [
      'Junk fees are the line items on your processing statement that have no corresponding cost from Visa, Mastercard, or any card network. They are invented by processors and added to merchant agreements with minimal disclosure. Common examples include: PCI non-compliance fee ($20–$50/month), annual fee ($99–$299/year), statement fee ($7–$15/month), regulatory compliance fee, network access fee, account maintenance fee, and batch fee.',
      'Individually these fees seem small. Combined, they often add $400–$1,200/year to a merchant\'s costs. For small businesses, that can represent 10–20% of their total processing bill.',
      'PCI non-compliance is the most egregious. Processors charge merchants a monthly fee for not completing PCI compliance questionnaires — then make the questionnaire difficult to find and complete. The fee is pure margin with no value delivered.',
      'When FT5 analyzes a merchant statement, we flag every junk fee and include the total in the savings calculation. Competitive processors eliminate most or all of these fees as a condition of winning the bid.',
    ],
    merchantImpact: 'Run your eye down your statement looking for anything that isn\'t interchange, assessments, or processor markup. Everything else is potentially negotiable or eliminable.',
    relatedSlugs: ['effective-rate', 'pci-dss'],
  },
  {
    term: 'Basis Point',
    slug: 'basis-point',
    category: 'fees',
    shortDef: 'One one-hundredth of a percent (0.01%) — the standard unit for expressing processor markups and interchange rates.',
    body: [
      'A basis point (bps) is 0.01%, or 0.0001 in decimal form. Payment professionals quote markups in basis points because percentage fractions are awkward to compare. "25 basis points" is cleaner than "0.25 percent."',
      'Common reference points: 10 bps = 0.10%, 25 bps = 0.25%, 50 bps = 0.50%, 100 bps = 1.00%.',
      'At scale, basis points are meaningful dollars. On $500,000/month in card volume, 25 basis points is $1,250/month — $15,000/year. When FT5 negotiates a 30 bps markup reduction for a mid-volume merchant, that translates directly to bottom-line savings.',
      'When comparing processor quotes, convert everything to basis points over interchange. A quote of "1.89% + $0.10" from one processor and "interchange + 30 bps + $0.12" from another require your actual card mix to compare accurately.',
    ],
    relatedSlugs: ['interchange-plus-pricing', 'acquirer-markup', 'effective-rate'],
  },
  {
    term: 'Downgrade',
    slug: 'downgrade',
    category: 'fees',
    shortDef: 'When a transaction doesn\'t meet the criteria for a preferred interchange category and is assessed at a higher rate — often without the merchant\'s knowledge.',
    body: [
      'Every interchange category has qualification criteria: how the card was presented, whether AVS was used, whether the batch settled within 24 hours, and other factors. When a transaction fails to meet those criteria, it "downgrades" to a higher-cost interchange category.',
      'Common downgrade triggers: keying a card number instead of swiping or tapping (even when a chip card is present), failing to batch within 24 hours, not using AVS on card-not-present transactions, accepting a corporate or purchasing card without Level II data, and accepting foreign-issued cards.',
      'On tiered pricing, downgrades appear as mid-qual or non-qual surcharges — often 0.50–1.50% above your base rate. On IC+ pricing, the specific higher interchange category is shown. Either way the cost is real.',
      'Operational changes can prevent many downgrades. Ensuring your POS always prompts chip/tap first, batching automatically each evening, and configuring AVS for all keyed transactions all reduce downgrade frequency. For B2B merchants, Level II processing eliminates corporate card downgrades entirely.',
    ],
    merchantImpact: 'On tiered pricing, check what percentage of your volume is hitting mid-qual and non-qual. If it\'s more than 30%, downgrades are a significant cost driver.',
    relatedSlugs: ['interchange', 'tiered-pricing', 'level-2-level-3-processing', 'avs'],
  },
  {
    term: 'Chargeback',
    slug: 'chargeback',
    category: 'fees',
    shortDef: 'A transaction reversal initiated by a cardholder\'s bank — the merchant loses the sale amount, pays a penalty fee, and must prove the transaction was legitimate.',
    body: [
      'A chargeback occurs when a cardholder disputes a transaction with their bank. The issuing bank reverses the funds from your account and you receive a chargeback notification with a deadline to respond. If you cannot provide compelling evidence (signed receipt, delivery confirmation, cardholder communication), you lose both the sale amount and the chargeback fee — typically $15–$35 per incident.',
      'Chargebacks are initiated for various reasons: the cardholder doesn\'t recognize the charge (often friendly fraud), the goods weren\'t delivered, the item wasn\'t as described, or the transaction was genuinely unauthorized. Banks tend to side with cardholders, so your representment evidence needs to be thorough.',
      'Processors monitor chargeback ratios closely. Visa\'s threshold is 0.9% of monthly transactions; Mastercard\'s is 1.5%. Merchants who exceed these thresholds are placed in monitoring programs with elevated fees and risk of account termination. High-risk industries (travel, subscription, MOTO) tend to have higher baseline chargeback rates.',
      'Prevention is cheaper than defense: clear billing descriptors that match your business name, prompt refunds for legitimate complaints, delivery confirmation for shipped goods, and 3D Secure for card-not-present transactions all reduce chargeback rates.',
    ],
    merchantImpact: 'Track your monthly chargeback count as a percentage of transactions. Above 0.5% is a yellow flag. Above 1% puts your processing account at risk.',
    relatedSlugs: ['3d-secure', 'avs', 'card-not-present'],
  },
  {
    term: 'Retrieval Request',
    slug: 'retrieval-request',
    category: 'fees',
    shortDef: 'A pre-chargeback request from a cardholder\'s bank for transaction documentation — carries a fee regardless of outcome.',
    body: [
      'Before a formal chargeback is filed, the card-issuing bank often sends a retrieval request — a demand for documentation about a specific transaction. You\'ll typically have 10–20 days to respond with the signed receipt, order details, or other transaction evidence.',
      'Retrieval requests carry a fee of approximately $10–$25, billed to the merchant regardless of whether the dispute proceeds to a chargeback or is resolved. This fee is non-negotiable.',
      'Responding to retrieval requests promptly and completely is important: a non-response typically results in an automatic chargeback. Keep signed receipts and transaction records for at least 18 months.',
      'Retrieval requests are a leading indicator of chargeback risk. A spike in retrieval requests in a given month often precedes a chargeback ratio increase the following month.',
    ],
    relatedSlugs: ['chargeback'],
  },

  // ── FRAUD & SECURITY ──────────────────────────────────────────────────────
  {
    term: 'AVS (Address Verification System)',
    slug: 'avs',
    category: 'fraud',
    shortDef: 'A fraud prevention service that checks a cardholder\'s billing address against the card issuer\'s records — reduces downgrade risk on keyed and card-not-present transactions.',
    body: [
      'AVS compares the billing address (and sometimes zip code) provided at checkout against the address the card issuer has on file. The result is returned as a match code: full match, zip match only, no match, or unavailable.',
      'AVS does not block transactions — it is a data point for fraud scoring. Merchants can configure their systems to decline on certain AVS responses, but most pass the transaction and use the response for chargeback defense and risk scoring.',
      'For interchange purposes, using AVS on keyed-entry and card-not-present transactions is required to qualify for the best available interchange categories. Transactions without AVS on a MOTO or e-commerce merchant downgrade to higher-cost categories.',
      'AVS is most useful for card-not-present fraud prevention when combined with CVV2 verification and, for higher-risk transactions, 3D Secure authentication.',
    ],
    relatedSlugs: ['downgrade', 'card-not-present', '3d-secure', 'cvv'],
  },
  {
    term: 'CVV / CVV2',
    slug: 'cvv',
    category: 'fraud',
    shortDef: 'Security codes on a card used to verify the cardholder has the physical card — CVV is magnetic stripe, CVV2 is the printed 3-digit code required for card-not-present.',
    body: [
      'CVV (Card Verification Value) is encoded in the magnetic stripe and verified when a card is swiped. It confirms the physical card is present and the stripe hasn\'t been tampered with. It is not visible to the cardholder.',
      'CVV2 is the three or four digit code printed on the back of the card (four digits on the front for Amex). It is not stored on the magnetic stripe and cannot be obtained by skimming a card reader. For card-not-present transactions, requiring CVV2 verifies the buyer has the physical card.',
      'Merchants are prohibited by PCI DSS from storing CVV or CVV2 after authorization. This is a common compliance finding — even storing it temporarily in logs or databases creates liability.',
      'Using CVV2 validation on e-commerce and MOTO transactions reduces fraud rates and helps qualify transactions for lower interchange categories. Most payment gateways support CVV2 checks as a standard configuration option.',
    ],
    relatedSlugs: ['avs', '3d-secure', 'pci-dss', 'card-not-present'],
  },
  {
    term: '3D Secure (3DS)',
    slug: '3d-secure',
    category: 'fraud',
    shortDef: 'An authentication protocol for card-not-present transactions that shifts fraud liability from the merchant to the card issuer when authentication passes.',
    body: [
      '3D Secure (3DS) adds an authentication step to card-not-present transactions. In the original version, cardholders were redirected to their bank\'s site to enter a password. In 3DS2 (the current standard), the bank performs risk-based authentication — most low-risk transactions pass silently without friction, while higher-risk transactions trigger a biometric or OTP challenge.',
      'The key benefit for merchants: when a transaction is successfully authenticated via 3DS, fraud liability shifts to the card issuer. If an authenticated transaction is disputed as unauthorized, the issuer — not the merchant — absorbs the loss. This makes 3DS particularly valuable for high-ticket items and merchants with elevated chargeback rates.',
      'In the European Union, 3DS2 is mandatory under PSD2 Strong Customer Authentication rules. In the US it is optional but increasingly used by e-commerce merchants in high-fraud categories.',
      'Implementation is typically done at the gateway or payment platform level. Stripe, Adyen, Braintree, and most major gateways support 3DS2 natively. The conversion impact is minimal with 3DS2 compared to the original version, which had significant checkout abandonment.',
    ],
    merchantImpact: 'If you\'re an e-commerce merchant with a chargeback rate above 0.3%, 3DS is worth evaluating. The liability shift alone can eliminate a significant portion of fraud-related losses.',
    relatedSlugs: ['chargeback', 'avs', 'cvv', 'card-not-present'],
  },
  {
    term: 'Card Not Present (CNP)',
    slug: 'card-not-present',
    category: 'fraud',
    shortDef: 'Transactions where the physical card is not present at checkout — e-commerce, phone orders, and keyed-entry — which carry higher interchange rates due to elevated fraud risk.',
    body: [
      'Card-not-present (CNP) refers to any transaction where the cardholder\'s physical card cannot be verified at the point of sale. This includes all e-commerce purchases, MOTO (mail order/telephone order) transactions, and manually keyed card numbers.',
      'Because the card cannot be physically verified, CNP transactions carry higher fraud risk than card-present transactions. Visa and Mastercard reflect this in their interchange tables: CNP interchange rates are typically 0.4–0.6% higher than equivalent card-present rates.',
      'Fraud tools that are optional for card-present merchants — AVS, CVV2, 3D Secure — are either required or strongly recommended for CNP merchants to qualify for the best available interchange categories and reduce chargeback exposure.',
      'E-commerce and MOTO merchants should have their fraud stack configured before they need it. A single fraud spike can push a merchant into Visa\'s or Mastercard\'s monitoring programs, which carry elevated fees and operational restrictions.',
    ],
    relatedSlugs: ['avs', 'cvv', '3d-secure', 'chargeback', 'downgrade'],
  },

  // ── COMPLIANCE ────────────────────────────────────────────────────────────
  {
    term: 'PCI DSS',
    slug: 'pci-dss',
    category: 'compliance',
    shortDef: 'Payment Card Industry Data Security Standard — the compliance framework all card-accepting merchants must meet, with penalties for non-compliance.',
    body: [
      'PCI DSS is a set of security requirements established by the PCI Security Standards Council (founded by Visa, Mastercard, Amex, Discover, and JCB). Any business that accepts, processes, stores, or transmits cardholder data is required to comply.',
      'Compliance is validated via a Self-Assessment Questionnaire (SAQ) for most small to mid-size merchants, or a full Qualified Security Assessor (QSA) audit for large merchants or those who store card data. The applicable SAQ type depends on how your business accepts cards.',
      'Non-compliance penalties are significant: processors can charge $5,000–$100,000/month in fines passed down from the card networks. After a data breach, non-compliant merchants face much larger liability — potentially millions in breach costs, issuer reimbursements, and forensic investigation fees.',
      'The most important PCI requirements for small merchants: never store CVV/CVV2 after authorization, use an EMV-capable terminal (prevents liability for counterfeit card fraud), keep your terminal software updated, use a PCI-compliant payment gateway, and complete your annual SAQ.',
    ],
    merchantImpact: 'Many processors charge a monthly "PCI non-compliance fee" while making the actual compliance process difficult to find. Complete your SAQ and the fee goes away — or use it as a negotiation point to have it waived entirely.',
    relatedSlugs: ['junk-fees', 'cvv', 'chargeback'],
  },
  {
    term: 'Durbin Amendment',
    slug: 'durbin-amendment',
    category: 'compliance',
    shortDef: 'A 2010 federal regulation that caps debit interchange for large bank issuers at $0.21 + 0.05% — significantly lowering the cost of accepting debit cards from regulated banks.',
    body: [
      'The Durbin Amendment, part of the 2010 Dodd-Frank Act, directed the Federal Reserve to cap debit interchange fees charged by large issuers (banks with assets over $10 billion). The resulting cap: $0.21 + 0.05% per transaction, with a fraud adjustment of $0.01 for qualifying issuers.',
      'Before Durbin, debit interchange was largely unregulated and often approached credit card interchange levels. The amendment cut debit processing costs substantially for merchants, particularly those with high debit card acceptance volumes.',
      'Durbin only applies to "regulated" issuers — banks with over $10 billion in assets like Chase, Bank of America, Wells Fargo. Debit cards from smaller community banks and credit unions ("unregulated" issuers) still carry interchange up to 0.80% + $0.15, closer to pre-Durbin levels.',
      'The amendment also requires that debit cards be enabled on at least two unaffiliated networks, giving merchants routing choice on PIN debit transactions. PIN debit routes over networks like Star, NYCE, or Pulse rather than Visa/Mastercard — and the routing choice can meaningfully reduce costs for high-volume merchants.',
    ],
    merchantImpact: 'If your business has high debit card acceptance (common in grocery, fuel, and QSR), Durbin-regulated cards likely represent a large portion of your volume. This makes your effective rate analysis more nuanced — your IC+ quote should reflect the actual blended interchange for your card mix.',
    relatedSlugs: ['interchange', 'interchange-plus-pricing', 'effective-rate'],
  },

  // ── PROCESSING ────────────────────────────────────────────────────────────
  {
    term: 'Authorization',
    slug: 'authorization',
    category: 'processing',
    shortDef: 'The real-time check with the card-issuing bank that confirms a cardholder has sufficient funds or credit to cover a pending transaction.',
    body: [
      'Authorization is the first step in every card transaction. Your terminal or gateway sends the transaction details to your acquiring processor, which routes the request to the card network (Visa, Mastercard), which forwards it to the card-issuing bank.',
      'The issuing bank checks the account status and available balance or credit, then returns an approval code or decline message — typically within 1–3 seconds. An approval code reserves the funds but does not move them. Funds are not actually transferred until settlement.',
      'Authorization holds can be important for certain business types. Hotels, car rentals, and gas stations often place pre-authorization holds that are adjusted at final settlement. The hold amount and settlement amount can differ.',
      'Failed authorizations generate an authorization fee even without a completed transaction. High decline rates — often caused by outdated card data, fraud filters, or processing setup issues — are a cost that adds up at volume.',
    ],
    relatedSlugs: ['settlement', 'batch'],
  },
  {
    term: 'Settlement',
    slug: 'settlement',
    category: 'processing',
    shortDef: 'The process of moving authorized funds from cardholders\' accounts to your bank account — typically initiated when you close your daily batch.',
    body: [
      'Settlement is the financial transfer that moves authorized transaction funds through the card networks and into your merchant bank account. Authorization reserves the funds; settlement actually moves them.',
      'For most card-present merchants, settlement happens once per day when the batch is closed (either manually or automatically). Your acquiring bank receives the batch, calculates interchange and fees, and initiates an ACH transfer to your DDA. Standard funding timelines are 1–2 business days after batch settlement.',
      'Timing matters for interchange: Visa and Mastercard require batches to settle within 24 hours of authorization to qualify for card-present interchange rates. Batching after 24 hours can trigger a downgrade. This is why auto-batch configuration (set to close each evening) is standard practice.',
      'Same-day and next-day funding options are available through most processors for merchants who need faster access to cash flow. These programs often carry a small premium — typically $0.05–$0.10/transaction or a percentage.',
    ],
    relatedSlugs: ['authorization', 'batch', 'downgrade', 'ach'],
  },
  {
    term: 'Batch',
    slug: 'batch',
    category: 'processing',
    shortDef: 'The group of transactions sent to your processor for settlement at the end of a business day — must be closed within 24 hours to avoid interchange downgrades.',
    body: [
      'A batch is the collection of authorized transactions that a merchant sends to their acquiring bank for settlement at one time — typically once per day. Most terminals are configured to auto-batch at a set time (usually overnight), but some merchants need to close manually.',
      'The 24-hour rule is important: Visa and Mastercard require transactions to be settled within 24 hours of authorization to qualify for the standard card-present interchange category. Batching late causes those transactions to downgrade to a higher-cost category.',
      'Merchants who take tips — restaurants, salons, bars — need to manually enter tip amounts before batching, since the authorized amount and settled amount differ. Auto-batching without tip adjustment creates reconciliation problems and incorrect customer charges.',
      'Batch fees are sometimes charged per batch submission rather than per transaction. For merchants who batch multiple times per day, this adds up. Single daily batching is standard for most merchants.',
    ],
    relatedSlugs: ['settlement', 'downgrade', 'authorization'],
  },
  {
    term: 'ACH (Automated Clearing House)',
    slug: 'ach',
    category: 'processing',
    shortDef: 'The electronic network used to transfer funds between bank accounts — how your processing deposits land in your checking account.',
    body: [
      'ACH (Automated Clearing House) is the electronic funds transfer network operated by NACHA (the National Automated Clearinghouse Association). It handles direct deposits, bill payments, and — relevant to merchants — the settlement deposits from your processing account to your bank.',
      'When you close your daily batch, your acquiring bank initiates an ACH credit to your DDA for the net settlement amount (gross sales minus interchange, fees, and any chargebacks). Standard ACH funding takes 1–2 business days.',
      'ACH is also used for debit transactions in some contexts: bank transfers, recurring billing where a customer provides bank account information rather than a card, and checks converted to electronic items at point of sale.',
      'For merchants, ACH is largely invisible — it\'s the plumbing behind your daily deposit. The main practical consideration is the 1–2 day funding lag, which affects cash flow planning. Same-day ACH is available through many processors for a premium.',
    ],
    relatedSlugs: ['settlement', 'batch'],
  },
  {
    term: 'Level II / Level III Processing',
    slug: 'level-2-level-3-processing',
    category: 'processing',
    shortDef: 'Enhanced transaction data submitted with B2B card payments that qualifies for lower interchange rates — Level II saves 0.3–0.5%, Level III saves up to 1%.',
    body: [
      'Standard consumer card transactions transmit basic data: amount, merchant, date. Level II and Level III processing transmit additional data fields that Visa and Mastercard use to categorize B2B transactions into lower interchange categories.',
      'Level II data includes: sales tax amount, customer code, and merchant postal code. Required for purchasing and corporate cards to qualify for the Level II interchange rate, which is typically 0.3–0.5% lower than the standard business card rate.',
      'Level III data includes everything in Level II plus detailed line-item data: product descriptions, quantities, unit prices, commodity codes, and more. Level III qualifies for the lowest available interchange on purchasing cards — savings can reach 0.8–1.0% compared to standard business card rates.',
      'For B2B merchants that regularly accept corporate purchasing cards, government cards, or fleet cards, implementing Level II/III can reduce interchange costs by thousands of dollars per month at meaningful volume. The setup requires a gateway or POS system that supports the additional data fields — not all do by default.',
    ],
    merchantImpact: 'If more than 20% of your volume comes from business cards, corporate cards, or government-issued cards, ask your processor about Level II/III qualification. Most merchants eligible for these savings aren\'t receiving them.',
    relatedSlugs: ['interchange', 'downgrade', 'interchange-plus-pricing'],
  },
  {
    term: 'Gateway',
    slug: 'gateway',
    category: 'infrastructure',
    shortDef: 'The software layer that connects your checkout — website, POS, or terminal — to the payment processing network for authorization and settlement.',
    body: [
      'A payment gateway is the technology that transmits transaction data from your point of sale (physical terminal, e-commerce checkout, or mobile app) to your acquiring processor for authorization. It is the interface between where the transaction happens and the network that processes it.',
      'For e-commerce merchants, the gateway is typically a hosted checkout page or API integration (Authorize.Net, NMI, Stripe\'s gateway, Braintree, etc.). For in-person merchants, the gateway is either built into the terminal or managed by the POS system.',
      'Gateway selection matters for several reasons: compatibility with your shopping cart or POS, tokenization capabilities (storing cards for repeat customers without storing sensitive data), reporting features, recurring billing support, and fee structure.',
      'Most gateways charge a per-transaction fee ($0.05–$0.15) and sometimes a monthly fee. These are separate from processor interchange and markup. Some processors bundle their own gateway; others are agnostic and support multiple gateway options.',
    ],
    relatedSlugs: ['card-not-present', 'pci-dss', 'authorization'],
  },
]

export const glossaryBySlug = Object.fromEntries(
  glossaryData.map(t => [t.slug, t])
) as Record<string, GlossaryTerm>

export const glossaryCategories: Record<GlossaryTerm['category'], string> = {
  pricing:        'Pricing Models',
  fees:           'Fees & Costs',
  processing:     'Processing Basics',
  fraud:          'Fraud & Security',
  compliance:     'Compliance',
  infrastructure: 'Infrastructure',
}

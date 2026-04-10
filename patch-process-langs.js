const fs = require('fs')
const path = require('path')

const translations = {
  en: {
    Process: {
      metaTitle: 'Our Process | FinTech 5 — Payment Processing Consultants',
      metaDesc: 'How FinTech 5 negotiates lower payment processing rates. Step-by-step from statement analysis to processor bidding to final implementation.',
      bgText1: 'OUR',
      bgText2: 'METHOD',
      badge: 'How It Works',
      title1: 'From statement to savings',
      title2: 'in under a week.',
      subtitle: 'We handle the heavy lifting of auditing, negotiating, and migrating your payment stack. You just review the numbers and make the call.',
      step1Day: 'Day 1',
      step1Title: 'Ingestion & Normalization',
      step1Body: 'You upload your merchant statement securely. Our analysts break it down line-by-line using proprietary extraction tools. We identify your true interchange costs, strip out junk assessment fees, and calculate your exact processor markup.',
      step1Checks: ['PII auto-redacted', 'Effective rate calculated', 'Hidden fees flagged'],
      step2Day: 'Day 2',
      step2Title: 'Blind Processor Bidding',
      step2Body: 'We take your anonymized statement parameters (volume, average ticket size, industry MCC) to our network of 10+ Tier-1 processors. We force them to compete for your business through a blind bidding process, entirely on Interchange-Plus (IC+) pricing.',
      step2Checks: ['Anonymized bidding', '10+ Tier-1 processors', 'IC+ pricing mandated'],
      step3Day: 'Day 3',
      step3Title: 'Savings Presentation',
      step3Body: 'We return to you with a comprehensive audit report. We show you exactly what you are paying now, what you should be paying, and the top 3 bids from the network. We give our recommendation, but the final choice is always yours.',
      step3Checks: ['Side-by-side comparison', 'Zero obligation to switch', 'Permanent savings locked in'],
      step4Day: 'Week 2',
      step4Title: 'Implementation & Swap',
      step4Body: 'If you choose to switch, we handle the entire migration. We work with the winning processor to ship pre-programmed terminals, integrate with your existing POS or e-commerce gateway, and ensure zero downtime during the transition.',
      step4Checks: ['Zero downtime guaranteed', 'Free terminal placement', 'Existing POS integration'],
      ctaTitle: 'Kick off Day 1 right now.',
      ctaSubtitle: "Upload your statement today, and you'll have competitive bids in hand by tomorrow. We don't charge a dime for the audit.",
      ctaBtn: 'Start My Free Audit'
    }
  },
  es: {
    Process: {
      metaTitle: 'Nuestro Proceso | FinTech 5',
      metaDesc: 'Cómo FinTech 5 negocia tasas más bajas.',
      bgText1: 'NUESTRO',
      bgText2: 'MÉTODO',
      badge: 'Cómo Funciona',
      title1: 'Del estado de cuenta al ahorro',
      title2: 'en menos de una semana.',
      subtitle: 'Nos encargamos del trabajo pesado: auditar, negociar y migrar su sistema. Usted solo revisa y decide.',
      step1Day: 'Día 1',
      step1Title: 'Ingreso y Normalización',
      step1Body: 'Sube su extracto de forma segura. Nuestros analistas lo desglosan línea por línea, identificando costos reales y eliminando tarifas basura.',
      step1Checks: ['PII auto-redactado', 'Tasa efectiva calculada', 'Tarifas ocultas marcadas'],
      step2Day: 'Día 2',
      step2Title: 'Licitación Ciega de Procesadores',
      step2Body: 'Llevamos sus parámetros anonimizados a nuestra red de más de 10 procesadores de Nivel 1. Los obligamos a competir en una licitación a ciegas.',
      step2Checks: ['Licitación anonimizada', 'Más de 10 socios Nivel 1', 'Precio IC+ obligatorio'],
      step3Day: 'Día 3',
      step3Title: 'Presentación de Ahorros',
      step3Body: 'Le entregamos un informe completo. Mostramos qué paga ahora, qué debería pagar y las mejores ofertas. La decisión final es suya.',
      step3Checks: ['Comparación cara a cara', 'Cero compromiso', 'Ahorros asegurados'],
      step4Day: 'Semana 2',
      step4Title: 'Implementación y Cambio',
      step4Body: 'Si cambia, gestionamos toda la migración. Coordinamos terminales, POS y garantizamos cero tiempos muertos.',
      step4Checks: ['Cero desconexión', 'Terminal gratis', 'Integración rápida'],
      ctaTitle: 'Comienza el Día 1 ahora mismo.',
      ctaSubtitle: "Sube tu estado de cuenta hoy, tendrás ofertas mañana. La auditoría no cuesta un centavo.",
      ctaBtn: 'Comenzar Mi Auditoría Gratis'
    }
  },
  fr: {
    Process: {
      metaTitle: 'Notre Processus | FinTech 5',
      metaDesc: 'Comment FinTech 5 négocie des frais plus bas.',
      bgText1: 'NOTRE',
      bgText2: 'MÉTHODE',
      badge: 'Comment Ça Marche',
      title1: 'Du relevé aux économies',
      title2: 'en moins d\'une semaine.',
      subtitle: 'Nous gérons l\'audit, la négociation et la migration. Vous n\'avez qu\'à examiner les chiffres.',
      step1Day: 'Jour 1',
      step1Title: 'Analyse et Normalisation',
      step1Body: 'Vous téléchargez votre relevé de façon sécurisée. Nos experts séparent vos coûts réels d\'interchange des frais inutiles.',
      step1Checks: ['PII anonymisées automatiquement', 'Taux effectif calculé', 'Frais cachés identifiés'],
      step2Day: 'Jour 2',
      step2Title: 'Appel d\'Offres à l\'Aveugle',
      step2Body: 'Nous soumettons vos métriques anonymisées à notre réseau de plus de 10 processeurs. Nous les obligeons à concourir pour votre marché.',
      step2Checks: ['Offre anonyme', 'Plus de 10 partenaires de Niveau 1', 'Tarification IC+ exigée'],
      step3Day: 'Jour 3',
      step3Title: 'Présentation des Économies',
      step3Body: 'Nous vous présentons un rapport comparatif complet et les 3 meilleures offres du réseau. Le choix final vous appartient.',
      step3Checks: ['Comparaison côte à côte', 'Aucune obligation de changer', 'Économies permanentes garanties'],
      step4Day: 'Semaine 2',
      step4Title: 'Mise en Œuvre',
      step4Body: 'Si vous changez, nous nous occupons de toute la migration en coordonnant l\'équipement et le système de caisse pour un temps d\'arrêt nul.',
      step4Checks: ['Zéro temps mort', 'Fourniture d\'équipement gratuit', 'Intégration du POS existant'],
      ctaTitle: 'Commencez le Jour 1 dès maintenant.',
      ctaSubtitle: "Téléchargez votre relevé aujourd'hui, vous recevrez des offres compétitives demain. L'audit est sans frais.",
      ctaBtn: 'Commencer Mon Audit Gratuit'
    }
  },
  pt: {
    Process: {
      metaTitle: 'Nosso Processo | FinTech 5',
      metaDesc: 'Como a FinTech 5 negocia taxas de pagamento mais baixas.',
      bgText1: 'NOSSO',
      bgText2: 'MÉTODO',
      badge: 'Como Funciona',
      title1: 'Do extrato à economia',
      title2: 'em menos de uma semana.',
      subtitle: 'Nós cuidamos do trabalho pesado: auditamos, negociamos e migramos. Você confere os números e toma a decisão.',
      step1Day: 'Dia 1',
      step1Title: 'Análise e Normalização',
      step1Body: 'Você envia seu extrato com segurança. Nossos analistas destrincham cada linha para revelar seus custos reais.',
      step1Checks: ['PII auto-rasurados', 'Taxa efetiva calculada', 'Taxas ocultas reveladas'],
      step2Day: 'Dia 2',
      step2Title: 'Licitação Cega',
      step2Body: 'Apresentamos seus números anônimos a mais de 10 processadores parceiros, forçando-os a competir pelas melhores taxas Interchange-Plus.',
      step2Checks: ['Concorrência anônima', 'Parceiros de primeira linha', 'Modelo IC+ garantido'],
      step3Day: 'Dia 3',
      step3Title: 'Apresentação da Economia',
      step3Body: 'Entregamos um relatório de auditoria detalhado, comparando suas taxas atuais com as melhores propostas do mercado.',
      step3Checks: ['Comparação direta', 'Zero obrigação de mudança', 'Economia permanente'],
      step4Day: 'Semana 2',
      step4Title: 'Implementação',
      step4Body: 'Caso decida mudar, coordenamos o envio de novos terminais e a integração com seu sistema, sem interrupção nas vendas.',
      step4Checks: ['Queda e interrupção zero', 'Terminais grátis', 'Integração fácil'],
      ctaTitle: 'Dê o primeiro passo hoje.',
      ctaSubtitle: "Envie seu extrato hoje e tenha propostas amanhã. Sem custos para a auditoria.",
      ctaBtn: 'Solicite Sua Auditoria Grátis'
    }
  },
  de: {
    Process: {
      metaTitle: 'Unser Prozess | FinTech 5',
      metaDesc: 'Wie FinTech 5 niedrigere Zahlungsgebühren aushandelt.',
      bgText1: 'UNSERE',
      bgText2: 'METHODE',
      badge: 'Wie es funktioniert',
      title1: 'Von der Abrechnung zur Einsparung',
      title2: 'in weniger als einer Woche.',
      subtitle: 'Wir übernehmen die Prüfung, Verhandlung und Migration Ihres Zahlungssystems. Sie überprüfen die Zahlen und entscheiden.',
      step1Day: 'Tag 1',
      step1Title: 'Analyse & Normalisierung',
      step1Body: 'Sie laden Ihre Händlerabrechnung sicher hoch. Unsere Analysten zerlegen diese Zeile für Zeile, um wahre Interchange-Kosten aufzudecken.',
      step1Checks: ['PII automatisch geschwärzt', 'Effektivzins ermittelt', 'Versteckte Gebühren markiert'],
      step2Day: 'Tag 2',
      step2Title: 'Anonymes Bieten',
      step2Body: 'Wir legen Ihre anonymisierten Parameter unserem Netzwerk von über 10 Premium-Anbietern vor, damit diese um Sie konkurrieren.',
      step2Checks: ['Anonymisiertes Verfahren', '10+ erstklassige Anbieter', 'IC+-Preisgestaltung Pflicht'],
      step3Day: 'Tag 3',
      step3Title: 'Einsparungspräsentation',
      step3Body: 'Sie erhalten einen detaillierten Audit-Bericht. Wir zeigen, was Sie jetzt zahlen, zahlen sollten, und die besten Gebote.',
      step3Checks: ['Direkter Vergleich', 'Keine Wechselverpflichtung', 'Dauerhafte Einsparung'],
      step4Day: 'Woche 2',
      step4Title: 'Implementierung',
      step4Body: 'Wir verwalten den gesamten Migrationsprozess inklusive neu programmierter Terminals und POS-Integration ohne Ausfallzeit.',
      step4Checks: ['Kein Systemausfall', 'Kostenlose Hardware', 'Einfache POS-Integration'],
      ctaTitle: 'Starten Sie Tag 1 jetzt.',
      ctaSubtitle: "Laden Sie Ihre Abrechnung hoch, und erhalten Sie morgen Gebote. Das Audit ist komplett kostenlos.",
      ctaBtn: 'Kostenloses Audit starten'
    }
  },
  zh: {
    Process: {
      metaTitle: '我们的流程 | FinTech 5',
      metaDesc: 'FinTech 5 如何为您协商更低的收单费率。',
      bgText1: '我们的',
      bgText2: '方法',
      badge: '工作原理',
      title1: '从查阅账单到落实省钱',
      title2: '不到一周。',
      subtitle: '我们包揽审计、谈判和更新系统的繁重工作。您只需审核数字，拍板决定。',
      step1Day: '第 1 天',
      step1Title: '数据提取标准化',
      step1Body: '您安全上传商户账单后，分析师逐条拆解，剔除无理收费，算清您真实的收单机构溢价。',
      step1Checks: ['自动涂掉隐私信息', '梳理出实际的综合费率', '揪出隐藏的扣费项目'],
      step2Day: '第 2 天',
      step2Title: '匿名竞标寻找最佳机构',
      step2Body: '我们将您的交易画像匿名后交由 10 多家顶尖收单机构进行激烈竞标，强制他们按最低的 Interchange-Plus 定价竞争。',
      step2Checks: ['完全匿名的竞标流程', '超 10 家一手支付机构', '必须执行 IC+ 费率模式'],
      step3Day: '第 3 天',
      step3Title: '出具省钱评估',
      step3Body: '我们将出具详尽的综合审计报告，告诉您现在的真实费率和排名前三的竞标方案，而最终决定权在您。',
      step3合并Checks: ['并排直观对比数字', '不想换也完全没强求', '彻底锁定费率的永久洼地'],
      step3Checks: ['并排直观对比数字', '不想换也完全没强求', '彻底锁定费率的永久洼地'],
      step4Day: '第 2 周',
      step4Title: '敲定与新系统割接',
      step4Body: '只要您同意更换，剩下的繁琐迁徙由我们全部搞定！我们会发送配置好的新设备，对接您现有的收银台，承诺不耽误一天正常营业。',
      step4Checks: ['郑重承诺零断网、零停机', '免费部署全套收款设备', '顺畅对接原收银POS机'],
      ctaTitle: '现在就开启第 1 天操作。',
      ctaSubtitle: "今天只管上传账单，明天您就能拿到多份优惠报价。我们的审计诊断全过程不收一分钱！",
      ctaBtn: '正式发起我的免费审计'
    }
  }
}

async function updateAll() {
  for (const [lang, data] of Object.entries(translations)) {
    const file = path.join(__dirname, 'messages', `${lang}.json`)
    let content = {}
    if (fs.existsSync(file)) {
      content = JSON.parse(fs.readFileSync(file, 'utf8'))
    }
    content.Process = data.Process
    fs.writeFileSync(file, JSON.stringify(content, null, 2))
    console.log(`Updated ${lang}.json`)
  }
}

updateAll()

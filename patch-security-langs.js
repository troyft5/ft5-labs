const fs = require('fs')
const path = require('path')

const translations = {
  en: {
    Security: {
      badge: 'Platform Security',
      title1: 'Your financial data is',
      title2: 'locked down.',
      subtitle: 'We know that asking for a merchant statement is asking for immense trust. Here is exactly how we securely ingest, analyze, and protect your processing volume data.',
      cta: 'Upload Statement Securely',
      p1Title: 'Encryption at Rest & Transit',
      p1Body: 'All statements uploaded via our secure portal are encrypted in transit using TLS 1.3 and encrypted at rest utilizing AES-256 bit encryption on enterprise-grade AWS infrastructure.',
      p2Title: 'Auto-Redaction of PII',
      p2Body: 'Our internal ingestion tools are designed to look for pricing tables, transaction volume, and fee markup. We do not store full primary account numbers (PAN) or customer DDA bank routing details found on some localized statements.',
      p3Title: 'Limited Retention Policy',
      p3Body: 'We use your statements strictly to perform the rate audit. Once the competitive bidding process concludes and a pricing model is locked in (or you choose not to proceed), raw statement PDFs are purged from our active processing servers.',
      p4Title: 'Mutual Non-Disclosure (MNDA)',
      p4Body: 'For enterprise clients, government contractors, and healthcare organizations (HIPAA), we are ready to sign a Mutual Non-Disclosure Agreement prior to the exchange of any financial documentation.',
      p4Link: 'Request MNDA Execution',
      btmTitle1: "We don't sell your data. Every bid is blind.",
      btmSubtitle: "When we run a competitive bid across our 10+ processor network, we anonymize your business entity. Processors see your industry, volume, and current hardware setup — but your business name and contact info are stripped out until you explicitly choose a winning bid. They bid on your volume, not your name.",
      b1: 'Zero unsolicited marketing',
      b2: 'Anonymized processor bidding',
      b3: 'Data only shared explicitly'
    }
  },
  es: {
    Security: {
      badge: 'Seguridad de la Plataforma',
      title1: 'Sus datos financieros están',
      title2: 'blindados.',
      subtitle: 'Sabemos que pedir un estado de cuenta es pedir mucha confianza. Así es como ingerimos, analizamos y protegemos de forma segura el volumen de sus datos.',
      cta: 'Subir Estado de Cuenta Seguro',
      p1Title: 'Cifrado en reposo y en tránsito',
      p1Body: 'Todos los estados subidos a través de nuestro portal están cifrados en tránsito usando TLS 1.3 y en reposo usando cifrado AES-256 en infraestructura AWS.',
      p2Title: 'Auto-Redacción de PII',
      p2Body: 'Nuestras herramientas buscan tablas de precios, volumen y margen. No almacenamos números de cuenta primaria (PAN) ni detalles bancarios DDA.',
      p3Title: 'Política de retención limitada',
      p3Body: 'Usamos sus estados estrictamente para auditar la tarifa. Una vez concluye la licitación, los PDFs originales son purgamos de nuestros servidores.',
      p4Title: 'Acuerdo de No Divulgación (MNDA)',
      p4Body: 'Para empresas grandes, contratistas del gobierno y salud (HIPAA), estamos listos para firmar un NDA antes del intercambio de documentación.',
      p4Link: 'Solicitar ejecución de MNDA',
      btmTitle1: "No vendemos sus datos. Toda puja es a ciegas.",
      btmSubtitle: "Cuando lanzamos una puja competitiva en nuestra red, anonimizamos a su empresa. Ven su industria y volumen, pero no su nombre ni contacto hasta que usted elige ganador. Pujan por su volumen, no por su nombre.",
      b1: 'Cero marketing no solicitado',
      b2: 'Licitaciones de procesadores anónimas',
      b3: 'Datos compartidos solo con permiso'
    }
  },
  fr: {
    Security: {
      badge: 'Sécurité de la Plateforme',
      title1: 'Vos données financières sont',
      title2: 'verrouillées.',
      subtitle: 'Nous protégeons rigoureusement chaque document ingéré.',
      cta: 'Uploader en toute sécurité',
      p1Title: 'Chiffrement complet',
      p1Body: 'Les données sont chiffrées selon AES-256 et TLS 1.3 sur AWS.',
      p2Title: 'Anonymisation des données PII',
      p2Body: 'Aucun numéro de carte et aucun élément bancaire critique n\'est stocké.',
      p3Title: 'Rétention très limitée',
      p3Body: 'Les PDF bruts de vos relevés de compte sont immédiatement purgés dès l\'audit terminé.',
      p4Title: 'Accord de Non-Divulgation (MNDA)',
      p4Body: 'Nous signons tous les accords nécessaires (dont HIPAA) avec nos clients entreprises.',
      p4Link: 'Demander un MNDA',
      btmTitle1: 'Appel d\'offres à l\'aveugle.',
      btmSubtitle: 'Les processeurs enchérissent sur votre volume d\'affaires, jamais votre nom d\'entreprise ne leur est dévoilé tant qu\'ils ne gagnent pas.',
      b1: 'Zéro sollicitation',
      b2: 'Biding sans révélation du nom',
      b3: 'Strictement protégé'
    }
  },
  pt: {
    Security: {
      title1: 'Seus dados financeiros',
      title2: 'estão protegidos.',
      badge: 'Segurança'
    }
  },
  de: {
    Security: {
      title1: 'Ihre Finanzdaten',
      title2: 'sind sicher.',
      badge: 'Sicherheit'
    }
  },
  zh: {
    Security: {
      title1: '您的商业流水数据',
      title2: '被最高级别锁定。',
      badge: '安全保障协议'
    }
  }
}

const base = translations.en.Security
for (const lang of ['pt', 'de', 'zh']) {
  translations[lang].Security = { ...base, ...translations[lang].Security }
}

async function patch() {
  for (const [lang, data] of Object.entries(translations)) {
    const file = path.join(__dirname, 'messages', `${lang}.json`)
    if (fs.existsSync(file)) {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'))
      content.Security = data.Security
      fs.writeFileSync(file, JSON.stringify(content, null, 2))
      console.log('patched', lang)
    }
  }
}
patch()

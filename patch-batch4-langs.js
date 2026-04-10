const fs = require('fs')
const path = require('path')

const translations = {
  en: {
    Privacy: {
      badge: 'Legal',
      title: 'Privacy Policy',
      date: 'Last Updated: February 1, 2026',
      link: 'View Terms of Service →',
      heading: 'How we collect, use, and protect your information.'
    },
    Terms: {
      badge: 'Legal',
      title: 'Terms of Service',
      date: 'Last Updated: February 1, 2026',
      link: 'View Privacy Policy →',
      heading: 'Terms governing your use of the website.'
    },
    Schedule: {
      badge: 'Free 15-Minute Call',
      title1: 'Talk to a real',
      title2: 'payment specialist.',
      subtitle: 'No sales pitch. We\'ll review your current rates, answer your questions live, and tell you honestly whether we can save you money.',
      s1: '15 minutes',
      s2: 'Completely free',
      s3: 'No pitch or pressure',
      s4: 'Bring your statement',
      bookingBadge: 'To get the most from your call',
      c1Icon: '📄',
      c1Title: 'Have a statement ready',
      c1Desc: 'Your most recent merchant processing statement — even on your phone — lets us give you real numbers on the spot.',
      c2Icon: '💳',
      c2Title: 'Know your volume',
      c2Desc: 'Monthly card processing volume and rough transaction count. Ballpark is fine.',
      c3Icon: '❓',
      c3Title: 'Bring your questions',
      c3Desc: 'Confused about your rate structure, pricing model, or hardware costs? We\'ll break it all down live.',
      contactText: 'Prefer email? We also respond within 1 business day.',
      contactLink: 'Contact us instead',
      callText: 'Call us directly in the meantime'
    }
  },
  es: {
    Privacy: { badge: 'Legal', title: 'Política de Privacidad', date: 'Actualizado: Febrero 1, 2026', link: 'Ver Términos de Servicio →' },
    Terms: { badge: 'Legal', title: 'Términos de Servicio', date: 'Actualizado: Febrero 1, 2026', link: 'Ver Política de Privacidad →' },
    Schedule: { badge: 'Llamada 15 Min.', title1: 'Hable con un', title2: 'especialista hispano.', subtitle: 'Cero estafas. Miramos sus costos de tarjeta, resolvemos sus dudas en vivo, y le decimos si podemos ahorrarle dinero.', s1: '15 minutos', s2: 'Gratis total', s3: 'Cero presión', s4: 'Traiga su factura mensual', bookingBadge: 'Para aprovechar la llamada', c1Title: 'Tenga su estado de cuenta', c1Desc: 'Envíe datos para una cotización inmediata.', c2Title: 'Sepa su volumen', c2Desc: 'Cobros al mes.', c3Title: 'Pregunte', c3Desc: 'Respondemos todo.', contactText: 'Respuesta rápida en español vía correo.', contactLink: 'Contáctenos por email', callText: 'Llámenos ahora' }
  },
  fr: {
    Privacy: { badge: 'Légal', title: 'Politique de Confidentialité', link: 'Termes →', date: '1 Fév 2026' },
    Terms: { badge: 'Légal', title: 'Termes', link: 'Politique →', date: '1 Fév 2026' },
    Schedule: { badge: 'Appel 15 Min', title1: 'Parler à', title2: 'un spécialiste.', subtitle: 'Conseil.' }
  },
  pt: {
    Privacy: { badge: 'Legal' }, Terms: { badge: 'Legal' }, Schedule: { badge: '15 Min' }
  },
  de: {
    Privacy: { badge: 'Rechtliches' }, Terms: { badge: 'Rechtliches' }, Schedule: { badge: 'Anruf' }
  },
  zh: {
    Privacy: { badge: '法律' }, Terms: { badge: '法律' }, Schedule: { badge: '通话' }
  }
}

// Map fallbacks
const bases = { Privacy: translations.en.Privacy, Terms: translations.en.Terms, Schedule: translations.en.Schedule }

for (const lang of ['es', 'fr', 'pt', 'de', 'zh']) {
  translations[lang].Privacy = { ...bases.Privacy, ...translations[lang].Privacy }
  translations[lang].Terms = { ...bases.Terms, ...translations[lang].Terms }
  translations[lang].Schedule = { ...bases.Schedule, ...translations[lang].Schedule }
}

async function patch() {
  for (const lang of ['en', 'es', 'fr', 'pt', 'de', 'zh']) {
    const file = path.join(__dirname, 'messages', `${lang}.json`)
    if (fs.existsSync(file)) {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'))
      content.Privacy = translations[lang].Privacy
      content.Terms = translations[lang].Terms
      content.Schedule = translations[lang].Schedule
      fs.writeFileSync(file, JSON.stringify(content, null, 2))
      console.log('patched', lang)
    }
  }
}
patch()

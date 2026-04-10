const fs = require('fs')

const file = 'messages/hi.json'
const content = JSON.parse(fs.readFileSync(file, 'utf8'))

content.Hero = {
  badge: "उचित मूल्य-निर्धारण",
  title1: "कोई अधिक शुल्क नहीं।",
  title2: "कमीशन नहीं।",
  subtitle: "सभी के लिए व्यावसायिक भुगतान।",
  ctaAnalyze: "अपनी बचत की गणना करें",
  ctaTalk: "कंसल्टेंट से बात करें", 
  btmText: "48 घंटे में सेटअप • 10+ पार्टनर"
}

content.Navbar = {
  solutionsTitle: "समाधान (Solutions)",
  solutionsDesc: "भुगतान प्राप्त करने के तरीके",
  s1: "पॉइंट ऑफ़ सेल",
  s2: "ई-कॉमर्स",
  s3: "B2B इनवॉइसिंग",
  s4: "उच्च-जोखिम वाले व्यापारी",
  s5: "सभी समाधान देखें →",
  howItWorks: "यह कैसे काम करता है",
  consultingTitle: "परामर्श (Consulting)",
  consultingDesc: "अपनी दरों को अनुकूलित करें",
  c1: "फीस कैलकुलेटर",
  c2: "अपना विवरण जांचें",
  companyTitle: "कंपनी (Company)",
  companyDesc: "हमारे बारे में जानें",
  co1: "हमारे बारे में",
  co2: "संपर्क करें",
  co3: "पार्टनर बनें",
  resources: "संसाधन (Resources)",
  login: "लॉग इन करें",
  callBtn: "कॉल: (646) 941-7853",
  getAnalysisBtn: "निःशुल्क विश्लेषण प्राप्त करें"
}

fs.writeFileSync(file, JSON.stringify(content, null, 2))
console.log('patched hi')

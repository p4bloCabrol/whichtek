const axios = require('axios');

const CMS_RULES = [
  {
    name: 'WordPress',
    confidence: 0.9,
    match: (html, headers) =>
      /wp-content|wp-json|<meta[^>]*WordPress/i.test(html) ||
      (headers['x-generator'] && /WordPress/i.test(headers['x-generator'])),
  },
  {
    name: 'Drupal',
    confidence: 0.85,
    match: (html, headers) =>
      /drupal\.js|\/sites\/default\//i.test(html) ||
      (headers['x-generator'] && /Drupal/i.test(headers['x-generator'])),
  },
  {
    name: 'PrestaShop',
    confidence: 0.8,
    match: (html, headers) =>
      /PrestaShop|\/themes\/classic\//i.test(html),
  },
  {
    name: 'Shopify',
    confidence: 0.8,
    match: (html, headers) =>
      /cdn\.shopify\.com/i.test(html),
  },
  {
    name: 'Magento',
    confidence: 0.8,
    match: (html, headers) =>
      /mage-cache-sessid|\/static\/frontend\//i.test(html),
  },
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL requerida' });
  }
  try {
    const { data: html, headers } = await axios.get(url, { timeout: 7000 });
    for (const rule of CMS_RULES) {
      if (rule.match(html, headers)) {
        return res.json({ cms: rule.name, confidence: rule.confidence });
      }
    }
    return res.json({ cms: 'Desconocido', confidence: 0.1 });
  } catch (e) {
    return res.json({ cms: 'Desconocido', confidence: 0 });
  }
};

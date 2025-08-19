# 📖 Biblia del Proyecto: CMS Detector

## 🎯 Objetivo
Construir un **proyecto web rápido, simple y mantenible** que detecte qué CMS o plataforma utiliza un sitio web dado (ej: WordPress, Drupal, PrestaShop, Shopify, Magento).

---

## 🖥️ Frontend
- **Minimalista**: input de texto, botón y área para mostrar el resultado.  
- **Tecnologías**: HTML + CSS + JavaScript vanilla.  
- **Interacción**:
  - Usuario ingresa una URL.  
  - Se envía petición al backend.  
  - Se muestra el resultado en pantalla.  

---

## ⚙️ Backend
- **Responsabilidades**:
  - Validar la URL (seguridad).  
  - Hacer request al sitio.  
  - Analizar headers y HTML.  
  - Responder con JSON `{ cms, confidence }`.  

- **Stack**: Node.js con Express (o serverless en Vercel/Netlify).  

---

## 🧩 Arquitectura de carpetas
cms-detector/
├── backend/
│ ├── services/
│ │ └── cmsDetector.js # Reglas de detección de CMS (extensible)
│ ├── utils/
│ │ └── urlValidator.js # Validación y normalización de URLs
│ ├── server.js # Configuración de Express + endpoints
│ └── config.js # Configuración global
├── frontend/
│ └── index.html # UI mínima
├── package.json
└── README.md


---

## 🧪 Reglas de detección (heurísticas iniciales)
- **WordPress** → `wp-content`, `wp-json`, meta `"WordPress"`.  
- **Drupal** → `drupal.js`, `/sites/default/`.  
- **PrestaShop** → `"PrestaShop"`, `/themes/classic/`.  
- **Shopify** → `cdn.shopify.com`.  
- **Magento** → `mage-cache-sessid`, `/static/frontend/`.  
- **Fallback** → `"Desconocido"` con baja confianza.  

---

## 📦 Output esperado
### Backend
```json
{
  "cms": "WordPress",
  "confidence": 0.9
}

Frontend

Parece ser WordPress (90% confianza)

🧹 Estándares de código

Código limpio y estructurado (Clean Code).

Principios SOLID (especialmente SRP y OCP).

Funciones pequeñas y autodescriptivas.

Constantes y helpers → evitar magic strings.

Comentarios útiles y puntuales.

Validación de entradas y manejo de errores.

🚀 Futuro

Adaptar a función serverless en Vercel/Netlify.

Extender con más CMS o plataformas detectables.

UI más completa sin perder simplicidad.


---
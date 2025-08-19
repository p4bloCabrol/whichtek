const express = require('express');
const cors = require('cors');
const { detectCMS } = require('./services/cmsDetector');
const { validateUrl } = require('./utils/urlValidator');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/detect', async (req, res) => {
  const { url } = req.body;
  if (!validateUrl(url)) {
    return res.status(400).json({ error: 'URL inválida' });
  }
  try {
    const result = await detectCMS(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

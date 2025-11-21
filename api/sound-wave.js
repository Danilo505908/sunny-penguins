import https from 'https';
import axios from 'axios';

const TARGET_BASE = 'https://sound-wave.b.goit.study/api';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // отключаем проверку сертификата на бекенде (НЕ делайте так в продакшене)
});

export default async function handler(req, res) {
  // Обрезаем префикс /api/sound-wave, оставляя путь и query
  const originalUrl = req.url || '';
  const suffix = originalUrl.replace(/^\/sound-wave/, '') || '/';
  const upstreamUrl = TARGET_BASE + suffix;

  try {
    const upstream = await axios({
      method: req.method || 'GET',
      url: upstreamUrl,
      httpsAgent,
      // Передаём тело только для методов, у которых оно есть
      data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes((req.method || '').toUpperCase())
        ? req.body
        : undefined,
      // Убираем заголовки, которые может не принять апстрим
      headers: {
        ...req.headers,
        host: undefined,
        'content-length': undefined,
      },
      validateStatus: () => true,
    });

    res.status(upstream.status);
    Object.entries(upstream.headers || {}).forEach(([key, value]) => {
      if (typeof value !== 'undefined') {
        res.setHeader(key, value);
      }
    });
    res.send(upstream.data);
  } catch (err) {
    console.error('Proxy error:', err?.message || err);
    res
      .status(502)
      .json({ error: true, message: 'Upstream proxy error', details: String(err?.message || err) });
  }
}



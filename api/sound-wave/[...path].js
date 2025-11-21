import https from 'https';
import axios from 'axios';

const TARGET_BASE = 'https://sound-wave.b.goit.study/api';

const httpsAgent = new https.Agent({
  // Отключаем проверку сертификата на бэкенде, чтобы обойти битый SSL на sound-wave
  // Не используйте такой подход для настоящих продакшен‑API.
  rejectUnauthorized: false,
});

export default async function handler(req, res) {
  // В catch‑all маршруте [...path] Vercel пробрасывает URL уже БЕЗ префикса /api/sound-wave
  // Например: "/genres?page=1&limit=8"
  const suffix = req.url || '/';
  const upstreamUrl = TARGET_BASE + suffix;

  try {
    const method = (req.method || 'GET').toUpperCase();

    const upstream = await axios({
      method,
      url: upstreamUrl,
      httpsAgent,
      data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) ? req.body : undefined,
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



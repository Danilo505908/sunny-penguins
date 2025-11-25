// Vercel serverless function - catch-all для всіх API маршрутів
import app from '../server.js';

export default (req, res) => {
  // Виправляємо URL для Express - додаємо префікс /api якщо його немає
  const originalUrl = req.url;
  if (!originalUrl.startsWith('/api')) {
    req.url = '/api' + (originalUrl.startsWith('/') ? originalUrl : '/' + originalUrl);
  }
  
  // Express app обробляє всі маршрути
  return app(req, res);
};


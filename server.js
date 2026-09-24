import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip / Deflate compression for lightning-fast TTFB and Core Web Vitals
app.use(compression());

// Performance and security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static assets with appropriate caching
app.use(express.static(__dirname, {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.endsWith('.xml') || path.endsWith('.txt')) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Fallback to index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sahab Voyages server running at http://0.0.0.0:${PORT}`);
});


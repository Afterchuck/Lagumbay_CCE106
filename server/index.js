const http = require('node:http');
const { randomUUID } = require('node:crypto');

const PORT = Number(process.env.PORT) || 3001;
let quotes = [
  { id: '1', content: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { id: '2', content: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { id: '3', content: 'Great things are done by a series of small things brought together.', author: 'Vincent van Gogh' },
  { id: '4', content: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
];

function sendJson(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(data, null, 2));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch { reject(new Error('Request body must be valid JSON.')); }
    });
    request.on('error', reject);
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return response.end();
  }

  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const path = url.pathname.replace(/\/$/, '') || '/';

  if (request.method === 'GET' && path === '/') {
    return sendJson(response, 200, { name: 'Quote API', status: 'ok', endpoints: ['/api/quotes', '/api/quotes/random'] });
  }
  if (request.method === 'GET' && path === '/api/quotes') {
    return sendJson(response, 200, { quotes, count: quotes.length });
  }
  if (request.method === 'GET' && path === '/api/quotes/random') {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return quote
      ? sendJson(response, 200, quote)
      : sendJson(response, 404, { error: 'No quotes available.' });
  }
  if (request.method === 'POST' && path === '/api/quotes') {
    try {
      const body = await readJson(request);
      const content = typeof body.content === 'string' ? body.content.trim() : '';
      const author = typeof body.author === 'string' ? body.author.trim() : '';
      if (!content || !author) {
        return sendJson(response, 400, { error: 'Both content and author are required.' });
      }
      const quote = { id: randomUUID(), content, author };
      quotes.push(quote);
      return sendJson(response, 201, quote);
    } catch (error) {
      return sendJson(response, 400, { error: error.message });
    }
  }

  const quoteId = path.match(/^\/api\/quotes\/([^/]+)$/)?.[1];
  if (request.method === 'GET' && quoteId) {
    const quote = quotes.find((item) => item.id === quoteId);
    return quote ? sendJson(response, 200, quote) : sendJson(response, 404, { error: 'Quote not found.' });
  }
  if (request.method === 'DELETE' && quoteId) {
    const existingCount = quotes.length;
    quotes = quotes.filter((item) => item.id !== quoteId);
    return quotes.length < existingCount
      ? sendJson(response, 200, { message: 'Quote deleted.' })
      : sendJson(response, 404, { error: 'Quote not found.' });
  }

  return sendJson(response, 404, { error: 'Endpoint not found.' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Quote API running at http://localhost:${PORT}`);
  console.log('Try GET /api/quotes/random in Postman.');
});

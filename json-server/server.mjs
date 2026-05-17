import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'db.json');

const readDb = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

const writeDb = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

const extractToken = (authHeader) => {
  if (!authHeader) return null;
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
};

const send = (res, status, data) => {
  res.writeHead(status, CORS_HEADERS);
  res.end(JSON.stringify(data));
};

const USER_ID_RE = /^\/api\/users\/(\d+)$/;

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 200, {});
    return;
  }

  const url = req.url?.split('?')[0] ?? '/';
  const method = req.method ?? 'GET';
  const token = extractToken(req.headers['authorization'] ?? '');

  let body = {};
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      body = await parseBody(req);
    } catch {
      send(res, 400, { message: 'Invalid JSON body' });
      return;
    }
  }

  if (method === 'POST' && url === '/api/auth/login') {
    const { email, password } = body;
    const db = readDb();
    const user = db.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      send(res, 401, { message: 'INVALID_USER' });
      return;
    }
    const newToken = `token-${user.id}-${Date.now()}`;
    db.auth_tokens.push({ userId: user.id, token: newToken });
    writeDb(db);
    send(res, 200, { token: newToken, userId: user.id });
    return;
  }

  if (method === 'POST' && url === '/api/auth/logout') {
    if (token) {
      const db = readDb();
      db.auth_tokens = db.auth_tokens.filter((t) => t.token !== token);
      writeDb(db);
    }
    send(res, 200, { message: 'ok' });
    return;
  }

  if (method === 'GET' && url === '/api/auth/me') {
    const db = readDb();
    const entry = db.auth_tokens.find((t) => t.token === token);
    if (!entry) {
      send(res, 401, { message: 'INVALID_USER' });
      return;
    }
    send(res, 200, { userId: entry.userId });
    return;
  }

  if (method === 'POST' && url === '/api/auth/reset-password') {
    const { email } = body;
    const db = readDb();
    const user = db.users.find((u) => u.email === email);
    if (!user) {
      send(res, 404, { message: 'INVALID_USER' });
      return;
    }
    send(res, 200, { message: 'ok' });
    return;
  }

  const userIdMatch = url.match(USER_ID_RE);

  if (method === 'GET' && userIdMatch) {
    const id = Number(userIdMatch[1]);
    const db = readDb();
    const user = db.users.find((u) => u.id === id);
    if (!user) {
      send(res, 404, { message: 'Not Found' });
      return;
    }
    const { password: _p, ...safe } = user;
    send(res, 200, safe);
    return;
  }

  if (method === 'POST' && url === '/api/users') {
    const db = readDb();
    const maxId = db.users.reduce((max, u) => Math.max(max, u.id), 0);
    const newUser = { id: maxId + 1, ...body };
    db.users.push(newUser);
    writeDb(db);
    const { password: _p, ...safe } = newUser;
    send(res, 201, safe);
    return;
  }

  if (method === 'PUT' && userIdMatch) {
    const id = Number(userIdMatch[1]);
    const db = readDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      send(res, 404, { message: 'Not Found' });
      return;
    }
    db.users[idx] = { ...db.users[idx], ...body, id };
    writeDb(db);
    const { password: _p, ...safe } = db.users[idx];
    send(res, 200, safe);
    return;
  }

  if (method === 'DELETE' && userIdMatch) {
    const id = Number(userIdMatch[1]);
    const db = readDb();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) {
      send(res, 404, { message: 'Not Found' });
      return;
    }
    db.users.splice(idx, 1);
    writeDb(db);
    send(res, 200, {});
    return;
  }

  send(res, 404, { message: 'Not Found' });
});

const port = process.env.PORT || 8090;
server.listen(port, () => {
  console.log(`Mock API running on http://localhost:${port}`);
});

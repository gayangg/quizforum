import { app } from './app.js';

// Local server configuration
const HOST = '127.0.0.1';
const PORT = 7777;

app.addEventListener('listen', ({ hostname, port }) => {
  console.log(`Server running on http://${hostname}:${port}/`);
});

app.listen({ hostname: HOST, port: PORT });
import { app } from './app.js';

const HOST = '127.0.0.1';
const PORT = Deno.env.PORT || 7777;

app.addEventListener('listen', ({ hostname, port }) => {
  console.log(`Server running on http://${hostname}:${port}/`);
});

app.listen({ hostname: HOST, port: PORT });
import Server from './bare/Server.mjs';
import { readFileSync } from 'fs';
import http from 'http';
import nodeStatic from 'node-static';

const bare = new Server('/bare/', '');
const serve = new nodeStatic.Server('public/');

const server = http.createServer();

// Add CORS headers to allow requests from any origin
server.on('request', (request, response) => {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (bare.route_request(request, response)) return true;
  serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
  if (bare.route_upgrade(req, socket, head)) return;
  socket.end();
});

const PORT = process.env.PORT || 80; // Specify the port number you want to use

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

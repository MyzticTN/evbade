import Server from './bare/Server.mjs';
import { readFileSync } from 'fs';
import http from 'http';
import nodeStatic from 'node-static';

const bare = new Server('/bare/', '');
const serve = new nodeStatic.Server('public/');

const server = http.createServer();

server.on('request', (request, response) => {
  if (bare.route_request(request, response)) return true;
  serve.serve(request, response);
});

server.on('upgrade', (req, socket, head) => {
  if (bare.route_upgrade(req, socket, head)) return;
  socket.end();
});

const PORT = process.env.PORT || 443; // Specify the port number you want to use

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

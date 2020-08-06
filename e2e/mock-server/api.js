import jsonserver from 'json-server';
const server = jsonserver.create();
const endpoints = jsonserver.router('./mock-db.json');
const middlewares = jsonserver.defaults();

server.use(middlewares);
server.use(endpoints);

export default server;
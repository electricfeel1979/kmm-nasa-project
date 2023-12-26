import http from 'http';

import app from './app';

import {mongoConnect} from './services/mongo';

import planetsModel from './models/planets/planets.model';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  await planetsModel.loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

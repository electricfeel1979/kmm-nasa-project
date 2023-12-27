import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import app from './app';

import {mongoConnect} from './services/mongo';

import planetsModel from './models/planets/planets.model';
import launchesModel from './models/launches/launches.model';

console.log(process.env.PORT);

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  await planetsModel.loadPlanetsData();
  await launchesModel.loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

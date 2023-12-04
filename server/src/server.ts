import http from 'http';
import mongoose, {ConnectOptions} from 'mongoose';

import app from './app';

import planetsModel from './models/planets/planets.model';

const PORT = process.env.PORT || 8000;

// Update below to match your own MongoDB connection string.
const MONGO_URL =
  'mongodb+srv://nasa-api:KQnAGn0hD8g1uqHU@cluster0.g0zgd0s.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await planetsModel.loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

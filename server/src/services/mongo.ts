import mongoose from 'mongoose';

// Update below to match your own MongoDB connection string.
const MONGO_URL =
  'mongodb+srv://nasa-api:KQnAGn0hD8g1uqHU@cluster0.g0zgd0s.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export {mongoConnect, mongoDisconnect};

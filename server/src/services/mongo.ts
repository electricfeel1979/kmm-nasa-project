import mongoose from 'mongoose';

// Update below to match your own MongoDB connection string.
console.log(process.env.MONGO_URL);
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

async function mongoConnect() {
  if (MONGO_URL) {
    await mongoose.connect(MONGO_URL);
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export {mongoConnect, mongoDisconnect};

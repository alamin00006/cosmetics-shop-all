import { Server } from 'http';
import mongoose from 'mongoose'
import app from './app'
import config from './config'


let server: Server;

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database is connected Successfully')
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}
databaseConnection()


//for Asynchronous code
process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection is detected,shutting down...',err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//for synchronous code
process.on('uncaughtException', () => {
  console.log('unhandledException is detected,shutting down...');
  process.exit(1);
});

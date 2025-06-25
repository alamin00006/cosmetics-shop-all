import "dotenv/config";
// x8GxyDDhz6QOyn0e
// const uri = process.env.DATABASE_LOCAL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

const connectWithDB = () => {
  // mongoose.connect(uri, options, (err, db) => {
  //   if (err) console.error(err);
  //   else console.log("database connection succesfull");
  // });
};

export default connectWithDB;

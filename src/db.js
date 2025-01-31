const mongoose =require ('mongoose');
const mongoUri = String(process.env.MONGO_URI);
const connectDB = async () => {
    try {
      await mongoose.connect(mongoUri);
      console.log('Database connected');
    } catch (error) {
      console.error(`Error: ${error}`);
      process.exit(1);
    }
  };

    module.exports = connectDB;
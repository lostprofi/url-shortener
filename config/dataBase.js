const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });
    console.log('Data base is connect...');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/NotesLelo'         //for localhost mongo
// const uri = process.env.MONGOURI


async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('>>>>>>>>>>> db connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

module.exports = { connectDB };

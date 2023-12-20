const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/NotesLelo'         //for localhost mongo
// const uri = 'mongodb+srv://notesleloapp:pEGYyeJWGhwY3eu0@cluster0.ibbrvax.mongodb.net/notesleloapp?retryWrites=true&w=majority';

async function connectDB() {
  try {
    await mongoose.connect(uri
);
    console.log('>>>>>>>>>>> db connected');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

module.exports = { connectDB };

const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/NotesLelo'


async function connectDB(){
    await mongoose.connect(uri);
    console.log('>>>>>>>>>>> db connected')
}

module.exports = {connectDB};
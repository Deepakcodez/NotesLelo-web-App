const express = require('express')
const cors = require('cors')  // use for connection with react (cross origin sharing )
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000
const db = require('./utils/db.connection')
db.connectDB();


// middlewares 
app.use(cors());   //for connection with react
app.use(express.json()); //parse body content
app.use(express.urlencoded()); //parse url encoded content
app.use(cookieParser()) //cookie parser middleware



// routes 
const user = require('./router/user.rout')

app.use('/api/v1/user',user)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
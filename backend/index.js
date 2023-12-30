const express = require('express');
const cors = require("cors"); // use for connection with react (cross origin sharing )
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./utils/db.connection");
db.connectDB();

// middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
})); //for connection with react
app.use(express.json()); //parse body content
app.use(express.urlencoded({ extended: true })); //parse url encoded content
app.use(cookieParser()); //cookie parser middleware

app.get('/test', (req, res) => {
    res.json({ cookies: req.cookies });
});


// routes
const user = require("./router/user.rout");
const group = require("./router/groups.rout");
const notes = require("./router/notes.rout");

app.use("/api/v1/user", user);
app.use("/api/v1/group",group);
app.use("/api/v1/notes",notes)



app.listen(port, () => console.log(`NotesaLelo app listening on port ${port}!`));

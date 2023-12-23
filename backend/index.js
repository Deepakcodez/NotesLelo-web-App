const express = require('express');
const cors = require("cors"); // use for connection with react (cross origin sharing )
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./utils/db.connection");
// routes
const user = require("./router/user.rout");
const group=require("./router/groups.rout");
db.connectDB();

// middlewares
app.use(cors()); //for connection with react
app.use(express.json()); //parse body content
app.use(express.urlencoded({ extended: true })); //parse url encoded content
app.use(cookieParser()); //cookie parser middleware



app.use("/api/v1/user", user);
app.use("/group",group)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

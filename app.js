const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const {default : mongoose} = require("mongoose")
const fileUpload = require('express-fileupload');
const session = require("express-session")
const flash = require('connect-flash');
const cookieParser = require("cookie-parser")
const routes = require("./server/Routes/mainRoute")
const app = express()

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());
app.use(routes)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to MongoDB")
    }
})
app.listen(3000 , () => {
  console.log(`Running on http://localhost:3000`)
})

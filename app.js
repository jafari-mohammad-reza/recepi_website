const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))
app.use(expressLayouts);
app.set("layout" , "./layouts/main")
app.set("view engine" , "ejs")
//app.set("views" , "views")
const routes = require("./server/Routes/mainRoute")
app.use(routes)

app.listen(3000 , () => {
  console.log(`Running on http://localhost:3000`)
})

const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controller/controller')
const session = require('express-session')

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: "top secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure:false,
    sameSite: true,
  }
}))

app.get("/", Controller.landingPage)
app.get("/register", Controller.showRegister)
app.post("/register", Controller.postRegister)
app.get("/login", Controller.login)
app.post("/login", Controller.postLogin)
app.get("/logout", Controller.logOut)

app.use(function (req, res, next) {
  console.log(req.session)
  if(!req.session.userName){
    const error = `please login first`
    res.redirect(`/login/?error=${error}`)
  } else{
    next()
  }
})

app.get("/store/:id", Controller.readStore)
// app.get("/store/products/:id", Controller.readProductDetail)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
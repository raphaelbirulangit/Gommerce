const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controller/controller')

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.get("/", Controller.landingPage)
app.get("/login", Controller.login)
app.post("/login", Controller.postLogin)

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.get("/register", Controller.showRegister)
app.post("/register", Controller.postRegister)
app.get("/store", Controller.readStore)
// app.get("/store/products/:id", Controller.readProductDetail)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
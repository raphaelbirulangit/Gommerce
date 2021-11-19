const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controller/controller')

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/store/:id',Controller.readStorebyId)
app.get('/store/:StoreId/delete/:id', Controller.deleteProduct)
app.get('/store/:id/add', Controller.getAddProduct)
app.post('/store/:id/add', Controller.postAddProduct)
app.get('/store/:StoreId/sell/:id', Controller.getSellProduct)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
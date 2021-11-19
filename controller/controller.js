const {Store, User, Product, Category} = require('../models')
const {Op} = require('sequelize')

class Controller {

    static readStorebyId(req,res){
        const id = req.params.id
        console.log(req.query);
        let order
        if (req.query.sort) {
            if (req.query.sort == 'name') {
                order = [['productName', 'ASC']]
            } else if (req.query.sort == 'price') {
                order = [['productPrice', 'ASC']]
            }
        }
        Product.findAll({
            where: {
                StoreId: id
              },
            order
        })
        .then(data => {
            res.render('store',{data, id})  
          })
        .catch(err => {
            console.log(err);
            res.send(err)})
    }


    static deleteProduct(req,res){
        let id = +req.params.id
        let storeId =req.params.StoreId
        Product
            .destroy({
                where: {
                    id: id
                }
            })
            .then(data => {
                res.redirect(`/store/${storeId}`)
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static getAddProduct(req,res){
        const id = req.params.id

        Category.findAll()
        .then(data => {
            res.render('addProduct',{data, id})  
          })
        .catch(err => {
            console.log(err);
            res.send(err)})
    }

    static postAddProduct(req,res){
        let {productName, productDescription, productQuantity, productPrice, CategoryId} = req.body
        let StoreId = req.params.id

        productName = Product.capslock(productName)

        let newProduct = {productName,productDescription,productQuantity,productPrice,CategoryId,StoreId}

        Product.create(newProduct)
        .then(data => {
            //console.log(StoreId);
            res.redirect(`/store/${StoreId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getSellProduct(req,res){
        let id = +req.params.id
        let StoreId = req.params.StoreId
        Product.
            decrement({ productQuantity: 1 }, { where: { id } })
            .then(data => {
                res.redirect(`/store/${StoreId}`)
            })
            .catch(err => res.send(err))
    }
}
module.exports = Controller
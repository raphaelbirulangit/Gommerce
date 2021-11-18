const {Store, User, Products, Categories} = require('../models')
const {Op} = require('sequelize')
const user = require('../models/user')
const bcryptjs = require('bcryptjs')


class Controller {
    static landingPage(req, res){
        res.render("landingPage")
    }

    static login(req, res){
        res.render("login")
    }

    static postLogin(req, res){
        const {email, password} = req.body

        User.findOne({where: {email}})
        .then(user => {
            if(user){
                const validate = bcryptjs.compareSync(password, user.password)
                if(validate) {
                    req.session.userName = user.userName
                    res.redirect("/store")
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = 'please input registered account'
                return res.redirect(`/login?error=${error}`)


            }
        })
        .catch(err => res.send(err))
    }

    static showRegister(req, res){
        res.render("register")
    }

    static postRegister(req, res){
        let {userName, email, password} = req.body
        User.create({userName, email, password})
        .then((newData) => res.redirect("/login"))
        .catch(err => res.send(err))
        console.log(req.body)
    }

    static readStore(req, res){
        const {StoreId} = req.params
        Store.getProductsbyStoreId(StoreId)
        .then((data) => res.render('store', {data}))
        .catch(err => res.send(err))
    }

}

module.exports = Controller
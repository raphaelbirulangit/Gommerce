const {Store, User} = require('../models')
const {Op} = require('sequelize')

class Controller {
    static landingPage(req, res){
        res.render("landingPage")
    }

    static login(req, res){
        res.render("login")
    }

    static showRegister(req, res){
        res.render("register")
    }

    static postRegister(req, res){
        let {userName, email, password} = req.body
       
        User.create({userName, email, password})
        .then((newData) => res.redirect("/"))
        .catch(err => res.send(err))
    }

    static readStore(req, res){

    }

    static readProductDetail(req, res){
        
    }
}

module.exports = Controller
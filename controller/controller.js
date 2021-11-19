const {Store, User, Products, Categories} = require('../models')
const {Op} = require('sequelize')
const user = require('../models/user')
const bcryptjs = require('bcryptjs')
const nodeMailer = require('nodemailer')


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
                    let error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                let error = 'please input registered account'
                return res.redirect(`/login?error=${error}`)


            }
        })
        .catch(err => res.send(err))
    }

    static showRegister(req, res){
        let {error} = req.query

        res.render("register", {error})
    }

    static postRegister(req, res){
        let {userName, email, password} = req.body
        let {error} = req.query

        User.create({userName, email, password})
        .then((newData) => res.redirect("/login"))
        .catch(err => res.send(err))
        console.log(req.body)

        let mailTransport = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'raphaelbirulangit@gmail.com',
                pass: 'wikiwiki1'
            }
        })

        let mailDetails = {
            from: 'raphaelbirulangit@gmail.com',
            to: `${email}`,
            subject: 'Gommerce registration',
            text: 'Email registered successfully!'
        }

        mailTransport.sendMail(mailDetails, function(err, data) {
            if(err) console.log(err)
            else console.log('email sent successfully!')
        })

    }

    static logOut(){
        req.session.destroy((err) => {
            if(err) res.send(err)
            else{
                res.redirect('/login')
            }
        })
    }

    static readStore(req, res){
        const {StoreId} = req.params
        Store.getProductsbyStoreId(StoreId)
        .then((data) => res.render('store', {data}))
        .catch(err => res.send(err))
    }

}

module.exports = Controller
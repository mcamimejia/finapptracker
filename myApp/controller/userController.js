const axios = require('axios').default;
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const userResource = 'http://localhost:3000/api/users';
const currenciesResource = 'https://openexchangerates.org/api/currencies.json';

const userController = {
    registerForm: (req,res) => {
        axios
            .get(currenciesResource)
            .then(response => {
                res.render("user/registerForm", {currencies : response.data});
            })
            .catch(err => {
                console.log(err)
            });
    },

    create: (req,res) => {
        let validResult = validationResult(req);
        if(!validResult.isEmpty()){
            axios
                .get(currenciesResource)
                .then(response => {
                    return res.render("user/registerForm", {currencies : response.data, errors: validResult.mapped()});
                });
        }else{
            axios.get(userResource).then(result => {
                let emailExist = result.data.find(user => user.email == req.body.email);
                if(emailExist){
                    axios
                        .get(currenciesResource)
                        .then(response => {
                            return res.render("user/registerForm", {currencies : response.data, errors: {
                                email: {
                                    msg: 'User already register'
                                }
                            }});
                        });
                }else {
                    axios
                        .post(userResource, {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            currency: req.body.currency
                        })
                        .then(result => {
                            res.redirect("../users/login");
                        });
                }
            });
        }        
    },
    
    loginForm: (req,res) => {
        res.render("user/loginForm");
    },

    login: (req,res) => {
        axios.get(userResource).then(result => {
            let userToLogin = result.data.find(user => user.email == req.body.email);
            console.log(userToLogin)
            if(userToLogin){
                let verifyPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
                console.log(verifyPassword)
                if(verifyPassword){
                    delete userToLogin.password;

                    req.session.userLogged = userToLogin;

                    return res.redirect("profile/" + req.session.userLogged.user_id);
                }
                return res.render("user/loginForm", {
                    errors: {
                        email: {
                            msg: "Invalid credentials"
                        }
                    }
                });
            }
            return res.render("user/loginForm", {
                errors: {
                    email: {
                        msg: "User not registered"
                    }
                }
            });
        })
        .catch(err => {
            console.log(err)
        });
            
    },

    profile: (req,res) => {
        axios
            .get(userResource + "/" + req.params.id)
            .then(response => {
                let user = response.data;
                let balance = 0;
                user.transactions.forEach(transaction => {
                    if(transaction.type == "Income"){
                        balance = balance + Number(transaction.amount);
                    }else {
                        balance = balance - Number(transaction.amount);
                    }
                });
                res.render('user/profile', {user: user, balance: balance})
            })
            .catch(err => {
                console.log(err)
            });
    },
    
    editForm: (req,res) => {
        let currencyPromise = axios.get(currenciesResource);
        let userPromise = axios.get(userResource + "/" + req.params.id);
        Promise.all([currencyPromise, userPromise])
            .then(([currencyResult, userResult]) => {
                res.render('user/editForm', {user: userResult.data, currencies: currencyResult.data})
            })
            .catch(err => {
                console.log(err)
            });
    },

    update: (req,res) => {
        axios
            .put(userResource + '/' + req.params.id, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                currency: req.body.currency
            })
            .then(result => {
                res.redirect("../profile/" + req.params.id);
            })
            .catch(err => {
                console.log(err)
            });
    },

    delete: (req,res) => {
        axios
            .delete(userResource + '/' + req.params.id)
            .then(result => {
                req.session.destroy();
                res.redirect("/");
            })
            .catch(err => {
                console.log(err)
            });        
    },

    logout: (req,res) => {
        req.session.destroy();
        return res.redirect("/");
    }

}
module.exports = userController;
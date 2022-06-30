const axios = require('axios').default;
const userResource = 'http://localhost:3000/api/users';

const userController = {
    registerForm: (req,res) => {
        res.render("user/registerForm");
    },

    create: (req,res) => {
        
    },
    
    loginForm: (req,res) => {
        res.render("user/loginForm");
    },

    login: (req,res) => {
        
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
                console.log(balance);
                console.log(user);
                res.render('user/profile', {user: user, balance: balance})
            })
            .catch(err => {
                console.log(err)
            });
    },
    
    editForm: (req,res) => {
        axios
            .get(userResource + "/" + req.params.id)
            .then(response => {
                console.log(response.data);
                res.render('user/editForm', {user: response.data})
            })
            .catch(err => {
                console.log(err)
            });
    },

    update: (req,res) => {
        
    },

    delete: (req,res) => {
        
    },

    logout: (req,res) => {
        
    }

}
module.exports = userController;
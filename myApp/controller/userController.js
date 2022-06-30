const axios = require('axios').default;
const resource = 'http://localhost:3000/api/users';

const userController = {
    registerForm: (req,res) => {
        res.render("user/registerForm");
    },
    
    loginForm: (req,res) => {
        res.render("user/loginForm");
    },

    profile: (req,res) => {
        axios
            .get(resource + "/" + req.params.id)
            .then(response => {
                console.log(response.data);
                res.render('user/profile', {user: response.data})
            })
            .catch(err => {
                console.log(err)
            });
    },
    
    editForm: (req,res) => {
        axios
            .get(resource + "/" + req.params.id)
            .then(response => {
                console.log(response.data);
                res.render('user/editForm', {user: response.data})
            })
            .catch(err => {
                console.log(err)
            });
    },

    logout: (req,res) => {
        
    }

}
module.exports = userController;
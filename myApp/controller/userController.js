const userController = {
    registerForm: (req,res) => {
        res.render("user/registerForm");
    },
    
    loginForm: (req,res) => {
        res.render("user/loginForm");
    },

    profile: (req,res) => {
        res.render("user/profile");
    },
    
    editForm: (req,res) => {
        res.render("user/editForm");
    },

    logout: (req,res) => {
        
    }

}
module.exports = userController;
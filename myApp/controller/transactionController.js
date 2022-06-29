const transactionController = {
    getAll: (req,res) => {
        res.render("transaction/transactions");
    },

    byCategory: (req,res) => {
        res.render("transaction/categoryTransactions");
    },

    byType: (req,res) => {
        res.render("transaction/typeTransactions");
    },
    
    creationForm: (req,res) => {
        res.render("transaction/creationForm");
    },

    detail: (req,res) => {
        res.render("transaction/transactionDetail");
    },

    editForm: (req,res) => {
        res.render("transaction/editForm");
    },

}
module.exports = transactionController;
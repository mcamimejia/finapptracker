const axios = require('axios').default;
const {validationResult} = require('express-validator');
const transactionResource = 'http://localhost:3000/api/transactions';
const categoryResource = 'http://localhost:3000/api/categories';

const transactionController = {
    getAll: (req,res) => {
        axios
            .get(transactionResource)
            .then(result => {
                res.render("transaction/transactions", {transactions: result.data});
            })
            .catch(err => {
                console.log(err)
            });
    },

    byCategory: (req,res) => {
        let transactionsPromise = axios.get(transactionResource);
        let categoryPromise = axios.get(categoryResource);
        Promise.all([transactionsPromise, categoryPromise])
            .then(([transactionsResult, categoryResult]) => {
                let transactions = transactionsResult.data.filter(transaction => transaction.category_id == req.params.id);
                let categorySelected = categoryResult.data.find(category => category.category_id == req.params.id);
                console.log(categorySelected)
                res.render("transaction/categoryTransactions", {transactions: transactions, categorySelected: categorySelected});
            })
            .catch(err => {
                console.log(err)
            });
    },

    byType: (req,res) => {
        let typeCode;
        if(req.params.id == 1) {
            typeCode = "Income"
        }else{
            typeCode = "Expense"
        }
        axios
            .get(transactionResource)
            .then(result => {
                let transactions = result.data.filter(transaction => transaction.type == typeCode);
                res.render("transaction/typeTransactions", {transactions: transactions, typeCode: typeCode});
            })
            .catch(err => {
                console.log(err)
            });
    },
    
    creationForm: (req,res) => {
        axios
            .get(categoryResource)
            .then(response => {
                res.render("transaction/creationForm", {categories : response.data});
            })
            .catch(err => {
                console.log(err)
            });
    },

    create: (req,res) => {
        axios
            .post(transactionResource, {
                type: req.body.type,
                amount: req.body.amount,
                date: req.body.date,
                description: req.body.description,
                category_id: req.body.category_id,
                user_id: req.session.userLogged.user_id
            })
            .then(result => {
                res.redirect("/");
            });
    },

    detail: (req,res) => {
        axios
            .get(transactionResource + '/' + req.params.id)
            .then(result => {
                res.render("transaction/transactionDetail", {transaction: result.data});
            })
            .catch(err => {
                console.log(err)
            });
    },

    editForm: (req,res) => {
        let categoryPromise = axios.get(categoryResource);
        let transactionPromise = axios.get(transactionResource + "/" + req.params.id);
        Promise.all([categoryPromise, transactionPromise])
            .then(([categoryResult, transactionResult]) => {
                res.render('transaction/editForm', {categories: categoryResult.data, transaction: transactionResult.data})
            })
            .catch(err => {
                console.log(err)
            });
    },

    update: (req,res) => {
        axios
            .put(transactionResource + '/' + req.params.id, {
                type: req.body.type,
                amount: req.body.amount,
                date: req.body.date,
                description: req.body.description,
                category_id: req.body.category_id,
                user_id: req.session.userLogged.user_id
            })
            .then(result => {
                res.redirect("/");
            })
            .catch(err => {
                console.log(err)
            });
    },

    delete: (req,res) => {
        axios
            .delete(transactionResource + '/' + req.params.id)
            .then(result => {
                res.redirect("/");
            })
            .catch(err => {
                console.log(err)
            });
    },

}
module.exports = transactionController;
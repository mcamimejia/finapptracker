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
        res.render("transaction/creationForm");
    },

    create: (req,res) => {
        
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
        res.render("transaction/editForm");
    },

    update: (req,res) => {
        
    },

    delete: (req,res) => {
        
    },

}
module.exports = transactionController;
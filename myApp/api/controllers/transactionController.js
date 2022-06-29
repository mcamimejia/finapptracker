const db = require('../../database/models');


const controller = {
	create: (req, res) => {
		db.Transaction
            .create({
                type: req.body.type,
                amount: req.body.amount,
                date: req.body.date,
                description: req.body.description,
                category_id: req.body.category_id,
                user_id: req.body.user_id
            })
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions'}, data: response})
            })
            
	},

	list: (req, res) => {
		db.Transaction
            .findAll()
            .then(transactions => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions'}, data: transactions})
            })
	},

    byUser: (req, res) => {
		db.Transaction
            .findAll({
                where: {user_id : req.params.id}
            })
            .then(transactionsByUser => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions/user/'+ req.params.id}, data: transactionsByUser})
            })
	},

    byCategory: (req, res) => {
		db.Transaction
            .findAll({
                where: {category_id : req.params.id}
            })
            .then(transactionsByCategory => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions/category/'+ req.params.id}, data: transactionsByCategory})
            })
	},

	detail: (req, res) => {
		db.Transaction
            .findByPk(req.params.id)
            .then(transaction => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions/' + req.params.id}, data: transaction})
            })
	},

	update: (req, res) => {
		db.Transaction
            .update(
                {
                    type: req.body.type,
                    amount: req.body.amount,
                    date: req.body.date,
                    description: req.body.description,
                    category_id: req.body.category_id,
                    user_id: req.body.user_id
                },
                { where: {transaction_id: req.params.id}}
            )
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions/' + req.params.id}, data: response})
            })
	},

	delete: (req, res) => {
		db.Transaction
            .destroy({
                where: {
                    transaction_id: req.params.id
                }
            })
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/transactions/' + req.params.id}, data: response})
            })
	}
}

module.exports = controller;
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
                return res.json(response);
            })
            
	},

	list: (req, res) => {
		db.Transaction
            .findAll()
            .then(transactions => {
                return res.json(transactions);
            })
	},

	detail: (req, res) => {
		db.Transaction
            .findByPk(req.params.id, {
                include: ['category']
            })
            .then(transaction => {
                return res.json(transaction);
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
                return res.json(response);
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
                return res.json(response);
            })
	}
}

module.exports = controller;
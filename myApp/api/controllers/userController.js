const db = require('../../database/models');
const bcryptjs = require('bcryptjs');


const controller = {
	create: (req, res) => {
		db.User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                currency: req.body.currency
            })
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/users'}, data: response})
            })
            
	},

	list: (req, res) => {
		db.User
            .findAll()
            .then(users => {
                return res.status(200).json({meta: {status: 200, url: 'api/users'}, data: users})
            })
	},

	detail: (req, res) => {
		db.User
            .findByPk(req.params.id)
            .then(user => {
                return res.status(200).json({meta: {status: 200, url: 'api/users/' + req.params.id}, data: user})
            })
	},

	update: (req, res) => {
		db.User
            .update(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    currency: req.body.currency
                },
                { where: {user_id: req.params.id}}
            )
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/users/' + req.params.id}, data: response})
            })
	},

	delete: (req, res) => {
		db.User
            .destroy({
                where: {
                    user_id: req.params.id
                }
            })
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/users/' + req.params.id}, data: response})
            })
	}
}

module.exports = controller;
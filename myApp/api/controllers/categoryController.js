const db = require('../../database/models');


const controller = {
	create: (req, res) => {
		db.Category
            .create({
                name: req.body.name,
                color: req.body.color
            })
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/categories'}, data: response})
            })
            
	},

	list: (req, res) => {
		db.Category
            .findAll()
            .then(categories => {
                return res.status(200).json({meta: {status: 200, url: 'api/categories'}, data: categories})
            })
	},

	detail: (req, res) => {
		db.Category
            .findByPk(req.params.id)
            .then(category => {
                return res.status(200).json({meta: {status: 200, url: 'api/categories/' + req.params.id}, data: category})
            })
	},

	update: (req, res) => {
		db.Category
            .update(
                {
                    name: req.body.name,
                    color: req.body.color
                },
                { where: {category_id: req.params.id}}
            )
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/categories/' + req.params.id}, data: response})
            })
	},

	delete: (req, res) => {
		db.Category
            .destroy({
                where: {
                    category_id: req.params.id
                }
            })
            .then(response => {
                return res.status(200).json({meta: {status: 200, url: 'api/categories/' + req.params.id}, data: response})
            })
	}
}

module.exports = controller;
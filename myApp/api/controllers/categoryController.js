const db = require('../../database/models');


const controller = {
	create: (req, res) => {
		db.Category
            .create({
                name: req.body.name,
                color: req.body.color
            })
            .then(response => {
                return res.json(response);
            })
            
	},

	list: (req, res) => {
		db.Category
            .findAll()
            .then(categories => {
                return res.json(categories);
            })
	},

	detail: (req, res) => {
		db.Category
            .findByPk(req.params.id)
            .then(category => {
                return res.json(category);
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
                return res.json(response);
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
                return res.json(response);
            })
	}
}

module.exports = controller;
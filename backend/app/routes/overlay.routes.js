module.exports = app => {
	const overlays = require('../controllers/overlay.controller.js')

	var router = require('express').Router();

	router.post('/', overlays.create);
	router.get('/:id', overlays.findOne);
	router.put('/:id', overlays.update);

	app.use('/', router);
}
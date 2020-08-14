module.exports = app => {
    const userController = require('../controllers/users');

    var router = require("express").Router();

    router.post('/authenticate', (req, res, next) => {
        userController.authenticate(req, res, next);
    });

    router.get('/', (req, res, next) => {
        userController.getAll(req, res, next);
    });
    
    app.use('/users', router);
};

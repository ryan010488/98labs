const userService = require('../services/user')

exports.authenticate = (req, res) => {
    userService.authenticate(req.body)
        .then(user => res.json(user));
}

exports.getAll = (req, res) => {
    userService.getAll()
        .then(users => res.json(users));
}

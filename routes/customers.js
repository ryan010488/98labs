const { body, param, check, validationResult } = require('express-validator');

module.exports = app => {
    const customers = require("../controllers/customers.js");
  
    var router = require("express").Router();
  
    router.get("/", customers.findAll);

    router.get("/:id", customers.findOne);

    router.put("/", [
      check('firstname', 'First name can not be empty!').not().isEmpty(),
      check('lastname', 'Last name can not be empty!').not().isEmpty()
    ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      customers.create(req, res);
    });

    router.patch("/:id", [
      check('firstname', 'First name can not be empty!').not().isEmpty(),
      check('lastname', 'Last name can not be empty!').not().isEmpty()
    ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      customers.update(req, res);
    });

    router.delete("/:id", customers.delete);

    app.use('/customers', router);
  };
  
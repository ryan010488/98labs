const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: list } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, list, totalPages, currentPage };
};

exports.create = (req, res) => {
  const model = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    date_of_birth: req.body.date_of_birth,
    is_active: req.body.is_active
  };

  Customer.create(model)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
      });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Customer.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Customer with id=" + id
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Customer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    if (!req.params.id) {
      res.status(400).send({
        message: "Id can not be empty!"
      });
      return;
    }
    
    const id = req.params.id;

    Customer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Customer with id=" + id
        });
      });
};

exports.findAll = (req, res) => {
    const { page, size, firstname, sortby, sortdir } = req.query;
    var condition = firstname ? { firstname: { [Op.like]: `%${firstname}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    Customer.findAndCountAll({ where: condition, order: [[sortby, sortdir]], limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Customers."
            });
        });
};

module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return Customer;
  };
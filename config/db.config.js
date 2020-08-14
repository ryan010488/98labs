module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "sqlserver",
    DB: "_98labs",
    PORT: "3306",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

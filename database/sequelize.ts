const { Sequelize } = require('sequelize');
require("dotenv").config();
const sequelizer = new Sequelize(`${process.env.dbURL}`)
export {sequelizer} ;


 
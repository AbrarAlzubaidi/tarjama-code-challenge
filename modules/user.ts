const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;

import { Category } from "./category.js";
import {Expense} from "./expenses.js";

class User extends Model {
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'user_id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_name'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_email'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_password'
  },
  last_login: {
    type: DataTypes.Date,
    allowNull: true,
    field: 'last_login'
  },
  user_category_id: () => {
    User.belongsTo(Category, {
      foreignKey: { name: 'user_category_id', allowNull: false }
    });
  },
  user_expense_id: () => {
    User.belongsTo(Expense, {
      foreignKey: { name: 'user_expense_id', allowNull: false }
    });
  }
}, { sequelize });

// create a new user
const createUser = async (request: any, response: any) => {
  let {id , name, email, password, last_login} = request.body;

  await User.create({ 
    id: id,
    namr: name,
    email: email,
    password: password,
    last_login: last_login
 });
  User.find().then((data: any) => {
    response.status(200).json(data);
  }).catch(() => {
    response.status(500).send('error there is no recived data');
  });
};

// get a login user
const getLoggedUser = async (request: any, response: any) => {
  let id = request.params.id
  User.findAll({
    where: {
      id: id
    }
  }).then((data: any) => {
    if (response) {
      response.status(200).json(data);
    } else {
      throw new Error('no data')
    }
  })
}

export { createUser, getLoggedUser, User };


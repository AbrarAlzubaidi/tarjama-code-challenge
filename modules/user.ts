import { ConnectionAcquireTimeoutError } from "sequelize/types";

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;
import { Category } from "./category.js";

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
  user_id: (models: any) => {
    Category.belongsTo(models.User, {
      foreignKey: { name: 'user_id', allowNull: false }
    });
  }
}, { sequelize });

// create a new user
const createUser = async (request: any, response: any) => {
  let id = request.body.id;
  let name = request.body.name;
  let email = request.body.email;
  let password = request.body.password;
  let last_login = request.body.last_login;

  await User.create({ id: id, namr: name, email: email, password: password, last_login: last_login });
  User.find().then((data: any) => {
    response.status(200).json(data);
  }).catch(() => {
    response.status(500).send('error there is no recived data');
  });
};

// get a login user
const getLoggedUser = async (request: any, response: Response) => {
  let id = request.params.id
  User.findAll({
    where: {
      authorId: id
    }
  }).then((response: Response) => {
    if (response) {
      response.json();
    } else {
      throw new Error('no data')
    }
  })
}

export { createUser, getLoggedUser, User };


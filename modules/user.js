"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.getLoggedUser = exports.createUser = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;
const category_js_1 = require("./category.js");
const expenses_js_1 = require("./expenses.js");
class User extends Model {
}
exports.User = User;
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
        User.belongsTo(category_js_1.Category, {
            foreignKey: { name: 'user_category_id', allowNull: false }
        });
    },
    user_expense_id: () => {
        User.belongsTo(expenses_js_1.Expense, {
            foreignKey: { name: 'user_expense_id', allowNull: false }
        });
    }
}, { sequelize });
const createUser = async (request, response) => {
    let { id, name, email, password, last_login } = request.body;
    await User.create({
        id: id,
        namr: name,
        email: email,
        password: password,
        last_login: last_login
    });
    User.find().then((data) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error there is no recived data');
    });
};
exports.createUser = createUser;
const getLoggedUser = async (request, response) => {
    let id = request.params.id;
    User.findAll({
        where: {
            id: id
        }
    }).then((data) => {
        if (response) {
            response.status(200).json(data);
        }
        else {
            throw new Error('no data');
        }
    });
};
exports.getLoggedUser = getLoggedUser;

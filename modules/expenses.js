"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = exports.getExpensebyYear = exports.getExpensebymonth = exports.getExpensebyDay = exports.deleteExpense = exports.editExpense = exports.createExpense = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;
const { Op } = require("sequelize");
const user_js_1 = require("./user.js");
const category_js_1 = require("./category.js");
class Expense extends Model {
}
exports.Expense = Expense;
category_js_1.Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'expenses_id'
    },
    user_expense_id: () => {
        Expense.hasMany(user_js_1.User, {
            foreignKey: { name: 'user_expense_id', allowNull: false, onDelete: 'CASCADE' }
        });
    },
    category_expense_id: () => {
        Expense.hasMany(category_js_1.Category, {
            foreignKey: { name: 'category_expense_id', allowNull: false, onDelete: 'CASCADE' }
        });
    },
    spending_date: {
        type: DataTypes.Date,
        allowNull: true,
        field: 'spending_date'
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'amount'
    }
}, { sequelize });
const createExpense = async (request, response) => {
    let { id, user_expense_id, category_expense_id, spending_date, amount } = request.body.id;
    await category_js_1.Category.create({
        id: id,
        user_expense_id: user_expense_id,
        category_expense_id: category_expense_id,
        spending_date: spending_date,
        amount: amount
    });
    category_js_1.Category.find().then((data) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error there is no received data');
    });
};
exports.createExpense = createExpense;
const getExpensebyDay = async (request, response) => {
    let filter = request.query["day"];
    if (filter) {
        Expense.findAll({
            where: {
                [Op.or]: [
                    { [Op.like]: `%{day}` },
                    { [Op.like]: `{day}%` }
                ]
            }
        }).then((response) => {
            if (response) {
                response.json();
            }
            else {
                throw new Error('no data');
            }
        });
    }
    else {
        Expense.findAll({}).then((response) => {
            if (response) {
                response.json();
            }
            else {
                throw new Error('no data');
            }
        });
    }
};
exports.getExpensebyDay = getExpensebyDay;
const getExpensebymonth = async (request, response) => {
    let filter = request.query["month"];
    if (filter) {
        Expense.findAll({
            where: {
                [Op.or]: [
                    { [Op.like]: `%{month}` },
                    { [Op.like]: `{month}%` }
                ]
            }
        }).then((response) => {
            if (response) {
                response.json();
            }
            else {
                throw new Error('no data');
            }
        });
    }
    else {
        Expense.findAll({}).then((response) => {
            if (response) {
                response.json();
            }
            else {
                throw new Error('no data');
            }
        });
    }
};
exports.getExpensebymonth = getExpensebymonth;
const getExpensebyYear = async (request, response) => {
    let filter = request.query["year"];
    if (filter) {
        Expense.findAll({
            where: {
                [Op.or]: [
                    { [Op.like]: `%{year}` },
                    { [Op.like]: `{year}%` }
                ]
            }
        }).then((response) => {
            if (response) {
                response.json();
            }
            else {
                throw new Error('no data');
            }
        });
    }
    else {
        Expense.findAll({}).then((response) => {
            if (response) {
                response.json();
            }
            else {
                throw new Error('no data');
            }
        });
    }
};
exports.getExpensebyYear = getExpensebyYear;
const editExpense = async (request, response) => {
    try {
        let expenseId = request.params.id;
        let updateexpense = request.body;
        let option = { new: true };
        category_js_1.Category.findByIdAndUpdate({ _id: expenseId }, updateexpense, option).then((result) => {
            result.name = updateexpense.name;
            result.save();
        });
        let updatedCategoryList = await category_js_1.Category.find({});
        response.status(200).send(updatedCategoryList);
    }
    catch (error) {
        new Error("Something went wrong");
    }
};
exports.editExpense = editExpense;
let deleteExpense = (request, response) => {
    let id = request.params.id;
    Expense.findByIdAndDelete(id).then(() => {
        Expense.find().then((data) => {
            response.status(200).json(data);
        });
    }).catch((error) => {
        response.status(500).send('error there is no Expense to delete');
    });
};
exports.deleteExpense = deleteExpense;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.editCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;
const user_js_1 = require("./user.js");
const expenses_js_1 = require("./expenses.js");
class Category extends Model {
}
exports.Category = Category;
Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id'
    },
    user_category_id: () => {
        Category.hasMany(user_js_1.User, {
            foreignKey: { name: 'user_category_id', allowNull: false, onDelete: 'CASCADE' }
        });
    },
    category_expense_id: () => {
        Category.belongsTo(expenses_js_1.Expense, {
            foreignKey: { name: 'category_expense_id', allowNull: false }
        });
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category_name'
    }
}, { sequelize });
const createCategory = async (request, response) => {
    let { id, user_category_id, name } = request.body;
    await Category.create({ id: id, user_category_id: user_category_id, name: name });
    Category.findAll().then((data) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error you should fill all fields');
    });
};
exports.createCategory = createCategory;
const getCategories = async (request, response) => {
    Category.findAll().then((data) => {
        if (data) {
            response.status(200).json(data);
        }
        else {
            throw new Error('no data');
        }
    });
};
exports.getCategories = getCategories;
const getCategory = async (request, response) => {
    let id = request.params.id;
    Category.findAll({
        where: {
            id: id
        }
    }).then((data) => {
        if (data) {
            response.status(200).json(data);
        }
        else {
            throw new Error('there is no such category');
        }
    });
};
exports.getCategory = getCategory;
const editCategory = async (request, response) => {
    try {
        let categoryId = request.params.id;
        let updatecategory = request.body;
        let option = { new: true };
        Category.findByIdAndUpdate({ _id: categoryId }, updatecategory, option).then((result) => {
            result.name = updatecategory.name;
        });
        let updatedCategoryList = await Category.find({});
        response.status(200).json(updatedCategoryList);
    }
    catch (error) {
        new Error("Something went wrong");
    }
};
exports.editCategory = editCategory;

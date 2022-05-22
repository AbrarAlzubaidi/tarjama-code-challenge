const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;

import {User} from "./user.js";
import {Expense} from "./expenses.js";

class Category extends Model {
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id'
    },
    user_category_id: () => {
        Category.hasMany (User, {
            foreignKey: { name: 'user_category_id', allowNull: false, onDelete: 'CASCADE' }
        });
    },
    category_expense_id: () => {
        Category.belongsTo (Expense, {
            foreignKey: { name: 'category_expense_id', allowNull: false }
        });
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category_name'
    }
}, { sequelize });


// create a new category
const createCategory = async (request: any, response: any) => {
    let {id, user_category_id, name} = request.body;


    await Category.create({ id: id, user_category_id: user_category_id, name: name});
    Category.findAll().then((data: any) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error you should fill all fields');
    });
};

// get a list of categories
const getCategories = async (request: any, response: any) => {
    Category.findAll().then((data: any) => {
        if (data) {
            response.status(200).json(data);
        } else {
            throw new Error('no data')
        }
    })
}

// get a specific category
const getCategory = async (request: any, response: any) => {
    let id = request.params.id
    Category.findAll({
        where: {
            id: id
        }
    }).then((data: any) => {
        if (data) {
            response.status(200).json(data);
        } else {
            throw new Error('there is no such category')
        }
    })
}

// edit a category
const editCategory = async (request: any, response: any) => {
    try {
        let categoryId = request.params.id;
        let updatecategory = request.body;
        let option = { new: true };
        Category.findByIdAndUpdate({_id:categoryId}, updatecategory, option).then((result: any)=>{
            result.name = updatecategory.name;
        });

        let updatedCategoryList= await Category.find({});
        response.status(200).json(updatedCategoryList);

    } catch (error) {
        new Error("Something went wrong")
    }
}

export { createCategory, getCategories, getCategory, editCategory, Category };


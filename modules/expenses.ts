const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;
const { Op } = require("sequelize");

import {User} from "./user.js";
import {Category} from "./category.js";

class Expense extends Model {
}
Category.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'expenses_id'
    },
    user_expense_id: () => {
        Expense.hasMany (User, {
            foreignKey: { name: 'user_expense_id', allowNull: false, onDelete: 'CASCADE' }
        });
    },
    category_expense_id: () => {
        Expense.hasMany (Category, {
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


// create a new expense
const createExpense = async (request: any, response: any) => {
    let {id, user_expense_id, category_expense_id, spending_date, amount} = request.body.id;

    await Category.create({ 
        id: id,
        user_expense_id: user_expense_id,
        category_expense_id: category_expense_id,
        spending_date: spending_date,
        amount: amount
    });
    Category.find().then((data: any) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error there is no received data');
    });
};

// get a list of expense by a day
const getExpensebyDay = async (request: any, response: Response) => {
    let filter = request.query["day"];
    if (filter) {
        Expense.findAll({
            where: {
                [Op.or]: [
                    { [Op.like]: `%{day}` },
                    { [Op.like]: `{day}%` }
                  ]
            }
        }).then((response: Response) => {
            if (response) {
                response.json();
            } else {
                throw new Error('no data')
            }
        })
    } else {
        Expense.findAll({}).then((response: Response) => {
            if (response) {
                response.json();
            } else {
                throw new Error('no data')
            }
        })
    }

}

// get a list of expense by a month
const getExpensebymonth = async (request: any, response: Response) => {
    let filter = request.query["month"];
    if (filter) {
        Expense.findAll({
            where: {
                [Op.or]: [
                    { [Op.like]: `%{month}` },
                    { [Op.like]: `{month}%` }
                  ]
            }
        }).then((response: Response) => {
            if (response) {
                response.json();
            } else {
                throw new Error('no data')
            }
        })
    } else {
        Expense.findAll({}).then((response: Response) => {
            if (response) {
                response.json();
            } else {
                throw new Error('no data')
            }
        })
    }

}

// get a list of expense by a year
const getExpensebyYear = async (request: any, response: Response) => {
    let filter = request.query["year"];
    if (filter) {
        Expense.findAll({
            where: {
                [Op.or]: [
                    { [Op.like]: `%{year}` },
                    { [Op.like]: `{year}%` }
                  ]
            }
        }).then((response: Response) => {
            if (response) {
                response.json();
            } else {
                throw new Error('no data')
            }
        })
    } else {
        Expense.findAll({}).then((response: Response) => {
            if (response) {
                response.json();
            } else {
                throw new Error('no data')
            }
        })
    }
}

// edit an expense
const editExpense = async (request: any, response: any) => {
    try {
        let expenseId = request.params.id;
        let updateexpense = request.body;
        let option = { new: true };
        Category.findByIdAndUpdate({_id:expenseId}, updateexpense, option).then((result: any)=>{
            result.name = updateexpense.name;
            result.save();
        });

        let updatedCategoryList= await Category.find({});
        response.status(200).send(updatedCategoryList);
    } catch (error) {
        new Error("Something went wrong")
    }
}

// delete an expense
let deleteExpense = (request: any, response: any) => {
    let id = request.params.id;
    Expense.findByIdAndDelete(id).then(() => {
        Expense.find().then((data: any) => {
            response.status(200).json(data);
        })
    }).catch((error: never) => {
        response.status(500).send('error there is no Expense to delete');
    });
}

export { 
    createExpense,
    editExpense,
    deleteExpense,
    getExpensebyDay,
    getExpensebymonth, 
    getExpensebyYear,
    Expense
};


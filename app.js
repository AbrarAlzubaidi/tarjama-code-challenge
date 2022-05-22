"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { sequelize } = require("./database/sequelize.js");
const { createUser, getLoggedUser } = require('./modules/user.js');
const { createCategory, getCategories, getCategory, editCategory } = require("./modules/category.js");
const { createExpense, editExpense, deleteExpense, getExpensebyDay, getExpensebymonth, getExpensebyYear } = require("./modules/expenses.js");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
try {
    if (sequelize) {
        app.get("/", (req, res) => {
            return res.send('hello');
        });
        app.get("/api/user/:id", getLoggedUser);
        app.post("/api/create-user", createUser);
        app.get("/api/categories/", getCategories);
        app.get("/api/category/:id", getCategory);
        app.post("/api/create-category", createCategory);
        app.put("/api/edit-category/:id", editCategory);
        app.get("/api/expenses/?day=", getExpensebyDay);
        app.get("/api/expenses/?month=", getExpensebymonth);
        app.get("/api/expenses/?year=", getExpensebyYear);
        app.post("/api/create-expense", createExpense);
        app.put("/api/edit-expense/:id", editExpense);
        app.delete("/api/delete-expense/:id", deleteExpense);
    }
}
catch (error) {
    console.error('Connection Failed:', error);
}
app.listen(port, () => {
    console.log('app is listening');
});
exports.default = app;

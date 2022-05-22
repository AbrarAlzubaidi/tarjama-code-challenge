const express = require('express');
const sequelize = require("./database/sequelize.js")
const {createUser , getLoggedUser} = require('./modules/user.js');
const {createCategory, getCategories, getCategory, editCategory} = require("./modules/category.js")
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.json());

try {
    if (sequelize) {
        app.get("/", (req: any, res: any)=>{   
            return res.send('hello');
        }); 
        // user endpoints
        app.get("/api/user/:id", getLoggedUser );
        app.post("/api/create-user", createUser);
        // category endpoints
        app.get("/api/categories", getCategories);
        app.get("/api/category/:id", getCategory);
        app.post("/api/create-category", createCategory);
        app.put("/api/edit-category/:id", editCategory);
    }
  } catch (error) {
    console.error('Connection Failed:', error);
  }


app.listen(port, () => {
    console.log('app is listening');
    
})

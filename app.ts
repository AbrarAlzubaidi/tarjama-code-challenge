const express = require('express');
const sequelize = require("./database/sequelize.js")
const {createUser , getLoggedUser} = require('./TSmodules/user.js');
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

try {
    if (sequelize) {
        app.get("/", (req: any, res: any)=>{   
            return res.send('hello');
        }); 
        app.get("/api/user/:id", getLoggedUser );
        app.post("/api/create-user", createUser);
    }
  } catch (error) {
    console.error('Connection Failed:', error);
  }


app.listen(port, () => {
    console.log('app is listening');
    
})

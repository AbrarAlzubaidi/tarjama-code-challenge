const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelizer = require("../database/sequelize.js");
const sequelize = sequelizer;
import {User} from "./user.js"
class Category extends Model {
}
Category.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id'
    },
    user_id: (models: any) => {
        Category.hasMany (models.User, {
            foreignKey: { name: 'user_id', allowNull: false }
        });
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category_name'
    }
}, { sequelize });


// create a new user
const createCategory = async (request: any, response: any) => {
    let id = request.body.id;
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    let last_login = request.body.last_login;

    await Category.create({ id: id, namr: name, email: email, password: password, last_login: last_login });
    User.find().then((data: any) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error there is no recived data');
    });
};

// get a login user
const getCategories = async (request: any, response: Response) => {
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

const getCategory = async (request: any, response: Response) => {
}

const editCategory = async (request: any, response: Response) => {
}


export { createCategory, getCategories, getCategory, editCategory, Category };


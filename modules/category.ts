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
    user_id: () => {
        Category.hasMany (User, {
            foreignKey: { name: 'user_id', allowNull: false, onDelete: 'CASCADE' }
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
    let user_id = request.body.user_id;
    let name = request.body.name;

    await Category.create({ id: id, user_id: user_id, name: name});
    Category.find().then((data: any) => {
        response.status(200).json(data);
    }).catch(() => {
        response.status(500).send('error there is no received data');
    });
};

// get a login user
const getCategories = async (request: any, response: Response) => {
    Category.findAll().then((response: Response) => {
        if (response) {
            response.json();
        } else {
            throw new Error('no data')
        }
    })
}

const getCategory = async (request: any, response: Response) => {
    let id = request.params.id
    Category.findAll({
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

const editCategory = async (request: any, response: any) => {
    try {
        let categoryId = request.params.id;
        let updatecategory = request.body;
        let option = { new: true };
        Category.findByIdAndUpdate({_id:categoryId}, updatecategory, option).then((result: any)=>{
            result.name = updatecategory.name
            result.save();
        });

        let updatedCategoryList= await Category.find({});
        response.status(200).send(updatedCategoryList);

    } catch (error) {
        new Error("Something went wrong")
    }
}

export { createCategory, getCategories, getCategory, editCategory, Category };


import Sequelize from "../node_modules/sequelize/types/sequelize";
export default  new Sequelize(`${process.env.dbURL}`);


 
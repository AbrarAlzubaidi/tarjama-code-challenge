"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizer = void 0;
const { Sequelize } = require('sequelize');
require("dotenv").config();
const sequelizer = new Sequelize(`${process.env.dbURL}`);
exports.sequelizer = sequelizer;

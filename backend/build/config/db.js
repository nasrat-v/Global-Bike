"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize('global_bike_dev', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

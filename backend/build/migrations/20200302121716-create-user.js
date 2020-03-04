"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const queryInterface = config_1.db.getQueryInterface();
queryInterface.createTable('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});

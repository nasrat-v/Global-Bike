"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'users',
    sequelize: config_1.db,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
User.sync()
    .then(() => console.log('Oh yeah! User table created successfully'))
    .catch(_err => console.log('BTW, did you enter wrong database credentials?'));
exports.default = User;

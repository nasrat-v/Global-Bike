"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        set(password) {
            const hash = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
            this.setDataValue('password', hash);
        },
    },
    firstName: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: 'first_name',
    },
    lastName: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: 'last_name',
    },
    createdAt: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
        field: 'created_at',
    },
    updatedAt: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
        field: 'updated_at',
    },
}, {
    tableName: 'users',
    sequelize: config_1.db,
});
User.authenticate = (email, password) => User.findOne({ where: { email } })
    .then(value => {
    if (bcrypt_1.default.compareSync(password, value.password)) {
        return value;
    }
    return null;
})
    .catch(error => null);
User.sync()
    .then(() => console.log('Oh yeah! User table created successfully'))
    .catch(_err => console.log('BTW, did you enter wrong database credentials?'));
exports.default = User;

import { DataTypes, Model } from 'sequelize';
import { db } from '../config';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default User;

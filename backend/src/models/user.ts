import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import { db } from '../config';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  static authenticate: (email, password) => Promise<User | null>;
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
      set(password: string): void {
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        this.setDataValue('password', hash);
      },
    },
    firstName: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      field: 'last_name',
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
      field: 'updated_at',
    },
  },
  {
    tableName: 'users',
    sequelize: db,
  },
);

User.authenticate = (email: string, password: string) =>
  User.findOne({ where: { email } })
    .then(value => {
      if (bcrypt.compareSync(password, value.password)) {
        return value;
      }
      return null;
    })
    .catch(error => null);

User.sync()
  .then(() => console.log('Oh yeah! User table created successfully'))
  .catch(_err => console.log('BTW, did you enter wrong database credentials?'));

export default User;

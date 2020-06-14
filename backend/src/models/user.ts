import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';

import { db } from '../config';

class User extends Model {
  public static authenticate: (
    email: string,
    password: string,
  ) => Promise<User | null>;
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: new DataTypes.STRING(255),
    },
    password: {
      allowNull: false,
      type: new DataTypes.STRING(255),
      set(password: string): void {
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        // @ts-ignore
        this.setDataValue('password', hash);
      },
    },
    firstName: {
      allowNull: false,
      field: 'first_name',
      type: new DataTypes.STRING(255),
    },
    lastName: {
      allowNull: false,
      field: 'last_name',
      type: new DataTypes.STRING(255),
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: new DataTypes.DATE(),
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: new DataTypes.DATE(),
    },
  },
  {
    sequelize: db,
    tableName: 'users',
  },
);

User.authenticate = (email: string, password: string): Promise<User | null> =>
  User.findOne({ where: { email } })
    .then((value: User | null): User | null => {
      if (!value) {
        return null;
      }
      if (bcrypt.compareSync(password, value.password)) {
        return value;
      }

      return null;
    })
    .catch((): null => null);

// tslint:disable:no-console
User.sync()
  .then((): void => console.log('Oh yeah! User table created successfully'))
  .catch((): void =>
    console.log('BTW, did you enter wrong database credentials?'),
  );
// tslint:enable:no-console

export default User;

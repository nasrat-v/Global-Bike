import { Sequelize } from 'sequelize';

export default new Sequelize('global_bike_dev', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
});

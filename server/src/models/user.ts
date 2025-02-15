import { DataTypes, type Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';
import { type IUser } from '../interfaces.js';

const User = sequelize.define<Model<IUser>>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    external_id_telegram: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dailyScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    monthlyScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastUpdated: {
      type: DataTypes.STRING,
    },
    lastUpdatedMonthly: {
      type: DataTypes.STRING,
    },
    availableLines: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    previousRank: {
      type: DataTypes.INTEGER,
      defaultValue: 999,
    },
  },
  {
    timestamps: true,
    tableName: 'Users',
  },
);

export default User;

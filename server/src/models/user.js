const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const User = sequelize.define(
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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastUpdatedMonthly: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    availableLines: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    previousRank: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = User;

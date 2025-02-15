const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Level = sequelize.define(
  'Level',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfCodeLines: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    xlevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxLines: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Level;

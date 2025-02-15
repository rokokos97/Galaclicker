import { DataTypes, type Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';
import { type ILevel } from '../interfaces.js';

const Level = sequelize.define<Model<ILevel>>(
  'Level',
  {
    id: {
      type: DataTypes.INTEGER,
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

export default Level;

import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Question = db.define("questions", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },

  question: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  img_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  reading: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Question;

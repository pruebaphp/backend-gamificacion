import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const TypeQuestion = db.define("types_question", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  acronym: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default TypeQuestion;

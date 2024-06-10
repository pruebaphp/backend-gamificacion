import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Option = db.define("options", {
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
  is_correct: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Option;

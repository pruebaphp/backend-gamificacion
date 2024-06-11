import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const UserProgress = db.define(
  "user_progress",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },

    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    correct_answers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    incorrect_answers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
);

export default UserProgress;

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
    correct_answers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    incorrect_answers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    total_questions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    previus_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "user_progress",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "id"],
      },
    ],
  }
);

export default UserProgress;

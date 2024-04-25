import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Message = db.define("messages", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_message: {
    type: DataTypes.ENUM('USU', 'AI'),
    allowNull: false,
  },
});

export default Message;

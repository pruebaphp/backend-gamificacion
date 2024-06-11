import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Levels = db.define("levels", {
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
  is_automatic_unlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Por defecto, el nivel no estará automáticamente desbloqueado
  }
});

export default Levels;

import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

const Section = db.define("sections", {
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
});

export default Section;

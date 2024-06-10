import Section from "./sectionsModel.js";
import Subsection from "./subsectionsModel.js";
import User from "./usersModel.js";
import Message from "./MessagesModel.js";
import Question from "./questionsModel.js";
import Level from "./levelsModel.js";
import Difficulty from "./difficultyModel.js";
import Option from "./optionsModel.js";
import TypeQuestion from "./typeQuestionModel.js";

Section.hasMany(Subsection, { foreignKey: "section_id" });
Subsection.belongsTo(Section, { foreignKey: "section_id" });
User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });
Subsection.hasMany(Level, { foreignKey: "subsection_id" });
Level.belongsTo(Subsection, { foreignKey: "subsection_id" });
Difficulty.hasMany(Level, { foreignKey: "difficulty_id" });
Level.belongsTo(Difficulty, { foreignKey: "difficulty_id" });
Level.hasMany(Question, { foreignKey: "level_id" });
Question.belongsTo(Level, { foreignKey: "level_id" });
TypeQuestion.hasMany(Question, { foreignKey: "type_id" });
Question.belongsTo(TypeQuestion, { foreignKey: "type_id" });
Question.hasMany(Option, { foreignKey: "question_id" });
Option.belongsTo(Question, { foreignKey: "question_id" });

export {
  Section,
  Subsection,
  Message,
  User,
  Question,
  Level,
  Difficulty,
  TypeQuestion,
  Option,
};

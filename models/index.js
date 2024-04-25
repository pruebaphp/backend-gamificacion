import Section from "./sectionsModel.js";
import Subsection from "./subsectionsModel.js";
import User from "./usersModel.js";
import Message from "./MessagesModel.js";

Section.hasMany(Subsection, { foreignKey: 'section_id' });
Subsection.belongsTo(Section, { foreignKey: 'section_id' });
User.hasMany(Message, { foreignKey: 'user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

export{
    Section,
    Subsection,
    Message,
    User,
}
import TypeQuestion from "../models/typeQuestionModel.js";

const create = async (req, res) => {
  try {
    const { name, acronym } = req.body;
    const type_question = new TypeQuestion({ name, acronym });
    await type_question.save();
    res.status(200).json({ msg: "Creado con éxito", type_question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Surgió un problema" });
  }
};

const getAll = async (req, res) => {
  // try {
    const types_question = await TypeQuestion.findAll()
    res.status(200).json({ msg: "Tipos encontrados.", types_question });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ msg: "Surgió un problema" });
  // }
};

export { create, getAll };

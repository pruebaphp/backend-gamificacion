import { Option, Question, TypeQuestion } from "../models/index.js";

const create = async (req, res) => {
  const { type_id, level_id, answers, question, reading } = req.body;
  console.log(type_id);
  try {
    const searchType = await TypeQuestion.findOne({ where: { id: type_id } });
    console.log(searchType.acronym);
    switch (searchType.acronym) {
      case "MUL":
        console.log("multiple...");
        await createMultiple(req, res, answers, question, type_id, level_id);
        break;
      case "LEC":
        // Bloque de código que se ejecutará si expresión === valor2
        await createLectura(
          req,
          res,
          answers,
          question,
          reading,
          type_id,
          level_id
        );
        break;
      // Puedes agregar más casos según sea necesario
      default:
        res
          .status(400)
          .json({ status: "error", msg: "Tipo de pregunta no soportado" });
        break;
    }
  } catch (error) {
    console.error("Error in create function:", error);
    res
      .status(500)
      .json({ status: "error", msg: "Ocurrió un error en create" });
  }
};

const createMultiple = async (
  req,
  res,
  answers,
  question,
  type_id,
  level_id
) => {
  try {
    console.log(answers, question, type_id, level_id);
    const createQuestion = new Question({
      question,
      type_id,
      level_id,
    });
    console.log(createQuestion);
    await createQuestion.save();

    const promises = answers.map(async (answer) => {
      const { position, name } = answer;
      const createOption = new Option({
        name,
        position,
        question_id: createQuestion.id,
      });
      return createOption.save();
    });

    await Promise.all(promises);
    console.log("All answers saved successfully");
    res.status(200).json({ status: "ok", msg: "Pregunta MULTIPLE creada" });
  } catch (error) {
    console.error("Error creating question and answers:", error);
    res
      .status(500)
      .json({ status: "error", msg: "No se pudo crear la pregunta" });
  }
};
const createLectura = async (
  req,
  res,
  answers,
  question,
  reading,
  type_id,
  level_id
) => {
  try {
    console.log(answers, question, reading, type_id, level_id);
    const createQuestion = new Question({
      question,
      reading,
      type_id,
      level_id,
    });
    console.log(createQuestion);
    await createQuestion.save();

    const promises = answers.map(async (answer) => {
      const { name, is_correct } = answer;
      const createOption = new Option({
        name,
        is_correct,
        question_id: createQuestion.id,
      });
      return createOption.save();
    });

    await Promise.all(promises);
    console.log("All answers saved successfully");
    res.status(200).json({ status: "ok", msg: "Pregunta de LECTURA creada" });
  } catch (error) {
    console.error("Error creating question and answers:", error);
    res
      .status(500)
      .json({ status: "error", msg: "No se pudo crear la pregunta" });
  }
};
export { create };

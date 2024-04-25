import OpenAI from "openai";
import { Message } from "../models/index.js";
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
});

const getMessage = async (prompt) => {
  const propmpt = prompt + ".Solo dame 20 palabras.";
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: propmpt }],
  });
  return chatCompletion.choices[0].message.content;
};

const getAll = async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const messages = await Message.findAll({
      where: { user_id },
      order: [["createdAt", "ASC"]],
    });
    return res.status(200).json({ messages });
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Se requiere un prompt." });
    }
    const { id: user_id } = req.user;
    const userMessage = new Message({
      message: prompt,
      type_message: "USU",
      user_id,
    });
    await userMessage.save();
    const messageAI = await getMessage(prompt);
    const aiMessage = new Message({
      message: messageAI,
      type_message: "AI",
      user_id,
    });
    await aiMessage.save();
    res.status(200).json({ msg: "Mensaje enviado", aiMessage });
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).json({ msg: "Ocurrio un error al recibir el mensaje." });
  }
};

export { getAll, sendMessage };

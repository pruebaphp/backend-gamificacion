import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import usersRouter from "./routes/usersRouter.js";
import sectionsRouter from "./routes/sectionsRouter.js";
import subsectionsRouter from "./routes/subsectionsRouter.js";
import messagesRouter from "./routes/messagesRouter.js";
import typesQuestionRouter from "./routes/typeQuestionRouter.js";
import difficultyRouter from "./routes/difficultyRouter.js";
import levelRouter from "./routes/levelRouter.js";

const app = express();

app.use(express.json());

dotenv.config();

try {
  await db.authenticate();
  await db.sync({ alter: true });
} catch (error) {
  console.log(error);
}

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.get("/api/test/:id", function (req, res) {
  // Lógica opcional para personalizar la respuesta OPTIONS
  res.setHeader("Allow", "GET, POST");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).json({ status: 23 });
});

app.head("/api/recurso", function (req, res) {
  // Lógica opcional para obtener información sobre el recurso
  const resourceInfo = {
    nombre: "Recurso de ejemplo",
    tipo: "Documento",
    longitud: 1234,
    ultimaModificacion: new Date().toISOString(),
  };

  // Configuración de los encabezados de respuesta
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Length", JSON.stringify(resourceInfo).length);
  res.setHeader("Last-Modified", resourceInfo.ultimaModificacion);

  // Envío de la respuesta sin cuerpo
  res.status(200).end();
});

app.use("/api/users", usersRouter);
app.use("/api/sections", sectionsRouter);
app.use("/api/subsections", subsectionsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/types-question", typesQuestionRouter);
app.use("/api/difficulty", difficultyRouter);
app.use("/api/levels", levelRouter);

app.listen(process.env.PORT, () => {
  console.log(`Proyect start`);
});

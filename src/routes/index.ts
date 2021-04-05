import express from "express";

// Función de flecha que recibe un parametro del index.ts de la raiz del proyecto.
// Esta función se importa y se ejecuta en el index.ts de la raiz del proyecto.
export default (app: express.Application) => {
	app.use("/api/usuarios", require("./usuarios"));
	app.use("/api/login", require("./auth"));
};

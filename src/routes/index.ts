import express from "express";

// Función de flecha que recibe un parametro del index.ts de la raiz del proyecto.
// Esta función se importa y se ejecuta en el index.ts de la raiz del proyecto.
export default (app: express.Application) => {
	app.use("/api/hospitales", require("./hospitales"));
	app.use("/api/login", require("./auth"));
	app.use("/api/medicos", require("./medicos"));
	app.use("/api/todo", require("./busquedas"));
	app.use("/api/upload", require("./uploads"));
	app.use("/api/usuarios", require("./usuarios"));
};

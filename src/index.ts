require("dotenv").config();
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/config";

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Conexión a la DB
dbConnection();

// Rutas
app.get("/", (req, res) => {
	res.json({
		ok: true,
		msg: "Hola mundo",
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Servidor corriendo en puerto: ${port}`);
});

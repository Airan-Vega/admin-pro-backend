require("dotenv").config();
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/config";
import routes from "./routes";
import { Request, Response } from "express";
import path from "path";

// Crear el servidor express
const app = express();

////////////////////// Middlewares /////////////////////////

// Configurar CORS

// const whitelist = ["http://localhost:4200"];

// const corsOptions: cors.CorsOptions = {
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(cors()); // Borrar al finalizar y descomentar lo de arriva

// Lectura y parseo del body
app.use(express.json());

/////////////////////////////////////////////////////////////

// Conexión a la DB
dbConnection();

// Directorio público
app.use(express.static("public"));

// Rutas
routes(app);

// En el caso de que no se encuentre la ruta, que vuelva a ejecutarse el index.html
app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Servidor corriendo en puerto: ${port}`);
});

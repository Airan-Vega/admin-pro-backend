"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./database/config");
const routes_1 = __importDefault(require("./routes"));
// Crear el servidor express
const app = express_1.default();
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
app.use(cors_1.default()); // Borrar al finalizar y descomentar lo de arriva
// Lectura y parseo del body
app.use(express_1.default.json());
/////////////////////////////////////////////////////////////
// Conexión a la DB
config_1.dbConnection();
// Directorio público
app.use(express_1.default.static("public"));
// Rutas
routes_1.default(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});

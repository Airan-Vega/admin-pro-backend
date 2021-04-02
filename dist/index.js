"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./database/config");
// Crear el servidor express
const app = express_1.default();
// Configurar CORS
app.use(cors_1.default());
// Conexión a la DB
config_1.dbConnection();
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

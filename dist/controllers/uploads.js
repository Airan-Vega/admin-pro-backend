"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retornarImagen = exports.fileUpload = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const actualizar_imagen_1 = require("../helpers/actualizar-imagen");
function fileUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tipo = req.params.tipo;
        const id = req.params.id;
        // Validar tipo
        const tiposValidos = ["hospitales", "medicos", "usuarios"];
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                ok: false,
                msg: "Los tipos tienen que ser usuarios, medicos u hospitales",
            });
        }
        // Validar que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: "No hay ningún archivo",
            });
        }
        // Procesar la imagen...
        const file = req.files.imagen;
        const nombreCortado = file.name.split(".");
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        // Validar extensión
        const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
        if (!extensionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: "Las extensiones de archivos permitidos son: png, jpg, jpeg y gif",
            });
        }
        // Generar el nombre del archivo
        const nombreArchivo = `${uuid_1.v4()}.${extensionArchivo}`;
        // Path donde guardamos la imagen en el servidor
        const pathImg = path_1.default.join(__dirname, `../uploads/${tipo}/${nombreArchivo}`);
        // Movemos la imagen dentro del path con mv
        file.mv(pathImg, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: "Error al mover la imagen",
                });
            }
            // Actualizar base de datos
            actualizar_imagen_1.actualizarImagen(tipo, id, nombreArchivo);
            return res.json({
                ok: true,
                msg: "Archivo subido",
                nombreArchivo,
            });
        });
    });
}
exports.fileUpload = fileUpload;
function retornarImagen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tipo = req.params.tipo;
        const file = req.params.file;
        const pathImg = path_1.default.join(__dirname, `../uploads/${tipo}/${file}`);
        const pathImgDefault = path_1.default.join(__dirname, `../uploads/no-img.jpg`);
        // Imagen por defecto
        if (fs_1.default.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
        else {
            return res.sendFile(pathImgDefault);
        }
    });
}
exports.retornarImagen = retornarImagen;
//# sourceMappingURL=uploads.js.map
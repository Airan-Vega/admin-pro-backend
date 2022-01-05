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
exports.actualizarImagen = void 0;
const fs_1 = __importDefault(require("fs"));
const usuario_1 = require("../models/usuario");
const medico_1 = require("../models/medico");
const hospital_1 = require("../models/hospital");
function borrarImagen(path) {
    if (fs_1.default.existsSync(path)) {
        // Borrar la imagen anterior
        fs_1.default.unlinkSync(path);
    }
}
function actualizarImagen(tipo, id, nombreArchivo) {
    return __awaiter(this, void 0, void 0, function* () {
        let pathViejo;
        switch (tipo) {
            case "medicos":
                const medico = yield medico_1.MedicoModel.findById(id);
                if (!medico) {
                    console.log("No hay ningun médico con ese ID");
                    return false;
                }
                pathViejo = `./src/uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo);
                medico.img = nombreArchivo;
                yield medico.save();
                return true;
            case "hospitales":
                const hospital = yield hospital_1.HospitalModel.findById(id);
                if (!hospital) {
                    console.log("No hay ningun hospital con ese ID");
                    return false;
                }
                pathViejo = `./src/uploads/hospitales/${hospital.img}`;
                borrarImagen(pathViejo);
                hospital.img = nombreArchivo;
                yield hospital.save();
                return true;
            case "usuarios":
                const usuario = yield usuario_1.UsuarioModel.findById(id);
                if (!usuario) {
                    console.log("No hay ningun usuario con ese ID");
                    return false;
                }
                pathViejo = `./src/uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejo);
                usuario.img = nombreArchivo;
                yield usuario.save();
                return true;
        }
        console.log("vamos bien");
    });
}
exports.actualizarImagen = actualizarImagen;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const mongoose_1 = require("mongoose");
let schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "USER_ROLE",
    },
    google: {
        type: Boolean,
        default: false,
    },
    terms: {
        type: Boolean,
        default: false,
    },
});
exports.UsuarioModel = mongoose_1.model("Usuario", schema, "Usuario");
//# sourceMappingURL=usuario.js.map
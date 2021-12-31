import { Schema, model } from "mongoose";

export interface Usuario {
	_id: string;
	nombre: string;
	email: string;
	password: string;
	img?: string;
	role: string;
	google: boolean;
	terms: boolean;
}

let schema = new Schema<Usuario>({
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

export const UsuarioModel = model("Usuario", schema, "Usuario");

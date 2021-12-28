import { Schema, model, Document, Types } from "mongoose";
import { Usuario } from "./usuario";
import { Hospital } from "./hospital";

export interface Medico extends Document {
	nombre: string;
	img?: string;
	usuario: Usuario | Types.ObjectId;
	hospital: Hospital | Types.ObjectId;
}

const schema = new Schema<Medico>({
	nombre: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	usuario: {
		type: Types.ObjectId,
		ref: "Usuario",
		required: true,
	},
	hospital: {
		type: Types.ObjectId,
		ref: "Hospital",
		required: true,
	},
});

export const MedicoModel = model("Medico", schema, "Medico");

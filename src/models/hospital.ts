import { Schema, model, Document, Types } from "mongoose";
import { Usuario } from "./usuario";

export interface Hospital extends Document {
	nombre: string;
	img?: string;
	usuario: Usuario | Types.ObjectId;
}

const schema = new Schema<Hospital>({
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
});

export const HospitalModel = model("Hospital", schema, "Hospital");

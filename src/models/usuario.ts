import { DocumentType } from "@typegoose/typegoose";
import {
	prop,
	modelOptions,
	getModelForClass,
	Severity,
} from "@typegoose/typegoose";

@modelOptions({
	schemaOptions: {
		collection: "Usuario",
		toJSON: {
			transform: (doc: DocumentType<Usuario>, object) => {
				delete object.__v;
				delete object.password;
				object.uid = object._id;
				delete object._id;
			},
		},
	},
	options: { allowMixed: Severity.ALLOW },
})
export class Usuario {
	@prop({ required: true })
	nombre: string;
	@prop({ required: true, unique: true })
	email: string;
	@prop({ required: true })
	password: string;
	@prop()
	img?: string;
	@prop({ required: true, default: "USER_ROLE" })
	role: string;
	@prop({ default: false })
	google: boolean;
	@prop({ default: false })
	terms: boolean;
}

export const UsuarioModel = getModelForClass(Usuario);

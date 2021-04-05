import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { DocumentType } from "@typegoose/typegoose";
import { UsuarioModel, Usuario } from "../models/usuario";
import { generarJWT } from "../helpers/jwt";

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const usuarioDB: DocumentType<Usuario> = await UsuarioModel.findOne({
			email,
		});

		// Verificar email
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "El email o la contraseña no son validos",
			});
		}

		// Verificar contraseña
		const validPassword = bcrypt.compareSync(password, usuarioDB.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "El email o la contraseña no son validos",
			});
		}

		// Generar el TOKEN
		const token = await generarJWT(usuarioDB._id);

		return res.status(200).json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
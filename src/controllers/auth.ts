import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { DocumentType } from "@typegoose/typegoose";
import { UsuarioModel, Usuario } from "../models/usuario";
import { generarJWT } from "../helpers/jwt";
import { googleVerify } from "../helpers/google-verify";

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

export async function googleSignIn(req: Request, res: Response) {
	const googleToken = req.body.token;

	try {
		const { name, email, picture } = await googleVerify(googleToken);

		// Verificamos si el email con el que se quiere registrar el usuario,
		// existe en la base de datos
		const usuarioDB = await UsuarioModel.findOne({ email });
		let usuario: DocumentType<Usuario>;
		if (!usuarioDB) {
			// No existe el usuario
			usuario = new UsuarioModel({
				nombre: name,
				email,
				password: "123456789",
				img: picture,
				google: true,
			});
		} else {
			// Existe el usuario
			usuario = usuarioDB;
			usuario.google = true;
		}

		// Guardar en DB
		await usuario.save();

		// Generar el TOKEN
		const token = await generarJWT(usuario._id);

		return res.json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			ok: false,
			msg: "Token de Google no es correcto",
		});
	}
}

export async function renewToken(req: Request, res: Response) {
	const uid = req.uid;
	// Generar el TOKEN
	const token = await generarJWT(uid);
	res.json({
		ok: true,
		token,
	});
}

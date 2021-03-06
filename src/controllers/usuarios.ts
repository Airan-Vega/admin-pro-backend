import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UsuarioModel } from "../models/usuario";
import { generarJWT } from "../helpers/jwt";

export async function getUsuarios(req: Request, res: Response) {
	const from: number = Number(req.query.from) || 0;

	try {
		const [usuarios, total] = await Promise.all([
			/*********** Promesa 1 ****************/
			UsuarioModel.find({}, "nombre email role google img")
				.skip(from)
				.limit(5)
				.lean(),
			/*********** Promesa 2 ****************/
			UsuarioModel.estimatedDocumentCount(),
		]);

		return res.json({
			ok: true,
			usuarios,
			total,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}

export async function crearUsuario(req: Request, res: Response) {
	const { email, password } = req.body;
	try {
		const existeEmail = await UsuarioModel.findOne({
			email,
		});

		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: "Este correo ya existe en la DB",
			});
		}
		const usuario = new UsuarioModel(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		// Guardar usuario
		await usuario.save();

		// Generar TOKEN del usuario
		const token = await generarJWT(usuario._id);

		return res.json({
			ok: true,
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}

export async function actualizarUsuario(req: Request, res: Response) {
	// TODO: Validar token y comprobar si es el usuario correcto
	const uid: string = req.params.id;

	try {
		const usuarioDB = await UsuarioModel.findById(uid).lean();
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "No existe un usuario con ese id",
			});
		}

		// Actualización

		// Yo no quiero actualizar ni el campo de password ni el de google, por lo que
		// los saco del objeto campo
		const { password, google, email, ...campos } = req.body;

		if (usuarioDB.email !== email) {
			const existeEmail = await UsuarioModel.findOne({ email });
			if (existeEmail) {
				return res.status(404).json({
					ok: false,
					msg: "Ya existe un usuario con ese email",
				});
			}
		}
		if (!usuarioDB.google) {
			campos.email = email;
		} else if (usuarioDB.email !== email) {
			return res.status(404).json({
				ok: false,
				msg: "Usuarios de Google no pueden cambiar su correo",
			});
		}

		const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(
			uid,
			campos,
			{ new: true }
		);

		return res.json({
			ok: true,
			usuario: usuarioActualizado,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}

export async function borrarUsuario(req: Request, res: Response) {
	const uid: string = req.params.id;

	try {
		const usuarioDB = await UsuarioModel.findById(uid);

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "No existe un usuario con ese id",
			});
		}

		await UsuarioModel.findByIdAndDelete(uid);

		return res.status(200).json({
			ok: true,
			msg: "Usuario eliminado",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}

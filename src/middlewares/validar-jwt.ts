import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UsuarioModel, Usuario } from "../models/usuario";

export function validarJWT(req: Request, res: Response, next: NextFunction) {
	// Leer el TOKEN (Lo leemos de los Headers), pero también se puede leer de la url
	const token = req.header("x-token") || req.params.token;
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No existe token en la petición",
		});
	}
	try {
		const { uid }: any = jwt.verify(token, process.env.JWT_SECRET);
		req.uid = uid;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			ok: false,
			msg: "TOKEN no valido",
		});
	}
}

export async function validarADMIN_ROLE(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const uid = req.uid;
	try {
		const usuarioDB: Usuario = await UsuarioModel.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "Usuario no existe",
			});
		}

		if (usuarioDB.role !== "ADMIN_ROLE") {
			return res.status(403).json({
				ok: false,
				msg: "Necesita privilegios de administrador",
			});
		}
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
}

export async function validarADMIN_ROLE_O_MismoUsuario(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const uid = req.uid;
	const id = req.params.id;
	try {
		const usuarioDB: Usuario = await UsuarioModel.findById(uid);
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "Usuario no existe",
			});
		}

		if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
			next();
		} else {
			return res.status(403).json({
				ok: false,
				msg: "Necesita privilegios de administrador",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
}

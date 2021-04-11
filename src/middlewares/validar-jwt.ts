import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

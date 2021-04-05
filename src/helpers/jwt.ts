import jwt from "jsonwebtoken";

export function generarJWT(uid: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: "12h",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el JWT");
				} else {
					resolve(token);
				}
			}
		);
	});
}

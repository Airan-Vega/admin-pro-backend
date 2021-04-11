import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { actualizarImagen } from "../helpers/actualizar-imagen";

export async function fileUpload(req: Request, res: Response) {
	const tipo = req.params.tipo;
	const id = req.params.id;

	// Validar tipo
	const tiposValidos = ["hospitales", "medicos", "usuarios"];

	if (!tiposValidos.includes(tipo)) {
		return res.status(400).json({
			ok: false,
			msg: "Los tipos tienen que ser usuarios, medicos u hospitales",
		});
	}

	// Validar que exista un archivo
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: "No hay ningún archivo",
		});
	}

	// Procesar la imagen...
	const file = req.files.imagen as UploadedFile;
	const nombreCortado = file.name.split(".");
	const extensionArchivo = nombreCortado[nombreCortado.length - 1];

	// Validar extensión
	const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
	if (!extensionesValidas.includes(extensionArchivo)) {
		return res.status(400).json({
			ok: false,
			msg: "Las extensiones de archivos permitidos son: png, jpg, jpeg y gif",
		});
	}
	// Generar el nombre del archivo
	const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

	// Path donde guardamos la imagen en el servidor

	const pathImg = path.join(__dirname, `../uploads/${tipo}/${nombreArchivo}`);

	// Movemos la imagen dentro del path con mv
	file.mv(pathImg, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				msg: "Error al mover la imagen",
			});
		}

		// Actualizar base de datos
		actualizarImagen(tipo, id, nombreArchivo);
		return res.json({
			ok: true,
			msg: "Archivo subido",
			nombreArchivo,
		});
	});
}

export async function retornarImagen(req: Request, res: Response) {
	const tipo = req.params.tipo;
	const file = req.params.file;

	const pathImg = path.join(__dirname, `../uploads/${tipo}/${file}`);
	const pathImgDefault = path.join(__dirname, `../uploads/no-img.jpg`);

	// Imagen por defecto
	if (fs.existsSync(pathImg)) {
		return res.sendFile(pathImg);
	} else {
		return res.sendFile(pathImgDefault);
	}
}

import mongoose from "mongoose";

export async function dbConnection() {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Conexión DB exitosa");
	} catch (error) {
		console.log(error);
		throw new Error("Error al conectarse a la base de datos, ver Logs");
	}
}

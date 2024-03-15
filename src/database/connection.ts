import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbURL = process.env.DB_CONNECTION;
    if (!dbURL) {
      throw new Error("Error en la conexion de la base de datos");
    }

    await mongoose.connect(dbURL);
    console.log("Base de datos en linea");
  } catch (error) {
    console.log("Error en la conexion a la base de datos", error);
  }
};

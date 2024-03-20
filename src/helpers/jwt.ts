const jwt = require("jsonwebtoken");

const generateJWT = (
  _id: string,
  login: string = "",//se pode vacio para que no sea un parametro obligatorio
  expiresIn = process.env.EXPIRES_IN,//variable de entorno
  jwtSecret = process.env.JWT_SECRET
) => {
  //nunca se debe enviar informacion sensible aca
  return new Promise((resolve, reject) => {
    const payLoad = {
      _id,
      login,
    };
    jwt.sign(
      payLoad,
      jwtSecret,
      { expiresIn: expiresIn },
      (error: string, token: string) => {
        if (error) {
          console.error(error);
          reject("No se pudo generar el token");
        } else resolve(token);
      }
    );
  });
};
export default generateJWT;
import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import  clienteRoutes  from "./routes/cliente.route"
import cors from "cors";
import  usuarioRoutes  from "./routes/usuario.route"

export class Server {
  private app: Application;
  private port: String;

  private apiPaths = {
    cliente: "/api/v1/cliente",
    usuario: "/api/v1/usuario",
    auth: "/api/v1/auth",
    producto: "/api/v1/producto",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000"; // variable de entorno

    //base de datos
    dbConnection();

    //metodos iniciales
    this.middleWares();

    //rutas
    this.routes();

    
  }

  

  middleWares(){
    this.app.use(cors())
    
    //lecture del body
    this.app.use(express.json()) //todo lo que envie por defecto lo convierte en json
  }

  routes(): void {
    this.app.use(this.apiPaths.cliente, clienteRoutes)
    this.app.use(this.apiPaths.usuario, usuarioRoutes)
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("La aplicacion esta en linea por el puerto:", this.port);
    });
  }
}
//export default Server; OTRA MANERA DE EXPORTAR

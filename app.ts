import dotenv from "dotenv";
import { Server } from "./src/server";


//CONFIGURACION .ENV
dotenv.config();

const server = new Server();

server.listen();
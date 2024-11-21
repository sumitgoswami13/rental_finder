import express, { Application, Request, Response } from "express";
import { DatabaseConnectI } from "./config/db.interface";
import DatabaseConnect from "./config/db.config";
import 'reflect-metadata';
import { userRepositoryI } from "./interfaces/repositories/user.repository.interface";
import User from "./Models/user.models";



class Server{
    private app: Application
    private port: number
    private databaseConnect: DatabaseConnectI;
    //private userRepository: userRepositoryI,

    constructor(){
        this.app = express();
        this.port = 3000
        this.initializeMiddleware();
        this.initializeRoutes();
        this.databaseConnect = new DatabaseConnect()
    }

    private initializeMiddleware(): void {
        this.app.use(express.json());
      }

    private initilizeRepositories (){
    
    }

    private initializeRoutes(): void {
        this.app.get("/", (req: Request, res: Response) => {
          res.send("Hello, welcome to the TypeScript server!");
        });
    
        this.app.get("/api/health", (req: Request, res: Response) => {
          res.json({ status: "Server is running smoothly!" });
        });
      }

    public async start():  Promise<void> {
        try {
            const dbUrl = "postgres://postgres:12345678@localhost:5432/mydatabase";
            await this.databaseConnect.start(dbUrl);
            this.app.listen(this.port, () => {
              console.log(`Server started at port ${this.port}`);
            });
          } catch (error) {
            console.error("Failed to start the server:", error);
          }
        }
}

const server: Server = new Server();
server.start()
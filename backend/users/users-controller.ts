import { Request, Response } from "express";
import User, { Iuser } from "./model"


export class ControllerUser{

    constructor(private UserService:UserService){}
    async registerUser(req:Request,res:Response):Promise<void>{
      try{
        const {name,phone}=req.body as Iuser

        if(!name || !phone){
            res.status(400).json({message:"Name and phone are required"})
            return 
        }

      }

    }
}
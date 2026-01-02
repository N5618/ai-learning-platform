import { Request, Response, NextFunction } from "express";
import { UserService } from "./users-service";

export class ControllerUser {
  constructor(private readonly userService: UserService) {
    this.registerUser = this.registerUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
   }


  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone,password, role } = req.body;
     
      const result = await this.userService.registerUser(name,phone,role);

      res.status(200).json({
        success: true,
        message: result.isExisting ? "WELCOME_BACK" : "USER_CREATED",
        data: result
      });
    } catch (error) {
      next(error);
    }
  };


  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getById(userId);

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };


  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAll();

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  };
}
import { Request, Response, NextFunction } from "express";
import { UserService } from "./users-service";
import * as jwt from 'jsonwebtoken';
// const JWT_SECRET = process.env['JWT_SECRET'] || 'super-secret-key';
const JWT_SECRET = 'my_super_secret_12345';

export class ControllerUser {

  constructor(private readonly userService: UserService) {
    this.registerUser = this.registerUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }



  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, role } = req.body;

      const result = await this.userService.registerUser(name, phone, role);

      const user = result.user;

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        message: result.isExisting ? "WELCOME BACK" : "נרשמת בהצלחה ",
        data: {
          user: user,
          token: token
        }
      });
    } catch (error) {
      next(error);
    }
  }

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
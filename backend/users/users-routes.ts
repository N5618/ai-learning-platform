import { Router } from "express";
import { UserModel } from "./model";
import { UserRepository } from "./users-repository";
import { UserService } from "./users-service";
import { ControllerUser } from "./users-controller";

const router = Router();


const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new ControllerUser(userService);

router.post("/register", userController.registerUser);
router.get("/:id", userController.getUserById.bind);
router.get("/", userController.getAllUsers); 

export default router;

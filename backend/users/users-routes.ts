import { Router } from "express";
import { UserModel } from "./model";
import { UserRepository } from "./users-repository";
import { UserService } from "./users-service";
import { ControllerUser } from "./users-controller";
import { validateRegister } from "../middlweares/validaition-midd"

const router = Router();

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new ControllerUser(userService);

router.post("/register", validateRegister, userController.registerUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);

export default router;

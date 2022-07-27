import { Router } from "express";
import * as usersController from "../controllers/usersController";

const userRouter = Router();

userRouter.get("/", usersController.getAll);
userRouter.get("/:id", usersController.get);
userRouter.put("/:id?", usersController.update);
userRouter.post("/", usersController.create);
userRouter.delete("/:id", usersController.remove);

export { userRouter };

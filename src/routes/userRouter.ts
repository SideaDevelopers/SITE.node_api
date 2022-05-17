import { Router } from 'express'
import { DeleteUserController } from '../controllers/userController/deleteUserController'
import { GetAllUsersController } from '../controllers/userController/getAllUsersController'
import { GetUserController } from '../controllers/userController/getUserController'
import { PostUserController } from '../controllers/userController/postUserController'
import { UserLoginController } from '../controllers/userController/userLoginController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const userRouter = Router()
const postUserController = new PostUserController()
const userLoginController = new UserLoginController()
const getUserController = new GetUserController()
const getallUsersController = new GetAllUsersController()
const deleteUserController = new DeleteUserController()

userRouter.post("/api/user/login", userLoginController.handle)
userRouter.post("/api/user/post", ensureAuthenticated, postUserController.handle)
userRouter.get("/api/user/getById/:id", ensureAuthenticated, getUserController.handle)
userRouter.get("/api/user/getall", ensureAuthenticated, getallUsersController.handle)
userRouter.delete("/api/user/delete/:id", ensureAuthenticated, deleteUserController.handle)

export { userRouter }
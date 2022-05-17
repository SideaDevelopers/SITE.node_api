import { Router } from "express";
import { DeleteNewsLetterController } from "../controllers/newsletter/deleteNewsLetter";
import { GetAllNewsLetter } from "../controllers/newsletter/getallNewsLetter";
import { PostNewsLetter } from "../controllers/newsletter/postNewsLetter";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const newsletterRouter = Router()

const postNewsLetter = new PostNewsLetter()
const getallNewsLetter = new GetAllNewsLetter()
const deleteNewsLetter = new DeleteNewsLetterController()

newsletterRouter.post("/api/newsletter/post", postNewsLetter.handle)
newsletterRouter.get("/api/newsletter/getall", ensureAuthenticated, getallNewsLetter.handle)
newsletterRouter.delete("/api/newsletter/delete/:id", ensureAuthenticated, deleteNewsLetter.handle)

export { newsletterRouter }
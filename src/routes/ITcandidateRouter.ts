import { Router } from "express";
import { DeleteCandidateITController } from "../controllers/itCandidateController/deleteCandidateITController";
import { GetAllCandidateITController } from "../controllers/itCandidateController/getallCandidateITController";
import { GetITCandidateByIdController } from "../controllers/itCandidateController/getITCandidateByIdController";
import { PostItCandidateController } from "../controllers/itCandidateController/postItCandidateController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const itCandidateRouter = Router()
const postCandidate = new PostItCandidateController()
const getAllCandidate = new GetAllCandidateITController()
const deleteCandidate = new DeleteCandidateITController()
const getCandidateById = new GetITCandidateByIdController()

itCandidateRouter.post("/api/candidateIT/post", postCandidate.handle)
itCandidateRouter.delete("/api/candidateIT/delete/:id", ensureAuthenticated, deleteCandidate.handle)
itCandidateRouter.get("/api/candidateIT/getall", ensureAuthenticated, getAllCandidate.handle)
itCandidateRouter.get("/api/candidateIT/getById/:id", ensureAuthenticated, getCandidateById.handle)

export { itCandidateRouter }
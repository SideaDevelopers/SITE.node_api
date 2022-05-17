import { Router } from "express";
import { DeleteCandidateController } from "../controllers/candidateController/deleteCandidateController";
import { GetAllCandidatesController } from "../controllers/candidateController/getAllCandidatesController";
import { GetCandidateByIdController } from "../controllers/candidateController/getCandidateByIdController";
import { PostCandidateController } from "../controllers/candidateController/postCandidateController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const candidateRouter = Router()

const postCandidate = new PostCandidateController()
const getAllCandidates = new GetAllCandidatesController()
const deleteCandidate = new DeleteCandidateController()
const getCandidateById = new GetCandidateByIdController()

candidateRouter.post('/api/candidate/post', postCandidate.handle)
candidateRouter.get("/api/candidate/getall", ensureAuthenticated, getAllCandidates.handle)
candidateRouter.delete("/api/candidate/delete/:id", ensureAuthenticated, deleteCandidate.handle)
candidateRouter.get("/api/candidate/getbyid/:id", ensureAuthenticated, getCandidateById.handle)

export { candidateRouter }
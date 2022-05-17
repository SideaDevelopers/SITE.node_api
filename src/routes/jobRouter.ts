import { Router } from "express";
import { CreateJobController } from "../controllers/job/createJobController";
import { DeleteJobController } from "../controllers/job/deleteJobController";
import { DisableJobController } from "../controllers/job/disableJobController";
import { GetJobByIdController } from "../controllers/job/getJobByIdController";
import { ListJobsController } from "../controllers/job/listJobsController";
import { UpdateJobController } from "../controllers/job/updateJobController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const jobsRouter = Router()

const createJobController = new CreateJobController()
const listJobsController = new ListJobsController()
const deleteJobController = new DeleteJobController()
const updateJobController = new UpdateJobController()
const getJobByIdController = new GetJobByIdController()
const disableJobController = new DisableJobController()

jobsRouter.get('/api/job/getall', listJobsController.handle)
jobsRouter.get('/api/job/getById/:id', getJobByIdController.handle)
jobsRouter.post('/api/job/post', ensureAuthenticated, createJobController.handle)
jobsRouter.delete('/api/job/delete/:id', ensureAuthenticated, deleteJobController.handle)
jobsRouter.put('/api/job/update/:id', ensureAuthenticated, updateJobController.handle)
jobsRouter.put('/api/job/disable/:id', ensureAuthenticated, disableJobController.handle)

export { jobsRouter }
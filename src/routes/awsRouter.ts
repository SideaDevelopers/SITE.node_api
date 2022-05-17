import { Router } from "express";
import { Request, Response } from 'express'
import { DownloadCurriculumController } from "../controllers/awsController/downloadCurriculumController";
import { uploadFile } from "../controllers/awsController/uploadCurriculumController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const awsRouter = Router()

const download = new DownloadCurriculumController()

awsRouter.post("/api/curriculum/upload/:id", upload.single("file"), async (request: any, response: any) => {
    const file = request.file
    const { id } = request.params

    const uploadResponse = await uploadFile(file, id)

    if (uploadResponse.error) {
        return response.status(406).json({
            error: true,
            message: uploadResponse.message
        })
    }

    return response.status(200).json({
        error: false,
        message: "Curriculum uploaded with success."
    })

})

awsRouter.get("/api/curriculum/download/:fileKey", ensureAuthenticated, download.handle)

export { awsRouter }
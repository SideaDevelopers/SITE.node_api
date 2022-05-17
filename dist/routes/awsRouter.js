"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsRouter = void 0;
const express_1 = require("express");
const downloadCurriculumController_1 = require("../controllers/awsController/downloadCurriculumController");
const uploadCurriculumController_1 = require("../controllers/awsController/uploadCurriculumController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const awsRouter = (0, express_1.Router)();
exports.awsRouter = awsRouter;
const download = new downloadCurriculumController_1.DownloadCurriculumController();
awsRouter.post("/api/curriculum/upload/:id", upload.single("file"), async (request, response) => {
    const file = request.file;
    const { id } = request.params;
    const uploadResponse = await (0, uploadCurriculumController_1.uploadFile)(file, id);
    if (uploadResponse.error) {
        return response.status(406).json({
            error: true,
            message: uploadResponse.message
        });
    }
    return response.status(200).json({
        error: false,
        message: "Curriculum uploaded with success."
    });
});
awsRouter.get("/api/curriculum/download/:fileKey", ensureAuthenticated_1.ensureAuthenticated, download.handle);

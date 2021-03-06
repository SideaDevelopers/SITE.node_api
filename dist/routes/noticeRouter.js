"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRouter = void 0;
const express_1 = require("express");
const createNoticeController_1 = require("../controllers/notice/createNoticeController");
const deleteNoticeController_1 = require("../controllers/notice/deleteNoticeController");
const disableNoticeController_1 = require("../controllers/notice/disableNoticeController");
const getNoticeByIdController_1 = require("../controllers/notice/getNoticeByIdController");
const listNoticesController_1 = require("../controllers/notice/listNoticesController");
const updateNoticeController_1 = require("../controllers/notice/updateNoticeController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const noticeRouter = (0, express_1.Router)();
exports.noticeRouter = noticeRouter;
const createNoticeController = new createNoticeController_1.CreateNoticeController();
const listNoticeController = new listNoticesController_1.ListNoticesController();
const getNoticeByIdController = new getNoticeByIdController_1.GetNoticeByIdController();
const updateNoticeController = new updateNoticeController_1.UpdateNoticeController();
const deleteNoticeController = new deleteNoticeController_1.DeleteNoticeController();
const disableNoticeController = new disableNoticeController_1.DisableNoticeController();
noticeRouter.get('/api/notice/getall', listNoticeController.handle);
noticeRouter.get('/api/notice/getById/:id', getNoticeByIdController.handle);
noticeRouter.post('/api/notice/post', ensureAuthenticated_1.ensureAuthenticated, createNoticeController.handle);
noticeRouter.put('/api/notice/update/:id', ensureAuthenticated_1.ensureAuthenticated, updateNoticeController.handle);
noticeRouter.delete('/api/notice/delete/:id', ensureAuthenticated_1.ensureAuthenticated, deleteNoticeController.handle);
noticeRouter.put('/api/notice/disable/:id', ensureAuthenticated_1.ensureAuthenticated, disableNoticeController.handle);

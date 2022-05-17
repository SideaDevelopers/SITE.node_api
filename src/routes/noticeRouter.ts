import { Router } from 'express'
import { CreateNoticeController } from '../controllers/notice/createNoticeController'
import { DeleteNoticeController } from '../controllers/notice/deleteNoticeController'
import { DisableNoticeController } from '../controllers/notice/disableNoticeController'
import { GetNoticeByIdController } from '../controllers/notice/getNoticeByIdController'
import { ListNoticesController } from '../controllers/notice/listNoticesController'
import { UpdateNoticeController } from '../controllers/notice/updateNoticeController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const noticeRouter = Router()

const createNoticeController = new CreateNoticeController()
const listNoticeController = new ListNoticesController()
const getNoticeByIdController = new GetNoticeByIdController()
const updateNoticeController = new UpdateNoticeController()
const deleteNoticeController = new DeleteNoticeController()
const disableNoticeController = new DisableNoticeController()

noticeRouter.get('/api/notice/getall', listNoticeController.handle)
noticeRouter.get('/api/notice/getById/:id', getNoticeByIdController.handle)
noticeRouter.post('/api/notice/post', ensureAuthenticated, createNoticeController.handle)
noticeRouter.put('/api/notice/update/:id', ensureAuthenticated, updateNoticeController.handle)
noticeRouter.delete('/api/notice/delete/:id', ensureAuthenticated, deleteNoticeController.handle)
noticeRouter.put('/api/notice/disable/:id', ensureAuthenticated, disableNoticeController.handle)

export { noticeRouter }
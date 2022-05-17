import { Router } from 'express'
import { ContactController } from '../controllers/contactController/ContactController'

const contactRouter = Router()

const contactController = new ContactController()

contactRouter.post('/api/contact/send', contactController.handle)

export { contactRouter }

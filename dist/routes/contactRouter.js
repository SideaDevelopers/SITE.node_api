"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const ContactController_1 = require("../controllers/contactController/ContactController");
const contactRouter = (0, express_1.Router)();
exports.contactRouter = contactRouter;
const contactController = new ContactController_1.ContactController();
contactRouter.post('/api/contact/send', contactController.handle);

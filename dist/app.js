"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const awsRouter_1 = require("./routes/awsRouter");
const candidateRouter_1 = require("./routes/candidateRouter");
const contactRouter_1 = require("./routes/contactRouter");
const ITcandidateRouter_1 = require("./routes/ITcandidateRouter");
const jobRouter_1 = require("./routes/jobRouter");
const newsletterRouter_1 = require("./routes/newsletterRouter");
const noticeRouter_1 = require("./routes/noticeRouter");
const userRouter_1 = require("./routes/userRouter");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(noticeRouter_1.noticeRouter);
app.use(jobRouter_1.jobsRouter);
app.use(newsletterRouter_1.newsletterRouter);
app.use(contactRouter_1.contactRouter);
app.use(userRouter_1.userRouter);
app.use(candidateRouter_1.candidateRouter);
app.use(ITcandidateRouter_1.itCandidateRouter);
app.use(awsRouter_1.awsRouter);

import express from 'express'
import { awsRouter } from './routes/awsRouter'
import { candidateRouter } from './routes/candidateRouter'
import { contactRouter } from './routes/contactRouter'
import { itCandidateRouter } from './routes/ITcandidateRouter'
import { jobsRouter } from './routes/jobRouter'
import { newsletterRouter } from './routes/newsletterRouter'
import { noticeRouter } from './routes/noticeRouter'
import { userRouter } from './routes/userRouter'

const app = express()

app.use(express.json())
app.use(noticeRouter)
app.use(jobsRouter)
app.use(newsletterRouter)
app.use(contactRouter)
app.use(userRouter)
app.use(candidateRouter)
app.use(itCandidateRouter)
app.use(awsRouter)

export { app }
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import routes from './app/routes'
import globalErrorHandler from './errors/globalErrorHandler'
import notFound from './errors/notFound'
import setupSwagger from './swagger/swaggerConfig'

const app: Application = express()

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001']

app.use(express.json())
// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
    optionsSuccessStatus: 200,
  }),
)

//  Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.options('*', cors())
app.use(express.text())

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: ' Doc - ticket app is running into the server!!!',
  })
})
// Routes
app.use('/api/v1', routes)
// Setup Swagger docs
setupSwagger(app)
//  Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Doc-ticket!!')
})

//  Global error handler
app.use(globalErrorHandler)
app.use(notFound)

export default app

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Application } from 'express'
import { version } from '../../package.json'
import config from '../config'

// Swagger options
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Docticket API Documentation',
      version,
      description: 'API documentation for docticket',
    },
    servers: [
      {
        url: config.port,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/app/modules/**/*.ts'],
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options)

// Function to set up Swagger
const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger

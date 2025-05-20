import swaggerJSDoc, { Options as SwaggerJSDocOptions } from 'swagger-jsdoc';

export const swaggerOptions: SwaggerJSDocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Emissão de MDF-e',
      version: '1.0.0',
      description: 'Documentação da API MDF-e com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/router/*.ts'], // ← Caminho correto onde estão os comentários JSDoc

};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
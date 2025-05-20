// src/docs/openapi.ts
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import { extendZodWithOpenApi, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express from 'express';
import { MdfeDTO } from './service/Dtos/MdfeDto';

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// Registrar schema de entrada
registry.register('EmitirMdfeBody', MdfeDTO);

// Registrar a rota na documentação
registry.registerPath({
  method: 'post',
  path: '/api/send-mdfe',
  description: 'Emite um MDF-e na Nuvem Fiscal',
  request: {
    body: {
      content: {
        'application/json': {
          schema: MdfeDTO,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'MDF-e emitido com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              mensagem: { type: 'string' },
            },
          },
        },
      },
    },
    400: {
      description: 'Erro de validação',
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

const openApiDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'API MDF-e',
    version: '1.0.0',
    description: 'Documentação da API MDF-e com Nuvem Fiscal',
  },
  servers: [
    {
      url: 'http://localhost:4000',
    },
  ],
});

export const swaggerDocs = (app: express.Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
};

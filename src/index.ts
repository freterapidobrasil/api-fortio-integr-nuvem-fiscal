import express from "express";
import cors from "cors";
import router from "./router/router";
import morgan from 'morgan';
import { swaggerDocs } from "./openapi";
// import { swaggerOptions } from "./doc/swagger";
// import swaggerUi from 'swagger-ui-express';
// import { swaggerDocs } from "./openapi";
// import swaggerJSDoc from 'swagger-jsdoc';
// import document from './openapi'; // ← gerado acima

const app = express();


// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

app.use(router);


swaggerDocs(app);

app.listen(process.env.PORT || 4000, () => {
  console.log('Servidor rodando em http://localhost:4000');
  console.log('Swagger: http://localhost:4000/api-docs');
});
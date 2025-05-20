import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('❌ Erro capturado:', {
    mensagem: err.message,
    stack: err.stack,
    rota: req.originalUrl,
    metodo: req.method,
    corpo: req.body,
  });

  const status = err.status || 500;

  res.status(status).json({
    erro: true,
    status,
    mensagem: err.message || 'Erro interno do servidor',
  });
}
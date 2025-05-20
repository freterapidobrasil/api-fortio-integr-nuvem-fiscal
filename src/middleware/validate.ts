import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map(e => ({
        campo: e.path.join('.'),
        mensagem: e.message,
      }));

      res.status(400).json({
        erro: true,
        mensagem: 'Dados inválidos',
        detalhes: errors,
      });

      return; // evita que continue para o next()
    }

    req.body = result.data;
    next(); // dados válidos, continua
  };
}
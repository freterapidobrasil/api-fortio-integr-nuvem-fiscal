import { Request, Response } from 'express';
import { MdfeService } from '../service/MDFeService';
import { debug } from 'console';
import { MdfeDTO } from '../service/Dtos/MdfeDto';
import { z } from 'zod';
import axios from 'axios';

type MdfeInput = z.infer<typeof MdfeDTO>;

export const emitirMdfe = async (req: Request<{}, {}, MdfeInput>, res: Response): Promise<void> => {
  const clientId = 'sLoU3b41yFcvxV5qhxR5';
  const clientSecret = 'pQO2260UPAfIjWQI2ovQ1vETuCSwAjBWTZeljXXH';
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    debug('m=emitirMdfe Iniciando emissão de MDF-e...');


    // const response = await axios.post(
    //   'https://auth.nuvemfiscal.com.br/oauth/token',
    //   new URLSearchParams({
    //     grant_type: 'client_credentials',
    //     scope: 'mdfe',
    //   }),
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Authorization': `Basic ${credentials}`,
    //     },
    //   }
    // );


    // res.status(200).json(response.data.access_token);

 
      const dadosMdfe = req.body; // ← Aqui você pega os dados validados
      
      const service = new MdfeService();
      const resultado = await service.emitirMdfe(dadosMdfe);
      res.status(200).json(resultado);

      // res.json({ mensagem: 'MDF-e emitido com sucesso!' });

  } catch (err: any) {

    // Se o erro veio da API
    if (err.status) {
      debug(err.data)
      res.status(err.status).json(err.data);
    } else {
      debug(err.message)
      res.status(500).json({ erro: err.message || 'Erro interno' });
    }
  }
};
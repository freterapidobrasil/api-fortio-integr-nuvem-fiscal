import e, { Request, Response } from 'express';
import { MdfeService } from '../service/MDFeService';
import { debug } from 'console';
import { MdfeDTO } from '../service/Dtos/MdfeDto';
import { z } from 'zod';
import axios from 'axios';
import { getToken } from '../auth/auth';

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
      
       console.log("Inicio do processo de envio de MDF-e")
      console.log(dadosMdfe)

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

export const downloadMdfe = async (req: Request, res: Response) => {
  const { id, tipo, status } = req.params;

  try {
    const token = await getToken();

    let url = "";
    let contentType = "";
    let ext = "";

    if (tipo === "pdf") {
      if (status === "autorizado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/pdf`
        contentType = "application/pdf";
        ext = "pdf";
      }
      else if (status === "cancelado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/cancelamento/pdf`;
        contentType = "application/pdf";
        ext = "pdf";
      } else if (status === "encerrado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/encerramento/pdf`;
        contentType = "application/pdf";
        ext = "pdf";
      }
    } 
    else if (tipo === "xml") {
      if (status === "autorizado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/xml`;
        contentType = "application/xml";
        ext = "xml";
      }
      else if (status === "cancelado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/cancelamento/xml`;
        contentType = "application/xml";
        ext = "xml";
      }
      else if (status === "encerrado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/encerramento/xml`;
        contentType = "application/xml";
        ext = "xml";
      }
    } else {
      return res.status(400).json({ erro: "Tipo inválido, use pdf ou xml" });
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=mdfe_${id}.${ext}`
    );
    res.send(response.data);
  } 
  catch (err: any) {
    if (err.response) {
      const raw = err.response.data;

      let msg;
      try {
        msg = Buffer.from(raw).toString("utf8"); // converte buffer p/ texto
        msg = JSON.parse(msg); // tenta parsear JSON se possível
      } catch (e) {
        msg = Buffer.from(raw).toString("utf8");
      }

      console.error("Erro download MDF-e:", msg);
      return res.status(500).json({ erro: "Erro download MDF-e:", msg });
    }

    console.error("Erro inesperado:", err.message);
    res.status(500).json({ erro: err.message || "Erro ao baixar MDF-e" });
  }
};
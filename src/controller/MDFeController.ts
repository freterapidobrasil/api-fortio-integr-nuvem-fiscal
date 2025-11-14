import e, { Request, Response } from "express";
import { MdfeService } from "../service/MDFeService";
import { debug } from "console";
import { MdfeDTO } from "../service/Dtos/MdfeDto";
import { z } from "zod";
import axios from "axios";
import { getToken } from "../auth/auth";
import { MdfeEncerramentoInput } from "../repository/MDFeRepository";
import { IdMdfeDto, idMdfeSchema } from "../service/Dtos/IdMdfeDto";
import { mdfeResultadoMock } from "../mock/mdfeMockResponse";


type MdfeInput = z.infer<typeof MdfeDTO>;

export const emitirMdfe = async (
  req: Request<{}, {}, MdfeInput>,
  res: Response
): Promise<void> => {
  const clientId = "sLoU3b41yFcvxV5qhxR5";
  const clientSecret = "pQO2260UPAfIjWQI2ovQ1vETuCSwAjBWTZeljXXH";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    debug("m=emitirMdfe Iniciando emissão de MDF-e...");

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

    console.log("Inicio do processo de envio de MDF-e");
    console.log(dadosMdfe);

    // if (mdfeResultadoMock) {
    //   console.log("⚠️ Retornando MOCK MDF-e para testes!");
    //   res.status(200).json(mdfeResultadoMock);
    // }

    const service = new MdfeService();
    const resultado = await service.emitirMdfe(dadosMdfe);
    res.status(200).json(resultado);

    // res.json({ mensagem: 'MDF-e emitido com sucesso!' });
  } catch (err: any) {
    // Se o erro veio da API
    if (err.status) {
      debug(err.data);
      res.status(err.status).json(err.data);
    } else {
      debug(err.message);
      res.status(500).json({ erro: err.message || "Erro interno" });
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
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/pdf`;
        contentType = "application/pdf";
        ext = "pdf";
      } else if (status === "cancelado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/cancelamento/pdf`;
        contentType = "application/pdf";
        ext = "pdf";
      } else if (status === "encerrado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/encerramento/pdf`;
        contentType = "application/pdf";
        ext = "pdf";
      }
    } else if (tipo === "xml") {
      if (status === "autorizado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/xml`;
        contentType = "application/xml";
        ext = "xml";
      } else if (status === "cancelado") {
        url = `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/cancelamento/xml`;
        contentType = "application/xml";
        ext = "xml";
      } else if (status === "encerrado") {
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
  } catch (err: any) {
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

/**
 * @description Encerra um MDF-e
 * @param {Request<{ id: string }, {}, MdfeEncerramentoInput>} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @throws {Error} Se a API da Nuvem Fiscal retornar um erro
 */
export const encerrarMdfe = async (
  req: Request<{ id: string }, {}, MdfeEncerramentoInput>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dadosEncerramento = req.body;

    debug(`Controlador: Iniciando encerramento do MDF-e ID: ${id}`);

    const service = new MdfeService();
    const resultado = await service.encerrarMdfe(id, dadosEncerramento);

    res.status(200).json(resultado);
  } catch (err: any) {
    // Se o erro veio da API da Nuvem Fiscal
    if (err.status) {
      debug("Erro da API ao encerrar:", err.data);
      res.status(err.status).json(err.data);
    } else {
      // Outros erros
      debug("Erro interno ao encerrar:", err.message);
      res
        .status(500)
        .json({ erro: err.message || "Erro interno ao encerrar MDF-e" });
    }
  }
};


export const getCancellationStatuOfTheMDFe = async (
  req: Request,
  res: Response
) => {
  try {
    
    const service = new MdfeService();

    const idMdfe = idMdfeSchema.safeParse(req.params);

    debug(
      `Controlador: Iniciando consulta do cancelamento do MDF-e ID: ${idMdfe}`
    );

    debug("MDF-e ID: ", idMdfe.data?.id);

    if (!idMdfe.success) {
      const errors = idMdfe.error.issues.map((issue) => issue.message);
      const field = idMdfe.error.issues[0].path?.[0] || "id";

      return res.status(400).json({
        success: false,
        issues: errors,
        field,
        data: null,
      });
    }

    const result = await service.getCancellationStatuOfTheMDFe(idMdfe.data?.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.status) {
      debug("Erro da API ao Consultar o cancelamento do MDF-e: ", error.data);
      res.status(error.status).json(error.data);
    } else {
      debug(
        "Erro interno ao Consultar o cancelamento do MDF-e: ",
        error.message
      );
      res.status(500).json({
        erro:
          error.message || "Erro interno ao Consultar o cancelamento do MDF-e",
      });
    }
  }
};

export const cancellationOfTheMDFe = async (
  req: Request<{ id: string }, {}>,
  res: Response
) => {
  try {
    
    const service = new MdfeService();

    const idMdfe = idMdfeSchema.safeParse(req.params);
    const dadosCancelamento = req.body;

    debug(
      `Controlador: Iniciando  cancelamento do MDF-e ID: ${idMdfe}`
    );

    debug("MDF-e ID: ", idMdfe.data?.id);

    if (!idMdfe.success) {
      const errors = idMdfe.error.issues.map((issue) => issue.message);
      const field = idMdfe.error.issues[0].path?.[0] || "id";

      return res.status(400).json({
        success: false,
        issues: errors,
        field,
        data: null,
      });
    }

    const result = await service.cancellationOfTheMDFe(idMdfe.data?.id, dadosCancelamento);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.status) {
      debug("Erro da API ao Consultar o cancelamento do MDF-e: ", error.data);
      res.status(error.status).json(error.data);
    } else {
      debug(
        "Erro interno ao Consultar o cancelamento do MDF-e: ",
        error.message
      );
      res.status(500).json({
        erro:
          error.message || "Erro interno ao Consultar o cancelamento do MDF-e",
      });
    }
  }
};

/**
 * @description Baixa o DAMDFE do MDF-e
 * @param {Request<{ id: string }, {}, void>} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @throws {Error} Se a API da Nuvem Fiscal retornar um erro
 */
export const DownloadDamdfePDF = async (req: Request, res: Response) => {
  try {
    const service = new MdfeService();

    const idMdfe = idMdfeSchema.safeParse(req.params);

    debug(
      `Controlador: Iniciando download do DAMDFE MDF-e ID: ${idMdfe}`
    );

    if (!idMdfe.success) {
      const errors = idMdfe.error.issues.map((issue) => issue.message);
      const field = idMdfe.error.issues[0].path?.[0] || "id";

      return res.status(400).json({
        success: false,
        issues: errors,
        field,
        data: null,
      });
    }

    const result = await service.downloadDamdfePDF(idMdfe.data?.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.status) {
      debug("Erro da API ao fazer download do DAMDFE do MDF-e: ", error.data);
      res.status(error.status).json(error.data);
    } else {
      debug(
        "Erro interno ao fazer download do DAMDFE do MDF-e: ",
        error.message
      );
      res.status(500).json({
        erro:
          error.message || "Erro interno ao fazer download do DAMDFE do MDF-e",
      });
    }
  }
};


/**
 * @description Faz o download do PDF de encerramento do MDF-e
 * @param {Request<{ id: string }, {}, void>} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @throws {Error} Se a API da Nuvem Fiscal retornar um erro
 */
export const DownloadTheClosingPDF = async (req: Request, res: Response) => {
  try {
    const service = new MdfeService();

    const idMdfe = idMdfeSchema.safeParse(req.params);

    debug(
      `Controlador: Iniciando download do PDF de encerramento do MDF-e ID: ${idMdfe}`
    );

    if (!idMdfe.success) {
      const errors = idMdfe.error.issues.map((issue) => issue.message);
      const field = idMdfe.error.issues[0].path?.[0] || "id";

      return res.status(400).json({
        success: false,
        issues: errors,
        field,
        data: null,
      });
    }

    const result = await service.DownloadTheClosingPDF(idMdfe.data?.id);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.status) {
      debug("Erro da API ao fazer download do PDF de encerramento  do MDF-e: ", error.data);
      res.status(error.status).json(error.data);
    } else {
      debug(
        "Erro interno ao fazer download do PDF de encerramento do MDF-e: ",
        error.message
      );
      res.status(500).json({
        erro:
          error.message || "Erro interno ao fazer download do PDF de encerramento do MDF-e",
      });
    }
  }
};

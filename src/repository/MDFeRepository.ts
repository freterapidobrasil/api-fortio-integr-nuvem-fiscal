import axios from "axios";
import { MdfeDTO } from "../service/Dtos/MdfeDto";
import { z } from "zod";
import { debug } from "console";

type MdfeInput = z.infer<typeof MdfeDTO>;

export interface MdfeEncerramentoInput {
  data_encerramento: string;
  uf_encerramento: string;
  municipio_encerramento: string;
}

export class MDFeRepository {
  async emitir(token: string, dados: MdfeInput) {
    console.log("OBJETO ENVIADO PARA NUVEM");
    console.log(dados);

    try {
      //  'https://api.nuvemfiscal.com.br/mdfe',
      // https://api.sandbox.nuvemfiscal.com.br/mdfe
      const response = await axios.post(
        "https://api.sandbox.nuvemfiscal.com.br/mdfe",
        dados,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log("ERRO DETALHADO DA API:");
      console.log(JSON.stringify(error.response.data, null, 2));
      // Se for erro Axios com resposta da API
      console.log(" ERRO AQUI", error.response.data);
      if (error.response) {
        debug(error.response.data);
        // Repassa o erro da API para frente, pode incluir status e dados
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }

      // Erro de rede ou outro
      throw {
        message: error.message || "Erro desconhecido",
      };
    }
  }

  async encerrarMdfe(
    token: string,
    idMdfe: string,
    dadosEncerramento: MdfeEncerramentoInput
  ) {
    console.log(`Iniciando encerramento do MDF-e ID: ${idMdfe}`);
    console.log("Dados de encerramento:", dadosEncerramento);

    try {
      const response = await axios.post(
        `https://api.sandbox.nuvemfiscal.com.br/mdfe/${idMdfe}/encerramento`,
        dadosEncerramento,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("MDF-e encerrado com sucesso.");
      return response.data;
    } catch (error: any) {
      console.error("ERRO AO ENCERRAR MDF-e:");
      if (error.response) {
        console.error(JSON.stringify(error.response.data, null, 2));
        debug(error.response.data);
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }

      console.error(JSON.stringify(error.response.data, null, 2));
      throw {
        message: error.message || "Erro desconhecido ao encerrar MDF-e",
      };
    }
  }

  /**
   * Consulta o status de cancelamento de um MDF-e.
   * @param {string} token - Token de acesso.
   * @param {string} id - ID do MDF-e.
   * @returns {Promise<any>} - Resposta da API.
   * @throws {Error} - Se a API da Nuvem Fiscal retornar um erro.
   */
  async getCancellationStatuOfTheMDFe(token: string, id: string) {

    try {
      
      const response = await axios.get(
        `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/cancelamento`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("ERRO AO CONSULTAR O CANCELAMENTO DO MDF-e:");
      if (error.response) {
        console.error(JSON.stringify(error.response.data, null, 2));
        debug(error.response.data);
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }
      
    }
  }


  async downloadDamdfePDF(token: string, id: string) {

    try {
      
      const response = await axios.get(
        `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("ERRO AO CONSULTAR O CANCELAMENTO DO MDF-e:");
      if (error.response) {
        console.error(JSON.stringify(error.response.data, null, 2));
        debug(error.response.data);
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }
      
    }
  }

  async DownloadTheClosingPDF(token: string, id: string) {

    try {
      
      const response = await axios.get(
        `https://api.sandbox.nuvemfiscal.com.br/mdfe/${id}/encerramento/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("ERRO AO CONSULTAR O CANCELAMENTO DO MDF-e:");
      if (error.response) {
        console.error(JSON.stringify(error.response.data, null, 2));
        debug(error.response.data);
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }
      
    }
  }
}
// https://api.nuvemfiscal.com.br/mdfe/{id}/encerramento/pdf

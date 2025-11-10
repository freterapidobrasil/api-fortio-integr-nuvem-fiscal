import { debug } from "console";
import { getToken } from "../auth/auth";
import {
  MdfeEncerramentoInput,
  MDFeRepository,
} from "../repository/MDFeRepository";

import { z } from "zod";
import { MdfeDTO } from "./Dtos/MdfeDto";

type MdfeInput = z.infer<typeof MdfeDTO>;

export class MdfeService {
  private repository: MDFeRepository;

  constructor() {
    this.repository = new MDFeRepository();
  }

  async emitirMdfe(dados: MdfeInput) {
    debug("Iniciando emissão de MDF-e...", dados);

    const token = await getToken();

    debug("Token obtido com sucesso.", token);
    const repository = new MDFeRepository();
    const resposta = await repository.emitir(token, dados);
    debug("MDF-e emitido com sucesso");

    console.log("MDF-e: ", resposta.data);
    return resposta;
  }

  async encerrarMdfe(idMdfe: string, dadosEncerramento: MdfeEncerramentoInput) {
    debug(`Iniciando serviço de encerramento para o MDF-e ID: ${idMdfe}`);

    const token = await getToken();
    debug("Token obtido para o encerramento.");

    const resposta = await this.repository.encerrarMdfe(
      token,
      idMdfe,
      dadosEncerramento
    );

    debug("MDF-e encerrado com sucesso através do serviço.");
    console.log("Resposta do encerramento: ", resposta);
    return resposta;
  }

  async getCancellationStatuOfTheMDFe(id: string) {
    const token = await getToken();

    if (!token) {
      throw new Error("Token de acesso ausente.");
    }

    return this.repository.getCancellationStatuOfTheMDFe(token, id);
  }

  async downloadDamdfePDF(id: string) {
    const token = await getToken();

    if (!token) {
      throw new Error("Token de acesso ausente.");
    }
    
    return this.repository.downloadDamdfePDF(token, id);
  }

  async DownloadTheClosingPDF(id: string) {
    const token = await getToken();

    if (!token) {
      throw new Error("Token de acesso ausente.");
    }
    
    return this.repository.DownloadTheClosingPDF(token, id);
  }
}

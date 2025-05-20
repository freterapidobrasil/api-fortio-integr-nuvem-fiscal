import { debug } from 'console';
import { getToken } from '../auth/auth';
import { MDFeRepository } from '../repository/MDFeRepository';
import { z } from 'zod';
import { MdfeDTO } from './Dtos/MdfeDto';

type MdfeInput = z.infer<typeof MdfeDTO>;

export class MdfeService {


  async emitirMdfe(dados: MdfeInput) {
    
    debug('Iniciando emissão de MDF-e...', dados);

    const token = await getToken();
    debug('Token obtido com sucesso.');
    const repository = new MDFeRepository();
    const resposta = await repository.emitir(token, dados);
    debug('MDF-e emitido com sucesso');

    return resposta;
  }

}
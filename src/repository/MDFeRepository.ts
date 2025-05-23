import axios from 'axios';
import { MdfeDTO } from '../service/Dtos/MdfeDto';
import { z } from 'zod';
import { debug } from 'console';

type MdfeInput = z.infer<typeof MdfeDTO>;

export class MDFeRepository {
  async emitir(token: string, dados: MdfeInput) {
    try {
      const response = await axios.post(
        'https://api.nuvemfiscal.com.br/mdfe',
        dados,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;

    } catch (error: any) {
      // Se for erro Axios com resposta da API
      console.log(error)
      if (error.response) {
        debug(error.response)
        // Repassa o erro da API para frente, pode incluir status e dados
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }

      // Erro de rede ou outro
      throw {
        message: error.message || 'Erro desconhecido',
      };
    }
  }
}

import axios from 'axios';
import { debug } from 'console';

export async function getToken(): Promise<string> {
  const clientId = 'sLoU3b41yFcvxV5qhxR5';
  const clientSecret = 'pQO2260UPAfIjWQI2ovQ1vETuCSwAjBWTZeljXXH';
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(
      'https://auth.nuvemfiscal.com.br/oauth/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'mdfe',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`,
        },
      }
    );

    return response.data.access_token;

  } catch (error: any) {
    debug('ERRO AO RECUPERAR TOKEN');

    if (error.response) {
      debug(error.response.data);
      throw {
        status: error.response.status,
        data: error.response.data,
      };
    }

    throw {
      message: error.message || 'Erro desconhecido',
    };
  }
}

import axios from 'axios';
import { debug } from 'console';

export async function getToken(): Promise<string> {
  // const clientId = '9T4jBro7rDquY9EXd6vS'; //PRODUÇÃO
  // const clientSecret = 'I23iZ7kTnFYKA6xyyMTmGlTDXOISxUPUSyhQThqN';

  const clientId = 'Xf0jt4PjT0MWyOovkLp8'; //HOMOLOGAÇÃO
  const clientSecret = 'w289dA6wtkeCA8bEaKxWvzvvIv0NE5WgiQmsHbOT';
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

//https://api.sandbox.nuvemfiscal.com.br

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

    // console.log("TOKEN ACESSO")
    // console.log(response.data.access_token) 
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

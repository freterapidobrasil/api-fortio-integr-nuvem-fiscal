import { z } from 'zod';

export const MdfeDTO = z.object({
  infMDFe: z.object({
    versao: z.string(),
    Id: z.string(),
    ide: z.object({
      cUF: z.number(),
      tpAmb: z.number(),
      tpEmit: z.number(),
      tpTransp: z.number(),
      mod: z.number(),
      serie: z.number(),
      nMDF: z.number(),
      cMDF: z.string(),
      cDV: z.number(),
      modal: z.number(),
      dhEmi: z.string(),
      tpEmis: z.number(),
      procEmi: z.string(),
      verProc: z.string(),
      UFIni: z.string(),
      UFFim: z.string(),
      infMunCarrega: z.array(z.object({
        cMunCarrega: z.string(),
        xMunCarrega: z.string(),
      })),
      infPercurso: z.array(z.object({
        UFPer: z.string(),
      })),
      dhIniViagem: z.string(),
      indCanalVerde: z.number(),
      indCarregaPosterior: z.number(),
    }),
    emit: z.object({
      CNPJ: z.string(),
      CPF: z.string(),
      IE: z.string(),
      xNome: z.string(),
      xFant: z.string(),
      enderEmit: z.object({
        xLgr: z.string(),
        nro: z.string(),
        xCpl: z.string(),
        xBairro: z.string(),
        cMun: z.string(),
        xMun: z.string(),
        CEP: z.string(),
        UF: z.string(),
        fone: z.string(),
        email: z.string(),
      }),
    }),
    // Continue preenchendo aqui para infModal, infDoc, seg, prodPred, tot, lacres, autXML, infAdic, infRespTec, infSolicNFF
  }),
  infMDFeSupl: z.object({
    qrCodMDFe: z.string(),
  }),
  ambiente: z.string(),
  referencia: z.string(),
});

export type MdfeDTOType = z.infer<typeof MdfeDTO>;
// import { z } from 'zod';

// export const MdfeDTO = z.object({
//   tipo_emissao: z.enum(['tpEmis1', 'tpEmis2']).describe('Tipo de emissão'),
//   ambiente: z.enum(['homologacao', 'producao']),
//   modelo: z.literal('58'),

//   emitente: z.object({
//     cpf_cnpj: z.string().min(14).max(14),
//     inscricao_estadual: z.string().min(1),
//     nome_razao_social: z.string().min(3),
//     nome_fantasia: z.string().optional(),
//     endereco: z.object({
//       logradouro: z.string(),
//       numero: z.string(),
//       bairro: z.string(),
//       municipio: z.string(),
//       uf: z.string().length(2),
//       cep: z.string().length(8),
//     }),
//   }),

//   veiculo_tracao: z.object({
//     placa: z.string().regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, 'Placa inválida'),
//     renavam: z.string().length(11),
//     tara: z.number().positive(),
//     capacidade_kg: z.number().positive(),
//     tipo_rodado: z.string(),       // Pode virar enum se tiver valores fixos
//     tipo_carroceria: z.string(),   // Pode virar enum se tiver valores fixos
//     uf: z.string().length(2),
//   }),

//   percurso: z.array(z.string().length(2)),

//   seguro: z.object({
//     responsavel: z.enum(['emitente', 'tomador']),
//     cnpj: z.string().length(14),
//     apolice: z.string(),
//     averbacao: z.string(),
//   }),
// });
import { z } from 'zod';



export const MdfeDTO = z.object({
  infMDFe: z.object({
    versao: z.string().optional(),
    Id: z.string().optional(),
    ide: z.object({
      cUF: z.number().optional(),
      tpAmb: z.number().optional(),
      tpEmit: z.number().optional(),
      tpTransp: z.number().optional(),
      mod: z.number().optional(),
      serie: z.number().optional(),
      nMDF: z.number().optional(),
      cMDF: z.string().optional(),
      cDV: z.number().optional(),
      modal: z.number().optional(),
      dhEmi: z.string().optional(),
      tpEmis: z.number().optional(),
      procEmi: z.string().optional(),
      verProc: z.string().optional(),
      UFIni: z.string().optional(),
      UFFim: z.string().optional(),
      infMunCarrega: z.array(z.object({
        cMunCarrega: z.string().optional(),
        xMunCarrega: z.string().optional()
      })).optional(),
      infPercurso: z.array(z.object({
        UFPer: z.string().optional()
      })).optional(),
      dhIniViagem: z.string().optional(),
      indCanalVerde: z.number().optional(),
      indCarregaPosterior: z.number().optional()
    }).optional(),
    emit: z.object({
      CNPJ: z.string().optional(),
      CPF: z.string().optional(),
      IE: z.string().optional(),
      xNome: z.string().optional(),
      xFant: z.string().optional(),
      enderEmit: z.object({
        xLgr: z.string().optional(),
        nro: z.string().optional(),
        xCpl: z.string().optional(),
        xBairro: z.string().optional(),
        cMun: z.string().optional(),
        xMun: z.string().optional(),
        CEP: z.string().optional(),
        UF: z.string().optional(),
        fone: z.string().optional(),
        email: z.string().optional()
      }).optional()
    }).optional(),
    infModal: z.object({
      versaoModal: z.string().optional(),
      rodo: z.object({
        infANTT: z.object({
          RNTRC: z.string().optional(),
          infCIOT: z.array(z.object({
            CIOT: z.string().optional(),
            CPF: z.string().optional(),
            CNPJ: z.string().optional()
          })).optional(),
          valePed: z.object({
            disp: z.array(z.object({
              CNPJForn: z.string().optional(),
              CNPJPg: z.string().optional(),
              CPFPg: z.string().optional(),
              nCompra: z.string().optional(),
              vValePed: z.number().optional(),
              tpValePed: z.string().optional()
            })).optional(),
            categCombVeic: z.string().optional()
          }).optional(),
          infContratante: z.array(z.object({
            xNome: z.string().optional(),
            CPF: z.string().optional(),
            CNPJ: z.string().optional(),
            idEstrangeiro: z.string().optional(),
            infContrato: z.object({
              NroContrato: z.string().optional(),
              vContratoGlobal: z.number().optional()
            }).optional()
          })).optional(),
          infPag: z.array(z.object({
            xNome: z.string().optional(),
            CPF: z.string().optional(),
            CNPJ: z.string().optional(),
            idEstrangeiro: z.string().optional(),
            Comp: z.array(z.object({
              tpComp: z.string().optional(),
              vComp: z.number().optional(),
              xComp: z.string().optional()
            })).optional(),
            vContrato: z.number().optional(),
            indAltoDesemp: z.number().optional(),
            indPag: z.number().optional(),
            vAdiant: z.number().optional(),
            indAntecipaAdiant: z.number().optional(),
            infPrazo: z.array(z.object({
              nParcela: z.number().optional(),
              dVenc: z.string().optional(),
              vParcela: z.number().optional()
            })).optional(),
            tpAntecip: z.number().optional(),
            infBanc: z.object({
              codBanco: z.string().optional(),
              codAgencia: z.string().optional(),
              CNPJIPEF: z.string().optional(),
              PIX: z.string().optional()
            }).optional()
          })).optional()
        }).optional(),
        veicTracao: z.object({
          cInt: z.string().optional(),
          placa: z.string().optional(),
          RENAVAM: z.string().optional(),
          tara: z.number().optional(),
          capKG: z.number().optional(),
          capM3: z.number().optional(),
          prop: z.object({
            CPF: z.string().optional(),
            CNPJ: z.string().optional(),
            RNTRC: z.string().optional(),
            xNome: z.string().optional(),
            IE: z.string().optional(),
            UF: z.string().optional(),
            tpProp: z.number().optional()
          }).optional(),
          condutor: z.array(z.object({
            xNome: z.string().optional(),
            CPF: z.string().optional()
          })).optional(),
          tpRod: z.string().optional(),
          tpCar: z.string().optional(),
          UF: z.string().optional()
        }).optional(),
        veicReboque: z.array(z.object({
          cInt: z.string().optional(),
          placa: z.string().optional(),
          RENAVAM: z.string().optional(),
          tara: z.number().optional(),
          capKG: z.number().optional(),
          capM3: z.number().optional(),
          prop: z.object({
            CPF: z.string().optional(),
            CNPJ: z.string().optional(),
            RNTRC: z.string().optional(),
            xNome: z.string().optional(),
            IE: z.string().optional(),
            UF: z.string().optional(),
            tpProp: z.number().optional()
          }).optional(),
          tpCar: z.string().optional(),
          UF: z.string().optional()
        })).optional(),
        codAgPorto: z.string().optional(),
        lacRodo: z.array(z.object({
          nLacre: z.string().optional()
        })).optional()
      }).optional()
    }).optional(),
    infDoc: z.object({
      infMunDescarga: z.array(z.object({
        cMunDescarga: z.string().optional(),
        xMunDescarga: z.string().optional()
        // Você pode continuar aqui com infCTe, infNFe etc, da mesma forma...
      })).optional()
    }).optional(),
    seg: z.array(z.object({
      infResp: z.object({
        respSeg: z.number().optional(),
        CNPJ: z.string().optional(),
        CPF: z.string().optional()
      }).optional(),
      infSeg: z.object({
        xSeg: z.string().optional(),
        CNPJ: z.string().optional()
      }).optional(),
      nApol: z.string().optional(),
      nAver: z.array(z.string()).optional()
    })).optional(),
    prodPred: z.object({
      tpCarga: z.string().optional(),
      xProd: z.string().optional(),
      cEAN: z.string().optional(),
      NCM: z.string().optional(),
      infLotacao: z.object({
        infLocalCarrega: z.object({
          CEP: z.string().optional(),
          latitude: z.string().optional(),
          longitude: z.string().optional()
        }).optional(),
        infLocalDescarrega: z.object({
          CEP: z.string().optional(),
          latitude: z.string().optional(),
          longitude: z.string().optional()
        }).optional()
      }).optional()
    }).optional(),
    tot: z.object({
      qCTe: z.number().optional(),
      qNFe: z.number().optional(),
      qMDFe: z.number().optional(),
      vCarga: z.number().optional(),
      cUnid: z.string().optional(),
      qCarga: z.number().optional()
    }).optional(),
    lacres: z.array(z.object({
      nLacre: z.string().optional()
    })).optional(),
    autXML: z.array(z.object({
      CNPJ: z.string().optional(),
      CPF: z.string().optional()
    })).optional(),
    infAdic: z.object({
      infAdFisco: z.string().optional(),
      infCpl: z.string().optional()
    }).optional(),
    infRespTec: z.object({
      CNPJ: z.string().optional(),
      xContato: z.string().optional(),
      email: z.string().optional(),
      fone: z.string().optional(),
      idCSRT: z.number().optional(),
      CSRT: z.string().optional(),
      hashCSRT: z.string().optional()
    }).optional(),
    infSolicNFF: z.object({
      xSolic: z.string().optional()
    }).optional()
  }).optional(),
  infMDFeSupl: z.object({
    qrCodMDFe: z.string().optional()
  }).optional(),
  ambiente: z.string().optional(),
  referencia: z.string().optional()
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
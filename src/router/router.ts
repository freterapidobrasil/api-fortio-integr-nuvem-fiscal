import { Router } from "express";
import { getCancellationStatuOfTheMDFe, DownloadDamdfePDF, emitirMdfe, encerrarMdfe, DownloadTheClosingPDF, cancellationOfTheMDFe } from "../controller/MDFeController";
import { downloadMdfe } from "../controller/MDFeController";
import { emitirMdfeSchema } from "../middleware/mdfeSchema";
import { validateBody } from "../middleware/validate";

const router = Router();

/**
 * @openapi
 * /api/send-mdfe:
 *   post:
 *     summary: Emite um MDF-e
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MdfeDTO'
 *     responses:
 *       200:
 *         description: MDF-e emitido com sucesso
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     MdfeDTO:
 *       type: object
 *       properties:
 *         tipo_emissao:
 *           type: string
 *         ambiente:
 *           type: string
 *         modelo:
 *           type: string
 *         emitente:
 *           type: object
 *           properties:
 *             cpf_cnpj:
 *               type: string
 *             inscricao_estadual:
 *               type: string
 *             nome_razao_social:
 *               type: string
 *             nome_fantasia:
 *               type: string
 *             endereco:
 *               type: object
 *               properties:
 *                 logradouro:
 *                   type: string
 *                 numero:
 *                   type: string
 *                 bairro:
 *                   type: string
 *                 municipio:
 *                   type: string
 *                 uf:
 *                   type: string
 *                 cep:
 *                   type: string
 *         veiculo_tracao:
 *           type: object
 *           properties:
 *             placa:
 *               type: string
 *             renavam:
 *               type: string
 *             tara:
 *               type: number
 *             capacidade_kg:
 *               type: number
 *             tipo_rodado:
 *               type: string
 *             tipo_carroceria:
 *               type: string
 *             uf:
 *               type: string
 *         percurso:
 *           type: array
 *           items:
 *             type: string
 *         seguro:
 *           type: object
 *           properties:
 *             responsavel:
 *               type: string
 *             cnpj:
 *               type: string
 *             apolice:
 *               type: string
 *             averbacao:
 *               type: string
 */

router.post("/api/send-mdfe", validateBody(emitirMdfeSchema), emitirMdfe);

// Rota para encerrar um MDF-e
router.post("/api/mdfe/:id/encerrar", (req, res, next) => {
  encerrarMdfe(req, res).catch(next);
});

// Rota para download PDF/XML
router.get("/mdfe/:id/:tipo/:status", (req, res, next) => {
  downloadMdfe(req, res).catch(next);
});

// Rota para consultar cancelamento
router.get("/api/mdfe/:id/consultar-cancelamento-MDF-e", (req, res, next) => {
  getCancellationStatuOfTheMDFe(req, res).catch(next);
});

router.post("/api/mdfe/:id/cancelamento", (req, res, next) => {
  cancellationOfTheMDFe(req, res).catch(next);
});

// Rota para download DAMDFE
router.get("/api/mdfe/:id/DAMDFE/PDF", (req, res, next) => {
  DownloadDamdfePDF(req, res).catch(next);
});

// Rota para download encerramento
router.get("/api/mdfe/:id/encerramento/pdf", (req, res, next) => {
  DownloadTheClosingPDF(req, res).catch(next);
});





export default router;

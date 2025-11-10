import { z } from "zod";

export const idMdfeSchema = z.object({
  id: z
    .string({ required_error: "O Id do MDF-e não pode ser vazio é obrigatório" })
    .min(36, "Id do MDF-e é obrigatório ter no mínimo 36 caractere"),
});

export type IdMdfeDto = z.infer<typeof idMdfeSchema>;

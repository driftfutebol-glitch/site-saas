import { z } from "zod";

/**
 * Regras de validação de cadastro e login.
 * Usadas no navegador (feedback) E revalidadas no servidor (segurança).
 *
 * Senha: mínimo 8 caracteres, e no máximo 72 BYTES — esse é o limite técnico do
 * bcrypt. Atenção: o limite do bcrypt é em BYTES, não em caracteres. Uma senha
 * com acentos (á, ç, é) ou emoji ocupa mais de 1 byte por caractere, então
 * validamos o tamanho em bytes (com TextEncoder) — senão o bcrypt cortaria a
 * senha silenciosamente e enfraqueceria ela.
 */

const MAX_PASSWORD_BYTES = 72;

const fitsBcrypt = (p: string) => new TextEncoder().encode(p).length <= MAX_PASSWORD_BYTES;

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(80, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("E-mail inválido.")
    .max(120, "E-mail muito longo."),
  password: z
    .string()
    .min(8, "A senha precisa ter pelo menos 8 caracteres.")
    .max(200)
    .refine(fitsBcrypt, "A senha é muito longa (máximo de 72 bytes)."),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("E-mail inválido.")
    .max(120, "E-mail muito longo."),
  password: z.string().min(1, "Informe sua senha.").max(200).refine(fitsBcrypt, "Senha inválida."),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

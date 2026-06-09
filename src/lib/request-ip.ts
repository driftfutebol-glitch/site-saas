/**
 * Extrai o IP do cliente a partir dos cabeçalhos de proxy.
 *
 * ⚠️ SEGURANÇA: `X-Forwarded-For` é enviado pelo cliente e PODE ser forjado
 * quando o app roda exposto direto (sem um proxy confiável que sobrescreva o
 * cabeçalho). Por isso o IP NÃO é a única defesa contra força bruta:
 *   - o login tem também limite POR CONTA (e-mail), não só por IP;
 *   - as senhas usam hash bcrypt custoso (lento de propósito).
 * Em produção, rode atrás de um proxy/reverse-proxy que defina esse cabeçalho
 * de forma confiável (ou use o IP fornecido pela plataforma).
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconhecido";
}

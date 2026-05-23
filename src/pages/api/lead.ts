import type { APIRoute } from 'astro';

export const prerender = false;

interface LeadPayload {
  nome: string;
  whatsapp: string;
  email: string;
  cpf: string;
  produto_slug: string;
  produto_name: string;
  origem: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let data: Partial<LeadPayload> = {};
    try {
      data = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'JSON inválido ou body vazio' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!data.nome || !data.whatsapp || !data.email || !data.cpf || !data.produto_slug) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios faltando' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[LEAD CAPTURADO]', {
      timestamp: new Date().toISOString(),
      produto: data.produto_name,
      slug: data.produto_slug,
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      cpf_parcial: data.cpf ? `${data.cpf.slice(0, 3)}.***.***-${data.cpf.slice(-2)}` : '',
      origem: data.origem,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[LEAD] Erro inesperado:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({ error: 'Use POST pra enviar lead' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
};

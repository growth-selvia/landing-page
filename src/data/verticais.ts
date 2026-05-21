/**
 * src/data/verticais.ts
 *
 * Fonte única de verdade pra todas as 6 verticais da Selvia.
 * Usado em:
 *  - components/sections/Verticais.astro (grid de 6 cards na home)
 *  - components/sections/Precos.astro (tabs na home — tab médico mostra preço,
 *    demais redirecionam pra LP da vertical)
 *  - pages/medicos/index.astro, /devs/, /advogados/, etc. (LPs verticais
 *    com seus próprios preços renderizados a partir daqui)
 *
 * DECISÃO DE ARQUITETURA (registrada em 21/05/2026):
 *  Na home, a seção Preços mostra só os planos de Médicos (ICP principal).
 *  As outras 5 tabs (Devs, Advogados, Criadores, Saúde, Outras PJ) funcionam
 *  como link para a LP da vertical correspondente, não como troca de pane.
 *
 * Convenções:
 *  - `slug`: usado em URLs e atributos `data-vertical` (ex: "medicos", não "médicos")
 *  - `iconPath`: paths SVG do Tabler Icons (mesmo set usado em todo o legacy)
 *  - `plans`: ordem importa — primeiro card é o "featured" no legacy (geralmente Simples)
 *  - `plans[].status`: "available" | "unavailable" — unavailable mostra o card desabilitado
 *    com disclaimer legal (médicos/advogados/saúde não podem ser MEI)
 */

export type PlanStatus = 'available' | 'unavailable';

export type PlanModalidade = 'MEI' | 'SIMPLES NACIONAL' | 'LUCRO PRESUMIDO';

export interface Plan {
  modalidade: PlanModalidade;
  plano: string;            // "Basic", "Pro", "Tech Júnior", "Plano Júnior"...
  price: string | null;     // "R$ 347" ou null se unavailable
  priceSuffix?: string;     // "/mês"
  status: PlanStatus;
  featured?: boolean;       // destaca visualmente o card recomendado
  isMei?: boolean;          // estilo verde claro pro card de MEI
  features?: string[];      // bullets do card
  disclaimer?: string[];    // texto pros cards "unavailable" (lista de parágrafos)
  whatsappContext: string;  // string passada pra `openWhatsApp(context)` ao clicar
}

export interface Vertical {
  slug: string;             // "medicos", "devs", "advogados"...
  name: string;             // "Médicos", "Devs e TI"...
  shortName?: string;       // versão curta pra tabs estreitas ("Devs", "Criadores")
  description: string;      // 1 frase pro card da home
  iconPath: string;         // path SVG (sem <svg> wrapper)
  iconStrokeWidth?: number; // alguns ícones são 1.8, outros 2 — default 1.8
  futurePage: string;       // href pra LP da vertical
  plans: Plan[];
}

/**
 * Caminhos SVG (path d="...") direto do Tabler Icons.
 * Cada ícone é renderizado dentro de:
 *   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
 *        stroke-linecap="round" stroke-linejoin="round" />
 */
const ICON_MEDICOS = `<path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" /><rect x="4" y="3" width="3" height="3" rx=".5" /><rect x="11" y="3" width="3" height="3" rx=".5" /><path d="M8 15a6 6 0 1 0 12 0v-3" /><path d="M20 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />`;

const ICON_DEVS = `<path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" />`;

const ICON_ADVOGADOS = `<path d="M7 20l10 0" /><path d="M6 6l6 -1l6 1" /><path d="M12 3l0 17" /><path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" /><path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />`;

const ICON_CRIADORES = `<path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" /><path d="M5 10a7 7 0 0 0 14 0" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />`;

const ICON_SAUDE = `<path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />`;

const ICON_OUTRAS = `<path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" />`;

/**
 * Lista de verticais — ordem aparece na home (Verticais) e nas tabs de Preços.
 */
export const VERTICAIS: Vertical[] = [
  {
    slug: 'medicos',
    name: 'Médicos',
    description: 'Plantão, residência, consultório, Receita Saúde',
    iconPath: ICON_MEDICOS,
    futurePage: '/medicos',
    plans: [
      {
        modalidade: 'SIMPLES NACIONAL',
        plano: 'Basic',
        price: 'R$ 347',
        priceSuffix: '/mês',
        status: 'available',
        featured: true,
        whatsappContext: 'médico Simples Nacional',
        features: [
          'Contabilidade completa no WhatsApp',
          'Emissão de NF-e ilimitada',
          'Pagamento automático de DAS',
          'IRPF anual incluso',
          'Plataforma de finanças pessoais',
          '50% off se fatura abaixo de R$ 4k/mês',
        ],
      },
      {
        modalidade: 'LUCRO PRESUMIDO',
        plano: 'Pro',
        price: 'R$ 547',
        priceSuffix: '/mês',
        status: 'available',
        whatsappContext: 'médico Lucro Presumido',
        features: [
          'Tudo do plano Basic',
          'Apuração de IRPJ + CSLL trimestral',
          'PIS, COFINS e ISS',
          'IRPF anual incluso',
          'Indicado pra faturamento acima de R$ 30k/mês',
        ],
      },
      {
        modalidade: 'MEI',
        plano: 'Não disponível',
        price: null,
        status: 'unavailable',
        whatsappContext: 'médico (MEI indisponível)',
        disclaimer: [
          'Profissionais com conselho de classe (CRM, CRO, etc.) não podem ser MEI pela legislação atual.',
          'Recomendamos o plano Basic via Simples Nacional.',
        ],
      },
    ],
  },
  {
    slug: 'devs',
    name: 'Devs e TI',
    shortName: 'Devs',
    description: 'Inclui recebimento do exterior em dólar',
    iconPath: ICON_DEVS,
    futurePage: '/devs',
    plans: [
      {
        modalidade: 'MEI',
        plano: 'Tech Júnior',
        price: 'R$ 9,90',
        priceSuffix: '/mês',
        status: 'available',
        isMei: true,
        whatsappContext: 'dev MEI',
        features: [
          'Pra quem fatura até R$ 81k/ano',
          'Atendimento no WhatsApp',
          'Pagamento do DAS-MEI',
          'Emissão de NF-e',
          'Migração pra ME quando for hora',
        ],
      },
      {
        modalidade: 'SIMPLES NACIONAL',
        plano: 'Basic',
        price: 'R$ 189,90',
        priceSuffix: '/mês',
        status: 'available',
        featured: true,
        whatsappContext: 'dev Simples Nacional',
        features: [
          'Contabilidade completa no WhatsApp',
          'Emissão de NF-e ilimitada',
          'Pagamento automático de DAS',
          'Suporte para recebimento do exterior',
          'Plataforma de finanças pessoais',
        ],
      },
      {
        modalidade: 'LUCRO PRESUMIDO',
        plano: 'Pro',
        price: 'R$ 547',
        priceSuffix: '/mês',
        status: 'available',
        whatsappContext: 'dev Lucro Presumido',
        features: [
          'Tudo do plano Basic',
          'Apuração de IRPJ + CSLL trimestral',
          'PIS, COFINS e ISS',
          'IRPF anual incluso',
        ],
      },
    ],
  },
  {
    slug: 'advogados',
    name: 'Advogados',
    description: 'Sociedade Unipessoal e escritórios',
    iconPath: ICON_ADVOGADOS,
    futurePage: '/advogados',
    plans: [
      {
        modalidade: 'SIMPLES NACIONAL',
        plano: 'Basic',
        price: 'R$ 189,90',
        priceSuffix: '/mês',
        status: 'available',
        featured: true,
        whatsappContext: 'advogado Simples Nacional',
        features: [
          'Contabilidade completa no WhatsApp',
          'Suporte a Sociedade Unipessoal',
          'Emissão de NF-e ilimitada',
          'Pagamento automático de DAS',
          'Plataforma de finanças pessoais',
        ],
      },
      {
        modalidade: 'LUCRO PRESUMIDO',
        plano: 'Pro',
        price: 'R$ 547',
        priceSuffix: '/mês',
        status: 'available',
        whatsappContext: 'advogado Lucro Presumido',
        features: [
          'Tudo do plano Basic',
          'Apuração de IRPJ + CSLL trimestral',
          'PIS, COFINS e ISS',
          'IRPF anual incluso',
        ],
      },
      {
        modalidade: 'MEI',
        plano: 'Não disponível',
        price: null,
        status: 'unavailable',
        whatsappContext: 'advogado (MEI indisponível)',
        disclaimer: [
          'Advogados inscritos na OAB não podem ser MEI pela legislação atual.',
          'Recomendamos o plano Basic via Simples Nacional.',
        ],
      },
    ],
  },
  {
    slug: 'criadores',
    name: 'Criadores de conteúdo',
    shortName: 'Criadores',
    description: 'YouTube, Twitch, Hotmart, infoprodutos',
    iconPath: ICON_CRIADORES,
    futurePage: '/criadores',
    plans: [
      {
        modalidade: 'MEI',
        plano: 'Plano Júnior',
        price: 'R$ 9,90',
        priceSuffix: '/mês',
        status: 'available',
        isMei: true,
        whatsappContext: 'criador MEI',
        features: [
          'Pra quem fatura até R$ 81k/ano',
          'Atendimento no WhatsApp',
          'Pagamento do DAS-MEI',
          'Emissão de NF-e',
          'Migração pra ME quando for hora',
        ],
      },
      {
        modalidade: 'SIMPLES NACIONAL',
        plano: 'Basic',
        price: 'R$ 99,90',
        priceSuffix: '/mês',
        status: 'available',
        featured: true,
        whatsappContext: 'criador Simples Nacional',
        features: [
          'Contabilidade completa no WhatsApp',
          'Emissão de NF-e (YouTube, Hotmart, Twitch)',
          'Pagamento automático de DAS',
          'Suporte a múltiplas fontes de receita',
          'Plataforma de finanças pessoais',
        ],
      },
      {
        modalidade: 'LUCRO PRESUMIDO',
        plano: 'Pro',
        price: 'R$ 547',
        priceSuffix: '/mês',
        status: 'available',
        whatsappContext: 'criador Lucro Presumido',
        features: [
          'Tudo do plano Basic',
          'Apuração de IRPJ + CSLL trimestral',
          'PIS, COFINS e ISS',
          'IRPF anual incluso',
        ],
      },
    ],
  },
  {
    slug: 'saude',
    name: 'Saúde geral',
    description: 'Psicólogos, fisios, dentistas, nutris',
    iconPath: ICON_SAUDE,
    futurePage: '/saude',
    plans: [
      {
        modalidade: 'SIMPLES NACIONAL',
        plano: 'Basic',
        price: 'R$ 99,90',
        priceSuffix: '/mês',
        status: 'available',
        featured: true,
        whatsappContext: 'saúde Simples Nacional',
        features: [
          'Contabilidade completa no WhatsApp',
          'Emissão de NF-e ilimitada',
          'Pagamento automático de DAS',
          'Atendimento de quem entende seu conselho',
          'Plataforma de finanças pessoais',
        ],
      },
      {
        modalidade: 'LUCRO PRESUMIDO',
        plano: 'Pro',
        price: 'R$ 547',
        priceSuffix: '/mês',
        status: 'available',
        whatsappContext: 'saúde Lucro Presumido',
        features: [
          'Tudo do plano Basic',
          'Apuração de IRPJ + CSLL trimestral',
          'PIS, COFINS e ISS',
          'IRPF anual incluso',
        ],
      },
      {
        modalidade: 'MEI',
        plano: 'Não disponível',
        price: null,
        status: 'unavailable',
        whatsappContext: 'saúde (MEI indisponível)',
        disclaimer: [
          'Profissionais com conselho de classe (CRP, COFFITO, CRO, etc.) não podem ser MEI pela legislação atual.',
          'Recomendamos o plano Basic via Simples Nacional.',
        ],
      },
    ],
  },
  {
    slug: 'outras',
    name: 'Outras PJ',
    description: 'Consultores, designers, e mais',
    iconPath: ICON_OUTRAS,
    futurePage: '/outras-pj',
    plans: [
      {
        modalidade: 'MEI',
        plano: 'Plano Júnior',
        price: 'R$ 9,90',
        priceSuffix: '/mês',
        status: 'available',
        isMei: true,
        whatsappContext: 'outras PJ MEI',
        features: [
          'Pra quem fatura até R$ 81k/ano',
          'Atendimento no WhatsApp',
          'Pagamento do DAS-MEI',
          'Emissão de NF-e',
          'Migração pra ME quando for hora',
        ],
      },
      {
        modalidade: 'SIMPLES NACIONAL',
        plano: 'Basic',
        price: 'R$ 189,90',
        priceSuffix: '/mês',
        status: 'available',
        featured: true,
        whatsappContext: 'outras PJ Simples Nacional',
        features: [
          'Contabilidade completa no WhatsApp',
          'Emissão de NF-e ilimitada',
          'Pagamento automático de DAS',
          'Pra consultores, designers, e demais PJ',
          'Plataforma de finanças pessoais',
        ],
      },
      {
        modalidade: 'LUCRO PRESUMIDO',
        plano: 'Pro',
        price: 'R$ 547',
        priceSuffix: '/mês',
        status: 'available',
        whatsappContext: 'outras PJ Lucro Presumido',
        features: [
          'Tudo do plano Basic',
          'Apuração de IRPJ + CSLL trimestral',
          'PIS, COFINS e ISS',
          'IRPF anual incluso',
        ],
      },
    ],
  },
];

/**
 * Helper: busca uma vertical pelo slug.
 * Útil pras páginas dinâmicas /medicos, /devs, etc.
 */
export function getVertical(slug: string): Vertical | undefined {
  return VERTICAIS.find(v => v.slug === slug);
}

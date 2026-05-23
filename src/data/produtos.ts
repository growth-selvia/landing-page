/**
 * src/data/produtos.ts
 *
 * Dados centralizados das LPs de subprodutos da Selvia.
 *
 * Cada produto tem:
 *  - slug (URL: /assistente-financeira, /agendamento-de-plantao, etc.)
 *  - audience: 'all' (todos ICPs) ou 'medicos' (só médicos)
 *  - hero (eyebrow, h1, sub, ctaLabel)
 *  - features: lista de 3-4 features com icon + title + description
 *  - faqs: lista de perguntas e respostas
 *  - whatsappContext: o que aparece na mensagem pré-preenchida do WhatsApp
 *
 * Cada produto monta sua LP combinando essas informações com componentes
 * compartilhados (Verticais, Stats, Depoimentos, ComoFunciona, etc.)
 */

export interface ProdutoFeature {
  icon: string;  // identifier do ícone (renderizado no componente)
  title: string;
  description: string;
}

export interface ProdutoFaq {
  question: string;
  answer: string;
}

export interface Produto {
  slug: string;
  name: string;             // nome do produto, ex: "Assistente Financeira"
  audience: 'all' | 'medicos';
  metaTitle: string;
  metaDescription: string;  // 140-155 chars, otimizada AEO
  heroEyebrow: string;      // pill em cima do H1
  heroH1: string;
  heroSub: string;
  ctaLabel: string;         // texto do botão CTA principal
  introText: string;        // parágrafo SEO logo após o hero
  features: ProdutoFeature[];
  faqs: ProdutoFaq[];
  whatsappContext: string;
}

const PRODUTOS: Record<string, Produto> = {
  'assistente-financeira': {
    slug: 'assistente-financeira',
    name: 'Assistente Financeira',
    audience: 'all',
    metaTitle: 'Assistente Financeira no WhatsApp para PJ | Selvia',
    metaDescription: 'Suas finanças PJ no WhatsApp. Sincroniza contas via Open Finance, categoriza gastos e te ajuda a atingir metas. Trial gratuito, sem cartão.',

    heroEyebrow: 'Gratuito por tempo limitado',
    heroH1: 'Suas finanças no WhatsApp, sem planilha.',
    heroSub: 'Sincronize suas contas, categorize gastos e atinja suas metas direto na conversa. Sem app, sem login, sem complicação.',
    ctaLabel: 'Quero experimentar',

    introText: 'A Assistente Financeira da Selvia é uma IA que vive no seu WhatsApp. Ela conecta suas contas bancárias via Open Finance do Banco Central, categoriza seus gastos automaticamente e te ajuda a tomar decisões sobre o dinheiro. Você pergunta por texto ou áudio, ela responde em segundos.',

    features: [
      {
        icon: 'whatsapp',
        title: 'Tudo pelo WhatsApp',
        description: 'Mensagem de texto ou áudio. Sem app pra baixar, sem senha pra lembrar, sem login pra fazer.',
      },
      {
        icon: 'shield',
        title: 'Open Finance do Banco Central',
        description: 'Suas contas conectadas pela tecnologia oficial do Banco Central. Dados criptografados, sem compartilhar senha bancária.',
      },
      {
        icon: 'chart',
        title: 'Categorização automática',
        description: 'Cada gasto entra na categoria certa sozinho. Nada de planilha, nada de input manual.',
      },
      {
        icon: 'target',
        title: 'Metas e alertas',
        description: 'Defina metas de poupança, investimento ou redução de gastos. A Selvia te avisa antes de você estourar o orçamento.',
      },
    ],

    faqs: [
      {
        question: 'A Assistente Financeira é gratuita?',
        answer: 'Hoje sim, gratuita por tempo limitado, sem precisar cadastrar cartão. Quando a versão paga entrar, você é avisado antes e escolhe se continua ou não. Sem pegadinha.',
      },
      {
        question: 'Como funciona a conexão com meu banco?',
        answer: 'A Selvia usa o Open Finance, que é a tecnologia oficial do Banco Central pra compartilhamento de dados financeiros. Você autoriza a conexão direto no app do seu banco, sem precisar passar senha pra ninguém. A Selvia recebe só os dados que você autorizou, criptografados.',
      },
      {
        question: 'Preciso ser PJ pra usar?',
        answer: 'Não. A Assistente Financeira funciona pra PJ e PF. Mas o foco da Selvia é em quem é PJ ou está pensando em virar PJ, então as recomendações são mais úteis pra esse público.',
      },
      {
        question: 'Quais bancos funcionam?',
        answer: 'Todos os bancos que participam do Open Finance no Brasil. Isso inclui Itaú, Bradesco, Santander, Nubank, Inter, Caixa, Banco do Brasil, C6, BTG, e mais de 40 instituições. Se seu banco não tá na lista do Open Finance, ele ainda não funciona.',
      },
      {
        question: 'Posso conectar mais de uma conta?',
        answer: 'Sim. Você pode conectar quantas contas quiser, de bancos diferentes. A Selvia consolida tudo em uma visão única no WhatsApp. Você sabe quanto tem somando tudo, em qualquer momento.',
      },
      {
        question: 'Meus dados ficam seguros?',
        answer: 'Sim. O Open Finance é regulado pelo Banco Central. A Selvia não armazena senhas bancárias, só recebe os dados que você autorizou via padrão do BC. A conexão é criptografada ponta a ponta e você pode revogar o acesso a qualquer momento pelo app do seu banco.',
      },
    ],

    whatsappContext: 'LP Assistente Financeira',
  },

  'agendamento-de-plantao': {
    slug: 'agendamento-de-plantao',
    name: 'Agendamento de Plantão',
    audience: 'medicos',
    metaTitle: 'Agendamento de Plantão com IA no WhatsApp | Selvia',
    metaDescription: 'Agende plantões médicos no WhatsApp com IA. Receba resumo financeiro automático, saiba quanto já recebeu e o que tá pendente. Gratuito.',

    heroEyebrow: 'Para médicos plantonistas, internos e residentes',
    heroH1: 'Seus plantões no WhatsApp, sem app.',
    heroSub: 'Agende plantões com uma mensagem. Receba o resumo financeiro automático. Saiba o que já entrou e o que tá pendente. Sem login, sem app, sem complicação.',
    ctaLabel: 'Quero experimentar',

    introText: 'O Agendamento de Plantão da Selvia é uma IA pra médicos no WhatsApp. Você manda mensagem com a data, hora e local do plantão, e ela organiza tudo na sua agenda. Pede o resumo financeiro, e ela responde quanto você já recebeu e quanto tá pendente. Pensado pra plantonistas, internos e médicos em residência.',

    features: [
      {
        icon: 'calendar',
        title: 'Agenda no WhatsApp',
        description: 'Mande a data, hora e local do plantão. A Selvia agenda sozinha e sincroniza com seu calendário pessoal.',
      },
      {
        icon: 'cash',
        title: 'Resumo financeiro automático',
        description: 'Peça o resumo. A Selvia te diz quanto você já recebeu, quanto tá pendente e por qual hospital.',
      },
      {
        icon: 'whatsapp',
        title: 'Tudo pelo WhatsApp',
        description: 'Sem app pra baixar, sem senha pra lembrar. Mensagem de texto ou áudio resolve.',
      },
      {
        icon: 'clock',
        title: 'Pensado pra rotina médica',
        description: 'Funciona pra quem cumpre 60h ou 80h. Aceita plantão noturno, finais de semana, troca de plantão.',
      },
    ],

    faqs: [
      {
        question: 'O Agendamento de Plantão é gratuito mesmo?',
        answer: 'Sim, 100% gratuito por tempo ilimitado por enquanto. Sem cartão cadastrado, sem pegadinha. O agendamento e o resumo financeiro estão inclusos no teste.',
      },
      {
        question: 'Precisa cadastrar cartão?',
        answer: 'Não. Você só preenche o formulário com nome e WhatsApp, a Selvia te chama e a partir daí é tudo conversa no WhatsApp. Nada de cartão pra hoje.',
      },
      {
        question: 'Funciona pra residente e interno?',
        answer: 'Sim. O Agendamento de Plantão foi pensado pra qualquer médico que faz plantão, incluindo residentes (que cumprem 60h ou mais por semana) e internos. A IA entende a rotina e ajuda a conciliar plantões, estudos e vida pessoal.',
      },
      {
        question: 'Sincroniza com Google Calendar ou iCal?',
        answer: 'Sim. A Selvia pode integrar com sua agenda pessoal pra você ver os plantões direto no calendário do celular. Você decide quais agendas quer conectar.',
      },
      {
        question: 'O resumo financeiro inclui imposto?',
        answer: 'Pra quem usa só o agendamento gratuito, o resumo é dos valores brutos recebidos por plantão. Pra quem é cliente da Selvia paga, o resumo já vem com os impostos calculados e separados.',
      },
      {
        question: 'A Selvia faz mais que agendar plantões?',
        answer: 'Sim. Na versão paga, a Selvia cuida de toda a contabilidade médica: abertura de CNPJ, emissão de nota fiscal, pagamento automático dos impostos, declaração anual. Veja o plano completo pra médicos na nossa página principal.',
      },
    ],

    whatsappContext: 'LP Agendamento de Plantão',
  },
};

export function getProduto(slug: string): Produto {
  const produto = PRODUTOS[slug];
  if (!produto) {
    throw new Error(
      `Produto "${slug}" não encontrado em produtos.ts. ` +
      `Produtos disponíveis: ${Object.keys(PRODUTOS).join(', ')}`
    );
  }
  return produto;
}

export function getAllProdutoSlugs(): string[] {
  return Object.keys(PRODUTOS);
}

/**
 * Gera o JSON-LD FAQPage schema do produto a partir do array de faqs.
 */
export function getProdutoFaqSchema(slug: string) {
  const produto = getProduto(slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: produto.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/**
 * Gera o JSON-LD Service schema do produto.
 * Produtos são serviços gratuitos (por enquanto), então não tem priceSpecification.
 */
export function getProdutoServiceSchema(slug: string, siteUrl: URL | undefined) {
  const produto = getProduto(slug);
  const pageUrl = siteUrl ? new URL(`/${slug}`, siteUrl).href : `/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: produto.name,
    description: produto.metaDescription,
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: 'Selvia',
      url: siteUrl?.href,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    serviceType: 'Assistente IA no WhatsApp',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      description: 'Gratuito por tempo limitado',
    },
  };
}

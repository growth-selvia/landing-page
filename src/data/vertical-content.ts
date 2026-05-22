/**
 * src/data/vertical-content.ts
 *
 * Conteúdo específico das LPs verticais (hero, intro SEO, FAQs únicas, meta description).
 *
 * Usado em:
 *  - src/pages/devs.astro, /advogados.astro, /criadores.astro, /saude.astro, /outras-pj.astro
 *  - src/components/sections/HeroVertical.astro (lê hero do data file)
 *  - src/components/sections/IntroVertical.astro (lê intro do data file)
 *  - src/components/sections/FaqVertical.astro (lê faqs específicas e mistura com genéricas)
 *  - src/components/seo/ServiceSchema.ts (gera JSON-LD Service por vertical)
 *
 * NOTA: /medicos NÃO está aqui. A home cumpre esse papel (ICP principal).
 */

export interface VerticalFaq {
  question: string;
  answer: string;
}

export interface VerticalContent {
  slug: string;                // bate com slugs em src/data/verticais.ts
  heroEyebrow: string;         // pill em cima do H1
  heroH1: string;              // headline grande
  heroSub: string;             // subheadline abaixo do H1
  introText: string;           // parágrafo SEO logo após o hero
  serviceDescription: string;  // descrição curta usada no JSON-LD Service
  metaDescription: string;     // resposta-em-uma-frase 140-155 chars, otimizada AEO
  faqs: VerticalFaq[];         // 3 FAQs específicas da vertical
}

const VERTICAL_CONTENT: Record<string, VerticalContent> = {
  devs: {
    slug: 'devs',
    heroEyebrow: 'Para devs e profissionais de TI',
    heroH1: 'Contabilidade para devs, simples como deveria ser.',
    heroSub: 'Atendimento que entende a sua rotina, com suporte a recebimento do exterior. Sem pegadinha.',
    introText: 'A Selvia cuida da contabilidade de devs que faturam pelo Brasil e pelo exterior. Configuramos seu CNPJ no enquadramento certo, emitimos suas notas fiscais e organizamos seus recebimentos do Stripe, Wise e PayPal. Tudo direto no WhatsApp, com contador humano respondendo.',
    serviceDescription: 'Contabilidade no WhatsApp para devs e profissionais de TI, com suporte a recebimento do exterior em dólar via Stripe, Wise e PayPal.',
    metaDescription: 'Contabilidade no WhatsApp para devs PJ. Abertura de CNPJ, emissão de NF, recebimento em dólar e Simples Nacional via Fator R. Atendimento humano.',
    faqs: [
      {
        question: 'Como funciona recebimento em dólar via PJ?',
        answer: 'Você fatura em dólar pelo Stripe, Wise ou PayPal, o valor entra na sua conta PJ (em real ou em dólar se você tiver conta global), e a Selvia emite a nota fiscal de exportação de serviços. Na maioria dos municípios tem isenção de ISS pra exportação, então a tributação efetiva fica mais baixa.',
      },
      {
        question: 'Posso ser MEI sendo dev?',
        answer: 'Sim, se faturar até R$ 81.000 por ano. É o caminho mais simples pra quem tá começando. Quando passar desse limite, a Selvia faz a migração pra Microempresa sem você precisar pensar nisso.',
      },
      {
        question: 'Preciso emitir NF pra cliente do exterior?',
        answer: 'Depende do tipo de cliente. PJ no exterior precisa, é a nota fiscal de exportação de serviço. Plataformas como Stripe e Upwork normalmente não exigem nota por transação, mas o recebimento precisa ser declarado. A Selvia cuida da emissão e do registro do que for necessário.',
      },
    ],
  },

  advogados: {
    slug: 'advogados',
    heroEyebrow: 'Para advogados inscritos na OAB',
    heroH1: 'Contabilidade para advogados, simples como deveria ser.',
    heroSub: 'Atendimento que entende honorários, Sociedade Unipessoal e os impedimentos da OAB.',
    introText: 'A Selvia atende advogados e escritórios em todo o Brasil. Abrimos sua Sociedade Unipessoal de Advocacia ou Microempresa, cuidamos do Simples Nacional Anexo IV, emitimos suas notas de honorários e organizamos o pagamento do ISS por município. Tudo direto no WhatsApp, com contador humano respondendo.',
    serviceDescription: 'Contabilidade no WhatsApp para advogados e escritórios de advocacia, com suporte a Sociedade Unipessoal de Advocacia e Simples Nacional Anexo IV.',
    metaDescription: 'Contabilidade no WhatsApp para advogados. Sociedade Unipessoal, Simples Nacional Anexo IV, emissão de honorários e pagamento de ISS. Sem fidelidade.',
    faqs: [
      {
        question: 'Posso ser MEI sendo advogado?',
        answer: 'Não. Advogados inscritos na OAB são impedidos pela legislação atual de ser MEI. O caminho é Sociedade Unipessoal de Advocacia ou Microempresa pelo Simples Nacional Anexo IV. A Selvia abre seu CNPJ no enquadramento certo.',
      },
      {
        question: 'Como funciona o Anexo IV do Simples para advogado?',
        answer: 'Advogado entra no Anexo IV, que tem alíquota inicial de 4,5%. Diferente do Anexo III, não tem o benefício do Fator R, então toda atividade jurídica entra nessa faixa. A Selvia faz o cálculo e o pagamento do DAS todo mês, sem você se preocupar com a data.',
      },
      {
        question: 'Sociedade Unipessoal de Advocacia é melhor que ME?',
        answer: 'Depende do seu caso. A SUA tem regulamentação específica da OAB e pode ter benefícios em alguns municípios. A ME é mais flexível pra quem tem múltiplas atividades. A Selvia analisa sua situação e recomenda o melhor caminho.',
      },
    ],
  },

  criadores: {
    slug: 'criadores',
    heroEyebrow: 'Para criadores de conteúdo e infoprodutores',
    heroH1: 'Contabilidade para criadores, simples como deveria ser.',
    heroSub: 'Atendimento que entende AdSense, Hotmart, patrocínio e infoproduto. Sem pegadinha.',
    introText: 'A Selvia cuida da contabilidade de criadores que faturam por várias plataformas ao mesmo tempo. Organizamos AdSense, monetização do YouTube e Twitch, comissões da Hotmart e Eduzz, patrocínios e mentorias. Tudo no mesmo CNPJ, com nota fiscal emitida no WhatsApp.',
    serviceDescription: 'Contabilidade no WhatsApp para criadores de conteúdo, infoprodutores e profissionais com múltiplas fontes de receita (AdSense, Hotmart, YouTube, Twitch).',
    metaDescription: 'Contabilidade no WhatsApp para criadores de conteúdo. AdSense, Hotmart, YouTube, Twitch e patrocínios no mesmo CNPJ. NF emitida direto no WhatsApp.',
    faqs: [
      {
        question: 'Recebimento de AdSense precisa de PJ?',
        answer: 'Pode receber como PF, mas a partir de um certo volume passa a fazer sentido receber via PJ pelo Simples Nacional. A tributação fica menor e você separa a finança pessoal da profissional. A Selvia te ajuda a fazer essa transição na hora certa.',
      },
      {
        question: 'Posso ser MEI sendo criador de conteúdo?',
        answer: 'Sim, se faturar até R$ 81.000 por ano. É o caminho mais simples pra quem tá começando ou tem patrocínios esporádicos. Quando passar do limite, a Selvia migra pra Microempresa sem você precisar pensar nisso.',
      },
      {
        question: 'Como funciona NF de patrocínio?',
        answer: 'Quando uma marca te patrocina, ela precisa de nota fiscal pra justificar o pagamento. A Selvia emite a nota com a descrição certa (publicidade, divulgação, mentoria) direto no WhatsApp. Você só encaminha pra marca.',
      },
    ],
  },

  saude: {
    slug: 'saude',
    heroEyebrow: 'Para profissionais de saúde com conselho de classe',
    heroH1: 'Contabilidade para profissionais de saúde, simples como deveria ser.',
    heroSub: 'Atendimento que entende CRP, CRO, COFFITO, CRN e as regras das profissões liberais.',
    introText: 'A Selvia atende profissionais de saúde em todo o Brasil, psicólogos, dentistas, fisioterapeutas, nutricionistas e outras profissões com conselho. Abrimos seu CNPJ no Simples Nacional Anexo III via Fator R, emitimos notas fiscais pra convênios e particulares, e organizamos o pagamento do ISS. Tudo direto no WhatsApp.',
    serviceDescription: 'Contabilidade no WhatsApp para profissionais de saúde com conselho de classe (CRP, CRO, COFFITO, CRN), com suporte a convênios e Simples Nacional Anexo III.',
    metaDescription: 'Contabilidade no WhatsApp para psicólogos, dentistas, fisios e nutris. Suporte a convênios, Simples Nacional via Fator R e atendimento humano.',
    faqs: [
      {
        question: 'Posso ser MEI sendo psicólogo, dentista ou fisioterapeuta?',
        answer: 'Não. Profissionais com conselho de classe (CRP, CRO, COFFITO, CRN) são impedidos pela legislação atual de ser MEI. O caminho é Microempresa via Simples Nacional Anexo III. A Selvia abre seu CNPJ no enquadramento certo.',
      },
      {
        question: 'Como funciona NF para convênio?',
        answer: 'Convênios como Unimed, Bradesco Saúde e Amil exigem nota fiscal pra cada repasse. A Selvia emite as notas com os códigos certos e mantém o controle de quanto cada convênio te pagou no mês. Você acompanha tudo pelo WhatsApp.',
      },
      {
        question: 'Posso atender em vários estados sendo PJ?',
        answer: 'Sim. O CNPJ é aberto em um município (normalmente onde você mora), mas o atendimento pode ser em qualquer lugar. A Selvia cuida do ISS no município da sua sede e dos ajustes em outros municípios se houver retenção.',
      },
    ],
  },

  outras: {
    slug: 'outras',
    heroEyebrow: 'Para consultores, designers e outras profissões',
    heroH1: 'Contabilidade pra qualquer profissional PJ, simples como deveria ser.',
    heroSub: 'Atendimento pra consultores, designers, arquitetos, engenheiros, coaches e mais.',
    introText: 'A Selvia atende todo tipo de profissional PJ no Brasil. Abrimos seu CNPJ no enquadramento certo (MEI, Simples Nacional ou Lucro Presumido), emitimos suas notas fiscais e cuidamos de todos os impostos. Tudo direto no WhatsApp, com contador humano respondendo.',
    serviceDescription: 'Contabilidade no WhatsApp para consultores, designers, arquitetos, engenheiros, coaches e outras profissões liberais PJ no Brasil.',
    metaDescription: 'Contabilidade no WhatsApp para consultores, designers, arquitetos e outras PJ. MEI, Simples ou Lucro Presumido. Sem fidelidade, com contador humano.',
    faqs: [
      {
        question: 'Qual o melhor regime tributário pra mim?',
        answer: 'Depende do seu faturamento e da sua profissão. Pra quem fatura até R$ 81 mil por ano, MEI costuma ser o caminho. Acima disso, Simples Nacional via Fator R. Em alguns casos específicos, Lucro Presumido faz mais sentido. A Selvia calcula com você e escolhe o melhor.',
      },
      {
        question: 'Posso ter mais de uma atividade no mesmo CNPJ?',
        answer: 'Sim. Você pode ter um CNAE principal e vários secundários no mesmo CNPJ. A Selvia configura seu cadastro pra cobrir todas as atividades que você presta, sem você precisar abrir empresas separadas.',
      },
      {
        question: 'Quanto tempo leva pra abrir o CNPJ?',
        answer: 'Em média 5 a 10 dias úteis, varia conforme a Junta Comercial do seu estado. A Selvia cuida de toda a papelada, você só assina digitalmente o que precisar. Quando o CNPJ sai, a gente te avisa no WhatsApp e já configura a emissão de notas.',
      },
    ],
  },
};

export function getVerticalContent(slug: string): VerticalContent {
  const content = VERTICAL_CONTENT[slug];
  if (!content) {
    throw new Error(
      `Conteúdo da vertical "${slug}" não encontrado em vertical-content.ts. ` +
      `Verticais disponíveis: ${Object.keys(VERTICAL_CONTENT).join(', ')}`
    );
  }
  return content;
}

export function getAllVerticalSlugs(): string[] {
  return Object.keys(VERTICAL_CONTENT);
}

/**
 * Gera o JSON-LD FAQPage schema da vertical, misturando as 3 FAQs específicas
 * com as 3 genéricas (mesma estratégia do componente FaqVertical.astro).
 */
export function getVerticalFaqSchema(slug: string) {
  const content = getVerticalContent(slug);

  const faqsGenericas = [
    {
      question: 'Preciso assinar contrato de fidelidade?',
      answer: 'Não. Sem fidelidade, sem multa. Se a Selvia não atende suas expectativas, você cancela a qualquer momento.',
    },
    {
      question: 'E se eu já tiver contador?',
      answer: 'A gente cuida da migração toda. Você só nos passa o contato do contador atual e o resto é com a gente. Em geral leva 15 a 30 dias e você não precisa fazer praticamente nada.',
    },
    {
      question: 'Como funciona o atendimento no WhatsApp?',
      answer: 'Você manda mensagem de texto ou áudio para o nosso número oficial. Em minutos uma pessoa real do nosso time responde, não é bot.',
    },
  ];

  const todasFaqs = [...content.faqs, ...faqsGenericas];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: todasFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

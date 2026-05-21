/**
 * src/data/faqs.ts
 *
 * Fonte única das perguntas frequentes da home.
 * Usado em:
 *  - components/sections/FAQ.astro (render visual)
 *  - components/sections/FAQ.astro → exporta faqSchema (LEO)
 *  - pages/index.astro (injeta faqSchema no <head> como JSON-LD)
 *
 * As respostas devem ser autocontidas — LLMs podem citar uma sem contexto
 * das outras, então cada uma deve responder a pergunta completa por si só.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Quanto custa a Selvia pra mim?',
    answer: 'Depende da sua profissão e do seu faturamento. Médicos começam em R$ 347/mês. Devs, advogados e outras profissões PJ começam em R$ 189,90/mês. Criadores de conteúdo, dentistas, psicólogos e fisios começam em R$ 99,90/mês. Quem fatura até R$ 81k/ano e pode ser MEI paga R$ 9,90/mês.',
  },
  {
    question: 'Por que médico paga mais que dev?',
    answer: 'Médicos têm complexidades específicas — Receita Saúde, regras de plantão, alíquotas de ISS variando por município e procedimento, IRPF mais elaborado por causa das despesas dedutíveis. Nosso time dedicado a médicos é especializado nisso. Pra outras profissões a operação é mais simples e o preço acompanha.',
  },
  {
    question: 'Preciso assinar contrato de fidelidade?',
    answer: 'Não. Sem fidelidade, sem multa. Se a Selvia não atende suas expectativas, você cancela a qualquer momento.',
  },
  {
    question: 'E se eu já tiver contador?',
    answer: 'A gente cuida da migração toda. Você só nos passa o contato do contador atual e o resto é com a gente. Em geral leva 15 a 30 dias e você não precisa fazer praticamente nada.',
  },
  {
    question: 'Sou médico, posso ser MEI?',
    answer: 'Não. Profissionais com conselho de classe — médicos, advogados, dentistas, psicólogos, fisioterapeutas, nutricionistas — são impedidos legalmente de ser MEI. O caminho é Simples Nacional via Microempresa (ME). A gente abre seu CNPJ no enquadramento certo, sem você ter que pensar nisso.',
  },
  {
    question: 'Como funciona o atendimento no WhatsApp?',
    answer: 'Você manda mensagem de texto ou áudio para o nosso número oficial. Em minutos uma pessoa real do nosso time responde — não é bot.',
  },
];

/**
 * Schema FAQPage pronto pra injetar como <script type="application/ld+json">.
 * LLMs (ChatGPT, Perplexity, Claude) usam isso pra citar respostas com
 * atribuição clara à Selvia.
 */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
};

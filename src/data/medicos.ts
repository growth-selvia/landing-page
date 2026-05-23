/**
 * src/data/medicos.ts
 *
 * Dados centralizados da LP /medicos.
 *
 * Diferente das outras verticais (que usam vertical-content.ts), médicos
 * tem dados específicos aqui porque é a vertical principal da Selvia.
 *
 * Conteúdo focado em palavras-chave médicas: Receita Saúde, CRM, plantão,
 * residência médica, sociedade de profissionais, Fator R no Anexo III.
 */

export interface MedicosFaqItem {
  question: string;
  answer: string;
}

export const medicosMeta = {
  title: 'Contabilidade para Médicos PJ no WhatsApp | Selvia',
  description: 'Contabilidade especializada em médico PJ. Abertura de CNPJ, Receita Saúde, gestão de plantões e impostos pagos automaticamente. Direto no WhatsApp.',
} as const;

export const medicosHero = {
  eyebrow: 'Para médicos PJ',
  h1: 'Contabilidade para médico, do jeito que deveria ser.',
  sub: 'Sua contabilidade no WhatsApp. Abertura de CNPJ, Receita Saúde emitida, plantões organizados, impostos pagos automaticamente. Sem app, sem login, sem planilha.',
  ctaLabel: 'Falar no WhatsApp',
  whatsappContext: 'LP Médicos',
} as const;

export const medicosIntro = {
  text: 'A Selvia atende mais de 1.000 médicos PJ em todo o Brasil. Cuidamos da abertura do CNPJ no enquadramento certo (Simples Nacional Anexo III com Fator R), emitimos a Receita Saúde pra cada atendimento particular, organizamos seus plantões e pagamos os impostos automaticamente. Tudo direto no seu WhatsApp, com contadores que entendem a rotina médica.',
} as const;

export const medicosFaqs: MedicosFaqItem[] = [
  {
    question: 'Sou médico recém-formado. Vale abrir CNPJ?',
    answer: 'Geralmente sim. A partir do primeiro plantão ou consulta particular, o CNPJ no Simples Nacional Anexo III com Fator R ativo costuma resultar em economia de imposto de 30% a 70% comparado a receber como pessoa física. A Selvia abre o CNPJ sem cobrar honorário pra quem contrata o plano mensal.',
  },
  {
    question: 'Como funciona a Receita Saúde com a Selvia?',
    answer: 'A Receita Saúde é obrigatória desde 2024 pra todo médico que atende particular. A Selvia emite a Receita Saúde automaticamente pra cada atendimento que você informa pelo WhatsApp. Sem app, sem login no portal da Receita Federal. Mensagem com data, paciente e valor, e a Receita Saúde já é gerada.',
  },
  {
    question: 'A Selvia organiza meus plantões?',
    answer: 'Sim. Você manda mensagem com data, hora, hospital e valor do plantão, e a Selvia organiza tudo. Ao final do mês, recebe o resumo financeiro com quanto entrou, quanto tá pendente de cada hospital e o cálculo dos impostos. É gratuito mesmo pra quem ainda não é cliente do plano completo.',
  },
  {
    question: 'Quanto custa a Selvia pra médico?',
    answer: 'O plano completo pra médicos começa em R$ 347/mês, com abertura de CNPJ gratuita, contabilidade completa, emissão de nota fiscal, Receita Saúde automatizada, gestão de plantões e suporte 24/7 no WhatsApp. Médicos recém-formados começam a pagar só depois do primeiro plantão recebido.',
  },
  {
    question: 'Médico pode ser MEI?',
    answer: 'Não. A atividade médica não está na lista de CNAEs permitidas pro MEI. Médico precisa abrir Microempresa (ME) ou Sociedade Limitada Unipessoal (SLU), geralmente no Simples Nacional Anexo III. A Selvia faz essa abertura no enquadramento certo, sem custo de honorário pra quem contrata o plano.',
  },
  {
    question: 'Posso trocar de contador pra Selvia agora mesmo?',
    answer: 'Sim, sem multa e sem complicação. Você manda o WhatsApp pra gente, a Selvia conversa com seu contador atual e pega o histórico contábil. Em até 30 dias você tá 100% migrado pra gente, sem ter que se preocupar com nenhum trâmite. Médicos costumam trocar quando o contador atual não responde, não conhece a rotina médica ou cobra caro demais.',
  },
];

// CLT Services — Auditoria 5S
// Critérios e descritores (escala 1–5)

const CINCO_S = [
  {
    id: 's1',
    nome: 'Seiri',
    subtitulo: 'Triagem',
    descricao: 'Separar o útil do inútil',
    cor: '#FF6B6B',
    corClara: '#FFE5E5',
    emoji: '🔴',
    criterios: [
      {
        id: 's1c1',
        nome: 'Materiais desnecessários removidos',
        descritores: [
          'Materiais desnecessários em toda a área; nenhuma triagem efectuada.',
          'Triagem iniciada; ainda existem vários materiais sem justificação de presença.',
          'Maioria dos materiais desnecessários removida; um ou outro ainda persiste.',
          'Materiais desnecessários praticamente inexistentes; remoção sistemática.',
          'Área totalmente livre; processo de triagem documentado e sustentado.'
        ]
      },
      {
        id: 's1c2',
        nome: 'Ferramentas não utilizadas eliminadas',
        descritores: [
          'Muitas ferramentas sem uso visíveis; sem qualquer critério de eliminação.',
          'Algumas ferramentas eliminadas; ainda existem várias sem utilização conhecida.',
          'A maioria das ferramentas sem uso foi eliminada; casos pontuais subsistem.',
          'Ferramentas sem uso raramente visíveis; eliminação feita de forma consistente.',
          'Todas as ferramentas presentes têm utilização definida; processo de revisão regular.'
        ]
      },
      {
        id: 's1c3',
        nome: 'Equipamentos obsoletos identificados',
        descritores: [
          'Equipamentos obsoletos presentes sem identificação ou plano de destino.',
          'Alguns equipamentos identificados como obsoletos; sem plano de acção.',
          'Maioria dos obsoletos identificada; plano de destino em curso para alguns.',
          'Todos os obsoletos identificados; plano de destino definido para a maioria.',
          'Todos os obsoletos identificados, com plano de destino formal e prazos definidos.'
        ]
      },
      {
        id: 's1c4',
        nome: 'Documentos irrelevantes eliminados',
        descritores: [
          'Documentos desactualizados ou irrelevantes espalhados pela área.',
          'Alguns documentos irrelevantes eliminados; ainda existem vários.',
          'A maioria dos documentos irrelevantes foi eliminada; casos pontuais subsistem.',
          'Documentos irrelevantes raramente visíveis; arquivo organizado.',
          'Apenas documentos actuais e relevantes presentes; rotina de revisão implementada.'
        ]
      },
      {
        id: 's1c5',
        nome: 'Área livre de itens desnecessários',
        descritores: [
          'Muitos itens sem uso ou sem propósito definido ocupam a área.',
          'Redução iniciada; ainda existem vários itens sem propósito visível.',
          'Área maioritariamente livre; um ou outro item desnecessário subsiste.',
          'Área essencialmente livre de itens desnecessários; situação controlada.',
          'Área completamente livre; critérios de presença de itens claros e cumpridos.'
        ]
      },
      {
        id: 's1c6',
        nome: 'Identificação de itens implementada',
        descritores: [
          'Itens sem qualquer identificação; impossível distinguir úteis de inúteis.',
          'Alguns itens identificados; maioria sem etiqueta ou referência visível.',
          'Maioria dos itens identificada; sistema de identificação inconsistente.',
          'Quase todos os itens identificados; sistema coerente e visível.',
          'Todos os itens identificados com sistema padronizado; fácil distinguir útil de inútil.'
        ]
      }
    ]
  },
  {
    id: 's2',
    nome: 'Seiton',
    subtitulo: 'Arrumação',
    descricao: 'Organizar o que ficou',
    cor: '#FFB347',
    corClara: '#FFF3E0',
    emoji: '🟠',
    criterios: [
      {
        id: 's2c1',
        nome: 'Locais de armazenamento identificados',
        descritores: [
          'Sem locais de armazenamento definidos; itens colocados aleatoriamente.',
          'Alguns locais identificados; maioria sem definição clara.',
          'A maioria dos locais de armazenamento identificada; alguns ainda por definir.',
          'Quase todos os locais identificados; sistema visível e coerente.',
          'Todos os locais de armazenamento identificados com marcação clara e padronizada.'
        ]
      },
      {
        id: 's2c2',
        nome: 'Itens acessíveis e organizados',
        descritores: [
          'Itens difíceis de encontrar; organização inexistente ou confusa.',
          'Alguns itens organizados e acessíveis; maioria de difícil localização.',
          'A maioria dos itens organizada e acessível; casos pontuais de dificuldade.',
          'Itens acessíveis de forma consistente; organização funcional.',
          'Todos os itens facilmente acessíveis; organização ergonómica e intuitiva.'
        ]
      },
      {
        id: 's2c3',
        nome: 'Marcações visuais implementadas',
        descritores: [
          'Sem marcações visuais no chão ou superfícies; sem demarcação de áreas.',
          'Algumas marcações visíveis; cobertura muito parcial.',
          'Marcações implementadas nas principais áreas; algumas zonas por cobrir.',
          'Marcações visuais abrangentes e coerentes; pequenas omissões.',
          'Sistema de marcações visual completo, padronizado e em bom estado de conservação.'
        ]
      },
      {
        id: 's2c4',
        nome: 'Ferramentas no local correcto após uso',
        descritores: [
          'Ferramentas frequentemente fora do local definido; sem hábito de reposição.',
          'Reposição ocasional; maioria das ferramentas fora do local após uso.',
          'Ferramentas geralmente repostas; incumprimentos pontuais observados.',
          'Ferramentas quase sempre no local correcto após uso; comportamento consistente.',
          'Ferramentas sempre repostas no local correcto; comportamento automático e sustentado.'
        ]
      },
      {
        id: 's2c5',
        nome: 'Sinalética clara e visível',
        descritores: [
          'Sinalética inexistente ou incompreensível; sem apoio à navegação ou segurança.',
          'Sinalética presente em algumas áreas; cobertura insuficiente.',
          'Sinalética nas áreas principais; algumas zonas por cobrir ou sinalética degradada.',
          'Sinalética abrangente e legível; pequenas lacunas ou desgaste visível.',
          'Sinalética completa, clara, padronizada e em perfeito estado de conservação.'
        ]
      },
      {
        id: 's2c6',
        nome: 'Fluxo de materiais optimizado',
        descritores: [
          'Fluxo de materiais desorganizado; cruzamentos, esperas e retrocessos frequentes.',
          'Fluxo parcialmente definido; vários pontos de congestionamento identificados.',
          'Fluxo maioritariamente fluido; um ou outro ponto de melhoria evidente.',
          'Fluxo eficiente na maior parte; situações pontuais de ineficiência controladas.',
          'Fluxo de materiais completamente optimizado; sem cruzamentos nem retrocessos.'
        ]
      }
    ]
  },
  {
    id: 's3',
    nome: 'Seiso',
    subtitulo: 'Limpeza',
    descricao: 'Limpar e inspecionar',
    cor: '#4ECDC4',
    corClara: '#E0FAF9',
    emoji: '🟡',
    criterios: [
      {
        id: 's3c1',
        nome: 'Área de trabalho limpa',
        descritores: [
          'Área suja; lixo, poeira e resíduos visíveis em vários locais.',
          'Limpeza efectuada em algumas zonas; outras claramente negligenciadas.',
          'Área maioritariamente limpa; um ou outro local com sujidade visível.',
          'Área limpa de forma consistente; ocorrências pontuais rapidamente tratadas.',
          'Área impecável; limpeza mantida de forma autónoma e sistemática.'
        ]
      },
      {
        id: 's3c2',
        nome: 'Equipamentos limpos em bom estado',
        descritores: [
          'Equipamentos sujos e com sinais evidentes de falta de manutenção.',
          'Alguns equipamentos limpos; maioria com sujidade ou desgaste visível.',
          'A maioria dos equipamentos limpa; um ou outro com sujidade ou dano.',
          'Equipamentos geralmente limpos e bem conservados; casos pontuais controlados.',
          'Todos os equipamentos limpos e em bom estado; rotina de limpeza implementada.'
        ]
      },
      {
        id: 's3c3',
        nome: 'Plano de limpeza definido e cumprido',
        descritores: [
          'Sem plano de limpeza; limpeza feita de forma aleatória ou inexistente.',
          'Plano existente mas raramente cumprido; limpeza irregular.',
          'Plano definido e cumprido na maioria das vezes; algumas lacunas.',
          'Plano cumprido de forma consistente; desvios pontuais rapidamente corrigidos.',
          'Plano detalhado, cumprido sistematicamente e revisto regularmente.'
        ]
      },
      {
        id: 's3c4',
        nome: 'Responsabilidades de limpeza atribuídas',
        descritores: [
          'Nenhuma responsabilidade de limpeza atribuída formalmente.',
          'Responsabilidades atribuídas a alguns; maioria das tarefas sem responsável.',
          'A maioria das responsabilidades atribuída; algumas lacunas existentes.',
          'Responsabilidades atribuídas a todos; sistema funcional com raras omissões.',
          'Responsabilidades totalmente definidas, visíveis e cumpridas por todos.'
        ]
      },
      {
        id: 's3c5',
        nome: 'Fontes de sujidade identificadas',
        descritores: [
          'Fontes de sujidade desconhecidas ou ignoradas; sem qualquer acção.',
          'Algumas fontes identificadas; sem plano de contenção ou eliminação.',
          'Principais fontes identificadas; plano de acção em curso para algumas.',
          'Todas as fontes identificadas; medidas de contenção implementadas.',
          'Todas as fontes identificadas e controladas; eliminação das controláveis concluída.'
        ]
      },
      {
        id: 's3c6',
        nome: 'Materiais de limpeza disponíveis',
        descritores: [
          'Materiais de limpeza inexistentes ou inacessíveis na área.',
          'Materiais disponíveis mas insuficientes ou inadequados para as necessidades.',
          'Materiais geralmente disponíveis; algumas lacunas ocasionais.',
          'Materiais adequados e acessíveis; reposição sistemática.',
          'Materiais de limpeza completos, identificados, acessíveis e com stock controlado.'
        ]
      }
    ]
  },
  {
    id: 's4',
    nome: 'Seiketsu',
    subtitulo: 'Normalização',
    descricao: 'Criar padrões e manter',
    cor: '#95E1A3',
    corClara: '#E8FAE8',
    emoji: '🟢',
    criterios: [
      {
        id: 's4c1',
        nome: 'Procedimentos de trabalho documentados',
        descritores: [
          'Sem procedimentos documentados; trabalho feito por memória ou improviso.',
          'Alguns procedimentos documentados; maioria das tarefas sem suporte escrito.',
          'Principais procedimentos documentados; alguns ainda por formalizar.',
          'Quase todos os procedimentos documentados e actualizados.',
          'Todos os procedimentos documentados, acessíveis e actualizados regularmente.'
        ]
      },
      {
        id: 's4c2',
        nome: 'Normas visuais afixadas',
        descritores: [
          'Sem normas visuais na área; colaboradores sem referência visual de trabalho.',
          'Algumas normas afixadas; cobertura muito parcial ou desactualizada.',
          'Normas visuais nas principais estações; algumas áreas por cobrir.',
          'Normas visuais abrangentes, visíveis e actualizadas; pequenas lacunas.',
          'Normas visuais completas, padronizadas, visíveis e sistematicamente actualizadas.'
        ]
      },
      {
        id: 's4c3',
        nome: 'Auditorias internas regulares',
        descritores: [
          'Sem auditorias internas realizadas; nenhum mecanismo de controlo.',
          'Auditorias realizadas esporadicamente; sem periodicidade definida.',
          'Auditorias com periodicidade definida; nem sempre realizadas conforme planeado.',
          'Auditorias realizadas regularmente conforme plano; registos disponíveis.',
          'Auditorias sistemáticas, com registos, planos de acção e seguimento efectivo.'
        ]
      },
      {
        id: 's4c4',
        nome: 'Formação 5S realizada',
        descritores: [
          'Nenhuma formação 5S realizada; colaboradores sem conhecimento estruturado.',
          'Formação realizada para alguns colaboradores; cobertura insuficiente.',
          'A maioria dos colaboradores com formação; alguns ainda por formar.',
          'Todos os colaboradores formados; formação de integração para novos colaboradores.',
          'Formação completa, com reciclagem regular e avaliação de eficácia.'
        ]
      },
      {
        id: 's4c5',
        nome: 'Boas práticas partilhadas',
        descritores: [
          'Sem mecanismos de partilha de boas práticas; conhecimento isolado.',
          'Partilha informal e ocasional; sem suporte estruturado.',
          'Algumas boas práticas documentadas e partilhadas; cobertura parcial.',
          'Boas práticas partilhadas regularmente; sistema de comunicação funcional.',
          'Sistema estruturado de partilha de boas práticas; lições aprendidas documentadas.'
        ]
      },
      {
        id: 's4c6',
        nome: 'Padrões consistentes entre turnos/áreas',
        descritores: [
          'Padrões completamente inconsistentes entre turnos e áreas.',
          'Alguns padrões comuns; variação significativa entre turnos ou áreas.',
          'Padrões maioritariamente consistentes; algumas variações observadas.',
          'Padrões consistentes na generalidade; desvios pontuais e temporários.',
          'Padrões totalmente uniformes entre todos os turnos e áreas; monitorização efectiva.'
        ]
      }
    ]
  },
  {
    id: 's5',
    nome: 'Shitsuke',
    subtitulo: 'Disciplina',
    descricao: 'Manter e melhorar',
    cor: '#74B9FF',
    corClara: '#E6F3FF',
    emoji: '🔵',
    criterios: [
      {
        id: 's5c1',
        nome: 'Regras 5S cumpridas espontaneamente',
        descritores: [
          'Regras raramente cumpridas; necessário acompanhamento permanente.',
          'Cumprimento irregular; maioria cumpre apenas quando supervisionado.',
          'A maioria cumpre as regras de forma autónoma; alguns precisam de incentivo.',
          'Regras cumpridas espontaneamente pela quase totalidade; raros desvios.',
          'Regras cumpridas automaticamente por todos; cultura 5S completamente interiorizada.'
        ]
      },
      {
        id: 's5c2',
        nome: 'Envolvimento da equipa nas melhorias',
        descritores: [
          'Nenhum envolvimento da equipa; melhorias impostas pela chefia.',
          'Envolvimento pontual de alguns elementos; sem participação estruturada.',
          'Parte da equipa envolvida; participação ainda inconsistente.',
          'A maioria da equipa envolvida; sugestões de melhoria frequentes.',
          'Envolvimento total e activo de toda a equipa; cultura de melhoria contínua.'
        ]
      },
      {
        id: 's5c3',
        nome: 'Acções corretivas implementadas',
        descritores: [
          'Problemas identificados mas sem acções corretivas; situação estagnada.',
          'Algumas acções iniciadas; maioria dos problemas sem resposta efectiva.',
          'Acções corretivas implementadas para a maioria dos problemas; algumas pendentes.',
          'Acções corretivas implementadas de forma sistemática; seguimento efectuado.',
          'Ciclo completo: identificação, acção, verificação e padronização sistemático.'
        ]
      },
      {
        id: 's5c4',
        nome: 'Melhoria contínua evidente',
        descritores: [
          'Nenhuma evidência de melhoria contínua; situação estável ou regressiva.',
          'Melhorias pontuais sem carácter sistemático ou sustentado.',
          'Melhorias visíveis em algumas áreas; abordagem ainda inconsistente.',
          'Melhoria contínua evidente na maioria das áreas; progressos documentados.',
          'Melhoria contínua sistematicamente implementada; resultados visíveis e medidos.'
        ]
      },
      {
        id: 's5c5',
        nome: 'Reconhecimento dos progressos',
        descritores: [
          'Sem reconhecimento dos esforços ou progressos da equipa.',
          'Reconhecimento informal e esporádico; sem sistema estruturado.',
          'Progressos reconhecidos ocasionalmente; alguns mecanismos de reconhecimento.',
          'Reconhecimento regular dos esforços; equipa motivada e envolvida.',
          'Sistema estruturado de reconhecimento; progressos comunicados e celebrados.'
        ]
      },
      {
        id: 's5c6',
        nome: 'Comprometimento da chefia visível',
        descritores: [
          'Chefia ausente ou indiferente à implementação dos 5S.',
          'Comprometimento declarado mas pouco visível na prática.',
          'Chefia comprometida na maioria das situações; presença e apoio irregulares.',
          'Comprometimento visível e consistente; chefia activamente envolvida.',
          'Chefia exemplar; lidera pelo exemplo e é o principal motor dos 5S.'
        ]
      }
    ]
  }
];

const SEMAFORO = [
  { min: 0,  max: 20,  label: 'Crítico',           cor: '#E53E3E', bg: '#FFF5F5', icone: '🔴' },
  { min: 21, max: 40,  label: 'Insuficiente',       cor: '#DD6B20', bg: '#FFFAF0', icone: '🟠' },
  { min: 41, max: 60,  label: 'Em desenvolvimento', cor: '#D69E2E', bg: '#FFFFF0', icone: '🟡' },
  { min: 61, max: 80,  label: 'Bom',                cor: '#38A169', bg: '#F0FFF4', icone: '🟢' },
  { min: 81, max: 100, label: 'Excelente',          cor: '#3182CE', bg: '#EBF8FF', icone: '🔵' }
];

function getSemaforo(pct) {
  return SEMAFORO.find(s => pct >= s.min && pct <= s.max) || SEMAFORO[0];
}

function calcularResultados(scores) {
  const resultados = {};
  let totalGeral = 0;
  CINCO_S.forEach(s => {
    let totalS = 0;
    s.criterios.forEach(c => { totalS += (scores[c.id] || 0); });
    const maxS = s.criterios.length * 5;
    resultados[s.id] = { total: totalS, max: maxS, pct: Math.round((totalS / maxS) * 100) };
    totalGeral += totalS;
  });
  const maxGeral = CINCO_S.reduce((acc, s) => acc + s.criterios.length * 5, 0);
  resultados.geral = { total: totalGeral, max: maxGeral, pct: Math.round((totalGeral / maxGeral) * 100) };
  return resultados;
}

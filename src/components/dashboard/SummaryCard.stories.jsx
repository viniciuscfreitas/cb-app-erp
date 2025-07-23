import SummaryCard from './SummaryCard';

export default {
  title: 'Dashboard/SummaryCard',
  component: SummaryCard,
  parameters: {
    docs: {
      description: {
        component: 'Card de resumo com estatísticas para o Dashboard. Suporta diferentes gradientes e é clicável.'
      }
    }
  },
  argTypes: {
    gradient: {
      control: { type: 'select' },
      options: ['blue', 'green', 'purple', 'yellow', 'red', 'orange'],
      description: 'Gradiente de cor do card'
    },
    onClick: {
      action: 'clicked',
      description: 'Função chamada quando o card é clicado'
    }
  }
};

export const Default = {
  args: {
    title: 'Total de Clientes',
    value: 156,
    icon: '👥',
    gradient: 'blue'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card padrão com estatística de clientes.'
      }
    }
  }
};

export const Pets = {
  args: {
    title: 'Total de Pets',
    value: 203,
    icon: '🐕',
    gradient: 'green'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card com estatística de pets.'
      }
    }
  }
};

export const Appointments = {
  args: {
    title: 'Agendamentos Hoje',
    value: 8,
    icon: '📅',
    gradient: 'purple'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card com estatística de agendamentos do dia.'
      }
    }
  }
};

export const Revenue = {
  args: {
    title: 'Receita Mensal',
    value: 'R$ 15.420,50',
    icon: '💰',
    gradient: 'yellow'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card com receita mensal formatada.'
      }
    }
  }
};

export const LargeNumber = {
  args: {
    title: 'Total de Vendas',
    value: 15420,
    icon: '💰',
    gradient: 'orange'
  },
  parameters: {
    docs: {
      description: {
        story: 'Card com número grande que será formatado automaticamente.'
      }
    }
  }
};

export const AllGradients = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <SummaryCard
        title="Clientes"
        value={156}
        icon="👥"
        gradient="blue"
      />
      <SummaryCard
        title="Pets"
        value={203}
        icon="🐕"
        gradient="green"
      />
      <SummaryCard
        title="Agendamentos"
        value={8}
        icon="📅"
        gradient="purple"
      />
      <SummaryCard
        title="Receita"
        value="R$ 15.420,50"
        icon="💰"
        gradient="yellow"
      />
      <SummaryCard
        title="Vendas"
        value={15420}
        icon="💰"
        gradient="red"
      />
      <SummaryCard
        title="Produtos"
        value={89}
        icon="📦"
        gradient="orange"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de todos os gradientes disponíveis.'
      }
    }
  }
}; 
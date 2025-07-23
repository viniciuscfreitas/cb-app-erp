import DashboardPage from './DashboardPage';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Página principal do ERP com resumo das operações do pet shop, cards de estatísticas, ações rápidas e atividades recentes.'
      }
    }
  },
  decorators: [
    // eslint-disable-next-line no-unused-vars
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export const Default = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Dashboard padrão com dados mockados mostrando estatísticas, ações rápidas e atividades recentes.'
      }
    }
  }
};

export const Mobile = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Visualização mobile do Dashboard com layout responsivo.'
      }
    }
  }
};

export const Tablet = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Visualização tablet do Dashboard com layout intermediário.'
      }
    }
  }
};

export const Desktop = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Visualização desktop do Dashboard com layout completo.'
      }
    }
  }
}; 
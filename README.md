# 🏥 Pet Shop Management System

Sistema completo de gestão para pet shops desenvolvido com React moderno, focado em experiência do usuário e performance.

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework principal com hooks modernos
- **Vite** - Build tool rápida e moderna
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento SPA
- **Storybook** - Documentação e desenvolvimento de componentes
- **Vitest** - Framework de testes
- **DND Kit** - Drag and drop para agendamentos

## ✨ Funcionalidades Principais

### 📅 Sistema de Agendamentos
- **Calendário interativo** com múltiplas visualizações (Dia, Semana, Mês)
- **Drag & Drop** para reagendamento de consultas
- **Filtros por profissional e serviço**
- **Modal de criação/edição** de eventos
- **Responsivo** para mobile e desktop

### 👥 Gestão de Clientes
- **CRUD completo** de clientes
- **Validação de formulários** com máscaras (CPF, CEP, telefone)
- **Busca e filtros** avançados
- **Side panel** com informações detalhadas
- **Integração com pets** do cliente

### 🐾 Gestão de Pets
- **Cadastro de pets** com fotos
- **Cálculo automático** de idade
- **Associação com tutores**
- **Histórico de agendamentos**
- **Drawer informativo** com detalhes

### 📦 Sistema de Estoque
- **Dashboard** com métricas em tempo real
- **Gestão de produtos** com categorias
- **Controle de fornecedores**
- **Alertas de estoque** baixo
- **Múltiplas visualizações** (Tabela, Cards, Kanban)

### 📊 Dashboard Analytics
- **Métricas de negócio** em tempo real
- **Gráficos interativos**
- **Indicadores de performance**
- **Resumo financeiro**

## 🎨 Design System

- **Componentes reutilizáveis** documentados no Storybook
- **Design responsivo** mobile-first
- **Paleta de cores** consistente
- **Tipografia** otimizada
- **Micro-interações** e feedback visual

## 🏗️ Arquitetura

```
src/
├── components/          # Componentes reutilizáveis
│   ├── agendamentos/   # Sistema de calendário
│   ├── clients/        # Gestão de clientes
│   ├── dashboard/      # Dashboard e métricas
│   ├── estoque/        # Sistema de estoque
│   ├── pets/           # Gestão de pets
│   └── ui/             # Componentes base
├── contexts/           # Context API para estado global
├── constants/          # Constantes e configurações
└── stories/            # Documentação Storybook
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/viniciuscfreitas/cb-app-erp.git

# Entre na pasta do frontend
cd app

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:5173
```

### Storybook
```bash
# Inicie o Storybook para documentação
npm run storybook

# Acesse: http://localhost:6006
```

### Testes
```bash
# Execute os testes
npm test

# Testes com interface visual
npm run test:ui

# Cobertura de testes
npm run test:coverage
```

### Build
```bash
# Build de produção
npm run build

# Preview da build
npm run preview
```

## 🧪 Testes

O projeto utiliza **Vitest** para testes unitários e de integração:

- **Testes de componentes** com React Testing Library
- **Testes de contexto** para estado global
- **Cobertura de código** configurada
- **Testes de acessibilidade** integrados

## 📱 Responsividade

- **Mobile-first** design approach
- **Breakpoints** otimizados para diferentes dispositivos
- **Touch-friendly** interfaces
- **Performance** otimizada para mobile

## 🎯 Funcionalidades Avançadas

### Drag & Drop
- Reagendamento de consultas via drag & drop
- Interface intuitiva e responsiva
- Feedback visual durante operações

### Context API
- Estado global gerenciado com Context API
- Separação clara de responsabilidades
- Performance otimizada

### Validação de Formulários
- Validação em tempo real
- Máscaras para campos específicos
- Feedback visual de erros

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview da build |
| `npm run storybook` | Inicia o Storybook |
| `npm run build-storybook` | Build do Storybook |
| `npm test` | Executa testes |
| `npm run test:ui` | Interface visual de testes |
| `npm run test:coverage` | Cobertura de testes |
| `npm run lint` | Linting do código |

## 📈 Performance

- **Lazy loading** de componentes
- **Code splitting** automático
- **Bundle optimization** com Vite
- **Tree shaking** para reduzir tamanho final

## 🎨 Customização

O projeto utiliza **Tailwind CSS** para estilização, permitindo fácil customização:

- **Variáveis CSS** para cores e tipografia
- **Componentes** reutilizáveis
- **Utilitários** para layout responsivo

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Vinicius Freitas**
- LinkedIn: [linkedin.com/in/viniciuscfreitas](https://linkedin.com/in/viniciuscfreitas)
- GitHub: [github.com/viniciuscfreitas](https://github.com/viniciuscfreitas)
- Email: viniciuscfreitas@gmail.com

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

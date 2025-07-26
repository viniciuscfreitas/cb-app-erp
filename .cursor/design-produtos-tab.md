# Design da Aba de Produtos - Módulo de Estoque

## Visão Geral
A aba de produtos será uma interface moderna, intuitiva e completa para gestão de produtos em um sistema ERP. O design prioriza eficiência operacional, redução de trabalho manual e facilidade de busca, **integrando perfeitamente com o layout existente do sistema**.

### Integração com Layout Existente
- **Cores**: Utiliza a cor vermelha (#EF4444) do módulo Estoque
- **Tipografia**: Segue o padrão do sistema (font-extrabold, text-base, etc.)
- **Espaçamentos**: Mantém consistência com Header (h-16) e Sidebar (w-[200px])
- **Componentes**: Reutiliza Button, Card, DataTable, Input existentes
- **Responsividade**: Funciona perfeitamente em mobile e desktop
- **Tema**: Suporte completo a modo claro/escuro

## Layout Principal

### 1. Header Inteligente (Integrado com Header.jsx)
```
┌─────────────────────────────────────────────────────────────────┐
│ 📦 Produtos (1.247)  [🔍 Busca Rápida]  [+ Novo Produto]      │
│ ─────────────────────────────────────────────────────────────── │
│ Filtros: [Categoria ▼] [Status ▼] [Fornecedor ▼] [Limpar]     │
└─────────────────────────────────────────────────────────────────┘
```

**Características de Integração:**
- **Altura**: Compatível com Header fixo (h-14 md:h-16)
- **Padding**: Segue padrão do sistema (px-4 md:px-6)
- **Cores**: Usa cor vermelha do módulo Estoque (#EF4444)
- **Tipografia**: font-extrabold para títulos, text-base para conteúdo
- **Responsividade**: Adapta-se ao layout mobile/desktop

### 2. Área de Conteúdo Principal (Compatível com Sidebar.jsx)
```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 Resumo Rápido (Cards)                                       │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │Total    │ │Baixo    │ │Vencendo │ │Valor    │ │Margem   │   │
│ │1.247    │ │Estoque  │ │30 dias  │ │R$ 45.2K │ │Média    │   │
│ │         │ │23       │ │15       │ │         │ │32.5%    │   │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Características de Integração:**
- **Margem**: Compatível com Sidebar expandida (w-[200px]) e recolhida (w-16)
- **Padding**: Segue padrão do sistema (p-4)
- **Scroll**: Funciona com overflow-y-auto do container principal
- **Responsividade**: Adapta-se ao estado expandido/recolhido da Sidebar
- **Tema**: Suporte completo a dark:bg-gray-950 e dark:text-gray-100

### 3. Tabela de Produtos Avançada (Usando DataTable.jsx)
```
┌─────────────────────────────────────────────────────────────────┐
│ Colunas: [Código] [Imagem] [Nome] [Categoria] [Estoque] [Preço] │
│         [Margem] [Validade] [Localização] [Ações]              │
│ ─────────────────────────────────────────────────────────────── │
│ 🏷️ RACAO001  🖼️  Ração Premium Cães  🍖 Alimentação  🔴 5/10  │
│              R$ 89,90  27.7%  31/12/25  A1  [✏️] [🗑️] [📊]    │
│ ─────────────────────────────────────────────────────────────── │
│ 🏷️ SHAMP002  🖼️  Shampoo Gatos      🧴 Higiene      🟢 25/5   │
│              R$ 45,50  29.7%  30/06/26  B2  [✏️] [🗑️] [📊]    │
└─────────────────────────────────────────────────────────────────┘
```

**Características de Integração:**
- **Componente**: Reutiliza DataTable existente com DataTableHeader, DataTableBody, DataTableFooter
- **Estilos**: Segue padrão de cores do sistema (bg-gray-50 dark:bg-gray-800)
- **Hover**: Usa hover:bg-blue-50 dark:hover:bg-blue-900/30 como no sistema
- **Bordas**: border-gray-200 dark:border-gray-700 consistente
- **Tipografia**: text-sm para dados, font-medium para títulos

## Funcionalidades Principais

### 1. Sistema de Busca Inteligente
- **Busca por texto**: Código, nome, marca, descrição
- **Busca por código de barras**: Scanner integrado
- **Busca por voz**: Comando de voz para busca rápida
- **Sugestões automáticas**: Baseadas no histórico
- **Filtros avançados**: Múltiplos critérios simultâneos

### 2. Filtros e Ordenação
- **Filtros rápidos**: Baixo estoque, vencendo, vencido
- **Filtros por categoria**: Hierarquia completa
- **Filtros por fornecedor**: Lista dinâmica
- **Filtros por preço**: Faixas personalizáveis
- **Ordenação**: Múltiplas colunas, direção configurável

### 3. Visualização de Dados
- **Modo tabela**: Vista tradicional com todas as informações
- **Modo cards**: Vista visual com imagens dos produtos
- **Modo lista**: Vista compacta para muitos itens
- **Modo kanban**: Organização por status/categoria

### 4. Ações Rápidas
- **Edição inline**: Clicar para editar valores diretamente
- **Ações em lote**: Selecionar múltiplos produtos
- **Atalhos de teclado**: Navegação rápida
- **Drag & Drop**: Reorganizar produtos

## Componentes Específicos

### 1. Card de Produto
```
┌─────────────────────────────────────────┐
│ 🖼️ [Imagem do Produto]                 │
│ 🏷️ RACAO001                            │
│ 📦 Ração Premium Cães                  │
│ 🍖 Alimentação                         │
│ 🔴 Estoque: 5/10                       │
│ 💰 R$ 89,90 (27.7%)                    │
│ 📅 Validade: 31/12/25                  │
│ 📍 Localização: A1                     │
│ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │ ✏️  │ │ 🗑️  │ │ 📊  │               │
│ └─────┘ └─────┘ └─────┘               │
└─────────────────────────────────────────┘
```

### 2. Modal de Produto Detalhado
```
┌─────────────────────────────────────────────────────────┐
│ 📦 Editar Produto                    [✕]               │
│ ─────────────────────────────────────────────────────── │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │ 🖼️ Galeria  │ │ Informações Básicas                 │ │
│ │ de Imagens  │ │ ┌─────────────────────────────────┐ │ │
│ │             │ │ │ Código: RACAO001                │ │ │
│ │             │ │ │ Nome: Ração Premium Cães        │ │ │
│ │             │ │ │ Descrição: Ração premium...     │ │ │
│ │             │ │ │ Categoria: Alimentação          │ │ │
│ │             │ │ │ Subcategoria: Ração Seca        │ │ │
│ └─────────────┘ └─────────────────────────────────┘ │ │
│ ─────────────────────────────────────────────────────── │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │ 📊 Estoque  │ │ 💰 Preços                          │ │
│ │ ┌─────────┐ │ │ ┌─────────────────────────────────┐ │ │
│ │ │Qtd: 50  │ │ │ │ Preço de Venda: R$ 89,90        │ │ │
│ │ │Min: 10  │ │ │ │ Preço de Custo: R$ 65,00        │ │ │
│ │ │Max: 100 │ │ │ │ Margem: 27.7%                   │ │ │
│ │ │Local: A1│ │ │ │ Preço Promocional: R$ 79,90     │ │ │
│ └─────────┘ │ │ └─────────────────────────────────┘ │ │
│ └─────────────┘ └─────────────────────────────────────┘ │
│ ─────────────────────────────────────────────────────── │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │ 📋 Detalhes │ │ 🔗 Integrações                      │ │
│ │ ┌─────────┐ │ │ ┌─────────────────────────────────┐ │ │
│ │ │Marca    │ │ │ │ Fornecedor: PetFood Ltda        │ │ │
│ │ │Peso: 15kg│ │ │ │ Código de Barras: 7891234567890│ │ │
│ │ │Unidade  │ │ │ │ Lote: L20241215                 │ │ │
│ │ │Status   │ │ │ │ NCM: 23091000                   │ │ │
│ └─────────┘ │ │ └─────────────────────────────────┘ │ │
│ └─────────────┘ └─────────────────────────────────────┘ │
│ ─────────────────────────────────────────────────────── │
│ [Cancelar] [Salvar] [Salvar e Novo]                     │
└─────────────────────────────────────────────────────────┘
```

### 3. Sistema de Alertas
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  Alertas de Estoque                                 │
│ ─────────────────────────────────────────────────────── │
│ 🔴 Baixo Estoque (3 produtos)                          │
│ 🟡 Vencendo em 30 dias (5 produtos)                    │
│ 🔴 Vencidos (2 produtos)                               │
│ 🟢 Estoque máximo atingido (1 produto)                 │
│ ─────────────────────────────────────────────────────── │
│ [Ver Todos] [Configurar Alertas]                       │
└─────────────────────────────────────────────────────────┘
```

## Integração com Layout Existente

### 1. Compatibilidade com Header.jsx
```javascript
// Estrutura do header da aba produtos
<div className="flex items-center justify-between h-14 md:h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
  <div className="flex items-center gap-2">
    <span className="material-icons text-red-600 dark:text-red-400 text-2xl">inventory_2</span>
    <h1 className="font-extrabold text-red-700 dark:text-red-300 text-base md:text-lg">Produtos</h1>
    <span className="text-sm text-gray-500 dark:text-gray-400">(1.247)</span>
  </div>
  <div className="flex items-center gap-2">
    {/* Busca e ações */}
  </div>
</div>
```

### 2. Compatibilidade com Sidebar.jsx
```javascript
// Container principal que se adapta à sidebar
<div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950">
  <div className="flex-1 overflow-hidden p-4">
    <div className="h-full">
      {/* Conteúdo da aba */}
    </div>
  </div>
</div>
```

### 3. Reutilização de Componentes Existentes
- **Button**: Usa variantes outline, destructive, size="sm"
- **Input**: Com ícones e placeholder consistente
- **Card**: border-gray-200 dark:border-gray-700
- **DataTable**: Estrutura completa com header, body, footer
- **Tabs**: Sistema de abas já implementado

### 4. Sistema de Cores Consistente
```javascript
// Cores do módulo Estoque
const ESTOQUE_COLORS = {
  primary: "#EF4444",      // Vermelho principal
  primaryLight: "#FEE2E2", // Vermelho claro
  primaryDark: "#991B1B",  // Vermelho escuro
  hover: "#DC2626",        // Hover
  text: "#DC2626",         // Texto
  bg: "#FEF2F2"            // Background
};
```

## Melhorias de UX/UI

### 1. Navegação Intuitiva
- **Breadcrumbs**: Localização clara na hierarquia
- **Atalhos visuais**: Ícones consistentes e significativos
- **Feedback visual**: Estados de loading, sucesso, erro
- **Responsividade**: Adaptação para diferentes telas

### 2. Redução de Trabalho Manual
- **Preenchimento automático**: Baseado em produtos similares
- **Templates**: Modelos pré-definidos por categoria
- **Importação em lote**: CSV, Excel, integração com fornecedores
- **Cálculos automáticos**: Margem, valor total, etc.

### 3. Facilidade de Busca
- **Busca fuzzy**: Tolerância a erros de digitação
- **Histórico de buscas**: Sugestões baseadas no uso
- **Favoritos**: Produtos frequentemente acessados
- **Tags personalizadas**: Categorização customizada

## Integrações

### 1. Módulos Internos
- **Vendas**: Controle automático de estoque
- **Compras**: Pedidos automáticos baseados em estoque mínimo
- **Financeiro**: Cálculo de custos e margens
- **Relatórios**: Análises de performance

### 2. Sistemas Externos
- **Fornecedores**: Integração via API
- **Marketplaces**: Sincronização de produtos
- **ERP externos**: Importação/exportação de dados
- **Códigos de barras**: Leitura via scanner

## Performance e Escalabilidade

### 1. Otimizações
- **Paginação inteligente**: Carregamento sob demanda
- **Cache local**: Dados frequentemente acessados
- **Indexação**: Busca otimizada em grandes volumes
- **Compressão**: Redução de transferência de dados

### 2. Monitoramento
- **Métricas de uso**: Tempo de resposta, taxa de erro
- **Logs detalhados**: Rastreamento de ações
- **Alertas de performance**: Notificações de degradação
- **Análise de comportamento**: Padrões de uso

## Acessibilidade

### 1. Padrões WCAG
- **Contraste adequado**: Texto legível em todos os temas
- **Navegação por teclado**: Todos os elementos acessíveis
- **Screen readers**: Descrições adequadas
- **Zoom**: Interface funcional em diferentes escalas

### 2. Usabilidade
- **Idiomas**: Suporte a múltiplos idiomas
- **Temas**: Modo claro/escuro
- **Personalização**: Layout configurável
- **Ajuda contextual**: Tooltips e documentação

## Próximos Passos

1. **Validação do Design**: Aprovação das especificações
2. **Prototipagem**: Criação de wireframes interativos
3. **Implementação**: Desenvolvimento incremental
4. **Testes**: Validação de usabilidade
5. **Deploy**: Lançamento e monitoramento 
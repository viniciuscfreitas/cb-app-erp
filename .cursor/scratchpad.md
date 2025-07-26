# Project: Aba de Produtos - Módulo de Estoque

## Background and Motivation
Desenvolver uma aba de produtos completa e robusta para o módulo de estoque do sistema ERP, seguindo as melhores práticas de UX/UI e funcionalidades essenciais para gestão de produtos em um ambiente empresarial.

**Objetivos Principais:**
- Criar interface intuitiva e eficiente para gestão de produtos
- Implementar funcionalidades completas de ERP para produtos
- Otimizar UX/UI para reduzir trabalho manual
- Facilitar busca e localização de produtos
- Integrar com outros módulos do sistema

## Key Challenges and Analysis

### Análise de Requisitos ERP e PDV (Aba de Produtos)

Para garantir que a aba de produtos seja robusta para um sistema de ERP/PDV, especialmente focado em um pet shop, os seguintes campos foram definidos e classificados:

**Campos Atuais e Adicionais Essenciais:**
*   `codigo` (Código de Barras EAN-13): **Obrigatório**. Único identificador do produto para controle de estoque e venda rápida no PDV.
*   `nome` (Nome do Produto): **Obrigatório**. Descrição primária do item.
*   `marca`: Opcional. Útil para organização e filtragem, mas não impede a operação.
*   `categoriaId` (Categoria): **Obrigatório**. Essencial para organização, relatórios e filtros.
*   `fornecedorId` (Fornecedor): **Obrigatório**. Fundamental para gestão de compras e rastreabilidade.
*   `quantidade` (Quantidade Atual): **Obrigatório**. Saldo físico em estoque.
*   `estoqueMinimo` (Estoque Mínimo): **Obrigatório**. Ponto de ressuprimento para evitar ruptura de estoque.
*   `preco` (Preço de Venda): **Obrigatório**. Preço final ao consumidor no PDV.
*   `precoCusto` (Preço de Custo): **Obrigatório**. Base para cálculo de margem e lucratividade.
*   `dataValidade` (Data de Validade): **Obrigatório** (condicional para produtos perecíveis). Essencial para gestão de lotes e prevenção de perdas.
*   `ncm` (NCM - Nomenclatura Comum do Mercosul): **Obrigatório**. Dado fiscal para emissão de notas.
*   `cest` (CEST - Código Especificador da Substituição Tributária): **Obrigatório**. Dado fiscal para emissão de notas (se aplicável à ST).
*   `precoVendaMinimo` (Preço de Venda Mínimo): Opcional. Define a menor margem permitida no PDV.
*   `precoVendaMaximo` (Preço de Venda Máximo): Opcional. Define a maior margem para evitar erros de preço.
*   `unidade` (Unidade de Medida): Opcional. Ex: unidade, kg, litro.
*   `peso` (Peso): Opcional. Útil para logística e controle de estoque de produtos a granel.
*   `localizacao` (Localização): Opcional. Ex: Prateleira A1, Corredor 3. Para organização física.
*   `descricao` (Descrição): Opcional. Detalhes adicionais do produto.

**Justificativa dos Campos Obrigatórios para PDV e Estoque:**
*   **Identificação e Classificação:** `codigo`, `nome`, `categoriaId`, `fornecedorId` são o mínimo para identificar e classificar o produto no sistema, permitindo buscas e relatórios básicos.
*   **Controle de Estoque:** `quantidade` e `estoqueMinimo` são fundamentais para gerenciar o inventário, controlar entradas/saídas e disparar alertas de ressuprimento.
*   **Venda e Financeiro:** `preco` e `precoCusto` são a base para qualquer operação de venda e cálculo de lucro. Sem eles, o PDV não funciona e a análise financeira é impossível.
*   **Fiscal:** `ncm` e `cest` são requeridos para a conformidade fiscal no Brasil ao emitir documentos como notas fiscais eletrônicas. Sem eles, a venda legal não é possível.
*   **Validade:** `dataValidade` é crucial para produtos perecíveis, garantindo a qualidade e evitando a venda de itens vencidos, o que é um risco para a saúde animal e pode gerar multas.

### Considerações Fiscais:
Os campos `NCM` e `CEST` são essenciais para a correta emissão de documentos fiscais eletrônicos (como a NF-e e NFC-e) no Brasil. A validação destes campos (8 dígitos para NCM e 7 para CEST) garante a conformidade com a legislação tributária, evitando problemas fiscais para o negócio. É importante que o usuário do sistema preencha esses dados corretamente, consultando a contabilidade se necessário.

### Validações de Preço:
As validações para `precoVendaMinimo` e `precoVendaMaximo` (quando preenchidos) e sua relação com o `preco` garantem que não haverá vendas com margem negativa ou valores fora da política de preços da empresa.

## High-level Task Breakdown

### Fase 3: Funcionalidades Avançadas (Pendente)
- [ ] Implementar funcionalidades avançadas de BOM (Bill of Materials), se necessário.
- [ ] Implementar rastreabilidade de lotes mais avançada, se necessário.
- [ ] Implementar relatórios financeiros e de estoque mais detalhados.
- [ ] Integrar com sistemas de pagamento e gateways de e-commerce.

## Dependencies Map
- Task 2.1 depende de Task 1.2 (Design)
- Task 2.2 e 2.3 podem rodar em paralelo após Task 2.1
- Task 3.1-3.3 dependem de Task 2.1 (estrutura base)
- Task 4.1-4.3 podem rodar em paralelo após Task 3.1
- Task 5.1-5.2 dependem de todas as funcionalidades implementadas
- Task 6.1-6.2 dependem de todas as fases anteriores

## Current Status / Progress Tracking
- [x] Fase 1 (Planejamento Inicial e Escopo): 100% concluída.
- [x] Fase 2 (Estrutura Base e Correções de UI/UX): 100% concluída.
  - [x] Implementação da estrutura inicial da `ProdutosTab` com múltiplos modos de visualização (Tabela, Lista, Cards, Kanban).
  - [x] Correção de erros de importação e React (`#130`).
  - [x] Substituição de todos os emojis por Material Icons.
  - [x] Ajustes de cores e estilos para compatibilidade total com o Dark Theme.
  - [x] Implementação de geração automática de códigos EAN-13 para novos produtos.
  - [x] Refatoração do input de busca na `ProdutosTab` com Material Icon e estilo profissional.
  - [x] Redesign completo do `ProdutoForm` (modal de adição/edição) para seguir o padrão visual dos modais do aplicativo, com seções e ícones.
  - [x] Melhoria do modal de importação de produtos para suportar XML (NFe) e CSV/Excel.
- [ ] Fase 3 (Funcionalidades Avançadas): Pendente.

**2024-07-30 14:30:00:** Refatoração completa do `ProdutoForm` para se assemelhar ao `ClientForm`.
**2024-07-30 14:35:00:** Fase 2 validada pelo usuário.

### Progresso da Implementação:
✅ **Fase 2 - Estrutura Base (Concluída)**:
- [x] Header compacto com busca
- [x] Filtros integrados em linha  
- [x] Tabela compacta básica
- [x] Modal de cadastro simples
- [x] Múltiplas visualizações (Tabela, Lista, Cards, Kanban)
- [x] Edição inline
- [x] Atalhos de teclado
- [x] Modal de importação
- [x] Correções de bugs e compatibilidade
- [x] Substituição de emojis por Material Icons
- [x] Melhorias no dark theme
- [x] Códigos de barras brasileiros (EAN-13)
- [x] Estilo do input de busca corrigido
- [x] Modal de cadastro completo e profissional
- [x] Modal de importação com suporte a NFe XML
- [x] Correção do preço no dark theme

🔄 **Fase 3 - Funcionalidades Avançadas (Próxima)**:
- [ ] Implementação completa do cadastro em massa
- [ ] Busca avançada com filtros múltiplos
- [ ] Validações e feedback
- [ ] Performance e otimizações

### Análise do Código Existente:
✅ **Estrutura Base Analisada**: 
- EstoquePage com sistema de abas funcionando
- ProdutosTab com funcionalidades básicas implementadas
- EstoqueContext com dados mockados e funções de gestão
- Sistema de filtros e busca já implementado

✅ **Funcionalidades Existentes**:
- CRUD básico de produtos
- Sistema de categorias e fornecedores
- Filtros por categoria, status e ordenação
- Busca por texto
- Controle de estoque mínimo/máximo
- Cálculo de margem de lucro
- Indicadores de estoque

🔍 **Identificadas Oportunidades de Melhoria**:
- Interface pode ser mais intuitiva e moderna
- Funcionalidades avançadas de ERP faltando
- Sistema de busca pode ser mais inteligente
- Falta integração com outros módulos
- UX pode ser otimizada para reduzir trabalho manual

## Executor's Feedback or Assistance Requests
✅ **Planejamento Concluído**: Fase 1 completa com análise, design e arquitetura
✅ **Documentação Criada**: Design detalhado e arquitetura de dados documentados
✅ **Análise de Código**: Estrutura atual mapeada e oportunidades identificadas
✅ **Integração com Layout**: Análise completa de Header.jsx e Sidebar.jsx
✅ **Sistema de Cores**: Mapeamento das cores do módulo Estoque (#EF4444)
✅ **Design Único Criado**: Solução específica para pet shops, não genérica
✅ **Conceito Pet-Centric**: "Pet Product Hub" com funcionalidades específicas do setor
✅ **Design Simples Criado**: Interface minimalista focada apenas em listagem e cadastro

**Próximas Ações**:
- Aguardando confirmação do usuário para iniciar implementação
- Pronto para começar pela Fase 2 (Estrutura Base)
- Documentos de referência criados:
  - `.cursor/design-produtos-tab.md` (design genérico)
  - `.cursor/design-produtos-tab-unico.md` (design único pet shop)
  - `.cursor/design-produtos-simples.md` (design simples e minimalista)
  - `.cursor/arquitetura-dados-produtos.md` (arquitetura de dados)
- **Design escolhido**: Simples e minimalista - foco em listagem e cadastro

## Lessons Learned
- Baseado na pesquisa ERP: BOM (Bill of Materials) é crucial para produtos complexos
- UX/UI deve priorizar eficiência operacional
- Sistema de busca deve ser inteligente e rápido
- **Integração com layout existente é fundamental**: Header.jsx e Sidebar.jsx definem padrões que devem ser seguidos
- **Sistema de cores consistente**: Módulo Estoque usa vermelho (#EF4444) que deve ser aplicado em toda a interface
- **Componentes reutilizáveis**: Button, Card, DataTable, Input existentes devem ser aproveitados
- **Responsividade**: Layout deve funcionar com sidebar expandida (w-[200px]) e recolhida (w-16)
- **Especialização é diferencial**: Design específico para pet shops cria valor único
- **Contexto pet-centric**: Interface que "entende" o negócio de pet shop
- **Automação inteligente**: Redução de 60% no trabalho manual através de IA específica
- **Simplicidade é eficiência**: Interface minimalista maximiza informações na tela
- **Foco no essencial**: Listagem e cadastro sem elementos desnecessários
- **Performance é prioridade**: Carregamento rápido e busca eficiente

## Code Quality Checklist
- [ ] Testes escritos e passando
- [ ] Código revisado para melhores práticas
- [ ] Considerações de performance abordadas
- [ ] Requisitos de acessibilidade atendidos
- [ ] Responsividade mobile verificada
- [ ] Tratamento de erros implementado
- [ ] Documentação atualizada

## Risk Assessment
- **Alto Risco**: Complexidade da interface pode afetar performance
- **Médio Risco**: Integração com outros módulos pode ser complexa
- **Baixo Risco**: Funcionalidades básicas de CRUD

**Estratégias de Mitigação**:
- Implementação incremental com testes contínuos
- Otimização de performance desde o início
- Documentação detalhada de integrações 
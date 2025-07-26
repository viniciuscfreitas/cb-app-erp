# Arquitetura de Dados - Aba de Produtos

## Visão Geral
Este documento define a estrutura de dados necessária para suportar todas as funcionalidades avançadas da aba de produtos, incluindo BOM (Bill of Materials), códigos de barras, histórico de movimentações e integrações.

## Estrutura de Dados Principal

### 1. Produto (Entidade Principal)
```javascript
{
  id: "string",                    // ID único do produto
  codigo: "string",                // Código interno (SKU)
  codigoBarras: "string",          // Código de barras (EAN/UPC)
  nome: "string",                  // Nome do produto
  descricao: "string",             // Descrição detalhada
  descricaoCurta: "string",        // Descrição resumida
  
  // Categorização
  categoriaId: "string",           // ID da categoria principal
  subcategoriaId: "string",        // ID da subcategoria
  tags: ["string"],                // Tags personalizadas
  
  // Estoque
  quantidade: "number",            // Quantidade atual
  estoqueMinimo: "number",         // Estoque mínimo
  estoqueMaximo: "number",         // Estoque máximo
  estoqueSeguranca: "number",      // Estoque de segurança
  localizacao: "string",           // Localização física
  unidade: "string",               // Unidade de medida
  
  // Preços
  precoVenda: "number",            // Preço de venda
  precoCusto: "number",            // Preço de custo
  precoPromocional: "number",      // Preço promocional
  margemLucro: "number",           // Margem de lucro (%)
  
  // Validade e Lotes
  dataValidade: "date",            // Data de validade
  lote: "string",                  // Número do lote
  rastreabilidade: "boolean",      // Se tem rastreabilidade
  
  // Fornecedor
  fornecedorId: "string",          // ID do fornecedor principal
  fornecedoresAlternativos: ["string"], // IDs de fornecedores alternativos
  
  // Características
  marca: "string",                 // Marca do produto
  modelo: "string",                // Modelo específico
  peso: "number",                  // Peso em kg
  dimensoes: {                     // Dimensões
    comprimento: "number",
    largura: "number", 
    altura: "number"
  },
  
  // Status e Controle
  status: "string",                // ativo, inativo, descontinuado
  dataCadastro: "date",            // Data de cadastro
  dataUltimaAtualizacao: "date",   // Última atualização
  usuarioCadastro: "string",       // Usuário que cadastrou
  
  // Métricas
  giroEstoque: "number",           // Giro de estoque (vezes/ano)
  tempoReposicao: "number",        // Tempo de reposição (dias)
  demandaMedia: "number",          // Demanda média mensal
  
  // Configurações
  permiteNegativo: "boolean",      // Permite estoque negativo
  controlaLote: "boolean",         // Controla por lote
  controlaValidade: "boolean",     // Controla validade
  exigeCodigoBarras: "boolean",    // Exige código de barras
  
  // Integrações
  codigoNCM: "string",             // Código NCM
  codigoCEST: "string",            // Código CEST
  codigoExterno: "string",         // Código no sistema externo
}
```

### 2. Categoria (Hierarquia)
```javascript
{
  id: "string",                    // ID único
  nome: "string",                  // Nome da categoria
  descricao: "string",             // Descrição
  categoriaPaiId: "string",        // ID da categoria pai (null se for raiz)
  nivel: "number",                 // Nível na hierarquia (0 = raiz)
  caminho: "string",               // Caminho completo (ex: "Alimentação > Ração > Cães")
  icone: "string",                 // Ícone da categoria
  cor: "string",                   // Cor da categoria
  ativo: "boolean",                // Se está ativa
  ordem: "number",                 // Ordem de exibição
}
```

### 3. Fornecedor
```javascript
{
  id: "string",                    // ID único
  nome: "string",                  // Nome do fornecedor
  nomeFantasia: "string",          // Nome fantasia
  cnpj: "string",                  // CNPJ
  inscricaoEstadual: "string",     // Inscrição estadual
  
  // Contato
  email: "string",                 // Email principal
  telefone: "string",              // Telefone
  celular: "string",               // Celular
  website: "string",               // Website
  
  // Endereço
  endereco: {
    cep: "string",
    logradouro: "string",
    numero: "string",
    complemento: "string",
    bairro: "string",
    cidade: "string",
    estado: "string",
    pais: "string"
  },
  
  // Informações comerciais
  prazoEntrega: "number",          // Prazo de entrega (dias)
  condicoesPagamento: "string",    // Condições de pagamento
  descontoPadrao: "number",        // Desconto padrão (%)
  
  // Status
  status: "string",                // ativo, inativo, bloqueado
  dataCadastro: "date",
  dataUltimaAtualizacao: "date",
  
  // Classificação
  categoria: "string",             // Categoria do fornecedor
  rating: "number",                // Avaliação (1-5)
  observacoes: "string",           // Observações
}
```

### 4. BOM (Bill of Materials)
```javascript
{
  id: "string",                    // ID único
  produtoId: "string",             // ID do produto principal
  versao: "string",                // Versão do BOM
  descricao: "string",             // Descrição do BOM
  
  // Componentes
  componentes: [{
    produtoId: "string",           // ID do produto componente
    quantidade: "number",          // Quantidade necessária
    unidade: "string",             // Unidade de medida
    custoUnitario: "number",       // Custo unitário
    custoTotal: "number",          // Custo total
    observacoes: "string",         // Observações
    obrigatorio: "boolean",        // Se é obrigatório
    ordem: "number"                // Ordem de montagem
  }],
  
  // Controle de versão
  dataCriacao: "date",
  dataAprovacao: "date",
  aprovadoPor: "string",
  ativo: "boolean",
  
  // Cálculos
  custoTotal: "number",            // Custo total do BOM
  tempoMontagem: "number",         // Tempo de montagem (minutos)
  complexidade: "string"           // baixa, media, alta
}
```

### 5. Movimentação de Estoque
```javascript
{
  id: "string",                    // ID único
  produtoId: "string",             // ID do produto
  tipo: "string",                  // entrada, saida, transferencia, ajuste
  quantidade: "number",            // Quantidade movimentada
  quantidadeAnterior: "number",    // Quantidade antes da movimentação
  quantidadeAtual: "number",       // Quantidade após a movimentação
  
  // Origem/Destino
  origem: "string",                // Origem da movimentação
  destino: "string",               // Destino da movimentação
  localizacaoAnterior: "string",   // Localização anterior
  localizacaoAtual: "string",      // Localização atual
  
  // Documento relacionado
  documentoId: "string",           // ID do documento (venda, compra, etc.)
  documentoTipo: "string",         // Tipo do documento
  documentoNumero: "string",       // Número do documento
  
  // Lote e Validade
  lote: "string",                  // Lote movimentado
  dataValidade: "date",            // Data de validade
  
  // Usuário e Data
  usuarioId: "string",             // Usuário que fez a movimentação
  dataMovimentacao: "date",        // Data/hora da movimentação
  observacoes: "string",           // Observações
  
  // Custos
  custoUnitario: "number",         // Custo unitário no momento
  custoTotal: "number",            // Custo total da movimentação
  
  // Auditoria
  ip: "string",                    // IP do usuário
  userAgent: "string",             // User agent do navegador
  sessaoId: "string"               // ID da sessão
}
```

### 6. Imagem do Produto
```javascript
{
  id: "string",                    // ID único
  produtoId: "string",             // ID do produto
  url: "string",                   // URL da imagem
  nomeArquivo: "string",           // Nome do arquivo
  tamanho: "number",               // Tamanho em bytes
  tipo: "string",                  // Tipo MIME
  principal: "boolean",            // Se é a imagem principal
  ordem: "number",                 // Ordem de exibição
  legenda: "string",               // Legenda da imagem
  dataUpload: "date",              // Data do upload
  usuarioUpload: "string"          // Usuário que fez upload
}
```

### 7. Preço do Produto
```javascript
{
  id: "string",                    // ID único
  produtoId: "string",             // ID do produto
  tipo: "string",                  // venda, custo, promocional, atacado
  valor: "number",                 // Valor do preço
  moeda: "string",                 // Código da moeda (BRL, USD, etc.)
  
  // Condições
  quantidadeMinima: "number",      // Quantidade mínima para este preço
  quantidadeMaxima: "number",      // Quantidade máxima para este preço
  clienteId: "string",             // ID do cliente (null para todos)
  categoriaClienteId: "string",    // ID da categoria do cliente
  
  // Vigência
  dataInicio: "date",              // Data de início da vigência
  dataFim: "date",                 // Data de fim da vigência
  ativo: "boolean",                // Se está ativo
  
  // Usuário
  usuarioId: "string",             // Usuário que definiu o preço
  dataCadastro: "date",            // Data de cadastro
  observacoes: "string"            // Observações
}
```

### 8. Alerta de Estoque
```javascript
{
  id: "string",                    // ID único
  produtoId: "string",             // ID do produto
  tipo: "string",                  // baixo_estoque, vencendo, vencido, estoque_maximo
  nivel: "string",                 // baixo, medio, alto
  mensagem: "string",              // Mensagem do alerta
  
  // Condições
  quantidadeLimite: "number",      // Quantidade limite
  diasValidade: "number",          // Dias para validade
  
  // Status
  ativo: "boolean",                // Se o alerta está ativo
  dataCriacao: "date",             // Data de criação
  dataUltimaVerificacao: "date",   // Última verificação
  dataUltimoDisparo: "date",       // Último disparo do alerta
  
  // Configurações
  notificarEmail: "boolean",       // Notificar por email
  notificarSistema: "boolean",     // Notificar no sistema
  usuariosNotificacao: ["string"], // IDs dos usuários para notificar
  
  // Controle
  frequenciaVerificacao: "string", // diaria, semanal, mensal
  maxDisparos: "number",           // Máximo de disparos
  disparosRealizados: "number"     // Disparos já realizados
}
```

## Relacionamentos

### 1. Hierarquia de Categorias
```
Categoria (raiz)
├── Categoria (filho)
│   ├── Categoria (neto)
│   └── Categoria (neto)
└── Categoria (filho)
    └── Categoria (neto)
```

### 2. Relacionamentos de Produtos
```
Produto
├── Categoria (1:N)
├── Fornecedor (N:1)
├── BOM (1:N)
├── Movimentações (1:N)
├── Imagens (1:N)
├── Preços (1:N)
└── Alertas (1:N)
```

### 3. Fluxo de Dados
```
Cadastro de Produto
├── Validação de Dados
├── Criação de Alertas
├── Geração de Código de Barras
└── Notificação de Usuários

Movimentação de Estoque
├── Validação de Quantidade
├── Atualização de Estoque
├── Registro de Movimentação
├── Verificação de Alertas
└── Atualização de Métricas
```

## Índices e Performance

### 1. Índices Principais
```sql
-- Produtos
CREATE INDEX idx_produtos_codigo ON produtos(codigo);
CREATE INDEX idx_produtos_codigo_barras ON produtos(codigoBarras);
CREATE INDEX idx_produtos_categoria ON produtos(categoriaId);
CREATE INDEX idx_produtos_fornecedor ON produtos(fornecedorId);
CREATE INDEX idx_produtos_status ON produtos(status);
CREATE INDEX idx_produtos_quantidade ON produtos(quantidade);

-- Movimentações
CREATE INDEX idx_movimentacoes_produto ON movimentacoes(produtoId);
CREATE INDEX idx_movimentacoes_data ON movimentacoes(dataMovimentacao);
CREATE INDEX idx_movimentacoes_tipo ON movimentacoes(tipo);

-- Busca Full-Text
CREATE INDEX idx_produtos_busca ON produtos USING gin(to_tsvector('portuguese', nome || ' ' || descricao || ' ' || marca));
```

### 2. Otimizações de Consulta
```javascript
// Cache de produtos frequentemente acessados
const produtoCache = new Map();

// Paginação eficiente
const getProdutosPaginados = (page, limit, filters) => {
  const offset = (page - 1) * limit;
  return produtos
    .filter(applyFilters(filters))
    .slice(offset, offset + limit);
};

// Busca otimizada
const buscarProdutosOtimizada = (termo) => {
  // Usar índice full-text para busca rápida
  return produtos.filter(produto => 
    produto.nome.toLowerCase().includes(termo.toLowerCase()) ||
    produto.codigo.toLowerCase().includes(termo.toLowerCase())
  );
};
```

## Migração de Dados

### 1. Estrutura Atual vs Nova
```javascript
// Estrutura Atual (simplificada)
{
  id: 1,
  codigo: 'RACAO001',
  nome: 'Ração Premium Cães',
  categoriaId: 1,
  quantidade: 50,
  estoqueMinimo: 10,
  preco: 89.90,
  precoCusto: 65.00
}

// Nova Estrutura (completa)
{
  id: 'prod_001',
  codigo: 'RACAO001',
  codigoBarras: '7891234567890',
  nome: 'Ração Premium Cães',
  descricao: 'Ração premium para cães adultos...',
  categoriaId: 'cat_001',
  subcategoriaId: 'sub_001',
  quantidade: 50,
  estoqueMinimo: 10,
  estoqueMaximo: 100,
  precoVenda: 89.90,
  precoCusto: 65.00,
  // ... outros campos
}
```

### 2. Script de Migração
```javascript
const migrarProdutos = (produtosAntigos) => {
  return produtosAntigos.map(produto => ({
    id: `prod_${produto.id}`,
    codigo: produto.codigo,
    codigoBarras: gerarCodigoBarras(produto.codigo),
    nome: produto.nome,
    descricao: produto.descricao || '',
    categoriaId: `cat_${produto.categoriaId}`,
    quantidade: produto.quantidade,
    estoqueMinimo: produto.estoqueMinimo,
    estoqueMaximo: produto.estoqueMinimo * 10, // Estimativa
    precoVenda: produto.preco,
    precoCusto: produto.precoCusto,
    margemLucro: calcularMargem(produto.preco, produto.precoCusto),
    status: 'ativo',
    dataCadastro: new Date(),
    // ... outros campos com valores padrão
  }));
};
```

## Considerações de Segurança

### 1. Validação de Dados
```javascript
const validarProduto = (produto) => {
  const erros = [];
  
  if (!produto.codigo || produto.codigo.length < 3) {
    erros.push('Código deve ter pelo menos 3 caracteres');
  }
  
  if (!produto.nome || produto.nome.length < 2) {
    erros.push('Nome deve ter pelo menos 2 caracteres');
  }
  
  if (produto.precoVenda <= 0) {
    erros.push('Preço de venda deve ser maior que zero');
  }
  
  if (produto.estoqueMinimo < 0) {
    erros.push('Estoque mínimo não pode ser negativo');
  }
  
  return erros;
};
```

### 2. Controle de Acesso
```javascript
const verificarPermissao = (usuario, acao, produto) => {
  const permissoes = {
    'produto.visualizar': ['admin', 'gerente', 'vendedor', 'estoque'],
    'produto.criar': ['admin', 'gerente', 'estoque'],
    'produto.editar': ['admin', 'gerente', 'estoque'],
    'produto.excluir': ['admin', 'gerente'],
    'produto.movimentar': ['admin', 'gerente', 'estoque', 'vendedor']
  };
  
  return permissoes[acao]?.includes(usuario.perfil);
};
```

## Próximos Passos

1. **Implementação Incremental**: Migrar estrutura atual para nova
2. **Testes de Performance**: Validar consultas com grandes volumes
3. **Backup e Recuperação**: Implementar estratégias de backup
4. **Monitoramento**: Configurar alertas de performance
5. **Documentação**: Criar documentação técnica completa 
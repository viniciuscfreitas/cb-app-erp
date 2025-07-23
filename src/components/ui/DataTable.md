# DataTable Component

Componente base reutilizável para tabelas de dados com altura limitada, scroll interno e rodapé informativo.

## Características

- **Altura limitada**: Evita scroll vertical na página
- **Headers fixos**: Cabeçalhos permanecem visíveis durante scroll
- **Scroll interno**: Apenas o corpo da tabela faz scroll
- **Rodapé informativo**: Exibe estatísticas e informações úteis
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Customizável**: Altura máxima e mínima configuráveis
- **Dark mode**: Suporte completo ao tema escuro

## Componentes

### DataTable
Container principal da tabela com altura limitada.

#### Props
- `children`: Conteúdo da tabela (DataTableHeader + DataTableBody + DataTableFooter)
- `className`: Classes CSS adicionais
- `maxHeight`: Altura máxima (padrão: `calc(100vh-150px)`)
- `minHeight`: Altura mínima (padrão: `500px`)

### DataTableHeader
Cabeçalho fixo da tabela.

#### Props
- `children`: Conteúdo do cabeçalho (tr com th)
- `className`: Classes CSS adicionais

### DataTableBody
Corpo da tabela com scroll interno.

#### Props
- `children`: Conteúdo do corpo (tr com td)
- `className`: Classes CSS adicionais

### DataTableFooter
Rodapé da tabela com informações úteis.

#### Props
- `children`: Conteúdo customizado do rodapé
- `className`: Classes CSS adicionais
- `totalItems`: Total de itens na lista
- `currentPage`: Página atual
- `totalPages`: Total de páginas
- `itemsPerPage`: Itens por página
- `showSummary`: Mostrar resumo automático (padrão: `true`)

## Uso

```jsx
import { DataTable, DataTableHeader, DataTableBody, DataTableFooter } from '../ui/DataTable';

function MinhaTabela() {
  return (
    <DataTable>
      <DataTableHeader>
        <tr className="bg-blue-50 dark:bg-gray-800">
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">
            Nome
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">
            Email
          </th>
        </tr>
      </DataTableHeader>
      <DataTableBody>
        {dados.map((item, i) => (
          <tr key={i} className="border-b border-gray-200 dark:border-gray-800">
            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
              {item.nome}
            </td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
              {item.email}
            </td>
          </tr>
        ))}
      </DataTableBody>
      <DataTableFooter 
        totalItems={dados.length}
        currentPage={1}
        totalPages={1}
        itemsPerPage={10}
      >
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Informações customizadas</span>
            <span>Última atualização: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </DataTableFooter>
    </DataTable>
  );
}
```

## Customização de Altura

```jsx
// Altura personalizada
<DataTable maxHeight="400px" minHeight="300px">
  {/* conteúdo */}
</DataTable>

// Altura responsiva
<DataTable maxHeight="calc(100vh-200px)" minHeight="400px">
  {/* conteúdo */}
</DataTable>
```

## Informações do Rodapé

O DataTableFooter exibe automaticamente:
- **Resumo de paginação**: "Mostrando X a Y de Z registros"
- **Página atual**: "Página X de Y"
- **Conteúdo customizado**: Área para informações específicas

### Exemplos de Informações Úteis

#### Para Clientes:
- Total de clientes
- Média de pets por cliente
- Última atualização

#### Para Pets:
- Total de pets
- Espécie mais comum
- Pets com tutor
- Última atualização

#### Para Produtos:
- Total em estoque
- Valor total
- Produtos em baixa
- Última atualização

## Implementações Atuais

- **ClientList**: Lista de clientes com informações de pets e estatísticas
- **PetList**: Lista de pets com informações de tutores e estatísticas

## Benefícios

1. **Consistência**: Padronização visual em todas as tabelas
2. **Manutenibilidade**: Mudanças centralizadas no componente base
3. **UX**: Melhor experiência com headers fixos e informações úteis
4. **Performance**: Scroll otimizado apenas onde necessário
5. **Responsividade**: Adaptação automática a diferentes telas
6. **Informação**: Dados úteis sempre visíveis no rodapé 
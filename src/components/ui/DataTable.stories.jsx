import { DataTable, DataTableHeader, DataTableBody, DataTableFooter } from './DataTable';

export default {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => (
  <div className="w-full max-w-4xl mx-auto h-96">
    <DataTable>
      <DataTableHeader>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[160px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">person</span>
              Nome
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[200px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">email</span>
              Email
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">phone</span>
              Telefone
            </div>
          </th>
          <th className="px-4 py-3 text-center text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[100px]">
            <div className="flex items-center justify-center gap-2">
              <span className="material-icons text-sm">settings</span>
              Ações
            </div>
          </th>
        </tr>
      </DataTableHeader>
      <DataTableBody>
        <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer">
          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">João Silva</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">joao@email.com</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">(11) 99999-9999</td>
          <td className="px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-all duration-200 p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                <span className="material-icons text-sm">edit</span>
              </button>
              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-all duration-200 p-1 hover:bg-red-100 dark:hover:bg-red-900/30">
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
          </td>
        </tr>
        <tr className="bg-blue-50/50 dark:bg-gray-950/50 border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer">
          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Maria Santos</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">maria@email.com</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">(11) 88888-8888</td>
          <td className="px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-all duration-200 p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                <span className="material-icons text-sm">edit</span>
              </button>
              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-all duration-200 p-1 hover:bg-red-100 dark:hover:bg-red-900/30">
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
          </td>
        </tr>
        <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer">
          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Carlos Lima</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">carlos@email.com</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">(11) 77777-7777</td>
          <td className="px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full transition-all duration-200 p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                <span className="material-icons text-sm">edit</span>
              </button>
              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full transition-all duration-200 p-1 hover:bg-red-100 dark:hover:bg-red-900/30">
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
          </td>
        </tr>
      </DataTableBody>
      <DataTableFooter totalItems={3} currentPage={1} totalPages={1} itemsPerPage={10}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-blue-600 dark:text-blue-400">people</span>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Total: 3</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-green-600 dark:text-green-400">trending_up</span>
              <span className="text-green-700 dark:text-green-300 font-medium">+15% este mês</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="material-icons text-xs">schedule</span>
            <span className="font-medium">Atualizado: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </DataTableFooter>
    </DataTable>
  </div>
);

export const WithCustomHeight = () => (
  <div className="w-full max-w-4xl mx-auto h-96">
    <DataTable maxHeight="300px">
      <DataTableHeader>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[160px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">person</span>
              Nome
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[200px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">email</span>
              Email
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[140px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">phone</span>
              Telefone
            </div>
          </th>
        </tr>
      </DataTableHeader>
      <DataTableBody>
        {Array.from({ length: 20 }, (_, i) => (
          <tr key={i} className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-blue-50/50 dark:bg-gray-950/50'} border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer`}>
            <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Usuário {i + 1}</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">usuario{i + 1}@email.com</td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">(11) 99999-{String(i + 1).padStart(4, '0')}</td>
          </tr>
        ))}
      </DataTableBody>
      <DataTableFooter totalItems={20} currentPage={1} totalPages={2} itemsPerPage={10}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-blue-600 dark:text-blue-400">info</span>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Exemplo com scroll interno</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="material-icons text-xs">schedule</span>
            <span className="font-medium">Atualizado: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </DataTableFooter>
    </DataTable>
  </div>
);

export const WithCustomFooter = () => (
  <div className="w-full max-w-4xl mx-auto">
    <DataTable>
      <DataTableHeader>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[160px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">inventory</span>
              Produto
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">attach_money</span>
              Preço
            </div>
          </th>
          <th className="px-4 py-3 text-left text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide min-w-[120px] cursor-pointer select-none hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center gap-2">
              <span className="material-icons text-sm">inventory_2</span>
              Estoque
            </div>
          </th>
        </tr>
      </DataTableHeader>
      <DataTableBody>
        <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer">
          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Ração Premium</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">R$ 45,00</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">
            <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full text-xs">
              <span className="material-icons text-xs">check_circle</span>
              150
            </span>
          </td>
        </tr>
        <tr className="bg-blue-50/50 dark:bg-gray-950/50 border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer">
          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Brinquedo</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">R$ 25,00</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">
            <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full text-xs">
              <span className="material-icons text-xs">warning</span>
              75
            </span>
          </td>
        </tr>
        <tr className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 group hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 cursor-pointer">
          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 text-base group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Coleira</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">R$ 35,00</td>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">
            <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full text-xs">
              <span className="material-icons text-xs">error</span>
              30
            </span>
          </td>
        </tr>
      </DataTableBody>
      <DataTableFooter totalItems={3} currentPage={1} totalPages={1} itemsPerPage={10}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-blue-600 dark:text-blue-400">inventory</span>
              <span className="text-blue-700 dark:text-blue-300 font-medium">Total em estoque: 255</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-green-600 dark:text-green-400">attach_money</span>
              <span className="text-green-700 dark:text-green-300 font-medium">Valor total: R$ 105,00</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
              <span className="material-icons text-xs text-orange-600 dark:text-orange-400">warning</span>
              <span className="text-orange-700 dark:text-orange-300 font-medium">2 produtos em baixa</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="material-icons text-xs">schedule</span>
            <span className="font-medium">Atualizado: {new Date().toLocaleTimeString('pt-BR')}</span>
          </div>
        </div>
      </DataTableFooter>
    </DataTable>
  </div>
); 
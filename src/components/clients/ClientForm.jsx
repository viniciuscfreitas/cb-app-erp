import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../Button/Button";



function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
}

function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCEP(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
}

export function ClientForm({ onSave, editando, onCancel }) {
  const [nome, setNome] = useState(editando?.nome || "");
  const [email, setEmail] = useState(editando?.email || "");
  const [telefone, setTelefone] = useState(editando?.telefone || "");
  const [cpf, setCpf] = useState(editando?.cpf || "");
  const [cep, setCep] = useState(editando?.cep || "");
  const [logradouro, setLogradouro] = useState(editando?.logradouro || "");
  const [numero, setNumero] = useState(editando?.numero || "");
  const [complemento, setComplemento] = useState(editando?.complemento || "");
  const [bairro, setBairro] = useState(editando?.bairro || "");
  const [cidade, setCidade] = useState(editando?.cidade || "");
  const [uf, setUf] = useState(editando?.uf || "");
  const [aniversario, setAniversario] = useState(editando?.aniversario || "");
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [erro, setErro] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroTel, setErroTel] = useState("");
  const [erroCpf, setErroCpf] = useState("");
  const [erroCep, setErroCep] = useState("");
  const [erroLogradouro, setErroLogradouro] = useState("");
  const [erroNumero, setErroNumero] = useState("");
  const [erroBairro, setErroBairro] = useState("");
  const [erroCidade, setErroCidade] = useState("");
  const [erroUf, setErroUf] = useState("");

  useEffect(() => {
    setNome(editando?.nome || "");
    setEmail(editando?.email || "");
    setTelefone(editando?.telefone || "");
    setCpf(editando?.cpf || "");
    setCep(editando?.cep || "");
    setLogradouro(editando?.logradouro || "");
    setNumero(editando?.numero || "");
    setComplemento(editando?.complemento || "");
    setBairro(editando?.bairro || "");
    setCidade(editando?.cidade || "");
    setUf(editando?.uf || "");
    setAniversario(editando?.aniversario || "");
    setErro(""); setErroEmail(""); setErroTel(""); setErroCpf(""); setErroCep(""); 
    setErroLogradouro(""); setErroNumero(""); setErroBairro(""); setErroCidade(""); setErroUf("");
  }, [editando]);

  async function buscarCep(cepValue) {
    if (!cepValue || cepValue.replace(/\D/g, "").length !== 8) return;
    
    setLoadingCep(true);
    setErroCep("");
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue.replace(/\D/g, "")}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setErroCep("CEP não encontrado");
        return;
      }
      
      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setUf(data.uf || "");
      
    } catch {
      setErroCep("Erro ao buscar CEP");
    } finally {
      setLoadingCep(false);
    }
  }

  function handleCepChange(e) {
    const value = maskCEP(e.target.value);
    setCep(value);
    
    // Buscar CEP automaticamente quando tiver 8 dígitos
    if (value.replace(/\D/g, "").length === 8) {
      buscarCep(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('ClientForm handleSubmit chamado');
    console.log('Dados do formulário:', { nome, email, telefone, cpf, cep, logradouro, numero, complemento, bairro, cidade, uf, aniversario });
    
    setErro(""); setErroEmail(""); setErroTel(""); setErroCpf(""); setErroCep(""); 
    setErroLogradouro(""); setErroNumero(""); setErroBairro(""); setErroCidade(""); setErroUf("");
    let hasError = false;
    
    if (!nome) {
      setErro("Preencha o nome.");
      hasError = true;
    }
    
    // Validação simplificada para teste
    if (!cpf) {
      setErroCpf("CPF é obrigatório.");
      hasError = true;
    }
    
    if (!telefone) {
      setErroTel("Telefone é obrigatório.");
      hasError = true;
    }
    
    if (hasError) {
      console.log('Erros de validação encontrados');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSave) onSave({ 
        nome, 
        email, 
        telefone, 
        cpf: cpf || null, 
        cep: cep || null,
        logradouro: logradouro || null,
        numero: numero || null,
        complemento: complemento || null,
        bairro: bairro || null,
        cidade: cidade || null,
        uf: uf || null,
        aniversario: aniversario || null 
      });
      setNome(""); setEmail(""); setTelefone(""); setCpf(""); setCep(""); 
      setLogradouro(""); setNumero(""); setComplemento(""); setBairro(""); 
      setCidade(""); setUf(""); setAniversario("");
    }, 1000);
  }

  function handlePhoneChange(e) {
    setTelefone(maskPhone(e.target.value));
  }

  function handleCpfChange(e) {
    setCpf(maskCPF(e.target.value));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6" role="form" aria-labelledby="client-form-title">
      {/* Seção: Informações Pessoais */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="material-icons text-white text-xl">person</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações Pessoais</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Dados básicos do cliente</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input 
              label="Nome Completo *" 
              placeholder="Digite o nome completo" 
              icon="person_outline" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              error={!!erro} 
            />
          </div>
          
          <div className="md:col-span-1">
            <Input 
              label="CPF *" 
              placeholder="000.000.000-00" 
              icon="badge_outlined" 
              value={cpf} 
              onChange={handleCpfChange} 
              type="text" 
              error={!!erroCpf} 
              helpText={erroCpf} 
              maxLength={14} 
            />
          </div>
          
          <div className="md:col-span-1">
            <Input 
              label="E-mail" 
              placeholder="email@exemplo.com" 
              icon="email_outlined" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              error={!!erroEmail} 
              helpText={erroEmail} 
            />
          </div>
          
          <div className="md:col-span-1">
            <Input 
              label="Telefone *" 
              placeholder="(99) 99999-9999" 
              icon="phone_outlined" 
              value={telefone} 
              onChange={handlePhoneChange} 
              type="tel" 
              error={!!erroTel} 
              helpText={erroTel} 
              maxLength={15} 
            />
          </div>
          
          <div className="md:col-span-1">
            <Input 
              label="Data de Nascimento" 
              placeholder="" 
              icon="cake_outlined" 
              value={aniversario} 
              onChange={e => setAniversario(e.target.value)} 
              type="date" 
            />
          </div>
        </div>
        
        {erro && <div className="text-red-600 text-sm font-medium mt-3">{erro}</div>}
      </div>

      {/* Seção: Endereço */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-green-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="material-icons text-white text-xl">location_on</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Endereço</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Informações de localização</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* CEP e Logradouro na mesma linha */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Input 
                label="CEP *" 
                placeholder="00000-000" 
                icon="search" 
                value={cep} 
                onChange={handleCepChange} 
                type="text" 
                error={!!erroCep} 
                helpText={erroCep} 
                maxLength={9}
                disabled={loadingCep}
              />
            </div>
            <div className="md:col-span-3 relative">
              <Input 
                label="Logradouro *" 
                placeholder="Rua, Avenida, etc." 
                icon="home_outlined" 
                value={logradouro} 
                onChange={e => setLogradouro(e.target.value)} 
                type="text" 
                disabled={loadingCep}
                error={!!erroLogradouro}
                helpText={erroLogradouro}
              />
              {loadingCep && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <span className="material-icons animate-spin text-lg">refresh</span>
                    <span className="text-sm font-medium">Buscando...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Número e Complemento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Input 
                label="Número *" 
                placeholder="123" 
                icon="home_outlined" 
                value={numero} 
                onChange={e => setNumero(e.target.value)} 
                type="text" 
                error={!!erroNumero}
                helpText={erroNumero}
              />
            </div>
            <div className="md:col-span-2">
              <Input 
                label="Complemento" 
                placeholder="Apartamento, Casa, etc." 
                icon="home_outlined" 
                value={complemento} 
                onChange={e => setComplemento(e.target.value)} 
                type="text" 
              />
            </div>
          </div>
          
          {/* Bairro */}
          <Input 
            label="Bairro *" 
            placeholder="Nome do bairro" 
            icon="location_city_outlined" 
            value={bairro} 
            onChange={e => setBairro(e.target.value)} 
            type="text" 
            disabled={loadingCep}
            error={!!erroBairro}
            helpText={erroBairro}
          />
          
          {/* Cidade e UF */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input 
                label="Cidade *" 
                placeholder="Nome da cidade" 
                icon="location_city_outlined" 
                value={cidade} 
                onChange={e => setCidade(e.target.value)} 
                type="text" 
                disabled={loadingCep}
                error={!!erroCidade}
                helpText={erroCidade}
              />
            </div>
            <div className="md:col-span-1">
              <Input 
                label="UF *" 
                placeholder="SP" 
                icon="location_city_outlined" 
                value={uf} 
                onChange={e => setUf(e.target.value.toUpperCase())} 
                type="text" 
                maxLength={2}
                disabled={loadingCep}
                error={!!erroUf}
                helpText={erroUf}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3 pt-4">
        {editando && onCancel && (
          <button 
            type="button" 
            className="flex-1 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600" 
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-icons animate-spin text-lg">refresh</span>
              Salvando...
            </>
          ) : (
            <>
              <span className="material-icons text-lg">save</span>
              {editando ? "Atualizar Cliente" : "Salvar Cliente"}
            </>
          )}
        </button>
      </div>
    </form>
  );
} 
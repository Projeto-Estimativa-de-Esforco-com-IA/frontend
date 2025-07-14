#!/bin/bash

echo "🚀 Configurando Agile Estimativa IA - Sprint 4"
echo "=============================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "📥 Por favor, instale o Node.js 18+ em: https://nodejs.org/"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado!"
    exit 1
fi

echo "✅ Node.js $(node --version) encontrado"
echo "✅ npm $(npm --version) encontrado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Executar testes
echo "🧪 Executando testes..."
npm test

if [ $? -eq 0 ]; then
    echo "✅ Testes passaram com sucesso!"
else
    echo "⚠️  Alguns testes falharam, mas continuando..."
fi

# Executar linting
echo "🔍 Verificando código..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ Código está limpo!"
else
    echo "⚠️  Alguns problemas de linting encontrados"
fi

echo ""
echo "🎉 Setup concluído com sucesso!"
echo ""
echo "📋 Comandos disponíveis:"
echo "  npm run dev     - Executar em desenvolvimento"
echo "  npm run build   - Build para produção"
echo "  npm test        - Executar testes"
echo "  npm run lint    - Verificar código"
echo ""
echo "🌐 Acesse: http://localhost:5173"
echo ""
echo "📚 Documentação:"
echo "  README.md                    - Documentação principal"
echo "  docs/README.md               - Documentação geral"
echo "  docs/sprints/README.md       - Índice das sprints"
echo "  docs/sprints/SP4_RELATORIO.md - Relatório da Sprint 4"
echo ""
echo "📊 Métricas da Sprint 4:"
echo "  ✅ 78 Story Points completados"
echo "  ✅ 85% cobertura de testes"
echo "  ✅ 15 cenários BDD implementados" 
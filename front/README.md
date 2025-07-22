# 🚀 Agile Estimativa IA - Frontend

Sistema de estimativa ágil com inteligência artificial para gerenciamento de projetos e Planning Poker.

## 📋 Funcionalidades

- ✅ **Sistema de Autenticação** - Login/Registro com validação
- ✅ **Gerenciamento de Projetos** - CRUD completo
- ✅ **Gerenciamento de Tarefas** - Com status e prioridades
- ✅ **Gerenciamento de Equipes** - Organização de membros
- ✅ **Planning Poker** - Sessões de estimativa em tempo real
- ✅ **Dashboard** - Visão geral do sistema
- ✅ **Componentes Reutilizáveis** - UI consistente
- ✅ **Gerenciamento de Estado** - Zustand com persistência
- ✅ **Validação de Formulários** - React Hook Form + Zod
- ✅ **Notificações** - Toast notifications
- ✅ **Testes** - Vitest + Testing Library

## 🛠️ Tecnologias

- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **React Router** - Navegação
- **Headless UI** - Componentes acessíveis
- **Heroicons** - Ícones
- **Vitest** - Testes unitários
- **Testing Library** - Testes de componentes

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Testes
```bash
# Executar testes
npm test

# Executar testes com UI
npm run test:ui

# Executar testes com cobertura
npm run test:coverage
```

### Linting
```bash
# Verificar código
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes base reutilizáveis
│   ├── Header.jsx    # Header da aplicação
│   ├── Sidebar.jsx   # Menu lateral
│   └── PrivateRoute.jsx # Proteção de rotas
├── pages/            # Páginas da aplicação
├── stores/           # Stores Zustand
├── test/             # Testes e cenários BDD
└── App.jsx           # Componente principal

docs/
├── README.md         # Documentação geral
├── RESUMO_EXECUTIVO_SP4.md # Resumo executivo da Sprint 4
└── sprints/          # Relatórios das sprints
    ├── README.md     # Índice das sprints
    └── SP4_RELATORIO.md # Relatório da Sprint 4
```

## 🧪 Testes e BDD

### Cenários BDD Implementados
- ✅ Sistema de Autenticação
- ✅ Gerenciamento de Projetos  
- ✅ Planning Poker
- ✅ Gerenciamento de Tarefas
- ✅ Gerenciamento de Equipes

### Cobertura de Testes
- ✅ Componentes UI
- ✅ Stores (Zustand)
- ✅ Validações de formulário
- ✅ Integração de autenticação

## 📊 Métricas da Sprint 4

### Story Points Completados: 78/78 (100%)
- **US-001**: Sistema de Autenticação ✅ (8 SP)
- **US-002**: Gerenciamento de Estado Global ✅ (13 SP)
- **US-003**: Componentização e Reutilização ✅ (5 SP)
- **US-004**: Validação e Tratamento de Erros ✅ (5 SP)
- **US-005**: Melhorias UX/UI ✅ (8 SP)
- **US-006**: Funcionalidades Avançadas Planning Poker ✅ (13 SP)
- **US-007**: Filtros e Busca ✅ (5 SP)
- **US-008**: Implementação de Testes ✅ (8 SP)
- **US-009**: Otimização de Performance ✅ (5 SP)
- **US-010**: Funcionalidades de Relatórios ✅ (8 SP)

### Velocity: 78 SP/sprint

## 📚 Documentação

### 📋 Relatórios de Sprint
- **[Resumo Executivo](./docs/RESUMO_EXECUTIVO_SP4.md)** - Resumo executivo da SP4
- **[Sprint 4](./docs/sprints/SP4_RELATORIO.md)** - Relatório completo da SP4
- **[Índice das Sprints](./docs/sprints/README.md)** - Visão geral de todas as sprints
- **[Documentação Geral](./docs/README.md)** - Documentação completa do projeto

### 📊 Métricas Atuais
- **Velocity**: 78 SP/sprint
- **Cobertura de Testes**: 85%
- **Status**: Sprint 4 Concluída ✅

## 🔄 Integração Contínua

### Commits Realizados
- ✅ Configuração inicial do projeto
- ✅ Implementação do sistema de autenticação
- ✅ Criação de stores Zustand
- ✅ Componentes UI reutilizáveis
- ✅ Refatoração das páginas existentes
- ✅ Implementação de testes
- ✅ Cenários BDD
- ✅ Documentação organizada

### Git Flow
- ✅ Feature branches para cada US
- ✅ Pull requests com code review
- ✅ Merge para main após aprovação

## 📈 Melhorias Implementadas

### Arquitetura
- ✅ Gerenciamento de estado global com Zustand
- ✅ Persistência de dados no localStorage
- ✅ Componentes reutilizáveis
- ✅ Validação robusta de formulários

### UX/UI
- ✅ Design system consistente
- ✅ Notificações toast
- ✅ Loading states
- ✅ Responsividade
- ✅ Acessibilidade

### Funcionalidades
- ✅ Sistema de autenticação completo
- ✅ Proteção de rotas
- ✅ CRUD completo para todas as entidades
- ✅ Planning Poker funcional

### Qualidade
- ✅ Testes unitários
- ✅ Testes de componentes
- ✅ Cenários BDD
- ✅ Linting configurado
- ✅ Build otimizado

## 🎯 Próximos Passos

### Sprint 5 (Planejado)
- 🔄 Integração com backend real
- 🔄 WebSocket para Planning Poker
- 🔄 Gráficos e relatórios
- 🔄 Tema escuro/claro
- 🔄 PWA capabilities

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a Sprint 4**

# Frontend (React + CRA + Tailwind)

## Como rodar com Docker (compatível com Apple M1/M2)

1. Certifique-se de que o backend e o banco estão configurados no docker-compose.yml.
2. Na raiz do projeto, execute:

```sh
docker-compose up --build
```

3. O frontend estará disponível em: http://localhost:3000

## Scripts disponíveis

- `npm start` — roda o app em modo desenvolvimento (porta 3000)
- `npm run build` — build de produção

## Observações
- O Dockerfile e o docker-compose.yml já estão prontos para ARM/M1/M2.
- O backend deve estar rodando em http://localhost:8000/api para integração.

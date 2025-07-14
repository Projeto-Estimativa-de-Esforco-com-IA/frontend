# language: pt
Funcionalidade: Sistema de Autenticação
  Como um usuário
  Eu quero fazer login no sistema
  Para acessar as funcionalidades protegidas

  Cenário: Login bem-sucedido
    Dado que estou na página de login
    E tenho credenciais válidas
    Quando preencho o email "usuario@teste.com"
    E preencho a senha "senha123"
    E clico no botão "Entrar"
    Então devo ser redirecionado para o dashboard
    E devo ver o nome do usuário no header

  Cenário: Login com credenciais inválidas
    Dado que estou na página de login
    E tenho credenciais inválidas
    Quando preencho o email "usuario@teste.com"
    E preencho a senha "senhaerrada"
    E clico no botão "Entrar"
    Então devo ver uma mensagem de erro
    E devo permanecer na página de login

  Cenário: Registro de nova conta
    Dado que estou na página de login
    Quando clico em "Não tem conta? Registrar-se"
    E preencho o nome "João Silva"
    E preencho o email "joao@teste.com"
    E preencho a senha "senha123"
    E preencho a confirmação de senha "senha123"
    E clico no botão "Registrar"
    Então devo ver uma mensagem de sucesso
    E devo ser redirecionado para o login

Funcionalidade: Gerenciamento de Projetos
  Como um usuário autenticado
  Eu quero gerenciar projetos
  Para organizar o trabalho da equipe

  Cenário: Criar novo projeto
    Dado que estou logado no sistema
    E estou na página de projetos
    Quando clico no botão "Novo Projeto"
    E preencho o nome "Sistema de Vendas"
    E preencho a descrição "Controle de vendas e estoque"
    E preencho a categoria "Comercial"
    E clico no botão "Salvar"
    Então devo ver o novo projeto na lista
    E o projeto deve ter os dados corretos

  Cenário: Editar projeto existente
    Dado que estou logado no sistema
    E existe um projeto "Sistema de Vendas"
    Quando clico em "Editar" no projeto
    E altero o nome para "Sistema de Vendas v2"
    E clico no botão "Salvar Alterações"
    Então devo ver o projeto atualizado na lista
    E o nome deve ser "Sistema de Vendas v2"

  Cenário: Excluir projeto
    Dado que estou logado no sistema
    E existe um projeto "Sistema de Vendas"
    Quando clico em "Excluir" no projeto
    E confirmo a exclusão
    Então o projeto não deve mais aparecer na lista

Funcionalidade: Planning Poker
  Como um membro da equipe
  Eu quero participar de sessões de Planning Poker
  Para estimar o esforço das tarefas

  Cenário: Criar nova sessão de Planning Poker
    Dado que estou logado no sistema
    E estou na página de Planning Poker
    Quando clico no botão "Nova Sessão"
    E preencho o nome "Sprint 1 - API"
    E preencho o dono "João Silva"
    E clico no botão "Criar"
    Então devo ver a nova sessão na lista
    E o status deve ser "Aberta"

  Cenário: Votar em uma sessão
    Dado que estou na sessão de Planning Poker "Sprint 1 - API"
    E preenchi meu nome "Maria Santos"
    E selecionei meu papel "Programador"
    Quando clico na carta "8"
    Então devo ver meu voto registrado
    E devo ver a mensagem "Voto registrado! Aguarde o resultado da sessão"

  Cenário: Visualizar votos como gerente
    Dado que estou na sessão de Planning Poker como gerente
    E outros membros já votaram
    Quando aguardo os votos chegarem
    Então devo ver uma tabela com todos os votos
    E devo ver o nome, papel e voto de cada membro

Funcionalidade: Gerenciamento de Tarefas
  Como um usuário autenticado
  Eu quero gerenciar tarefas
  Para acompanhar o progresso do trabalho

  Cenário: Criar nova tarefa
    Dado que estou logado no sistema
    E estou na página de tarefas
    Quando clico no botão "Nova Tarefa"
    E preencho o título "Implementar login"
    E preencho a descrição "Criar sistema de autenticação"
    E seleciono o projeto "Sistema de Vendas"
    E seleciono a prioridade "Alta"
    E preencho o responsável "João Silva"
    E clico no botão "Salvar"
    Então devo ver a nova tarefa na lista
    E a tarefa deve ter status "Pendente"

  Cenário: Atualizar status da tarefa
    Dado que estou logado no sistema
    E existe uma tarefa "Implementar login"
    Quando clico em "Editar" na tarefa
    E altero o status para "Em andamento"
    E clico no botão "Salvar Alterações"
    Então devo ver o status atualizado na tarefa
    E a cor do status deve ser azul

Funcionalidade: Gerenciamento de Equipes
  Como um usuário autenticado
  Eu quero gerenciar equipes
  Para organizar os membros do projeto

  Cenário: Criar nova equipe
    Dado que estou logado no sistema
    E estou na página de equipes
    Quando clico no botão "Nova Equipe"
    E preencho o nome "Equipe Alpha"
    E preencho os membros "João, Maria, Carlos"
    E clico no botão "Salvar"
    Então devo ver a nova equipe na lista
    E devo ver os três membros listados

  Cenário: Visualizar membros da equipe
    Dado que estou logado no sistema
    E existe uma equipe "Equipe Alpha" com membros
    Quando visualizo a equipe
    Então devo ver a lista de membros
    E cada membro deve estar em uma linha separada 
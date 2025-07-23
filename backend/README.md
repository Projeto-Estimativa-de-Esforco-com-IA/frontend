# Planning Poker - Backend

Este é o backend do projeto **Planning Poker**, uma ferramenta open source para estimativas ágeis com interface moderna e colaboração em tempo real.

## Funcionalidades
- Gerenciamento de salas virtuais para sessões de planning poker
- Votação em tempo real via WebSocket
- Persistência de dados em SQLite
- API REST para criação e consulta de salas
- Comentários, tópicos, votos e pontuação final

## Tecnologias Utilizadas
- **Linguagem:** Go (Golang)
- **Framework HTTP:** Echo
- **WebSocket:** Gorilla WebSocket
- **Banco de dados:** SQLite
- **Configuração:** .env + godotenv
- **Deploy:** Docker, Fly.io

## Como rodar o backend

1. Acesse a pasta `backend/`.
2. Crie um arquivo `.env` com:
   ```
   DATABASE_FILE_PATH=./planningpoker.db
   ADMIN_PASSWORD=admin123
   ```
3. Instale as dependências (se necessário):
   ```bash
   go mod tidy
   ```
4. Execute o servidor:
   ```bash
   go run cmd/main.go
   ```

O backend estará disponível por padrão na porta 8080.

## Endpoints principais
- `POST /room` — Cria uma nova sala
- `GET /room/:id` — Busca informações de uma sala
- `GET /ws/:roomId` — Conexão WebSocket para interação em tempo real
- `GET /metrics?pw=ADMIN_PASSWORD` — Métricas administrativas (protegido por senha)

## Estrutura de dados
As informações das salas são armazenadas em um único campo JSON na tabela `rooms` do SQLite, incluindo tópicos, votos, comentários e usuários conectados.

## Contribua
Pull requests são bem-vindos! Sinta-se à vontade para abrir issues ou sugerir melhorias.

---

> Este backend faz parte do projeto Planning Poker. Veja também o frontend para a interface web.

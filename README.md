# Planning Poker

<p align="center">
  <strong>Ferramenta gratuita e open source para estimativas ágeis com Planning Poker</strong>
</p>

Bem-vindo ao **Planning Poker**, sua plataforma moderna para sessões de estimativa ágil! Com um visual inspirado no glassmorphism da Apple, o Planning Poker oferece uma experiência intuitiva, colaborativa e visualmente agradável para times Scrum e Kanban.

## Funcionalidades

- **Salas Virtuais**: Crie salas para suas sessões de planning poker e compartilhe o link com o time.
- **Tópicos**: Adicione tópicos (tarefas, histórias, tickets) e discuta cada um separadamente.
- **Votação em Tempo Real**: Vote nos tópicos usando cartas de planning poker, com resultados instantâneos para todos.
- **Comentários**: Comente em cada tópico para registrar dúvidas, decisões e sugestões.
- **Pontuação Final**: Defina e registre a pontuação final de cada tópico após a votação.
- **Interface Moderna**: Layout com efeito "liquid glass" (glassmorphism), responsivo e agradável.
- **Gratuito e Open Source**: Use, contribua e personalize como quiser!

## Tecnologias Utilizadas
- **Frontend:** Next.js (React) + Mantine UI
- **Backend:** Go (Golang), Echo, Gorilla WebSocket, SQLite
- **Deploy:** Docker, Fly.io

## Como rodar o projeto

### Backend
1. Acesse a pasta `backend/`.
2. Crie um arquivo `.env` com:
   ```
   DATABASE_FILE_PATH=./planningpoker.db
   ADMIN_PASSWORD=admin123
   ```
3. Execute:
   ```bash
   go run cmd/main.go
   ```

### Frontend
1. Acesse a pasta `frontend/`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute:
   ```bash
   npm run dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000)

## Contribua
Pull requests são bem-vindos! Sinta-se à vontade para abrir issues ou sugerir melhorias.

---

> Projeto originalmente baseado no ScrumBluff, agora evoluído para Planning Poker com visual e experiência aprimorados.


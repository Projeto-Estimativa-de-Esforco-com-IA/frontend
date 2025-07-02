# Frontend - Ferramenta Ágil de Estimativa de Esforço com IA

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 18.18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)
- (Opcional) [Docker](https://www.docker.com/) para rodar em container

## Como rodar localmente

1. **Clone o repositório** (se ainda não fez):
   ```bash
   git clone <url-do-repositorio>
   cd Front/front
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   [http://localhost:5173](http://localhost:5173)

---

## Como rodar com Docker

1. **Construa a imagem Docker:**
   ```bash
   docker build -t agile-frontend .
   ```

2. **Rode o container:**
   ```bash
   docker run -p 5173:5173 agile-frontend
   ```

3. **Acesse no navegador:**
   [http://localhost:5173](http://localhost:5173)

---

## Tecnologias utilizadas
- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

## Observações
- O backend deve estar rodando e com CORS liberado para integração real.
- Por padrão, o frontend está mockado (dados locais). Para integrar com a API, ajuste ou crie os serviços em `src/services/`.

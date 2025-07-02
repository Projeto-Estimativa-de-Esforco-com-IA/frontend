# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Frontend - Ferramenta Ágil de Estimativa de Esforço com IA

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 18.18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)
- (Opcional) [Docker](https://www.docker.com/) para rodar em container

## Rodando localmente

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

## Rodando com Docker

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
- Por padrão, o frontend está mockado (dados locais). Para integrar com a API, ajuste os serviços em `src/services/` (crie se necessário).

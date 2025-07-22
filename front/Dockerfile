# Use imagem ARM64 nativa
FROM node:20-bullseye

WORKDIR /app

# Copie apenas os arquivos de dependência primeiro para cache
COPY package*.json ./

# Instale dependências, forçando ARM64
RUN npm install --legacy-peer-deps

# Copie o restante do código
COPY . .

# Exponha a porta padrão do CRA
EXPOSE 3000

# Inicie o CRA
CMD ["npm", "start"] 
# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Atualize o npm para a versão mais recente
RUN npm install -g npm@latest

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie apenas os arquivos necessários para o contêiner
COPY package*.json ./

# Aumente o tempo limite do npm
RUN npm config set fetch-retry-maxtimeout 600000

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do seu projeto Vite para o contêiner
COPY . .

# Expõe a porta que o aplicativo Vite usará
EXPOSE 8080

# Inicie o aplicativo Vite (ou ajuste conforme necessário)
CMD [ "npm", "run", "dev" ]

# Use uma imagem oficial do Node.js como base
FROM node:14

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e package-lock.json para o container
COPY package*.json ./

COPY . .

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar o Nuxt
CMD ["sleep", "infinity"]  # Isso mantém o container em execução sem rodar nada automaticamente

# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Especificar el puerto en el que se ejecutará la aplicación
EXPOSE 3000 

# Comando para iniciar la aplicación
CMD ["npm", "run","dev"] 

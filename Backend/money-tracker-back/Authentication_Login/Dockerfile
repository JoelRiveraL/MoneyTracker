# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias sin incluir devDependencies (si solo necesitas producción)
RUN npm i
RUN npm install bcrypt

# Copia todo el resto del código fuente en el contenedor
COPY . .

# Si usas TypeScript, compila el proyecto a JavaScript
RUN npm run build

# Exponer el puerto en el que correrá la aplicación (puerto 3000 por defecto)
EXPOSE 3000

# Ejecuta la aplicación en modo de producción
CMD ["npm", "run", "start:dev"]

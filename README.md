# MoneyTracker

## Descripción

MoneyTracker es una aplicación para gestionar tus finanzas personales. Este proyecto está dividido en dos partes: Backend y Frontend.

### Requisitos Previos
- Docker y Docker Compose instalados en tu sistema.
- Node.js y npm (opcional, si deseas ejecutar los microservicios fuera de Docker).

## Instalación

### Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/JoelRiveraL/MoneyTracker.git
```

### Primero entramos y ejecutamos la parte del BackEnd

```bash
 cd .\Backend\

 cd .\money-tracker-back\
 ```

 Instalamos Nest.js
 
```bash
 npm i -g @nestjs/cli
```

 ### Crear el archivo `.env`:
En la `raíz` de los tres `microservicios` `y` en la `raiz` de este proyecto `general` crea un archivo `.env` con el siguiente contenido:

```bash
JWT_SECRET='alesso-quesso'
```

Esta clave será utilizada para la generación y verificación de los tokens JWT.

Ademas de eso, se debe entrar a cada microservicio por consola e instalar las dependencias:

```bash
Estando en \money-tracker-back
 cd .\apinotas\
 npm i
 ```

```bash
 cd .\Backend\
 cd..
 cd .\apipagos\
 npm i
 ```

```bash
 cd .\Backend\
 cd..
 cd .\Authentication_Login\
 npm i
 ```
 
 ### Ejecución con Docker

 **Levantar los Contenedores:**
```bash
docker-compose up --build -d
```
Se debe esperar que todos los microservicios se levanten correctamente.

### Abrimos otra consola y nos dirijimos al FrontEnd

```bash
cd .\Frontend\

cd .\money-tracker-front\
```

Instalamos las dependencias

```bash
npm i
```

Corremos el servicio

```bash
npm run dev
```

Ahora ya podemos entrar al puerto `http://localhost:3000` para visualizar el aplicativo web, partiremos en un login, en caso de no tener cuenta la podemos crear y ahora si tras el inicio de sesion correcto podremos acceder a toda la funcionalidad como la gestion de 



# Adsum
Para ejecutar la aplicacion se deben seguir una serie de pasos.

## Backend
Inicializamos primero la API
`cd backend-api`
 y luego `npm install`

Deberemos crear un archivo .env con `touch .env` en donde deben agregarse las siguientes variables de entorno

> <p>DATABASE_HOST = El host de la base de datos.<br>
> DATABASE_USER = Usuario.<br>
> DATABASE_PASSWORD = Contraseña.<br>
> DATABASE_NAME = Nombre que queramos colocarle a la base de datos.<br>
> DATABASE_PORT = Puerto donde se aloja el servidor de base de datos MySQL.</p>

Una vez creado deberemos ejecutar el espacio de migraciones para poder tener la base de datos en nuestro servidor

`npm run migrate`

Una vez creada procedemos a compilar el codigo dependiendo del entorno en el que queramos trabajar

> dev: `npm run start:dev`
> build: `npm run build` y luego
> `npm run start`

Con esto estara corriendo la API de la aplicación

### Api Routes

#### User Contact
**GET**: `/api/users/get`: Obtiene toda la información de contacto de los usuarios. <br>
**GET**: `/api/users/get/:id`: Obtiene toda la información de contacto de una de las filas.<br>
**POST**: `/api/users/register`: Registra un usuario. Se debe colocar en el body la siguiente informacion <br>
>{<br>
>  "name": string,<br>
>  "company_name": string,<br>
>  "email": string,<br>
>  "phone": string,<br>
>  "category_id": number (Nota: Debe existir en la table Categories o dara Bad Request Error),<br>
>  "message": string<br>
>} <br>

#### Categories
**GET**: `/api/categories/get`: Obtiene toda la información de las categorias. <br>
**GET**: `/api/categories/get/:id`: Obtiene toda la información de una categoria.<br>
**POST**: `/api/categories/create`: Crea una categoria. Se debe colocar en el body la siguiente informacion <br>
>{<br>
>  "category_name": string,<br>
>} <br>

## Frontend
Inicializamos primero el frontend
desde el main: `cd frontend`<br>
desde la carpeta backend: `cd ../frontend`<br>
y luego `npm install`

Deberemos crear un archivo .env con `touch .env` en donde deben agregarse las siguientes variables de entorno

> API_HOST: El host donde estará alojada la API del backend

Una vez creada ejecutamos el proyecto dependiendo del ambiente de desarrollo a trabajar

> `dev: npm run start`<br>
> `build: npm run build`

Una vez listo ya podemos comenzar a usar la aplicación.

# Rick And Morty Multiverse REST API
![Logo](./src/public/rick_console.png "Logo")

## Descripción
RNMM REST API es un sistema backend para poder organizar toda la información de los personajes y locaciones que existen en los multiversos. El sistema tiene mecanismos de seguridad como encripación de contraseñas, roles de usuarios, acceso restringido y mas.

## Planteamiento 

Se escribió un pequeño y corto reporte del como se planteaba realizar este sistema

[Documento](https://docs.google.com/document/d/1Xh1BsETOeZ6OgJEcYBevxi5Rr3-3H1g_wSosw51ipEQ/edit?usp=sharing)

## Instalación

* Clonar el repositorio
* tener instalada la version estable de nodejs
* ejecutar `npm install`
* para compilar a js ejecutar `npm run build` el contenido compilado estara en una carpeta llamda `/dist`

## Usabilidad

para iniciar el sistema en modo desarrollo basta con ejecutar desde la consola el comando `npm run dev`
para iniciar el sistema en modo producción moverse a la carpeta dist `cd dist` y luego ejecutar `node index.js`

En el siguiente sistema se pueden agregar, editar y eliminar diferente información y dependiendo del rol que tenga cada usuario puede o no hacer cada cosa.

Roles
* administrator
* creator
* viewer

Para acceder a la información primero es necesario autenticarse y el endpoint para hacerlo es el siguiente:

`/rnm/api/auth/login`

metodo `POST` y se envia el siguiente `JSON` `{"username" : "Rick", "password" : "123456"}` siendo estos datos validos para las pruebas.

Datos igualmente validos para pruebas:

`{"username" : "Morty", "password" : "654321"}`
`{"username" : "Summer", "password" : "123456"}`

El rol de `administrator` `id:1` que es el que tiene el usuario `Rick` puede agregar, editar y eliminar información al sistema.
El rol de `creator` `id:2` que es el que tiene el usuario `Morty` puede agregar información al sistema pero no modificarla ni eliminarla.
El rol de `viewer` `id:3` que es el que tiene el usuario `Summer` solo puede consultar información del sistema, no puede modificarla ni eliminarla.

Actualmente el sistema puede manejar tres datos importantes de todo el multiverso de Rick and Morty:

* Locaciones
* Categorias
* Personajes

Tambien es posible con el rol de administrator crear mas usuarios y asignarles un rol, no permitiendo usar el mismo nombre mas de una vez.

## Endpoints principales

Como es común en peticiones http para realizar las diferentes acciones sobre los datos se siguen usando los siguientes metodos:

* POST : incersión
* PUT: actualización
* DELETE: eliminación
* GET: lectura

### Locaciones

GET : `/rnm/api/locations` para traer tidis los registros o `/rnm/api/locations/5` añadiendo al final el `id` de la locación especifica en caso de querer consultar individualmente.

PUT : `/rnm/api/locations/5` añadiendo al final el `id` de la locación y ademas añadiendo el campo a modificar al body del request. Eje. `{ "name" : "nuevo"}`.

POST : `/rnm/api/locations` añadiendo el los campos requeridos al body del request:  `{ "name" : "Summer", "description" : "text", "category" : 2}`.

DELETE : `/rnm/api/locations/5` no hace falta añadir ningun campo al body del request.

### Categorias

GET : `/rnm/api/categories` para traer todos los registros o `/rnm/api/categories/5` añadiendo al final el `id` de la categoria especifica en caso de querer consultar individualmente.

PUT : `/rnm/api/categories/5` añadiendo al final el `id` de la categoria y ademas añadiendo el campo a modificar al body del request. Eje. `{ "description" : "desc"}`.

POST : `/rnm/api/categories` añadiendo el los campos requeridos al body del request:  `{ "name" : "Categoryx", "description" : "text"}`.

DELETE : `/rnm/api/categories/5` no hace falta añadir ningun campo al body del request.

### Personajes

GET : `/rnm/api/characters` para traer todos los registros o `/rnm/api/characters/5` añadiendo al final el `id` del personaje especifico en caso de querer consultar individualmente.

PUT : `/rnm/api/characters/5` añadiendo al final el `id` del personaje y ademas añadiendo el campo a modificar al body del request. Eje. `{ "name" : "Joe"}`.

POST : `/rnm/api/characters` añadiendo el los campos requeridos al body del request:  `{ "name" : "Sun", "description" : "hello sun", "location" : 7}`.

DELETE : `/rnm/api/characters/5` no hace falta añadir ningun campo al body del request.

## Otras funciones

Se implemento tambien un endpoint de busqueda para cualquiera de los endpoints anteriores solo se requiere agregar un `/search` al final y por metodo `POST` enviar un `JSON` con el siguiente campo `{ "field" : "busqueda"}`.

Tambien existe un denpoint para usuarios que solo puede modificar y acceder el rol de `administrator` que funciona exactamente como los anteriores a excepción de `POST` que esta en el endpoint `/rnm/api/auth/signup`.

POST : `/rnm/api/auth/signup` enviando el `JSON` `{ "username" : "Eddie", "password" : "", "role" : 3}` creará un nuevo usuario

GET : `/rnm/api/users` para traer todos los registros o `/rnm/api/users/5` añadiendo al final el `id` del usuario especifico en caso de querer consultar individualmente.

DELETE : `/rnm/api/users/5` no hace falta añadir ningun campo al body del request.

### Cambiar contraseña

Si el usuario quiere moficar su contraseña lo puede hacer en el endpoint `/rnm/api/users/update-password` por metodo `POST` enviando el siguiente `JSON`:
`{ "current_password": "123456", "new_password" : "97655242"}`

Nota: Las contraseñas deben tener minimo 6 caracteres.






# _Contacts App_

Este repositorio contiene el Backend y el Frontend de la aplicación Contacts App, desarrollado usando Express y Angular v19, además de almacenar los datos en MongoDB Atlas.

## Contacts App

Contacts App es una aplicación de gestión de contactos que te permite crear, consultar y eliminar de manera fácil e intuitiva. 

## Instalación

Se deben instalar las dependencias en los directorios "_backend_" y "_frontend/contacts-app_" usando el manejador de paquetes de Node: _npm_

```bash
#npm packages
$ npm install
```

Se debe crear el archivo _.env_ en el directorio _"backend"_ con las siguientes variables de entorno:

```bash
PORT=3001
DB_SERVER=contacts.csoam8d.mongodb.net
DB_USER=contacts
DB_PWD=contacts
```

## Correr la Aplicación

Al tener todo instalado y configurado, se debe ejecutar el siguiente comando en consola estando dentro del directorio _backend_

```bash
$ node app.js
```

Luego, ejecutar el siguiente comando en consola estando dentro del directorio _frontend/contacts-app_

```bash
$ npm start
```

## Notas

Si tiene problemas de conexión con la base de datos al momento de iniciar el backend, verificar los DNS de su red (se recomienda usar los de Google).

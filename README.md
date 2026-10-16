Este proyecto lo hice para practicar lo aprendido en Programación Backend, utilizando Node.js y Express.

La idea es crear una API sencilla que permita agregar tareas, verlas, modificarlas y eliminarlas. Para guardar la información utilicé un arreglo de JavaScript, por lo que no necesita una base de datos. Las tareas se pierden cuando se reinicia el servidor.

¿Qué utilicé?

Node.js

Express

JavaScript

Git y GitHub

¿Cómo ejecutar el proyecto?

Primero, hay que tener instalado Node.js y npm.

Después, desde la terminal y dentro de la carpeta del proyecto, ejecutar:

npm install
npm start

El servidor se ejecuta en:

http://localhost:3000

Archivos del proyecto

index.js: inicia el servidor y configura Express.

routes.js: contiene las rutas para trabajar con las tareas.

data.js: guarda las tareas en un arreglo.

test/routes.test.js: contiene las pruebas que hice para comprobar el funcionamiento de la API.

package.json: contiene las dependencias y los comandos del proyecto.

Operaciones que se pueden realizar

Método

Ruta

Para qué sirve

GET

/tareas

Ver todas las tareas.

GET

/tareas/:id

Buscar una tarea por su ID.

POST

/tareas

Crear una tarea nueva.

PUT

/tareas/:id

Modificar una tarea.

DELETE

/tareas/:id

Eliminar una tarea.

Cada tarea tiene cuatro campos:

id: número que identifica la tarea.

titulo: nombre de la tarea.

descripcion: detalle de la tarea.

completada: indica si la tarea está terminada (true o false).

Ejemplos de uso

1. Crear una tarea

Para crear una tarea utilicé el método POST. En PowerShell ejecuté:

Invoke-RestMethod -Uri "http://localhost:3000/tareas" -Method Post -ContentType "application/json" -Body '{"titulo":"Estudiar Express","descripcion":"Practicar las rutas CRUD"}'

La respuesta incluye la tarea creada, su ID y el estado completada en false.

Ejemplo de respuesta:

{
  "id": 1,
  "titulo": "Estudiar Express",
  "descripcion": "Practicar las rutas CRUD",
  "completada": false
}

2. Ver las tareas

Para consultar las tareas utilicé GET:

Invoke-RestMethod -Uri "http://localhost:3000/tareas" -Method Get

Esto muestra las tareas que se encuentran guardadas en el arreglo.

3. Modificar una tarea

Para modificar una tarea utilicé PUT:

Invoke-RestMethod -Uri "http://localhost:3000/tareas/1" -Method Put -ContentType "application/json" -Body '{"titulo":"Estudiar Express","descripcion":"Practicar y probar la API","completada":true}'

Con esta operación pude cambiar la descripción y marcar la tarea como completada.

4. Eliminar una tarea

Para eliminar una tarea utilicé DELETE:

Invoke-RestMethod -Uri "http://localhost:3000/tareas/1" -Method Delete

La tarea se elimina del arreglo y deja de aparecer en la consulta.

Validaciones

También agregué validaciones para evitar que se creen o modifiquen tareas con el título o la descripción vacíos.

Cuando se envían datos incorrectos, la API devuelve un error con el código 400. Si se intenta modificar o eliminar una tarea que no existe, devuelve 404.

Por ejemplo, al intentar crear una tarea sin descripción, la respuesta fue:

{
  "error": "La descripcion es obligatoria y debe ser texto"
}

Durante las pruebas comprobé que estas validaciones funcionaran tanto al crear como al modificar tareas.

Pruebas realizadas

Para comprobar que las rutas funcionaran, realicé pruebas desde PowerShell y también agregué pruebas automatizadas.

Para ejecutarlas, utilicé:

npm test

Al ejecutar las pruebas obtuve el siguiente resultado:

4 pruebas realizadas.

4 pruebas aprobadas.

0 pruebas fallidas.

Las pruebas comprobaron la creación y consulta de tareas, la modificación de sus campos, la eliminación y el manejo de algunos errores.

También probé manualmente el envío de una descripción vacía para comprobar que la API la rechazara.

Lo que aprendí

Con este trabajo pude practicar cómo crear un servidor con Express, separar el código en distintos archivos y utilizar los métodos GET, POST, PUT y DELETE.

También aprendí a validar los datos que recibe la API, responder con códigos de estado y probar las rutas desde PowerShell. Además, utilicé Git para guardar los cambios y GitHub para subir el proyecto.

Repositorio

El código del proyecto se encuentra en GitHub:

Ver API REST de tareas

Evidencias

En esta sección agregaré capturas de las pruebas realizadas, incluyendo la creación, consulta, modificación y eliminación de tareas, además de las validaciones y el resultado de las pruebas automatizadas.

Autor

Daniel Hernández Norambuena

respaldo fotografico:


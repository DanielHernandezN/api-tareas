# API REST de tareas

API basica creada con Node.js y Express para administrar tareas mediante operaciones CRUD. Los datos se guardan en un array de JavaScript en memoria; no se utiliza una base de datos y las tareas se reinician al detener el servidor.

## Requisitos

- Node.js 18 o posterior
- npm

## Instalacion y ejecucion

Desde la carpeta del proyecto, instala las dependencias y ejecuta el servidor:

```powershell
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para usar otro puerto, define la variable de entorno `PORT`.

## Estructura

- `index.js`: configura Express, el middleware JSON y las respuestas para errores.
- `routes.js`: define y valida los endpoints de tareas.
- `data.js`: mantiene el array de tareas compartido por las rutas.

Express convierte el JSON entrante en `req.body`; las rutas validan los datos, actualizan el array de `data.js` y responden con JSON y un codigo HTTP apropiado.

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/tareas` | Lista todas las tareas. |
| GET | `/tareas/:id` | Consulta una tarea por su identificador. |
| POST | `/tareas` | Crea una tarea. `titulo` y `descripcion` son obligatorios; `completada` es opcional y por defecto es `false`. |
| PUT | `/tareas/:id` | Actualiza titulo y descripcion; tambien puede actualizar `completada`. |
| DELETE | `/tareas/:id` | Elimina una tarea y devuelve la tarea eliminada. |

Ejemplo del cuerpo JSON para crear o actualizar:

```json
{
  "titulo": "Estudiar Express",
  "descripcion": "Repasar las rutas CRUD",
  "completada": false
}
```

Los identificadores deben ser enteros positivos. `titulo` y `descripcion` deben ser textos no vacios; si se envia `completada`, debe ser booleano. Los errores de validacion devuelven estado `400`, las rutas o tareas inexistentes devuelven `404`, y todos los errores tienen un cuerpo JSON con la propiedad `error`.

## Pruebas manuales con curl

Con el servidor en ejecucion, crea una tarea:

```powershell
curl.exe -i -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d '{"titulo":"Estudiar Express","descripcion":"Repasar las rutas CRUD"}'
```

Respuesta esperada (`201 Created`):

```json
{
  "id": 1,
  "titulo": "Estudiar Express",
  "descripcion": "Repasar las rutas CRUD",
  "completada": false
}
```

Lista las tareas (`GET /tareas`):

```powershell
curl.exe -i http://localhost:3000/tareas
```

Respuesta (`200 OK`):

```json
[
  {
    "id": 1,
    "titulo": "Estudiar Express",
    "descripcion": "Repasar las rutas CRUD",
    "completada": false
  }
]
```

Consulta una tarea (`GET /tareas/1`):

```powershell
curl.exe -i http://localhost:3000/tareas/1
```

Respuesta (`200 OK`):

```json
{
  "id": 1,
  "titulo": "Estudiar Express",
  "descripcion": "Repasar las rutas CRUD",
  "completada": false
}
```

Actualiza una tarea (`PUT /tareas/1`):

```powershell
curl.exe -i -X PUT http://localhost:3000/tareas/1 -H "Content-Type: application/json" -d '{"titulo":"Estudiar Express","descripcion":"Practicar la API","completada":true}'
```

Respuesta (`200 OK`):

```json
{
  "id": 1,
  "titulo": "Estudiar Express",
  "descripcion": "Practicar la API",
  "completada": true
}
```

Elimina una tarea (`DELETE /tareas/1`):

```powershell
curl.exe -i -X DELETE http://localhost:3000/tareas/1
```

Respuesta (`200 OK`):

```json
{
  "mensaje": "Tarea eliminada correctamente",
  "tarea": {
    "id": 1,
    "titulo": "Estudiar Express",
    "descripcion": "Practicar la API",
    "completada": true
  }
}
```

## Pruebas automatizadas

Ejecuta las pruebas del CRUD, validaciones y respuestas de error:

```powershell
npm test
```

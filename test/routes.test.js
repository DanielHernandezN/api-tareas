const assert = require('node:assert/strict');
const { once } = require('node:events');
const { after, before, beforeEach, test } = require('node:test');

const app = require('../index');
const tareas = require('../data');

let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await once(server, 'listening');
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    server.close();
    await once(server, 'close');
});

beforeEach(() => {
    tareas.splice(0, tareas.length);
});

test('crea tareas, consulta la lista y consulta una tarea por id', async () => {
    const vacias = await fetch(`${baseUrl}/tareas`);
    assert.equal(vacias.status, 200);
    assert.deepEqual(await vacias.json(), []);

    const invalida = await fetch(`${baseUrl}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: '   ', descripcion: 'Descripcion' })
    });
    assert.equal(invalida.status, 400);
    assert.equal(typeof (await invalida.json()).error, 'string');

    const creada = await fetch(`${baseUrl}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: 'Estudiar', descripcion: 'Preparar la evaluacion' })
    });
    assert.equal(creada.status, 201);
    const tarea = await creada.json();
    assert.deepEqual(tarea, {
        id: 1,
        titulo: 'Estudiar',
        descripcion: 'Preparar la evaluacion',
        completada: false
    });

    const consultada = await fetch(`${baseUrl}/tareas/${tarea.id}`);
    assert.equal(consultada.status, 200);
    assert.deepEqual(await consultada.json(), tarea);
});

test('actualiza los campos de una tarea y valida completada', async () => {
    tareas.push({
        id: 1,
        titulo: 'Antes',
        descripcion: 'Descripcion anterior',
        completada: false
    });

    const actualizada = await fetch(`${baseUrl}/tareas/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: 'Despues',
            descripcion: 'Descripcion nueva',
            completada: true
        })
    });
    assert.equal(actualizada.status, 200);
    assert.deepEqual(await actualizada.json(), {
        id: 1,
        titulo: 'Despues',
        descripcion: 'Descripcion nueva',
        completada: true
    });

    const invalida = await fetch(`${baseUrl}/tareas/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: 'Cambio invalido',
            descripcion: 'Descripcion',
            completada: 'si'
        })
    });
    assert.equal(invalida.status, 400);
    assert.equal((await invalida.json()).error, 'El campo completada debe ser booleano');
    assert.equal(tareas[0].titulo, 'Despues');
});

test('elimina tareas y usa JSON para errores de ruta e id', async () => {
    tareas.push({
        id: 1,
        titulo: 'Eliminar',
        descripcion: 'Prueba de borrado',
        completada: false
    });

    const eliminada = await fetch(`${baseUrl}/tareas/1`, { method: 'DELETE' });
    assert.equal(eliminada.status, 200);
    assert.deepEqual(await eliminada.json(), {
        mensaje: 'Tarea eliminada correctamente',
        tarea: {
            id: 1,
            titulo: 'Eliminar',
            descripcion: 'Prueba de borrado',
            completada: false
        }
    });

    const idInvalido = await fetch(`${baseUrl}/tareas/abc`);
    assert.equal(idInvalido.status, 400);
    assert.equal(typeof (await idInvalido.json()).error, 'string');

    const inexistente = await fetch(`${baseUrl}/tareas/1`);
    assert.equal(inexistente.status, 404);
    assert.equal(typeof (await inexistente.json()).error, 'string');

    const rutaInexistente = await fetch(`${baseUrl}/no-existe`);
    assert.equal(rutaInexistente.status, 404);
    assert.deepEqual(await rutaInexistente.json(), { error: 'Ruta no encontrada' });
});

test('rechaza JSON mal formado con una respuesta JSON', async () => {
    const respuesta = await fetch(`${baseUrl}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{ invalido'
    });

    assert.equal(respuesta.status, 400);
    assert.deepEqual(await respuesta.json(), {
        error: 'El cuerpo de la solicitud debe ser JSON valido'
    });
});

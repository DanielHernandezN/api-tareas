const express = require('express');
const router = express.Router();

const tareas = require('./data');

function validarTarea(body) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return { error: 'El cuerpo de la solicitud debe ser un objeto JSON' };
    }

    const { titulo, descripcion, completada } = body;

    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return { error: 'El titulo es obligatorio y debe ser texto' };
    }

    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        return { error: 'La descripcion es obligatoria y debe ser texto' };
    }

    if (completada !== undefined && typeof completada !== 'boolean') {
        return { error: 'El campo completada debe ser booleano' };
    }

    return {
        tarea: {
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            completada
        }
    };
}

function obtenerId(parametro, res) {
    const id = Number(parametro);

    if (!Number.isSafeInteger(id) || id <= 0) {
        res.status(400).json({ error: 'El id debe ser un numero entero positivo' });
        return null;
    }

    return id;
}

// GET: consultar todas las tareas
router.get('/tareas', (req, res) => {
    res.status(200).json(tareas);
});

// GET: consultar una tarea por su id
router.get('/tareas/:id', (req, res) => {
    const id = obtenerId(req.params.id, res);
    if (id === null) return;

    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json(tarea);
});

// POST: crear una tarea nueva
router.post('/tareas', (req, res) => {
    const resultado = validarTarea(req.body);
    if (resultado.error) {
        return res.status(400).json({ error: resultado.error });
    }

    const nuevaTarea = {
        id: tareas.reduce((mayorId, tarea) => Math.max(mayorId, tarea.id), 0) + 1,
        ...resultado.tarea,
        completada: resultado.tarea.completada ?? false
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// PUT: modificar una tarea existente
router.put('/tareas/:id', (req, res) => {
    const id = obtenerId(req.params.id, res);
    if (id === null) return;

    const resultado = validarTarea(req.body);
    if (resultado.error) {
        return res.status(400).json({ error: resultado.error });
    }

    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tarea.titulo = resultado.tarea.titulo;
    tarea.descripcion = resultado.tarea.descripcion;
    if (resultado.tarea.completada !== undefined) {
        tarea.completada = resultado.tarea.completada;
    }

    res.status(200).json(tarea);
});

// DELETE: eliminar una tarea existente
router.delete('/tareas/:id', (req, res) => {
    const id = obtenerId(req.params.id, res);
    if (id === null) return;

    const indice = tareas.findIndex(t => t.id === id);
    if (indice === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const [tareaEliminada] = tareas.splice(indice, 1);
    res.status(200).json({
        mensaje: 'Tarea eliminada correctamente',
        tarea: tareaEliminada
    });
});

module.exports = router;

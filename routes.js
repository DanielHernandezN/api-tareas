
const express = require('express');
const router = express.Router();

const tareas = require('./data');

// GET: consultar todas las tareas
router.get('/tareas', (req, res) => {
    res.status(200).json(tareas);
});

// POST: crear una tarea nueva
router.post('/tareas', (req, res) => {
    const { titulo } = req.body;

    // Validar el titulo
    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({
            error: 'El titulo es obligatorio y debe ser texto'
        });
    }

    // Crear la tarea
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: titulo.trim(),
        completada: false
    };

    // Guardar la tarea
    tareas.push(nuevaTarea);

    // Responder con la tarea creada
    res.status(201).json(nuevaTarea);
});

module.exports = router;

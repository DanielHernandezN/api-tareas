const express = require('express');

const router = express.Router();


const tareas = require('./data');

//GET: CONSULTAR TODAS LAS TAREAS

router.get('./tareas', (req, res) => {
    res.status(200).json(tareas);
});

module.exports = router;

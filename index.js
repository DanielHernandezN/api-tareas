const express = require('express');
const rutas = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(rutas);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser JSON valido' });
    }

    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
});

if (require.main === module) {
    const server = app.listen(PORT, () => {
        console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    });

    server.on('error', error => {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exitCode = 1;
    });
}

module.exports = app;

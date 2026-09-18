const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// --- IMPORTAR RUTAS ---
const rutasAuth = require('./routes/auth'); 
const rutasProductos = require('./routes/productos');
const rutasPaquetes = require('./routes/paquetes');
const rutasPublicaciones = require('./routes/publicaciones');
const rutasResultados = require('./routes/resultados');
const rutasDoctores = require('./routes/doctores'); // <-- NUEVA RUTA

// --- USAR RUTAS ---
app.use('/api/auth', rutasAuth);
app.use('/api/productos', rutasProductos);
app.use('/api/paquetes', rutasPaquetes);
app.use('/api/publicaciones', rutasPublicaciones);
app.use('/api/resultados', rutasResultados);
app.use('/api/doctores', rutasDoctores); // <-- NUEVA RUTA

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡El backend de Miderma está funcionando perfectamente!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
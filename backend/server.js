const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// Sincronizar base de datos y correr el servidor
db.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`));
}).catch(err => console.error('Error al sincronizar la base de datos:', err));

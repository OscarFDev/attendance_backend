const express = require('express');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const router = express.Router();

// Ruta para marcar asistencia
router.post('/mark', authMiddleware, async (req, res) => {
    const { documentId } = req.body;
    const record = await Attendance.findOne({ where: { documentId } });
    if (!record) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    record.attended = true;
    await record.save();
    res.json({ message: 'Asistencia marcada' });
});

// Configuración para carga de archivos CSV
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            await Attendance.bulkCreate(results);
            fs.unlinkSync(req.file.path);
            res.json({ message: 'Archivo CSV cargado exitosamente' });
        });
});

module.exports = router;

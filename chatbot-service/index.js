const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const chatBotService = require('./src/services/chatBotService');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.CHATBOT_PORT || 3001;

// Ruta principal para probar que el servicio está vivo
app.get('/', (req, res) => {
    res.send('🤖 El microservicio de Chatbot está funcionando.');
});

// El Webhook que recibe los mensajes
app.post('/webhook', async (req, res) => {
    try {
        const mensajeUsuario = req.body.mensaje;

        if (!mensajeUsuario) {
            return res.status(400).json({ error: 'No se recibió ningún mensaje.' });
        }

        console.log("Procesando mensaje:", mensajeUsuario);

        const respuestaIA = await chatBotService.generarRespuesta(mensajeUsuario);

        res.json({ respuesta: respuestaIA });

    } catch (error) {
        console.error("Error en el webhook:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`🤖 Microservicio de Chatbot corriendo en http://localhost:${PORT}`);
});
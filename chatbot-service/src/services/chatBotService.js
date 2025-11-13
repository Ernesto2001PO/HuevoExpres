const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

if (!process.env.GEMINI_API_KEY) {
    throw new Error("❌ Falta la variable de entorno GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generarRespuesta(mensajeUsuario) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash" });

        const promptSistema =
            "Eres un asistente virtual de HuevoExpress. Responde de forma breve, clara y amable.";

        const prompt = `${promptSistema}\n\nUsuario: ${mensajeUsuario}\nAsistente:`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        return response.trim();
    } catch (error) {
        console.error("❌ Error al conectar con Google Gemini:", error);
        return "Lo siento, tuve un problema al comunicarme con el servidor de IA.";
    }
}

module.exports = { generarRespuesta };

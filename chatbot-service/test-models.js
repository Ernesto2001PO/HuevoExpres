const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

(async () => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Falta la variable de entorno GEMINI_API_KEY");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // ⚡ Listar modelos
        const models = await genAI.listModels();

        console.log("✅ Modelos disponibles:");
        models.forEach(model => {
            console.log(`- Nombre: ${model.name}, Métodos: ${model.supportedMethods.join(", ")}`);
        });

    } catch (error) {
        console.error("❌ Error al listar modelos:", error);
    }
})();

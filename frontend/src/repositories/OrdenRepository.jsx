import axiosInstance from "../api/axiosInstance";

const OrdenRepository = {
    crearOrden: async (usuarioId) => {
        try {
            const response = await axiosInstance.post("/orden/crear",usuarioId);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    obtenerMisOrdenes: async (usuarioId) => {
        try {
            if (!usuarioId) {
                throw new Error("Se requiere el ID de usuario para obtener las órdenes.");
            }

            const response = await axiosInstance.get(`/orden/${usuarioId}`, {
                data: { usuarioId: parseInt(usuarioId, 10) }
            });

            return response.data;

        } catch (error) {
            console.error("Error al obtener mis órdenes:", error);
            throw error; 
        }
    }
}

export default OrdenRepository;

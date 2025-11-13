import axiosInstance from "../api/axiosInstance";


const Carrito = {
    obtenerCarritosdelUsuario: async () => {
        try {
            const usuarioId = localStorage.getItem('id');
            const response = await axiosInstance.get(`/carrito/${usuarioId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },
    agregarItem: async ({ usuarioId, productoId, cantidad }) => {
        const response = await axiosInstance.post("/carrito/agregar", {
            usuarioId,
            productoId,
            cantidad,
        });
        return response.data;
    },
    registroCarrito: async (userData) => {
        try {
            const response = await axiosInstance.post("/carrito/crear", userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    },
    actualizarCantidadItem : async (itemId, cantidad) => {
        try {
            const response = await axiosInstance.put(`/carrito/items/${itemId}`, { cantidad });
            return response.data;
        } catch (error) {
            console.error(`Error actualizando el ítem ${itemId}:`, error);
            throw error;
        }
    }
}

export default Carrito;

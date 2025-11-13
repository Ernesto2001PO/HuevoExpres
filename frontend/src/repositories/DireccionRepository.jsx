import axiosInstance from "../api/axiosInstance";


const direccion = {
    obtenerdireccionesdelUsuario: async () => {
        try {
            const usuarioId = localStorage.getItem('id');
            const response = await axiosInstance.get(`/direccion/obtener/${usuarioId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    },
    registroDireccion: async (userData) => {
        try {
            const response = await axiosInstance.post("/direccion/crear", userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    } 
}

export default direccion;

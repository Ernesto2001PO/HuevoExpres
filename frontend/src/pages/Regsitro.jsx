import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import userRepository from "../repositories/UserRepository";
import "../public/style/Login.css";

function Registro() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !email.trim() || !password.trim()) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        try {
            const response = await userRepository.regsitroUsuario({
                nombre,
                email,
                password,
            });
            if (response) {
                alert("¡Registro exitoso! ¡Bienvenido a HuevoExpress!");
                navigate("/");
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Error en el registro. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-logo">
                    <span className="logo-icon">🥚</span>
                    <h1 className="auth-brand">HuevoExpress</h1>
                </div>

                <h2 className="auth-title">Crea tu cuenta</h2>

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="cuentaejemplo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <button type="submit" className="auth-button w-100 mt-3">
                        Registrar
                    </button>

                    <p className="mt-3">
                        ¿Ya tienes una cuenta?{" "}
                        <span
                            className="auth-link"
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }}
                        >
                            Inicia sesión aquí
                        </span>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Registro;

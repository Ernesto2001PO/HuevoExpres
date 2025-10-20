import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from 'react-bootstrap/Alert';
import { Eye, EyeOff } from "lucide-react";


import 'bootstrap/dist/css/bootstrap.min.css';
import userRepository from "../repositories/UserRepository";
import '../public/style/Login.css'
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); 

        if (!email.trim() || !password.trim()) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);
        try {
            // Ahora usa tu userRepository real
            const response = await userRepository.loginUsuario({ email, password });
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                alert(`Bienvenido: ${response.email} ` )
                navigate("/");
            } else {
                setError("Credenciales incorrectas. Por favor, verifica tu correo y contraseña.");
            }
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError(err.response?.data?.message || "Hubo un problema al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-logo mb-4">
                    <span role="img" aria-label="egg" className="logo-icon">🥚</span>
                    <h1 className="auth-brand">HuevoExpress</h1>
                </div>
                <h2 className="auth-title mb-4">Bienvenido de Nuevo</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleLogin} noValidate>
                    <Form.Group className="mb-3 text-start" controlId="formEmail">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4 text-start" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100 auth-button" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </Button>
                </Form>

                <div className="mt-4 text-center">
                    <span className="text-muted small">¿Aún no tienes una cuenta? </span>
                    <Link to="/registro" className="auth-link">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;


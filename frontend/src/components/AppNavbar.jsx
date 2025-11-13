import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useAuth } from "../hook/useAuth";

const AppNavbar = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <Navbar bg="white" expand="lg" sticky="top" className="shadow">
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                        <span className="text-white fw-bold fs-6">H</span>
                    </div>
                    <span className="fw-bold text-dark">HuevoExpress</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Menú Principal */}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros">Nuestra historia</Nav.Link>

                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/ordenes">Mis ordenes</Nav.Link>
                        )}
                    </Nav>

                    {/* Menú de Usuario */}
                    <Nav>
                        {isAuthenticated ? (
                            <NavDropdown title={`Bienvenido, ${localStorage.getItem('nombre')}`} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item as={Link} to="/perfil">Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/ordenes">Mis ordenes</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="btn btn-outline-success me-2">
                                    Iniciar Sesión
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="btn btn-success text-white px-3">
                                    Registrarse
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
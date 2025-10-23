import React from 'react';
import { Link,  } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useAuth } from "../hook/useAuth"; 

const AppNavbar = () => {
    const { isAuthenticated, logout } = useAuth();
    //const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
    };

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
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
                        {/* Muestra "Ordenes" solo si el usuario está logueado */}
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
                                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="btn btn-danger text-white ms-2 px-3">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;

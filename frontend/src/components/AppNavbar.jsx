import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Eliminado temporalmente para la corrección
// import { useCart } from '../context/CartContext'; // Eliminado temporalmente para la corrección
// import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Eliminado temporalmente para la corrección
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap'; // Eliminado temporalmente para la corrección

// --- Datos de simulación para corregir errores de importación ---
const useAuth = () => ({
    user: { name: 'Ernesto' },
    isAuthenticated: false, // Cambia a 'false' para ver el estado de "no logueado"
    logout: () => console.log('Cerrando sesión...'),
});

const useCart = () => ({
    cart: { totalItems: 3 },
});
// --- Fin de los datos de simulación ---


const AppNavbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
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
                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/orders">Pedidos</Nav.Link>
                        )}
                    </Nav>

                    {/* Menú de Usuario y Carrito */}
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/cart" className="position-relative">
                                    <span role="img" aria-label="cart">🛒</span> {/* Icono reemplazado */}
                                    {cart.totalItems > 0 && (
                                        <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                            {cart.totalItems}
                                        </Badge>
                                    )}
                                </Nav.Link>
                                <NavDropdown title={<><span role="img" aria-label="user">👤</span> {user?.name}</>} id="basic-nav-dropdown" align="end">
                                    <NavDropdown.Item as={Link} to="/profile">Mi Perfil</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/orders">Mis Pedidos</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Cerrar Sesión
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
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


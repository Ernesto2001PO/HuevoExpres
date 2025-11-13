import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import productoRepository from "../repositories/ProductoRepository";
import carritoRepository from "../repositories/CarritoRepository"
import '../public/style/Productos.css';
import { useAuth } from '../hook/useAuth'; 

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(false); 

    const backendUrl = 'http://localhost:3000'; 



    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await productoRepository.obtenerTodosLosProductos();

                console.log("Respuesta completa del backend:", response);
                const productosArray = response.productos;

                if (Array.isArray(productosArray)) {
                    setProductos(productosArray);
                } else {
                    console.error("La data recibida no contiene un array de productos:", response);
                    setProductos([]); 
                }

            } catch (error) {
                console.error("Error al obtener productos:", error);
                setProductos([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []); 

    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            alert("Necesitas iniciar sesión para agregar productos al carrito.");
            navigate("/login");
            return;
        }
    
        try {
            const usuarioId = localStorage.getItem("id"); 
            const itemAgregado = await carritoRepository.agregarItem({
                usuarioId, 
                productoId: product.id,
                cantidad: 1,
            });

            console.log("Producto agregado al carrito:", itemAgregado);
            navigate("/carrito"); 
        } catch (error) {
            console.error("Error agregando al carrito:", error);
            alert("No se pudo agregar el producto al carrito.");
        }
    };


    

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-3">Cargando productos...</p>
            </div>
        );
    }


    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-3">Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="products-page">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="products-title">Nuestros Productos</h1>
                    <p className="products-subtitle text-muted">
                        Calidad y frescura directamente del campo a tu mesa.
                    </p>
                </div>

                <Row xs={1} md={2} lg={4} className="g-4">
                    {productos.map((product) => (
                        <Col key={product.id}>
                            <Card className="h-100 product-card shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={`${backendUrl}${product.imageUrl}`}
                                    alt={product.nombre}
                                    className="product-image-custom" 
                                />

                                <Card.Body className="d-flex flex-column text-center">
                                    <Card.Title as="h5" className="product-name">
                                        {product.nombre}
                                    </Card.Title>
                                    <Card.Text className="product-description">
                                        {product.descripcion}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <p className="product-price">{product.precio} Bs </p>
                                        <Button
                                            variant="danger"
                                            className="w-100 add-to-cart-btn"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FaShoppingCart className="me-2"  />
                                                Agregar al carrito
                                        </Button>
                                        
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Productos;

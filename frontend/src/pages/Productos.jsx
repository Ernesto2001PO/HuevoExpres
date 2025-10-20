import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import productoRepository from "../repositories/ProductoRepository";
import '../public/style/Productos.css';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await productoRepository.obtenerTodosLosProductos();
                console.log("Productos desde backend:", data);
                setProductos(data.data || data); 
            } catch (error) {
                console.error("Error al obtener productos:", error);
                alert("No se pudieron cargar los productos 😞");
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    const handleAddToCart = (product) => {
        console.log(`Producto agregado al carrito: ${product.nombre}`);
    };

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
                                <div className="product-image-container">
                                    <span className="product-image">🥚</span>
                                </div>
                                <Card.Body className="d-flex flex-column text-center">
                                    <Card.Title as="h5" className="product-name">
                                        {product.nombre}
                                    </Card.Title>
                                    <Card.Text className="product-description">
                                        {product.descripcion}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <p className="product-price">${product.precio}</p>
                                        <Button
                                            variant="danger"
                                            className="w-100 add-to-cart-btn"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FaShoppingCart className="me-2" />
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

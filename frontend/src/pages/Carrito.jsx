import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";
import carritoRepository from "../repositories/CarritoRepository";
import OrdenRepository from "../repositories/OrdenRepository";

function Carrito() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [ordenLoading, setOrdenLoading] = useState(false);
    const fetchCarrito = async () => {
        try {
            const carrito = await carritoRepository.obtenerCarritosdelUsuario();
            setItems(carrito.items || []);
        } catch (error) {
            console.error("Error cargando carrito:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCarrito();
    }, []);

    const handleCantidadChange = (id, cantidad) => {
        const nuevaCantidad = Number(cantidad);
        if (nuevaCantidad < 1) return;

        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const precioUnitario = item.producto?.precio || 0;
                    return {
                        ...item,
                        cantidad: nuevaCantidad,
                        subtotal: (precioUnitario * nuevaCantidad).toFixed(2) 
                    };
                }
                return item;
            })
        );
    };


    const handleConfirmarOrden = async () => {
        setOrdenLoading(true); 
        try {
            const usuarioId = localStorage.getItem("id");
            if (!usuarioId) {
                alert("Error: No se encontró el ID de usuario.");
                setOrdenLoading(false);
                return;
            }

            const datosDeLaOrden = {
                usuarioId: parseInt(usuarioId, 10),
                items: items.map(item => {
                    if (!item.producto || item.producto.id === undefined || item.producto.precio === undefined) {
                        console.error("Item inválido detectado:", item);
                        throw new Error(`El producto ${item.producto?.nombre || 'desconocido'} no tiene ID o precio.`);
                    }
                    return {
                        productoId: item.producto.id,
                        cantidad: item.cantidad,      
                        precio: item.producto.precio  
                    };
                })
            };

            if (datosDeLaOrden.items.length === 0) {
                alert("El carrito está vacío.");
                setOrdenLoading(false);
                return;
            }

            console.log("Enviando datos de la orden al backend:", JSON.stringify(datosDeLaOrden, null, 2));
            const ordenCreada = await OrdenRepository.crearOrden(datosDeLaOrden);

            console.log("Orden creada:", ordenCreada);
            alert("¡Orden creada correctamente!");
            navigate("/ordenes");

        } catch (error) {
            console.error("Error creando orden:", error);
            const errorMsg = error.response?.data?.message || error.message || "No se pudo crear la orden";
            alert(`Error: ${errorMsg}`);
        } finally {
            setOrdenLoading(false); 
        }
    };


    if (loading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Cargando carrito...</p>
            </div>
        );

    return (
        <Container className="py-5">
            <h2>🛒 Mi Carrito</h2>
            <Button
                variant="danger"
                onClick={handleConfirmarOrden}
                disabled={items.length === 0 || ordenLoading} 
                className="mb-4"
            >
                {ordenLoading ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        {' Procesando...'}
                    </>
                ) : (
                    'Confirmar Orden'
                )}
            </Button>
            {items.length === 0 ? (
                <p>No tienes productos en el carrito.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {items.map((item) => (
                        <Col key={item.id}>
                            <Card className="h-100 text-center shadow-sm">
                                <Card.Body>
                                    <Card.Title>{item.producto?.nombre || 'Producto no disponible'}</Card.Title>
                                    <Card.Text>Precio: ${item.producto?.precio ? parseFloat(item.producto.precio).toFixed(2) : 'N/A'}</Card.Text>
                                    <Form.Group className="mb-3 mx-auto" style={{ maxWidth: '120px' }}>
                                        <Form.Label>Cantidad:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            // Asegúrate que el valor es controlado por el estado
                                            value={item.cantidad}
                                            onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                                        />
                                    </Form.Group>
                                    {/* Muestra el subtotal calculado dinámicamente */}
                                    <Card.Text className="fw-bold">Subtotal: ${item.subtotal ? parseFloat(item.subtotal).toFixed(2) : 'Calculando...'}</Card.Text>
                                    <Button variant="outline-danger" size="sm">
                                        Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Carrito;

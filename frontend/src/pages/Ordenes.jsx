import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import OrdenRepository from '../repositories/OrdenRepository';
import '../public/style/Orden.css'; 

function Ordenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const usuarioId = localStorage.getItem("id");
                if (!usuarioId) {
                    alert("Error: No se encontró el ID de usuario.");
                    return;
                }

                const data = await OrdenRepository.obtenerMisOrdenes(usuarioId);
                console.log("Órdenes recibidas:", data);
                setOrdenes(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error al obtener las órdenes:", err);
                setError(err.response?.data?.message || "No se pudieron cargar tus órdenes.");
                setOrdenes([]); 
            } finally {
                setLoading(false);
            }
        };

        fetchOrdenes();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch (e) {
            console.log(e);
            return dateString; 
        }
    };

    const getBadgeVariant = (estado) => {
        switch (estado?.toLowerCase()) {
            case 'pendiente': return 'warning';
            case 'procesando': return 'info';
            case 'enviado': return 'primary';
            case 'completado': return 'success';
            case 'cancelado': return 'danger';
            default: return 'secondary';
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="danger" />
                <p className="mt-3">Cargando tus órdenes...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5 ordenes-page">
            <h1 className="mb-4 text-center section-title">Mis Órdenes</h1>

            {ordenes.length === 0 ? (
                <p className="text-center text-muted">Aún no tienes órdenes registradas.</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {ordenes.map((orden) => (
                        <Col key={orden.id}>
                            <Card className="h-100 shadow-sm order-card">
                                <Card.Header className="d-flex justify-content-between align-items-center order-card-header">
                                    <span className="fw-bold">Orden #{orden.id}</span>
                                    <Badge bg={getBadgeVariant(orden.estado)} pill>
                                        {orden.estado || 'Desconocido'}
                                    </Badge>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Fecha:</strong> {formatDate(orden.fecha)} <br />
                                        <strong>Total:</strong> ${orden.total ? parseFloat(orden.total).toFixed(2) : '0.00'}
                                    </Card.Text>
                                    <h6 className="mt-3 mb-2">Productos:</h6>
                                    {orden.items && orden.items.length > 0 ? (
                                        <ListGroup variant="flush" className="order-items-list">
                                            {orden.items.map((item) => (
                                                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center item-list-entry">
                                                    <div>
                                                        <span className="fw-medium">{item.producto?.nombre || 'Producto no disponible'}</span><br />
                                                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                                                    </div>
                                                    <span className="text-muted">${item.subtotal ? parseFloat(item.subtotal).toFixed(2) : '0.00'}</span>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p className="text-muted small">No hay detalles de productos para esta orden.</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Ordenes;

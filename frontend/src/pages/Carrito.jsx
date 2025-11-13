import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Form,
    Modal,
    ListGroup
} from "react-bootstrap";
import carritoRepository from "../repositories/CarritoRepository";
import OrdenRepository from "../repositories/OrdenRepository";
import direccionRepository from "../repositories/DireccionRepository";

function Carrito() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [ordenLoading, setOrdenLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [direcciones, setDirecciones] = useState([]);
    const [loadingDirecciones, setLoadingDirecciones] = useState(false);
    const [selectedDireccionId, setSelectedDireccionId] = useState(null);

    const [showFormularioNueva, setShowFormularioNueva] = useState(false);
    const [creandoDireccion, setCreandoDireccion] = useState(false);
    const [nuevaDireccion, setNuevaDireccion] = useState({
        alias: "",
        calle_avenida: "",
        numero: "",
        referencia_adicional: ""
    });

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

    const handleAbrirModalDirecciones = async () => {
        if (items.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        setShowModal(true);
        await fetchDirecciones();
    };

    const fetchDirecciones = async () => {
        setLoadingDirecciones(true);
        try {
            const data = await direccionRepository.obtenerdireccionesdelUsuario();

            const arregloDeDirecciones = data.direcciones;

            setDirecciones(arregloDeDirecciones);

            if (arregloDeDirecciones.length > 0) {
                setSelectedDireccionId(arregloDeDirecciones[0].id);
            }
        } catch (error) {
            console.error("Error cargando direcciones:", error);
            setDirecciones([]);
        } finally {
            setLoadingDirecciones(false);
        }
    };



    const handleGuardarNuevaDireccion = async (e) => {
        e.preventDefault();
        setCreandoDireccion(true);
        try {
            const direccionCreada = await direccionRepository.registroDireccion(nuevaDireccion);

            await fetchDirecciones();

            setSelectedDireccionId(direccionCreada.id);

            setShowFormularioNueva(false);
            setNuevaDireccion({ alias: "", calle_avenida: "", numero: "", referencia_adicional: "" });

        } catch (error) {
            console.error("Error creando dirección:", error);
            alert("No se pudo crear la dirección.");
        } finally {
            setCreandoDireccion(false);
        }
    };

    const handleFormChange = (e) => {
        setNuevaDireccion({
            ...nuevaDireccion,
            [e.target.name]: e.target.value
        });
    };


    const handleConfirmarOrdenFinal = async () => {

        if (!selectedDireccionId) {
            alert("Por favor, selecciona o crea una dirección de entrega.");
            return;
        }

        setOrdenLoading(true);
        try {

            const datosDeLaOrden = {
                direccionId: selectedDireccionId,

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

            console.log("Enviando datos de la orden al backend:", JSON.stringify(datosDeLaOrden, null, 2));
            const ordenCreada = await OrdenRepository.crearOrden(datosDeLaOrden);

            console.log("Orden creada:", ordenCreada);
            alert("¡Orden creada correctamente!");
            setShowModal(false);
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
                variant="primary"
                onClick={handleAbrirModalDirecciones}
                disabled={items.length === 0}
                className="mb-4"
            >
                Ir a Pagar
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
                                            value={item.cantidad}
                                            onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                                        />
                                    </Form.Group>
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

            {/* MODAL DE DIRECCIÓN  */}
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona tu Dirección</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loadingDirecciones ? (
                        <div className="text-center">
                            <Spinner animation="border" />
                            <p>Cargando direcciones...</p>
                        </div>
                    ) : (
                        <>
                            <h5>Tus direcciones guardadas:</h5>
                            <Form>
                                {direcciones.length > 0 ? (
                                    <ListGroup className="mb-3">
                                        {direcciones.map((dir) => (
                                            <ListGroup.Item key={dir.id} action>
                                                <Form.Check
                                                    type="radio"
                                                    id={`dir-${dir.id}`}
                                                    label={<strong>{dir.alias}</strong>}
                                                    description={`${dir.calle_avenida}, ${dir.referencia_adicional || ''}`}
                                                    value={dir.id}
                                                    checked={selectedDireccionId === dir.id}
                                                    onChange={(e) => setSelectedDireccionId(Number(e.target.value))}
                                                />
                                                <small className="text-muted ms-4">{`${dir.calle_avenida}, ${dir.numero || ''}`}</small>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className="text-muted">No tienes direcciones guardadas.</p>
                                )}
                            </Form>

                            <Button
                                variant="link"
                                onClick={() => setShowFormularioNueva(!showFormularioNueva)}
                                className="p-0"
                            >
                                {showFormularioNueva ? 'Cancelar' : 'Agregar nueva dirección'}
                            </Button>

                            {showFormularioNueva && (
                                <Form onSubmit={handleGuardarNuevaDireccion} className="mt-3 border p-3 rounded">
                                    <Form.Group className="mb-2">
                                        <Form.Label>Alias (ej. "Casa")</Form.Label>
                                        <Form.Control type="text" name="alias" value={nuevaDireccion.alias} onChange={handleFormChange} required />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Calle/Avenida</Form.Label>
                                        <Form.Control type="text" name="calle_avenida" value={nuevaDireccion.calle_avenida} onChange={handleFormChange} required />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Número (Opcional)</Form.Label>
                                        <Form.Control type="text" name="numero" value={nuevaDireccion.numero} onChange={handleFormChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Referencia (Opcional)</Form.Label>
                                        <Form.Control type="text" name="referencia_adicional" value={nuevaDireccion.referencia_adicional} onChange={handleFormChange} />
                                    </Form.Group>
                                    <Button type="submit" variant="success" disabled={creandoDireccion}>
                                        {creandoDireccion ? <Spinner size="sm" /> : 'Guardar Dirección'}
                                    </Button>
                                </Form>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Volver al Carrito
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleConfirmarOrdenFinal}
                        disabled={!selectedDireccionId || ordenLoading || loadingDirecciones}
                    >
                        {ordenLoading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                {' Procesando...'}
                            </>
                        ) : (
                            'Confirmar Pedido'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default Carrito;
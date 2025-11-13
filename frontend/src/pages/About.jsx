import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
    const teamMembers = [
        {
            name: 'Ernesto Paz',
            role: 'Fundador y CEO',
            imageUrl: 'https://placehold.co/400x400/198754/white?text=EP',
            bio: 'Apasionado por la calidad y la agricultura sostenible, Ernesto fundó HuevoExpress para llevar los mejores huevos del campo a la ciudad.'
        },
        {
            name: 'Ana García',
            role: 'Jefa de Operaciones',
            imageUrl: 'https://placehold.co/400x400/198754/white?text=AG',
            bio: 'Ana se asegura de que cada pedido se procese con eficiencia y que tus huevos lleguen frescos y a tiempo a tu puerta.'
        },
        {
            name: 'Carlos Mendoza',
            role: 'Encargado de Calidad',
            imageUrl: 'https://placehold.co/400x400/198754/white?text=CM',
            bio: 'Con un ojo experto para el detalle, Carlos supervisa que cada huevo cumpla con nuestros altísimos estándares de calidad.'
        }
    ];

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                    :root {
                        --primary-green: #198754;
                        --font-body: 'Poppins', sans-serif;
                    }
                    .about-page {
                        font-family: var(--font-body);
                    }
                    .about-hero {
                        background-color: var(--primary-green);
                        padding: 5rem 0;
                    }
                    .about-section {
                        padding-top: 3rem;
                        padding-bottom: 3rem;
                    }
                    .value-card {
                        padding: 2rem;
                        background-color: #fff;
                        border-radius: 1rem;
                        border: 1px solid #e9ecef;
                        height: 100%;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .value-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
                    }
                    .value-icon {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                    }
                    .team-card {
                        border: none;
                        border-radius: 1rem;
                        overflow: hidden;
                    }
                    .team-img {
                        filter: grayscale(20%);
                        transition: filter 0.3s ease;
                    }
                    .team-card:hover .team-img {
                        filter: grayscale(0%);
                    }
                    .cta-section {
                        border-radius: 1rem;
                        margin: 2rem 0;
                    }
                    .cta-section .btn {
                         /* <-- CAMBIO: Variable a verde */
                        color: var(--primary-green);
                    }
                `}
            </style>
            <div className="about-page">
                {/* Sección Hero */}
                <header className="about-hero text-center text-white">
                    <Container>
                        <h1 className="display-4 fw-bold">Nuestra Pasión por la Frescura</h1>
                        <p className="lead col-lg-8 mx-auto">
                            En HuevoExpress, creemos que todos merecen disfrutar del sabor auténtico y la calidad de los huevos frescos, directamente del campo.
                        </p>
                    </Container>
                </header>

                {/* Sección de Nuestra Historia */}
                <Container className="my-5 about-section">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <img
                                src="https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Huevos frescos en una canasta"
                                className="img-fluid rounded shadow-lg"
                            />
                        </Col>
                        <Col md={6}>
                            <h2 className="fw-bold mb-3">Nuestra Historia</h2>
                            <p className="text-muted">
                                HuevoExpress nació de una idea simple en el corazón de nuestra región: acortar la distancia entre los productores locales y tu desayuno. Frustrados por la falta de huevos verdaderamente frescos en los supermercados, decidimos crear un servicio que garantizara calidad y rapidez.
                            </p>
                            <p className="text-muted">
                                Comenzamos como un pequeño emprendimiento familiar, colaborando con granjas locales que comparten nuestra pasión por el cuidado animal y la producción sostenible. Hoy, nos enorgullece servir a miles de hogares, manteniendo siempre nuestro compromiso original.
                            </p>
                        </Col>
                    </Row>
                </Container>

                {/* Sección de Nuestros Valores */}
                <div className="bg-light">
                    <Container className="py-5 about-section">
                        <h2 className="text-center fw-bold mb-5">Lo que Nos Define</h2>
                        <Row>
                            <Col md={4} className="text-center mb-4">
                                <div className="value-card">
                                    <div className="value-icon">🥚</div>
                                    <h4 className="fw-semibold">Calidad Suprema</h4>
                                    <p className="text-muted small">No todos los huevos son iguales. Seleccionamos solo los mejores, de gallinas sanas y criadas en un entorno natural.</p>
                                </div>
                            </Col>
                            <Col md={4} className="text-center mb-4">
                                <div className="value-card">
                                    <div className="value-icon">🚚</div>
                                    <h4 className="fw-semibold">Frescura Garantizada</h4>
                                    <p className="text-muted small">Nuestro modelo de entrega directa asegura que recibas tus huevos en tiempo récord, conservando todo su sabor y valor nutricional.</p>
                                </div>
                            </Col>
                            <Col md={4} className="text-center mb-4">
                                <div className="value-card">
                                    <div className="value-icon">❤️</div>
                                    <h4 className="fw-semibold">Compromiso Local</h4>
                                    <p className="text-muted small">Apoyamos a los agricultores de nuestra comunidad, promoviendo prácticas justas y contribuyendo a la economía local.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Sección de Nuestro Equipo */}
                <Container className="my-5 about-section">
                    <h2 className="text-center fw-bold mb-5">Conoce a Nuestro Equipo</h2>
                    <Row>
                        {teamMembers.map((member, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card className="h-100 text-center team-card shadow-sm">
                                    <Card.Img variant="top" src={member.imageUrl} className="team-img" />
                                    <Card.Body>
                                        <Card.Title as="h5" className="fw-bold">{member.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-success">{member.role}</Card.Subtitle>
                                        <Card.Text className="text-muted small">
                                            {member.bio}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <div className="bg-light">
                    <Container className="py-5 about-section">
                        <h2 className="text-center fw-bold mb-5">Encuéntranos</h2>
                        <Row className="justify-content-center">
                            <Col md={10} lg={8}>
                                <p className="text-center text-muted mb-4">
                                    Visita nuestra central para recogidas o simplemente para saludar.
                                    ¡Estamos en el corazón de la ciudad!
                                </p>

                                <div className="ratio ratio-16x9 rounded shadow">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7600.243229145735!2d-63.1662583!3d-17.738908!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e77ddaee851d%3A0xd43e282c6fd2d24e!2sEscuela%20de%20F%C3%BAtbol%20Panenka%20Academy!5e0!3m2!1ses-419!2sbo!4v1762378070943!5m2!1ses-419!2sbo"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Ubicación de HuevoExpress"
                                    ></iframe>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Sección Call to Action  */}
                <div className="bg-success">
                    <Container className="py-5 text-center text-white cta-section">
                        <h2 className="fw-bold">¿Listo para Probar la Diferencia?</h2>
                        <p className="lead my-4">Únete a la familia HuevoExpress y descubre el verdadero sabor de los huevos frescos.</p>
                        <Button as={Link} to="/productos" variant="light" size="lg" className="fw-bold">
                            Ver Nuestros Productos
                        </Button>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default About;
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (

        <div>
            {/* Hero Section */}
            <section className="bg-success bg-gradient text-white">
                <div className="container py-5">
                    <div className="py-5 col-lg-8">
                        <h1 className="display-3 fw-bold mb-4">
                            Huevos Frescos de <span className="text-warning">Calidad Premium</span>
                        </h1>
                        <p className="fs-5 mb-4 " style={{color : "white"}}>
                            Descubre la diferencia de nuestros huevos frescos, directamente del productor a tu mesa.
                            Calidad garantizada y sabor excepcional.
                        </p>
                        <div className="d-grid gap-3 d-sm-flex">
                            <Link to="/productos" className="btn btn-light btn-lg px-4 fw-bold">
                                <span role="img" aria-label="shopping bag" className="d-inline me-2"></span>
                                Ver Productos
                            </Link>
                            <Link to="/nosotros" className="btn btn-outline-light btn-lg px-4">
                                Conoce Más
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-white">
                <div className="container px-4 py-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-dark mb-3">
                            ¿Por qué elegir HuevoExpress?
                        </h2>
                        <p className="fs-5 text-muted col-lg-7 mx-auto">
                            Nos comprometemos a ofrecer la mejor calidad en cada huevo que llega a tu hogar.
                        </p>
                    </div>

                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="col text-center">
                            <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                                <span className="fs-3" role="img" aria-label="leaf">🌿</span>
                            </div>
                            <h3 className="fs-4 fw-semibold mb-2">100% Natural</h3>
                            <p className="text-muted">
                                Nuestros huevos provienen de gallinas criadas en libertad, alimentadas con granos naturales.:
                            </p>
                        </div>

                        <div className="col text-center">
                            <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                                <span className="fs-3" role="img" aria-label="truck">🚚</span>
                            </div>
                            <h3 className="fs-4 fw-semibold mb-2">Entrega Rápida</h3>
                            <p className="text-muted">
                                Recibe tus huevos frescos en la comodidad de tu hogar con nuestro servicio de entrega.
                            </p>
                        </div>

                        <div className="col text-center">
                            <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                                <span className="fs-3" role="img" aria-label="star">⭐</span>
                            </div>
                            <h3 className="fs-4 fw-semibold mb-2">Calidad Premium</h3>
                            <p className="text-muted">
                                Cada huevo pasa por rigurosos controles de calidad para garantizar la frescura.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Productos Preview */}
            <section className="py-5 bg-light">
                <div className="container px-4 py-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-dark mb-3">
                            Nuestros Productos
                        </h2>
                        <p className="fs-5 text-muted col-lg-7 mx-auto">
                            Descubre nuestra variedad de huevos frescos de diferentes tamaños y orígenes.
                        </p>
                    </div>

                    <div className="row g-4 row-cols-1 row-cols-md-3">
                        <div className="col">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
                                        <span className="fs-2">🥚</span>
                                    </div>
                                    <h3 className="fs-4 fw-semibold mb-2">Huevos Medianos</h3>
                                    <p className="text-muted mb-3">Perfectos para el consumo diario</p>
                                    <span className="fs-3 fw-bold text-success">$2.50</span>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
                                        <span className="fs-2">🥚</span>
                                    </div>
                                    <h3 className="fs-4 fw-semibold mb-2">Huevos Grandes</h3>
                                    <p className="text-muted mb-3">Ideales para cocinar y hornear</p>
                                    <span className="fs-3 fw-bold text-success">$3.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100 text-center shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-success-subtle rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
                                        <span className="fs-2">🌱</span>
                                    </div>
                                    <h3 className="fs-4 fw-semibold mb-2">Huevos Orgánicos</h3>
                                    <p className="text-muted mb-3">Certificados orgánicos, máxima calidad</p>
                                    {/* text-success */}
                                    <span className="fs-3 fw-bold text-success">$4.50</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        {/* btn-success */}
                        <Link to="/productos" className="btn btn-success btn-lg">
                            Ver Todos los Productos
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 bg-success text-white">
                <div className="container text-center py-5">
                    <h2 className="display-5 fw-bold mb-3">
                        ¿Listo para probar la diferencia?
                    </h2>
                    <p className="fs-5 text-white-50 col-lg-7 mx-auto mb-4">
                        Únete a miles de clientes satisfechos que ya disfrutan de nuestros huevos frescos.
                    </p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-center">
                        <Link to="/registro" className="btn btn-light btn-lg px-4 fw-bold">
                            Comenzar Ahora
                        </Link>
                        <Link to="/productos" className="btn btn-outline-light btn-lg px-4">
                            Ver Productos
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
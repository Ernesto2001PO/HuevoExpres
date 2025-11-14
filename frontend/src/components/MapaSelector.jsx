import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function EventosDelMapa({ onPosicionSeleccionada }) {
    useMapEvents({
        click(e) {
            onPosicionSeleccionada(e.latlng);
        },
    });
    return null;
}

function MapaSelector({ onPosicionSeleccionada }) {
    const [posicion, setPosicion] = useState(null);

    const centroMapa = [-17.7833, -63.1812];

    const handleMapClick = (latlng) => {
        setPosicion(latlng);
        onPosicionSeleccionada(latlng); 
    };

    return (
        <MapContainer
            center={centroMapa}
            zoom={13}
            style={{ height: '300px', width: '100%', borderRadius: '8px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {posicion && <Marker position={posicion} />}

            <EventosDelMapa onPosicionSeleccionada={handleMapClick} />
        </MapContainer>
    );
}

export default MapaSelector;
import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customMarkerIcon = new L.Icon({
    iconUrl: '/assets/marker.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const MapContainer = ({ location }) => {
    return (
        <LeafletMap center={location} zoom={13} style={{ height: '400px', width: '100%' }} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} icon={customMarkerIcon}>
                <Popup>Where you'll be</Popup>
            </Marker>
        </LeafletMap>
    );
};

export default MapContainer;
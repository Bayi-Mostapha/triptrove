import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const customMarkerIcon = new L.Icon({
    iconUrl: '/assets/marker.svg',
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
});

const MapContainer = ({ location }) => {
    const [mapLocation, setMapLocation] = useState(null);

    const getCoordinates = async () => {
        const apiKey = '9cd06f97a17c4cd19963e1cc7fe7f6cc';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            const { results } = response.data;
            console.log(response);

            if (results.length > 0) {
                const { lat, lng } = results[0].geometry;
                setMapLocation([lat, lng])
            } else {
                throw new Error('Location not found');
            }
        } catch (error) {
            console.error('Error getting coordinates:', error);
            throw error;
        }
    };
    useEffect(() => {
        getCoordinates()
    }, [])
    return (
        <>
            {
                mapLocation && (
                    <LeafletMap center={mapLocation} zoom={13} style={{ height: '400px', width: '100%' }} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapLocation} icon={customMarkerIcon}>
                            <Popup>Where you'll be</Popup>
                        </Marker>
                    </LeafletMap>
                )
            }
        </>
    );
};

export default MapContainer;
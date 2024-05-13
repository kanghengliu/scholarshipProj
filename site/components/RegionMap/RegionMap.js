// "use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';

// Fix icon issues with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const SimpleMap = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [mapCenter, setMapCenter] = useState([37.60250162758621, -110.0093977137931]); // Default center, update this based on GeoJSON

    useEffect(() => {
        fetch('/area.json')  // Assuming your GeoJSON file is named 'area.json' and located in the public directory
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
                updateMapCenter(data);
            })
            .catch(error => console.error('Error loading the GeoJSON data:', error));
    }, []);

    // Function to calculate the centroid of the GeoJSON data
    const updateMapCenter = (geoJson) => {
        const centroid = turf.centroid(geoJson);
        console.log(centroid.geometry.coordinates[1], centroid.geometry.coordinates[0])
        setMapCenter([centroid.geometry.coordinates[1], centroid.geometry.coordinates[0]]);
    };

    return (
        <>
        <style jsx global>{`
            .leaflet-container {
                background-color: transparent !important;
            }
        `}</style>
        <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "800px", width: "100%" }}
            zoomControl={false}
            dragging={false}
            doubleClickZoom={false}
            touchZoom={false}
            keyboard={false}
            boxZoom={false}
            attributionControl={false}
        >
            {geoJsonData && <GeoJSON
                data={geoJsonData}
                style={() => ({
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    weight: 5
                })}
            />}
        </MapContainer>
        </>
    );
};

export default SimpleMap;




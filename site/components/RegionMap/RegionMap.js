import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';

const SimpleMap = () => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [pointData, setPointData] = useState(null);
    const [mapCenter, setMapCenter] = useState([37.60250162758621, -110.0093977137931]); // Default center, update this based on GeoJSON

    useEffect(() => {
        // Fetch the area polygon data
        fetch('/area.json')
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
                updateMapCenter(data);
            })
            .catch(error => console.error('Error loading the GeoJSON data:', error));

        // Fetch the point data
        fetch('/history_unique.geojson')
            .then(response => response.json())
            .then(setPointData)
            .catch(error => console.error('Error loading the point data:', error));
    }, []);

    // Function to calculate the centroid of the GeoJSON data
    const updateMapCenter = (geoJson) => {
        const centroid = turf.centroid(geoJson);
        setMapCenter([centroid.geometry.coordinates[1], centroid.geometry.coordinates[0]]);
    };

    return (
        <>
        <style jsx global>{`
            .leaflet-container {
                background-color: transparent !important;
                pointer-events: auto;  // Make sure pointer events are on for interactivity
            }
            .leaflet-interactive {
                cursor: none; // Restore interactivity over polygons and markers
            }
        `}</style>
        <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "600px", width: "800px" }}
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
                    weight: 5,
                })}
            />}
            {pointData && pointData.features.map((feature, idx) => (
                <Marker
                    key={idx}
                    position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                    icon={new L.Icon.Default()}
                >
                </Marker>
            ))}
        </MapContainer>
        </>
    );
};

export default SimpleMap;

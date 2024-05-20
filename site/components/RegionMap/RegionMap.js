import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import HeatmapLayer from './HeatmapLayer';

// Custom marker component
const CustomMarker = ({ position, idx, show, delay, dominant }) => {
    const map = useMap();
    const markerRef = React.useRef(null);
    const [markerVisible, setMarkerVisible] = useState(false);

    // Function to get the appropriate icon URL based on the dominant property
    const getIconUrl = (dominant) => {
        switch (dominant) {
            case 'Herb':
                return '/herb.png';
            case 'Litter':
                return '/litter.png';
            case 'Bare':
                return '/bare.png';
            case 'Shrub':
                return '/shrub.png';
            default:
                return '/pin-2.png'; // Default icon if the dominant property does not match
        }
    };

    useEffect(() => {
        if (show && !markerRef.current) {
            const iconUrl = getIconUrl(dominant);
            const markerDiv = document.createElement('div');
            markerDiv.className = 'custom-marker marker-fade-in';
            markerDiv.style.backgroundImage = `url(${iconUrl})`;
            markerDiv.style.animationDelay = `${delay}s`;
            markerRef.current = L.marker(position, {
                icon: L.divIcon({
                    className: '',
                    html: markerDiv.outerHTML,
                }),
            }).addTo(map);
            setMarkerVisible(true);
        } else if (!show && markerRef.current && markerVisible) {
            const markerDiv = markerRef.current.getElement();
            if (markerDiv) {
                markerDiv.className = 'custom-marker marker-fade-out';
                setTimeout(() => {
                    if (markerRef.current) {
                        map.removeLayer(markerRef.current);
                        markerRef.current = null;
                        setMarkerVisible(false);
                    }
                }, 150); // Match the duration of the fade-out animation
            }
        }
    }, [show, map, position, delay, markerVisible, dominant]);

    return null;
};

const SimpleMap = ({ mapTriggerId, markerTriggerId, vegMarkerTriggerId, year, heatmapTriggerId }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [pointData, setPointData] = useState(null);
    const [vegPointData, setVegPointData] = useState(null);
    const [mapCenter, setMapCenter] = useState([37.60250162758621, -110.0093977137931]); // Default center, update this based on GeoJSON
    const [showMarkers, setShowMarkers] = useState(false); // State to control marker visibility
    const [showVegMarkers, setShowVegMarkers] = useState(false); // State to control veg marker visibility
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [hasMapBeenTriggered, setHasMapBeenTriggered] = useState(false); // State to control map visibility once triggered

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
            .then(data => {
                // Sort point data by latitude (y-coordinate) in descending order
                const sortedFeatures = data.features.sort((a, b) => b.geometry.coordinates[1] - a.geometry.coordinates[1]);
                setPointData({ ...data, features: sortedFeatures });
            })
            .catch(error => console.error('Error loading the point data:', error));

        // Fetch the veg point data
        fetch('/history_unique_veg.geojson')
            .then(response => response.json())
            .then(data => {
                // Sort point data by latitude (y-coordinate) in descending order
                const sortedFeatures = data.features.sort((a, b) => b.geometry.coordinates[1] - a.geometry.coordinates[1]);
                setVegPointData({ ...data, features: sortedFeatures });
            })
            .catch(error => console.error('Error loading the veg point data:', error));

        // Observe the map trigger element
        const observeMap = () => {
            const mapElement = document.getElementById(mapTriggerId);
            if (mapElement) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setHasMapBeenTriggered(true);
                            }
                        });
                    },
                    { threshold: 0.5 } // Adjust this threshold as needed
                );

                observer.observe(mapElement);

                return () => {
                    observer.unobserve(mapElement);
                };
            }
        };

        // Observe the marker trigger element
        const observeMarkers = () => {
            const markerElement = document.getElementById(markerTriggerId);
            if (markerElement) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setShowMarkers(true);
                            } else {
                                setShowMarkers(false);
                            }
                        });
                    },
                    { threshold: 0.5 } // Adjust this threshold as needed
                );

                observer.observe(markerElement);

                return () => {
                    observer.unobserve(markerElement);
                };
            }
        };

        // Observe the veg marker trigger element
        const observeVegMarkers = () => {
            const vegMarkerElement = document.getElementById(vegMarkerTriggerId);
            if (vegMarkerElement) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setShowVegMarkers(true);
                            } else {
                                setShowVegMarkers(false);
                            }
                        });
                    },
                    { threshold: 0.5 } // Adjust this threshold as needed
                );

                observer.observe(vegMarkerElement);

                return () => {
                    observer.unobserve(vegMarkerElement);
                };
            }
        };

        // Observe the heatmap trigger element
        const observeHeatmap = () => {
            const heatmapElement = document.getElementById(heatmapTriggerId);
            if (heatmapElement) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                setShowHeatmap(true);
                            } else {
                                setShowHeatmap(false);
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                observer.observe(heatmapElement);

                return () => {
                    observer.unobserve(heatmapElement);
                };
            }
        };

        // Retry observing if the elements are not found immediately
        const mapObserverTimeout = setTimeout(observeMap, 100);
        const markerObserverTimeout = setTimeout(observeMarkers, 100);
        const vegMarkerObserverTimeout = setTimeout(observeVegMarkers, 100);
        const heatmapObserverTimeout = setTimeout(observeHeatmap, 100);

        return () => {
            clearTimeout(mapObserverTimeout);
            clearTimeout(markerObserverTimeout);
            clearTimeout(vegMarkerObserverTimeout);
            clearTimeout(heatmapObserverTimeout);
        };
    }, [mapTriggerId, markerTriggerId, vegMarkerTriggerId, heatmapTriggerId]);

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
                    pointer-events: none;  // Make sure pointer events are on for interactivity
                }
                .leaflet-interactive {
                    pointer-events: none;  // Disable interactivity over polygons and markers
                    // visibility: hidden; // Hide polygons and markers
                    cursor: none; // Restore interactivity over polygons and markers
                }
                .custom-marker {
                    width: 25px;
                    height: 41px;
                    background-size: contain;
                    background-repeat: no-repeat;
                    opacity: 0; // Start with opacity 0
                    transform: translateY(-20px); // Start with position above
                }
                .marker-fade-in {
                    animation: fadeIn 0.15s ease-out forwards;
                }
                .marker-fade-out {
                    animation: fadeOut 0ds ease-out forwards;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeOut {
                    0% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-20px); }
                }
            `}</style>
            <div id="map-container" style={{ visibility: hasMapBeenTriggered ? 'visible' : 'hidden' }}>
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
                            interactive: false
                        })}
                    />}
                    {pointData && pointData.features.map((feature, idx) => (
                        <CustomMarker
                            key={idx}
                            position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                            show={showMarkers}
                            idx={idx}
                            delay={idx * 0.015} // Delay based on index
                        />
                    ))}
                    {vegPointData && vegPointData.features.map((feature, idx) => (
                        <CustomMarker
                            key={idx}
                            position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                            show={showVegMarkers}
                            idx={idx}
                            delay={idx * 0.015} // Delay based on index
                            dominant={feature.properties.dominant} // Pass the dominant property
                        />
                    ))}
                    <HeatmapLayer year={year} showHeatmap={showHeatmap} /> {/* Add the HeatmapLayer component */}
                </MapContainer>
            </div>
        </>
    );
};

export default SimpleMap;

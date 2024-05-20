import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

const HeatmapLayer = ({ year, showHeatmap }) => {
    const map = useMap();
    const [heatmapLayer, setHeatmapLayer] = useState(null);

    useEffect(() => {
        if (!map) return;

        // if (showHeatmap && heatmapLayer) {
        //     heatmapLayer.setLatLngs([]);
        // }

        fetch(`/history_unique_${year}.geojson`)
            .then(response => response.json())
            .then(data => {
                if (!map) return; // Ensure map instance is still valid

                const heatData = data.features.map(feature => [
                    feature.geometry.coordinates[1],
                    feature.geometry.coordinates[0],
                    feature.properties.T_Annual,
                ]);

                if (heatmapLayer) {
                    heatmapLayer.setLatLngs(heatData);
                } else {
                    const newHeatmapLayer = L.heatLayer(heatData, {
                        radius: 25,
                        blur: 15,
                        maxZoom: 17,
                    });

                    setHeatmapLayer(newHeatmapLayer);
                    if (showHeatmap) {
                        map.addLayer(newHeatmapLayer);
                    }
                }
            })
            .catch(error => console.error('Error loading the GeoJSON data:', error));
    }, [year, showHeatmap, map]);

    useEffect(() => {
        if (heatmapLayer) {
            if (showHeatmap) {
                map && map.addLayer(heatmapLayer);
            } else {
                map && map.removeLayer(heatmapLayer);
            }
        }
    }, [showHeatmap, map, heatmapLayer]);

    return null;
};

export default HeatmapLayer;

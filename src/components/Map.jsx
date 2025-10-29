import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useDrop } from 'react-dnd';
import { MAP_CONFIG } from '../utils/mapHelpers';
import { GENDARMERIE_UNIT } from '../data/units';

const Map = ({ language, placedUnits, terrainZones, selectedTerrain, onDropUnit, onAddTerrainZone }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'unit',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (map.current && offset) {
        const rect = mapContainer.current.getBoundingClientRect();
        const x = offset.x - rect.left;
        const y = offset.y - rect.top;
        const { lng, lat } = map.current.unproject([x, y]);
        onDropUnit(item.unitId, lat, lng);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_CONFIG.style,
      center: MAP_CONFIG.initialCenter,
      zoom: MAP_CONFIG.initialZoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-left');
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-left');
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-left');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when units change
  useEffect(() => {
    if (!map.current) return;

    // Clear old markers
    markers.current.forEach(m => m.remove());
    markers.current = [];

    // Add new markers
    placedUnits.forEach(unit => {
      const el = document.createElement('div');
      el.className = 'unit-marker';
      el.innerHTML = `
        <div style="
          background: ${GENDARMERIE_UNIT.color};
          color: white;
          padding: 8px 12px;
          border-radius: 50%;
          font-size: 24px;
          border: 3px solid #FF8C42;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.3s ease;
        ">
          ${GENDARMERIE_UNIT.icon}
        </div>
      `;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      const popupContent = `
        <div style="padding: 10px; color: #000;">
          <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">
            ${GENDARMERIE_UNIT.name[language]}
          </h3>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>${GENDARMERIE_UNIT.stats.personnel.label[language]}:</strong> ${unit.personnel}
          </p>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>${GENDARMERIE_UNIT.stats.vehicles.label[language]}:</strong> ${unit.vehicles}
          </p>
        </div>
      `;

      const popup = new maplibregl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(popupContent);

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([unit.lng, unit.lat])
        .setPopup(popup)
        .addTo(map.current);

      markers.current.push(marker);
    });
  }, [placedUnits, language]);

  // Add terrain zones as GeoJSON layers
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Remove existing terrain layers
    try {
      const layers = map.current.getStyle().layers;
      layers.forEach(layer => {
        if (layer.id.startsWith('terrain-')) {
          if (map.current.getLayer(layer.id)) {
            map.current.removeLayer(layer.id);
          }
        }
      });

      const sources = Object.keys(map.current.getStyle().sources);
      sources.forEach(source => {
        if (source.startsWith('terrain-')) {
          if (map.current.getSource(source)) {
            map.current.removeSource(source);
          }
        }
      });
    } catch (error) {
      console.warn('Error removing terrain layers:', error);
    }

    // Add new terrain zones
    terrainZones.forEach((zone, index) => {
      const sourceId = `terrain-${zone.id}-${index}`;
      const layerId = `terrain-layer-${zone.id}-${index}`;

      try {
        if (!map.current.getSource(sourceId)) {
          map.current.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [zone.coordinates]
              }
            }
          });

          map.current.addLayer({
            id: layerId,
            type: 'fill',
            source: sourceId,
            paint: {
              'fill-color': zone.color,
              'fill-opacity': 0.5
            }
          });

          map.current.addLayer({
            id: `${layerId}-outline`,
            type: 'line',
            source: sourceId,
            paint: {
              'line-color': zone.borderColor,
              'line-width': 2
            }
          });
        }
      } catch (error) {
        console.warn('Error adding terrain zone:', error);
      }
    });
  }, [terrainZones]);

  drop(mapContainer);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full transition-opacity duration-300"
      style={{ 
        opacity: isOver ? 0.8 : 1,
        cursor: selectedTerrain ? 'crosshair' : 'default'
      }}
    />
  );
};

export default Map;

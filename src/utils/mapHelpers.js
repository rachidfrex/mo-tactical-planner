export const MAP_CONFIG = {
  initialCenter: [-7.0926, 31.7917], // [lng, lat] for Morocco center
  initialZoom: 6,
  minZoom: 5,
  maxZoom: 18,
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [{
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 22
    }]
  }
};

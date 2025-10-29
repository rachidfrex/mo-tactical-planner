// Tactical positioning helper functions for MO/SO elements
import { MO_ELEMENT_TYPES, BAF_CONFIGURATION } from '../data/moElements';

/**
 * Calculate optimal position for an MO element based on anchor point and element type
 * @param {Object} anchorPoint - {lat, lng} - Reference point (usually front line position)
 * @param {string} elementType - Type of MO element
 * @param {number} bearing - Direction in degrees (0 = North, 90 = East, etc.)
 * @returns {Object} - {lat, lng} - Calculated position
 */
export function calculateOptimalPosition(anchorPoint, elementType, bearing = 0) {
  const distances = BAF_CONFIGURATION.spacing;
  let distance = 0;
  
  switch(elementType) {
    case MO_ELEMENT_TYPES.FRONT_LINE:
      distance = distances.frontLineDistance;
      break;
    case MO_ELEMENT_TYPES.RESERVE:
      distance = distances.reserveDistance;
      break;
    case MO_ELEMENT_TYPES.COMMAND:
      distance = distances.commandDistance;
      break;
    case MO_ELEMENT_TYPES.LOGISTICS:
      distance = distances.logisticsDistance;
      break;
    case MO_ELEMENT_TYPES.SPECIALIZED:
      // Specialized units can be positioned flexibly
      distance = distances.reserveDistance;
      break;
    default:
      distance = 0;
  }
  
  // Convert distance (meters) to approximate lat/lng offset
  // At Morocco's latitude (~31°), 1 degree lat ≈ 111km, 1 degree lng ≈ 95km
  const latDegreeInMeters = 111000;
  const lngDegreeInMeters = 95000;
  
  // Calculate offset based on bearing (opposite direction for rear positions)
  const bearingRad = ((bearing + 180) % 360) * (Math.PI / 180);
  const latOffset = (distance / latDegreeInMeters) * Math.cos(bearingRad);
  const lngOffset = (distance / lngDegreeInMeters) * Math.sin(bearingRad);
  
  return {
    lat: anchorPoint.lat + latOffset,
    lng: anchorPoint.lng + lngOffset
  };
}

/**
 * Suggest optimal positions for a complete BAF formation
 * @param {Object} centerPoint - {lat, lng} - Center/front line position
 * @param {number} bearing - Direction facing (0 = North)
 * @returns {Object} - Suggested positions for each element type
 */
export function suggestBAFFormation(centerPoint, bearing = 0) {
  return {
    frontLine: calculateOptimalPosition(centerPoint, MO_ELEMENT_TYPES.FRONT_LINE, bearing),
    reserve: calculateOptimalPosition(centerPoint, MO_ELEMENT_TYPES.RESERVE, bearing),
    command: calculateOptimalPosition(centerPoint, MO_ELEMENT_TYPES.COMMAND, bearing),
    logistics: calculateOptimalPosition(centerPoint, MO_ELEMENT_TYPES.LOGISTICS, bearing)
  };
}

/**
 * Validate if personnel count matches BAF requirements
 * @param {Array} elements - Array of placed MO elements
 * @returns {Object} - {valid, total, breakdown, issues}
 */
export function validateBAFFormation(elements) {
  const breakdown = {
    [MO_ELEMENT_TYPES.COMMAND]: 0,
    [MO_ELEMENT_TYPES.FRONT_LINE]: 0,
    [MO_ELEMENT_TYPES.RESERVE]: 0,
    [MO_ELEMENT_TYPES.LOGISTICS]: 0,
    [MO_ELEMENT_TYPES.SPECIALIZED]: 0
  };
  
  elements.forEach(element => {
    if (element.elementType && breakdown.hasOwnProperty(element.elementType)) {
      breakdown[element.elementType] += element.personnel || 0;
    }
  });
  
  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  const config = BAF_CONFIGURATION.composition;
  const issues = [];
  
  // Check each component
  if (breakdown[MO_ELEMENT_TYPES.COMMAND] < config.command.min || 
      breakdown[MO_ELEMENT_TYPES.COMMAND] > config.command.max) {
    issues.push({
      type: MO_ELEMENT_TYPES.COMMAND,
      current: breakdown[MO_ELEMENT_TYPES.COMMAND],
      expected: `${config.command.min}-${config.command.max}`
    });
  }
  
  if (breakdown[MO_ELEMENT_TYPES.FRONT_LINE] < config.frontLine.min || 
      breakdown[MO_ELEMENT_TYPES.FRONT_LINE] > config.frontLine.max) {
    issues.push({
      type: MO_ELEMENT_TYPES.FRONT_LINE,
      current: breakdown[MO_ELEMENT_TYPES.FRONT_LINE],
      expected: `${config.frontLine.min}-${config.frontLine.max}`
    });
  }
  
  if (breakdown[MO_ELEMENT_TYPES.RESERVE] < config.reserve.min || 
      breakdown[MO_ELEMENT_TYPES.RESERVE] > config.reserve.max) {
    issues.push({
      type: MO_ELEMENT_TYPES.RESERVE,
      current: breakdown[MO_ELEMENT_TYPES.RESERVE],
      expected: `${config.reserve.min}-${config.reserve.max}`
    });
  }
  
  if (breakdown[MO_ELEMENT_TYPES.LOGISTICS] < config.logistics.min || 
      breakdown[MO_ELEMENT_TYPES.LOGISTICS] > config.logistics.max) {
    issues.push({
      type: MO_ELEMENT_TYPES.LOGISTICS,
      current: breakdown[MO_ELEMENT_TYPES.LOGISTICS],
      expected: `${config.logistics.min}-${config.logistics.max}`
    });
  }
  
  const valid = total === BAF_CONFIGURATION.totalPersonnel && issues.length === 0;
  
  return {
    valid,
    total,
    expected: BAF_CONFIGURATION.totalPersonnel,
    breakdown,
    issues
  };
}

/**
 * Calculate distance between two points in meters
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @returns {number} - Distance in meters
 */
export function calculateDistance(point1, point2) {
  const R = 6371000; // Earth radius in meters
  const lat1Rad = point1.lat * (Math.PI / 180);
  const lat2Rad = point2.lat * (Math.PI / 180);
  const deltaLat = (point2.lat - point1.lat) * (Math.PI / 180);
  const deltaLng = (point2.lng - point1.lng) * (Math.PI / 180);
  
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

/**
 * Suggest optimal terrain-based positioning
 * @param {string} terrainType - Type of terrain
 * @param {string} elementType - Type of MO element
 * @returns {Object} - Positioning recommendations
 */
export function getTerrainPositioningAdvice(terrainType, elementType) {
  const advice = {
    urban: {
      [MO_ELEMENT_TYPES.FRONT_LINE]: {
        fr: 'Position sur terrain plat, près des bâtiments pour couverture',
        ar: 'الموقع على أرض مستوية، بالقرب من المباني للتغطية'
      },
      [MO_ELEMENT_TYPES.COMMAND]: {
        fr: 'Position élevée (étage supérieur) pour vue d\'ensemble',
        ar: 'موقع مرتفع (طابق علوي) لرؤية شاملة'
      }
    },
    mountain: {
      [MO_ELEMENT_TYPES.FRONT_LINE]: {
        fr: 'Utiliser les pentes pour avantage défensif',
        ar: 'استخدام المنحدرات للحصول على ميزة دفاعية'
      },
      [MO_ELEMENT_TYPES.COMMAND]: {
        fr: 'Position en hauteur pour surveillance',
        ar: 'موقع مرتفع للمراقبة'
      }
    },
    default: {
      [MO_ELEMENT_TYPES.FRONT_LINE]: {
        fr: 'Ligne défensive sur terrain stable',
        ar: 'خط دفاعي على أرض مستقرة'
      }
    }
  };
  
  const terrainAdvice = advice[terrainType] || advice.default;
  return terrainAdvice[elementType] || terrainAdvice[MO_ELEMENT_TYPES.FRONT_LINE];
}

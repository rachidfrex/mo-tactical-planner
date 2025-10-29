import React from 'react';
import { TERRAIN_TYPES } from '../data/terrainTypes';
import { translations } from '../data/translations';

const TerrainControl = ({ language, selectedTerrain, onSelectTerrain }) => {
  const t = (key) => translations[language][key];

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400 mb-3">
        {t('selectTerrain')}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {TERRAIN_TYPES.map(terrain => (
          <button
            key={terrain.id}
            onClick={() => onSelectTerrain(selectedTerrain?.id === terrain.id ? null : terrain)}
            className={`glass-panel p-3 text-left transition-all ${
              selectedTerrain?.id === terrain.id 
                ? 'ring-2 ring-military-orange scale-105' 
                : 'hover:scale-105'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{terrain.icon}</span>
              <h4 className="text-white text-sm font-semibold">
                {terrain.name[language]}
              </h4>
            </div>
            <p className="text-xs text-gray-400">
              {terrain.description[language]}
            </p>
          </button>
        ))}
      </div>
      {selectedTerrain && (
        <p className="text-sm text-military-orange mt-3 animate-pulse">
          {t('clickToPlace')}
        </p>
      )}
    </div>
  );
};

export default TerrainControl;

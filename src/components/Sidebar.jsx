import React from 'react';
import { Trash2, Users, Truck } from 'lucide-react';
import { GENDARMERIE_UNIT } from '../data/units';
import UnitCard from './UnitCard';
import TerrainControl from './TerrainControl';
import { translations } from '../data/translations';

const Sidebar = ({ language, selectedTerrain, onSelectTerrain, placedUnits, onUpdateUnit, onDeleteUnit }) => {
  const t = (key) => translations[language][key];

  return (
    <div 
      className="w-96 bg-military-dark border-r border-orange-500/30 overflow-y-auto"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="p-6 space-y-6">
        {/* Units Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-military-orange" />
            {t('units')}
          </h2>
          <UnitCard language={language} />
        </section>

        {/* Terrain Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('terrain')}
          </h2>
          <TerrainControl 
            language={language}
            selectedTerrain={selectedTerrain}
            onSelectTerrain={onSelectTerrain}
          />
        </section>

        {/* Placed Units Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('placedUnits')}
          </h2>
          {placedUnits.length === 0 ? (
            <p className="text-gray-400 text-sm">{t('noUnits')}</p>
          ) : (
            <div className="space-y-3">
              {placedUnits.map((unit, index) => (
                <div key={unit.id} className="glass-panel p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{GENDARMERIE_UNIT.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold">
                          {GENDARMERIE_UNIT.name[language]} #{index + 1}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {unit.lat.toFixed(4)}, {unit.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteUnit(unit.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Personnel Slider */}
                  <div className="mb-3">
                    <label className="text-sm text-gray-300 mb-1 block flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {GENDARMERIE_UNIT.stats.personnel.label[language]}: {unit.personnel}
                    </label>
                    <input
                      type="range"
                      min={GENDARMERIE_UNIT.stats.personnel.min}
                      max={GENDARMERIE_UNIT.stats.personnel.max}
                      value={unit.personnel}
                      onChange={(e) => onUpdateUnit(unit.id, { personnel: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  {/* Vehicles Slider */}
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {GENDARMERIE_UNIT.stats.vehicles.label[language]}: {unit.vehicles}
                    </label>
                    <input
                      type="range"
                      min={GENDARMERIE_UNIT.stats.vehicles.min}
                      max={GENDARMERIE_UNIT.stats.vehicles.max}
                      value={unit.vehicles}
                      onChange={(e) => onUpdateUnit(unit.id, { vehicles: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { useDrag } from 'react-dnd';
import { GENDARMERIE_UNIT } from '../data/units';

const UnitCard = ({ language }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'unit',
    item: { unitId: GENDARMERIE_UNIT.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className="glass-panel p-4 cursor-move hover:scale-105 transition-transform"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="text-4xl p-3 rounded-lg"
          style={{ backgroundColor: GENDARMERIE_UNIT.backgroundColor }}
        >
          {GENDARMERIE_UNIT.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            {GENDARMERIE_UNIT.name[language]}
          </h3>
          <p className="text-sm text-gray-300">
            {language === 'fr' ? 'Glisser sur la carte' : 'اسحب على الخريطة'}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        <div>
          <span className="font-semibold">
            {GENDARMERIE_UNIT.stats.personnel.label[language]}:
          </span> {GENDARMERIE_UNIT.stats.personnel.default}
        </div>
        <div>
          <span className="font-semibold">
            {GENDARMERIE_UNIT.stats.vehicles.label[language]}:
          </span> {GENDARMERIE_UNIT.stats.vehicles.default}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-orange-500/30">
        <p className="text-xs text-gray-400">
          {GENDARMERIE_UNIT.description[language]}
        </p>
      </div>
    </div>
  );
};

export default UnitCard;

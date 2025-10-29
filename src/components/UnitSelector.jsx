import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { MO_ELEMENTS, MO_ELEMENT_TYPES } from '../data/moElements';

const UnitSelector = ({ language, onSelectElement, selectedElement }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showInfo, setShowInfo] = useState(null);

  const t = {
    fr: {
      moElements: 'Éléments MO/SO',
      selectElement: 'Sélectionner un élément',
      clickToPlace: 'Cliquez sur la carte pour placer',
      personnel: 'Personnel',
      role: 'Rôle',
      position: 'Position',
      tactics: 'Tactiques'
    },
    ar: {
      moElements: 'عناصر MO/SO',
      selectElement: 'اختر عنصراً',
      clickToPlace: 'انقر على الخريطة للوضع',
      personnel: 'الأفراد',
      role: 'الدور',
      position: 'الموقع',
      tactics: 'التكتيكات'
    }
  };

  const translations = t[language];

  return (
    <section className="mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-military-orange" />
          {translations.moElements}
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400 mb-3">
            {translations.selectElement}
          </p>
          
          {Object.values(MO_ELEMENTS).map((element) => (
            <div key={element.id} className="relative">
              <div
                className={`w-full glass-panel p-3 transition-all cursor-pointer ${
                  selectedElement === element.type
                    ? 'ring-2 ring-military-orange bg-military-orange/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <div 
                  className="flex items-center justify-between"
                  onClick={() => onSelectElement(element.type)}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-2xl p-2 rounded-lg"
                      style={{ backgroundColor: element.backgroundColor }}
                    >
                      {element.icon}
                    </span>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {element.name[language]}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {translations.personnel}: {element.personnel.min}-{element.personnel.max}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInfo(showInfo === element.id ? null : element.id);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {showInfo === element.id && (
                <div className="glass-panel p-3 mt-2 text-xs space-y-2">
                  <div>
                    <span className="text-military-orange font-semibold">
                      {translations.role}:
                    </span>
                    <p className="text-gray-300 mt-1">{element.role[language]}</p>
                  </div>
                  <div>
                    <span className="text-military-orange font-semibold">
                      {translations.position}:
                    </span>
                    <p className="text-gray-300 mt-1">{element.position[language]}</p>
                  </div>
                  <div>
                    <span className="text-military-orange font-semibold">
                      {translations.tactics}:
                    </span>
                    <p className="text-gray-300 mt-1">{element.tactics[language]}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {selectedElement && (
            <div className="glass-panel p-3 bg-military-orange/10 border border-military-orange/30">
              <p className="text-sm text-white text-center">
                ✓ {translations.clickToPlace}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UnitSelector;

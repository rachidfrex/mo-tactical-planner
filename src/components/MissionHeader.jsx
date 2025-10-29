import React from 'react';
import { MapPin } from 'lucide-react';
import { translations } from '../data/translations';

const MissionHeader = ({ title, onTitleChange, language }) => {
  const t = (key) => translations[language][key];

  return (
    <header className="bg-military-surface border-b border-orange-500/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🇲🇦</div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-military-orange" />
              {t('appTitle')}
            </h1>
            <p className="text-sm text-gray-400">
              {language === 'fr' ? 'Gendarmerie Royale' : 'الدرك الملكي'}
            </p>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={t('newMission')}
            className="glass-panel px-4 py-2 text-white bg-transparent border-none outline-none focus:ring-2 focus:ring-military-orange rounded-lg"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>
    </header>
  );
};

export default MissionHeader;

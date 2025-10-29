import React from 'react';
import { Globe } from 'lucide-react';

const LanguageToggle = ({ language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="glass-panel p-3 hover:scale-105 transition-transform"
      title="Toggle Language / تبديل اللغة"
    >
      <div className="flex items-center gap-2 text-white">
        <Globe className="w-5 h-5 text-military-orange" />
        <span className="font-bold">
          {language === 'fr' ? 'FR' : 'AR'}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;

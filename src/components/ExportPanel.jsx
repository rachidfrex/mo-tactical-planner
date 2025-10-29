import React from 'react';
import { Download, FileJson, FileText } from 'lucide-react';
import { exportMissionJSON } from '../utils/exportJSON';
import { exportMissionPDF } from '../utils/exportPDF';
import { translations } from '../data/translations';

const ExportPanel = ({ language, missionTitle, placedUnits, terrainZones }) => {
  const t = (key) => translations[language][key];

  const handleExportJSON = () => {
    exportMissionJSON(missionTitle, placedUnits, terrainZones, language);
  };

  const handleExportPDF = async () => {
    await exportMissionPDF(missionTitle, placedUnits, terrainZones, language);
  };

  return (
    <div className="glass-panel p-4">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <Download className="w-5 h-5 text-military-orange" />
        {t('export')}
      </h3>
      <div className="space-y-2">
        <button
          onClick={handleExportJSON}
          className="glass-button w-full px-4 py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
          disabled={placedUnits.length === 0}
        >
          <FileJson className="w-4 h-4" />
          {t('exportJSON')}
        </button>
        <button
          onClick={handleExportPDF}
          className="glass-button w-full px-4 py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
          disabled={placedUnits.length === 0}
        >
          <FileText className="w-4 h-4" />
          {t('exportPDF')}
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;

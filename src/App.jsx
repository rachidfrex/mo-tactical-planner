import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import MissionHeader from './components/MissionHeader';
import LanguageToggle from './components/LanguageToggle';
import ExportPanel from './components/ExportPanel';
import { translations } from './data/translations';
import { MO_ELEMENTS } from './data/moElements';

function App() {
  const [language, setLanguage] = useState('fr');
  const [missionTitle, setMissionTitle] = useState('Nouvelle Mission');
  const [placedUnits, setPlacedUnits] = useState([]);
  const [terrainZones, setTerrainZones] = useState([]);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [placedElements, setPlacedElements] = useState([]);

  const handleDropUnit = (unitId, lat, lng) => {
    const newUnit = {
      id: Date.now(),
      unitId,
      lat,
      lng,
      personnel: 100,
      vehicles: 10
    };
    setPlacedUnits([...placedUnits, newUnit]);
  };

  const handleDeleteUnit = (id) => {
    setPlacedUnits(placedUnits.filter(u => u.id !== id));
  };

  const handleUpdateUnit = (id, updates) => {
    setPlacedUnits(placedUnits.map(u => 
      u.id === id ? { ...u, ...updates } : u
    ));
  };

  const handleSelectElement = (elementType) => {
    setSelectedElement(selectedElement === elementType ? null : elementType);
    setSelectedTerrain(null); // Clear terrain selection when selecting element
  };

  const handleAddElement = (elementType, lat, lng) => {
    const elementDef = MO_ELEMENTS[elementType];
    if (!elementDef) return;

    const newElement = {
      id: Date.now(),
      elementType,
      lat,
      lng,
      personnel: elementDef.personnel.default
    };
    setPlacedElements([...placedElements, newElement]);
    setSelectedElement(null); // Clear selection after placing
  };

  const handleDeleteElement = (id) => {
    setPlacedElements(placedElements.filter(e => e.id !== id));
  };

  const handleUpdateElement = (id, updates) => {
    setPlacedElements(placedElements.map(e => 
      e.id === id ? { ...e, ...updates } : e
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
        {/* Header */}
        <MissionHeader 
          title={missionTitle}
          onTitleChange={setMissionTitle}
          language={language}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex relative">
          {/* Sidebar */}
          <Sidebar 
            language={language}
            selectedTerrain={selectedTerrain}
            onSelectTerrain={(terrain) => {
              setSelectedTerrain(terrain);
              setSelectedElement(null); // Clear element selection when selecting terrain
            }}
            placedUnits={placedUnits}
            onUpdateUnit={handleUpdateUnit}
            onDeleteUnit={handleDeleteUnit}
            selectedElement={selectedElement}
            onSelectElement={handleSelectElement}
            placedElements={placedElements}
            onUpdateElement={handleUpdateElement}
            onDeleteElement={handleDeleteElement}
          />
          
          {/* Map */}
          <div className="flex-1 relative">
            <Map 
              language={language}
              placedUnits={placedUnits}
              terrainZones={terrainZones}
              selectedTerrain={selectedTerrain}
              onDropUnit={handleDropUnit}
              onAddTerrainZone={(zone) => setTerrainZones([...terrainZones, zone])}
              selectedElement={selectedElement}
              placedElements={placedElements}
              onAddElement={handleAddElement}
            />
          </div>
          
          {/* Controls Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
            <LanguageToggle 
              language={language}
              onToggle={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
            />
            <ExportPanel 
              language={language}
              missionTitle={missionTitle}
              placedUnits={placedUnits}
              terrainZones={terrainZones}
              placedElements={placedElements}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

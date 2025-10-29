export function exportMissionJSON(missionTitle, placedUnits, terrainZones, placedElements, language) {
  const data = {
    mission: {
      title: missionTitle,
      date: new Date().toISOString(),
      author: 'rachidfrex',
      language: language
    },
    units: placedUnits.map(u => ({
      type: u.unitId,
      position: [u.lng, u.lat],
      personnel: u.personnel,
      vehicles: u.vehicles
    })),
    moElements: placedElements ? placedElements.map(e => ({
      type: e.elementType,
      position: [e.lng, e.lat],
      personnel: e.personnel
    })) : [],
    terrain: terrainZones.map(t => ({
      type: t.type,
      polygon: t.coordinates
    }))
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mission-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

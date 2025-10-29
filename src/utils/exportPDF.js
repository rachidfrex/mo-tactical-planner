import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GENDARMERIE_UNIT } from '../data/units';

export async function exportMissionPDF(missionTitle, placedUnits, terrainZones, language) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Header
  pdf.setFontSize(20);
  pdf.setTextColor(74, 93, 35);
  const title = language === 'fr' 
    ? 'MISSION TACTIQUE - GENDARMERIE ROYALE' 
    : 'مهمة تكتيكية - الدرك الملكي';
  pdf.text(title, 105, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  const dateLabel = language === 'fr' ? 'Date:' : 'التاريخ:';
  const missionLabel = language === 'fr' ? 'Mission:' : 'المهمة:';
  pdf.text(`${dateLabel} ${new Date().toLocaleDateString()}`, 20, 35);
  pdf.text(`${missionLabel} ${missionTitle}`, 20, 42);
  
  // Try to capture map screenshot
  try {
    const mapElement = document.querySelector('.maplibregl-canvas');
    if (mapElement) {
      const canvas = await html2canvas(mapElement, {
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 20, 50, 170, 100);
    }
  } catch (error) {
    console.warn('Could not capture map screenshot:', error);
  }
  
  // Unit table
  pdf.setFontSize(14);
  const unitsTitle = language === 'fr' ? 'UNITÉS DÉPLOYÉES:' : 'الوحدات المنشورة:';
  pdf.text(unitsTitle, 20, 160);
  
  let y = 170;
  placedUnits.forEach((unit, i) => {
    pdf.setFontSize(10);
    const unitName = GENDARMERIE_UNIT.name[language];
    pdf.text(`${i + 1}. ${unitName}`, 25, y);
    
    const personnelLabel = language === 'fr' ? 'Personnel:' : 'الأفراد:';
    const vehiclesLabel = language === 'fr' ? 'Véhicules:' : 'المركبات:';
    const positionLabel = language === 'fr' ? 'Position:' : 'الموقع:';
    
    pdf.text(`${personnelLabel} ${unit.personnel}`, 25, y + 5);
    pdf.text(`${vehiclesLabel} ${unit.vehicles}`, 25, y + 10);
    pdf.text(`${positionLabel} [${unit.lat.toFixed(4)}, ${unit.lng.toFixed(4)}]`, 25, y + 15);
    y += 25;
    
    // Add new page if needed
    if (y > 270 && i < placedUnits.length - 1) {
      pdf.addPage();
      y = 20;
    }
  });
  
  // Terrain zones
  if (terrainZones.length > 0) {
    if (y > 230) {
      pdf.addPage();
      y = 20;
    } else {
      y += 10;
    }
    
    pdf.setFontSize(14);
    const terrainTitle = language === 'fr' ? 'ZONES DE TERRAIN:' : 'مناطق التضاريس:';
    pdf.text(terrainTitle, 20, y);
    y += 10;
    
    terrainZones.forEach((zone, i) => {
      pdf.setFontSize(10);
      pdf.text(`${i + 1}. ${zone.name[language]}`, 25, y);
      y += 7;
    });
  }
  
  pdf.save(`mission-${Date.now()}.pdf`);
}

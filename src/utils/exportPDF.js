import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GENDARMERIE_UNIT } from '../data/units';
import { MO_ELEMENTS } from '../data/moElements';

export async function exportMissionPDF(missionTitle, placedUnits, terrainZones, placedElements, language) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Sanitize mission title to prevent injection and ensure it fits
  const sanitizedTitle = String(missionTitle || 'Untitled Mission')
    .replace(/[^\w\s\u0600-\u06FF-]/g, '') // Allow alphanumeric, spaces, and Arabic characters
    .substring(0, 100); // Limit length
  
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
  pdf.text(`${missionLabel} ${sanitizedTitle}`, 20, 42);
  
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

  // MO/SO Elements table
  if (placedElements && placedElements.length > 0) {
    if (y > 240) {
      pdf.addPage();
      y = 20;
    } else {
      y += 10;
    }
    
    pdf.setFontSize(14);
    const elementsTitle = language === 'fr' ? 'ÉLÉMENTS MO/SO DÉPLOYÉS:' : 'عناصر MO/SO المنشورة:';
    pdf.text(elementsTitle, 20, y);
    y += 10;
    
    placedElements.forEach((element, i) => {
      const elementDef = MO_ELEMENTS[element.elementType];
      if (!elementDef) return;

      pdf.setFontSize(10);
      pdf.text(`${i + 1}. ${elementDef.name[language]}`, 25, y);
      
      const personnelLabel = language === 'fr' ? 'Personnel:' : 'الأفراد:';
      const positionLabel = language === 'fr' ? 'Position:' : 'الموقع:';
      const roleLabel = language === 'fr' ? 'Rôle:' : 'الدور:';
      
      pdf.text(`${personnelLabel} ${element.personnel}`, 25, y + 5);
      pdf.text(`${positionLabel} [${element.lat.toFixed(4)}, ${element.lng.toFixed(4)}]`, 25, y + 10);
      
      // Add role with text wrapping (limited to 80 chars per line for simplicity)
      const role = elementDef.role[language];
      const maxChars = 80;
      if (role.length > maxChars) {
        const line1 = role.substring(0, maxChars);
        const line2 = role.substring(maxChars, maxChars * 2);
        pdf.text(`${roleLabel} ${line1}`, 25, y + 15);
        if (line2) pdf.text(line2, 25, y + 20);
        y += 30;
      } else {
        pdf.text(`${roleLabel} ${role}`, 25, y + 15);
        y += 25;
      }
      
      // Add new page if needed
      if (y > 270 && i < placedElements.length - 1) {
        pdf.addPage();
        y = 20;
      }
    });
  }
  
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

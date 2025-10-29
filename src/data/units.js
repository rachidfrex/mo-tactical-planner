export const GENDARMERIE_UNIT = {
  id: 'gendarmerie-royale',
  name: {
    fr: 'Gendarmerie Royale',
    ar: 'الدرك الملكي'
  },
  icon: '🚔',
  color: '#2C5F2D',
  backgroundColor: 'rgba(44, 95, 45, 0.2)',
  category: 'law-enforcement',
  
  stats: {
    personnel: {
      min: 50,
      max: 200,
      default: 100,
      label: { fr: 'Personnel', ar: 'الأفراد' }
    },
    vehicles: {
      min: 5,
      max: 20,
      default: 10,
      label: { fr: 'Véhicules', ar: 'المركبات' }
    }
  },
  
  equipment: [
    { fr: 'Véhicules de patrouille', ar: 'مركبات الدورية' },
    { fr: 'Systèmes de communication', ar: 'أنظمة الاتصال' },
    { fr: 'Équipement anti-émeute', ar: 'معدات مكافحة الشغب' },
    { fr: 'Matériel de contrôle routier', ar: 'معدات مراقبة الطرق' }
  ],
  
  specialties: [
    { fr: 'Application de la loi', ar: 'تطبيق القانون' },
    { fr: 'Contrôle du trafic', ar: 'مراقبة المرور' },
    { fr: 'Patrouille frontalière', ar: 'دورية الحدود' },
    { fr: 'Sécurité publique', ar: 'الأمن العام' }
  ],
  
  description: {
    fr: 'Force de gendarmerie marocaine responsable de la sécurité publique et de l\'application de la loi dans les zones rurales et périurbaines.',
    ar: 'قوة الدرك المغربية المسؤولة عن الأمن العام وتطبيق القانون في المناطق الريفية وشبه الحضرية.'
  }
};

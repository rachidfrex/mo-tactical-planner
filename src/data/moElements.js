// MO (Maintenance de l'Ordre) and SO (Service d'Ordre) Element Definitions
// Based on Gendarmerie tactical doctrine and training manual (Livret MO Élèves)

export const MO_ELEMENT_TYPES = {
  COMMAND: 'command',
  FRONT_LINE: 'front_line',
  RESERVE: 'reserve',
  LOGISTICS: 'logistics',
  SPECIALIZED: 'specialized'
};

export const MO_ELEMENTS = {
  [MO_ELEMENT_TYPES.COMMAND]: {
    id: 'command',
    type: MO_ELEMENT_TYPES.COMMAND,
    name: {
      fr: 'Commandement et Supervision',
      ar: 'القيادة والإشراف'
    },
    icon: '🏆',
    color: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    personnel: {
      min: 5,
      max: 10,
      default: 7
    },
    role: {
      fr: 'Coordination générale, surveillance des foules via radio/caméras, émission d\'ordres',
      ar: 'التنسيق العام، مراقبة الحشود عبر الراديو/الكاميرات، إصدار الأوامر'
    },
    position: {
      fr: 'Arrière de la formation (100-200m en MO pour sécurité; central en SO)',
      ar: 'خلف التشكيل (100-200 متر في MO للأمان؛ مركزي في SO)'
    },
    tactics: {
      fr: 'Coordination, surveillance, gestion des communications',
      ar: 'التنسيق، المراقبة، إدارة الاتصالات'
    },
    description: {
      fr: 'Élément de commandement responsable de la coordination et de la supervision de l\'opération',
      ar: 'عنصر القيادة المسؤول عن التنسيق والإشراف على العملية'
    }
  },
  
  [MO_ELEMENT_TYPES.FRONT_LINE]: {
    id: 'front_line',
    type: MO_ELEMENT_TYPES.FRONT_LINE,
    name: {
      fr: 'Ligne de Front',
      ar: 'الخط الأمامي'
    },
    icon: '🛡️',
    color: '#2C5F2D',
    backgroundColor: 'rgba(44, 95, 45, 0.2)',
    personnel: {
      min: 30,
      max: 40,
      default: 35
    },
    role: {
      fr: 'Défense directe, prévention des avancées avec boucliers et prises non-létales',
      ar: 'الدفاع المباشر، منع التقدم بالدروع والقبضات غير المميتة'
    },
    position: {
      fr: 'Première ligne, étroitement serrés formant une barrière (adapté au terrain)',
      ar: 'الخط الأول، متراصين بإحكام يشكلون حاجزاً (متكيف مع التضاريس)'
    },
    tactics: {
      fr: 'Barrage fixe, formation défensive en bouclier',
      ar: 'حاجز ثابت، تشكيل دفاعي بالدرع'
    },
    description: {
      fr: 'Peloton de marche formant la ligne défensive principale avec boucliers',
      ar: 'فصيلة المسيرة التي تشكل الخط الدفاعي الرئيسي بالدروع'
    }
  },
  
  [MO_ELEMENT_TYPES.RESERVE]: {
    id: 'reserve',
    type: MO_ELEMENT_TYPES.RESERVE,
    name: {
      fr: 'Réserves',
      ar: 'الاحتياط'
    },
    icon: '⚔️',
    color: '#8B4513',
    backgroundColor: 'rgba(139, 69, 19, 0.2)',
    personnel: {
      min: 40,
      max: 50,
      default: 45
    },
    role: {
      fr: 'Renfort rapide, gestion des percées avec gaz lacrymogène et projectiles en caoutchouc',
      ar: 'التعزيز السريع، التعامل مع الاختراقات بالغاز المسيل للدموع والمقذوفات المطاطية'
    },
    position: {
      fr: '50-100m derrière la ligne de front (mobile en SO)',
      ar: '50-100 متر خلف الخط الأمامي (متحرك في SO)'
    },
    tactics: {
      fr: 'Intervention rapide, vagues de refoulement, utilisation d\'armes non-létales',
      ar: 'التدخل السريع، موجات الدفع، استخدام الأسلحة غير المميتة'
    },
    description: {
      fr: 'Peloton d\'intervention pour renforcement et actions dynamiques',
      ar: 'فصيلة التدخل للتعزيز والإجراءات الديناميكية'
    }
  },
  
  [MO_ELEMENT_TYPES.LOGISTICS]: {
    id: 'logistics',
    type: MO_ELEMENT_TYPES.LOGISTICS,
    name: {
      fr: 'Soutien Logistique',
      ar: 'الدعم اللوجستي'
    },
    icon: '🚑',
    color: '#DC143C',
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    personnel: {
      min: 10,
      max: 15,
      default: 12
    },
    role: {
      fr: 'Aide médicale, approvisionnement en équipement, gestion des véhicules',
      ar: 'المساعدة الطبية، توفير المعدات، إدارة المركبات'
    },
    position: {
      fr: 'Arrière le plus éloigné (200m+, près des routes d\'accès)',
      ar: 'الخلف الأبعد (200 متر+، بالقرب من طرق الوصول)'
    },
    tactics: {
      fr: 'Support médical, ravitaillement, évacuation',
      ar: 'الدعم الطبي، التموين، الإخلاء'
    },
    description: {
      fr: 'Peloton hors rang pour support logistique et médical',
      ar: 'فصيلة خارج الصف للدعم اللوجستي والطبي'
    }
  },
  
  [MO_ELEMENT_TYPES.SPECIALIZED]: {
    id: 'specialized',
    type: MO_ELEMENT_TYPES.SPECIALIZED,
    name: {
      fr: 'Unités Spécialisées',
      ar: 'الوحدات المتخصصة'
    },
    icon: '🚁',
    color: '#4169E1',
    backgroundColor: 'rgba(65, 105, 225, 0.2)',
    personnel: {
      min: 10,
      max: 20,
      default: 15
    },
    role: {
      fr: 'Interventions à haut risque, support aérien (surveillance par hélicoptère)',
      ar: 'التدخلات عالية المخاطر، الدعم الجوي (المراقبة بطائرة هليكوبتر)'
    },
    position: {
      fr: 'Aérien ou flanc (adapté à la mission, au-dessus des foules en MO)',
      ar: 'جوي أو جانبي (متكيف مع المهمة، فوق الحشود في MO)'
    },
    tactics: {
      fr: 'Intervention d\'élite, surveillance aérienne, opérations spéciales',
      ar: 'تدخل النخبة، المراقبة الجوية، العمليات الخاصة'
    },
    description: {
      fr: 'GSI et unités aériennes pour opérations spéciales',
      ar: 'GSI والوحدات الجوية للعمليات الخاصة'
    }
  }
};

// BAF (Barrage d'Arrêté Fixe) Configuration
export const BAF_CONFIGURATION = {
  totalPersonnel: 100,
  composition: {
    frontLine: { min: 30, max: 40, recommended: 35 },
    reserve: { min: 40, max: 50, recommended: 45 },
    command: { min: 5, max: 10, recommended: 7 },
    logistics: { min: 10, max: 15, recommended: 13 }
  },
  spacing: {
    frontLineDistance: 0, // At the forefront
    reserveDistance: 75, // 50-100m behind front line (meters)
    commandDistance: 150, // 100-200m rear (meters)
    logisticsDistance: 250 // 200m+ (meters)
  },
  description: {
    fr: 'Formation défensive fixe de 100 éléments pour bloquer l\'avancée des foules',
    ar: 'تشكيل دفاعي ثابت من 100 عنصر لمنع تقدم الحشود'
  }
};

export const FORMATION_TYPES = {
  BAF: 'baf', // Barrage d'Arrêté Fixe
  ROLLBACK: 'rollback', // Vagues de refoulement
  ASSAULT: 'assault', // Charges
  ENCIRCLE: 'encircle' // Encerclement
};

export const FORMATIONS = {
  [FORMATION_TYPES.BAF]: {
    id: 'baf',
    name: {
      fr: 'Barrage d\'Arrêté Fixe (BAF)',
      ar: 'حاجز التوقف الثابت (BAF)'
    },
    description: {
      fr: 'Formation défensive statique de 100 éléments',
      ar: 'تشكيل دفاعي ثابت من 100 عنصر'
    },
    configuration: BAF_CONFIGURATION
  },
  [FORMATION_TYPES.ROLLBACK]: {
    id: 'rollback',
    name: {
      fr: 'Vagues de Refoulement',
      ar: 'موجات الدفع'
    },
    description: {
      fr: 'Avancement en vagues pour repousser les foules',
      ar: 'التقدم على شكل موجات لدفع الحشود'
    }
  },
  [FORMATION_TYPES.ASSAULT]: {
    id: 'assault',
    name: {
      fr: 'Charges',
      ar: 'الهجمات'
    },
    description: {
      fr: 'Interventions rapides pour disperser',
      ar: 'التدخلات السريعة للتفريق'
    }
  },
  [FORMATION_TYPES.ENCIRCLE]: {
    id: 'encircle',
    name: {
      fr: 'Encerclement',
      ar: 'التطويق'
    },
    description: {
      fr: 'Encerclement des menaces',
      ar: 'تطويق التهديدات'
    }
  }
};

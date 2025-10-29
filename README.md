# 🇲🇦 Morocco Tactical Planner - Royal Gendarmerie

Interactive tactical planning application for Morocco's Royal Gendarmerie with map-based unit deployment and terrain analysis.

![Morocco Tactical Planner](https://img.shields.io/badge/React-18.2.0-blue)
![MapLibre GL](https://img.shields.io/badge/MapLibre-3.6.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 🚀 Features

- 🗺️ **Interactive Morocco Map** - MapLibre GL with OpenStreetMap tiles
- 🚔 **Gendarmerie Royale Unit** - Drag & drop deployment system
- 🛡️ **MO/SO Tactical Elements** - Specialized element placement for Maintenance de l'Ordre (MO) and Service d'Ordre (SO) operations
  - 🏆 Command & Supervision elements
  - 🛡️ Front Line formations
  - ⚔️ Reserve units
  - 🚑 Logistical support
  - 🚁 Specialized units (GSI, aerial)
  - Detailed tactical information (role, position, tactics)
  - Personnel configuration and BAF (Barrage d'Arrêté Fixe) formation support
- 🌍 **6 Terrain Types** - Urban, Mountain, Desert, Forest, Coastal, Agricultural
- 🌐 **Bilingual Support** - French/Arabic with RTL text support
- 📊 **Export Capabilities** - JSON data export & PDF report generation (includes MO/SO elements)
- 🎨 **Military Design** - Glassmorphism UI with olive green + orange theme
- 📱 **Responsive** - Desktop and tablet compatible

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/rachidfrex/mo-tactical-planner.git
cd mo-tactical-planner

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🛠️ Tech Stack

- **React 18.2.0** - UI framework
- **Vite 5.0.0** - Build tool and dev server
- **MapLibre GL JS 3.6.0** - Interactive maps
- **Tailwind CSS 3.3.0** - Utility-first CSS
- **react-dnd 16.0.1** - Drag and drop functionality
- **jsPDF 2.5.1** - PDF generation
- **html2canvas 1.4.1** - Screenshot capture
- **lucide-react 0.294.0** - Icon library

## 📖 Usage

### 1. Add Units
- Drag the Gendarmerie Royale card from the sidebar to the map
- Units will be placed at the drop location with default stats

### 2. Deploy MO/SO Tactical Elements
- Select an element type from the "Éléments MO/SO" section (Command, Front Line, Reserves, Logistics, Specialized)
- Click the info button (ℹ️) to view detailed tactical information for each element type
- Click on the map to place the selected element
- Elements appear with custom icons (🏆 🛡️ ⚔️ 🚑 🚁) and custom colors
- Click on element markers to view detailed popups with role, position, and tactics information
- Drag elements to reposition them on the map

### 3. Manage Units & Elements
- Click on unit/element markers to view details in a popup
- Use sliders in the sidebar to adjust personnel counts
- Click the trash icon to remove a unit or element
- Track all deployed elements in the "Éléments Déployés" section

### 4. Add Terrain Zones
- Select a terrain type from the sidebar (Urban, Mountain, Desert, etc.)
- Click on the map to define polygon points
- Double-click to complete the zone (future feature)

### 5. Change Language
- Click the language toggle button (FR/AR) in the top-right
- All text and unit details will update to the selected language
- Arabic text displays right-to-left automatically

### 6. Export Mission
- **JSON Export**: Download complete mission data including units, MO/SO elements, and terrain
- **PDF Export**: Generate a formatted report with map screenshot, unit details, and element information

## 🎨 Design System

### Color Palette
- **Primary (Olive Green)**: `#4A5D23` - Military theme
- **Secondary (Orange)**: `#FF8C42` - Accent highlights
- **Background**: `#1a1a1a` - Dark theme
- **Surface**: `#2a2a2a` - Cards and panels

### Glass Effects
The application uses glassmorphism design with:
- Semi-transparent backgrounds
- Backdrop blur effects
- Orange glow borders
- Smooth transitions (0.3s)

## 🗂️ Project Structure

```
mo-tactical-planner/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Main application component
│   │   ├── Map.jsx              # MapLibre GL map with drag-drop & element placement
│   │   ├── Sidebar.jsx          # Left sidebar with controls
│   │   ├── UnitCard.jsx         # Draggable unit card
│   │   ├── UnitSelector.jsx     # MO/SO element selector (NEW)
│   │   ├── TerrainControl.jsx   # Terrain type selector
│   │   ├── ExportPanel.jsx      # Export functionality
│   │   ├── LanguageToggle.jsx   # Language switcher
│   │   └── MissionHeader.jsx    # Top header bar
│   ├── data/
│   │   ├── units.js             # Gendarmerie unit definition
│   │   ├── moElements.js        # MO/SO tactical elements (NEW)
│   │   ├── terrainTypes.js      # Terrain type configurations
│   │   └── translations.js      # French/Arabic translations
│   ├── utils/
│   │   ├── exportJSON.js        # JSON export logic (updated)
│   │   ├── exportPDF.js         # PDF generation logic (updated)
│   │   ├── mapHelpers.js        # Map configuration
│   │   └── positioningHelpers.js # Tactical positioning algorithms (NEW)
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and glass effects
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Configuration

### Map Settings
The map is centered on Morocco with the following configuration:
- **Center**: [-7.0926, 31.7917] (longitude, latitude)
- **Initial Zoom**: 6
- **Zoom Range**: 5-18
- **Tile Source**: OpenStreetMap

### Unit Configuration
The Gendarmerie Royale unit includes:
- **Personnel**: 50-200 (default: 100)
- **Vehicles**: 5-20 (default: 10)
- **Equipment**: Patrol vehicles, communication systems, riot gear, traffic control
- **Specialties**: Law enforcement, traffic control, border patrol, public security

### MO/SO Element Configuration
Based on Gendarmerie tactical doctrine (Livret MO Élèves):

**Command & Supervision (🏆)**
- Personnel: 5-10 (default: 7)
- Role: Overall coordination, crowd surveillance, order issuance
- Position: 100-200m rear (MO), central (SO)

**Front Line (🛡️)**
- Personnel: 30-40 (default: 35)
- Role: Direct defense with shields and non-lethal holds
- Position: Foremost, tightly packed barrier formation

**Reserves (⚔️)**
- Personnel: 40-50 (default: 45)
- Role: Rapid reinforcement, breach management
- Position: 50-100m behind front line

**Logistical Support (🚑)**
- Personnel: 10-15 (default: 12)
- Role: Medical aid, equipment supply, vehicle management
- Position: 200m+ rear, near access roads

**Specialized Units (🚁)**
- Personnel: 10-20 (default: 15)
- Role: High-risk interventions, aerial support
- Position: Overhead or flanking (mission-dependent)

**BAF (Barrage d'Arrêté Fixe) Formation**
- Total: 100 personnel
- Composition: 35 front line + 45 reserves + 7 command + 13 logistics
- Formation type: Static defensive barrier to block crowd advances

## 🚀 Deploy Online

### Quick Deploy to Vercel (Recommended) ⭐

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rachidfrex/mo-tactical-planner)

**One-Click Deployment:**
1. Click the button above
2. Sign in to Vercel with GitHub
3. Deploy (takes ~2 minutes)
4. Your app will be live at `https://your-project.vercel.app`

### Other Deployment Options

- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rachidfrex/mo-tactical-planner)
- **GitHub Pages**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for instructions
- **Railway**: Auto-deploys from GitHub

📖 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on all platforms.

### Build Locally

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT © 2025 rachidfrex

## 🙏 Acknowledgments

- OpenStreetMap contributors for map tiles
- MapLibre GL JS for the mapping library
- Morocco Royal Gendarmerie for inspiration

---

**Made with ❤️ for Morocco's Royal Gendarmerie** 🇲🇦
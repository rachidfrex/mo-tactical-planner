# 🇲🇦 Morocco Tactical Planner - Royal Gendarmerie

Interactive tactical planning application for Morocco's Royal Gendarmerie with map-based unit deployment and terrain analysis.

![Morocco Tactical Planner](https://img.shields.io/badge/React-18.2.0-blue)
![MapLibre GL](https://img.shields.io/badge/MapLibre-3.6.0-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 🚀 Features

- 🗺️ **Interactive Morocco Map** - MapLibre GL with OpenStreetMap tiles
- 🚔 **Gendarmerie Royale Unit** - Drag & drop deployment system
- 🌍 **6 Terrain Types** - Urban, Mountain, Desert, Forest, Coastal, Agricultural
- 🌐 **Bilingual Support** - French/Arabic with RTL text support
- 📊 **Export Capabilities** - JSON data export & PDF report generation
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

### 2. Manage Units
- Click on unit markers to view details in a popup
- Use sliders in the sidebar to adjust personnel and vehicles
- Click the trash icon to remove a unit

### 3. Add Terrain Zones
- Select a terrain type from the sidebar (Urban, Mountain, Desert, etc.)
- Click on the map to define polygon points
- Double-click to complete the zone (future feature)

### 4. Change Language
- Click the language toggle button (FR/AR) in the top-right
- All text and unit details will update to the selected language
- Arabic text displays right-to-left automatically

### 5. Export Mission
- **JSON Export**: Download complete mission data including units and terrain
- **PDF Export**: Generate a formatted report with map screenshot and unit details

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
│   │   ├── Map.jsx              # MapLibre GL map with drag-drop
│   │   ├── Sidebar.jsx          # Left sidebar with controls
│   │   ├── UnitCard.jsx         # Draggable unit card
│   │   ├── TerrainControl.jsx   # Terrain type selector
│   │   ├── ExportPanel.jsx      # Export functionality
│   │   ├── LanguageToggle.jsx   # Language switcher
│   │   └── MissionHeader.jsx    # Top header bar
│   ├── data/
│   │   ├── units.js             # Gendarmerie unit definition
│   │   ├── terrainTypes.js      # Terrain type configurations
│   │   └── translations.js      # French/Arabic translations
│   ├── utils/
│   │   ├── exportJSON.js        # JSON export logic
│   │   ├── exportPDF.js         # PDF generation logic
│   │   └── mapHelpers.js        # Map configuration
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
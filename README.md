# 🌤️ Istanbul Weather App

A modern and responsive weather application displaying Istanbul's weather conditions with an elegant design and user-friendly interface.

🔗 **Live Demo**: [https://weather-wbsite-nor.netlify.app/](https://weather-wbsite-nor.netlify.app/)

![Weather App Screenshot](https://via.placeholder.com/800x400/87CEEB/ffffff?text=Istanbul+Weather+App)

## ✨ Features

- 🌡️ **Real-time temperature display** for Istanbul
- 📊 **Min/Max temperature** forecasts for the day
- ☁️ **Weather description** (clear, cloudy, rainy, etc.)
- 🌍 **Bilingual support** (Arabic & English) with smooth switching
- ⏰ **Live date and time** with automatic updates every second
- 📱 **Responsive design** works on all devices (mobile, tablet, desktop)
- 🎨 **Modern UI** with transparent background and attractive colors
- 🔄 **Auto-refresh** weather data from OpenWeatherMap API

## 🛠️ Technologies Used

### Frontend Framework
- **React.js** - JavaScript library for building user interfaces
- **Create React App** - Development environment setup

### UI & Styling
- **Material-UI (MUI)** - React component library
- **CSS3** - Custom styling and visual effects

### State Management & Localization
- **React Hooks** (useState, useEffect) - State management
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

### Date & Time
- **Moment.js** - Parse, validate, manipulate, and display dates
- Support for both Arabic and English calendars

### API & Data Fetching
- **Axios** - HTTP client
- **OpenWeatherMap API** - Live weather data

### Deployment & Hosting
- **Netlify** - Deployment and hosting
- **Git/GitHub** - Version control

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/nordam312/weather-app-reacr.git
cd weatherapp
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Create `.env` file** in the root directory and add your API key
```env
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

4. **Run the application locally**
```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment on Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder to Netlify
   - Or connect with GitHub for automatic deployment

3. **Add environment variables in Netlify**
   - Go to Site settings → Environment variables
   - Add `REACT_APP_OPENWEATHER_API_KEY`

## 📁 Project Structure

```
weatherapp/
├── public/
│   ├── index.html          # Main HTML file
│   ├── favicon.svg         # Site icon
│   ├── manifest.json       # PWA settings
│   └── locales/           # Translation files
│       ├── ar/
│       │   └── translation.json
│       └── en/
│           └── translation.json
├── src/
│   ├── App.js             # Main component
│   ├── App.css            # Styles
│   ├── i18n.js            # i18n configuration
│   └── index.js           # Entry point
├── .env                   # Environment variables (not in Git)
├── .gitignore
├── netlify.toml          # Netlify configuration
└── package.json
```

## 🔐 Security

- API key protected in environment variables
- `.env` file added to `.gitignore`
- All requests use HTTPS

## 📸 Screenshots

### Arabic Interface
![Arabic Interface](https://via.placeholder.com/600x400/4A90E2/ffffff?text=Arabic+Interface)

### English Interface
![English Interface](https://via.placeholder.com/600x400/87CEEB/ffffff?text=English+Interface)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Developed by **[Muhammad Nordam](https://github.com/nordam312)**

---

<div align="center">
  Made with ❤️ in Istanbul
</div>
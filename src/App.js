import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Meterial UI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// react
import { useState, useEffect } from "react";

// i18n
import { useTranslation } from "react-i18next";

// axios
import axios from "axios";

// time
import moment from "moment";
import "moment/min/locales"; // import Arabic locale

// METERIAL UI ICONS
import CloudIcon from "@mui/icons-material/Cloud";

moment.locale("ar");
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
    h1: {
      fontWeight: 700, // Bold
    },
    h2: {
      fontWeight: 600, // SemiBold
    },
    h3: {
      fontWeight: 500, // Medium
    },
    h4: {
      fontWeight: 400, // Regular
    },
    body1: {
      fontWeight: 300, // Light
    },
    body2: {
      fontWeight: 200, // ExtraLight
    },
  },
});

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");
  const [location, setLocation] = useState({ lat: 41.01384, lon: 28.94966 }); // Default Istanbul
  const [locationName, setLocationName] = useState("إسطنبول");
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  const direction = locale === "ar" ? "rtl" : "ltr";
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // دالة لجلب بيانات الطقس
  const fetchWeatherData = (lat, lon) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${locale}`;

    const source = axios.CancelToken.source();
    axios
      .get(API_URL, {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data);
        setLocationName(response.data.name);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      });

    return source;
  };

  // دالة للحصول على موقع المستخدم
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          setLocationError(false);
        },
        (error) => {
          console.log("Location error:", error);
          setLocationError(true);
          // استخدم الموقع الافتراضي (اسطنبول)
        }
      );
    } else {
      console.log("Geolocation not supported");
      setLocationError(true);
    }
  };

  const handleChangeToArabic = () => {
    if (locale === "ar") {
      setLocale("en");
    i18n.changeLanguage("en");

      moment.locale("en");
    } else {
      setLocale("ar");
    i18n.changeLanguage("ar");

      moment.locale("ar");
    }

  }
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n]);

  // useEffect للحصول على الموقع عند التحميل
  useEffect(() => {
    getUserLocation();
  }, []);

  // useEffect لجلب بيانات الطقس عند تغيير الموقع
  useEffect(() => {
    const source = fetchWeatherData(location.lat, location.lon);

    return () => {
      source.cancel("Component unmounted");
    };
  }, [location, locale]); // إعادة جلب البيانات عند تغيير الموقع أو اللغة

  // useEffect للوقت والتاريخ
  useEffect(() => {
    // Update time immediately
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    // Update time every second
    const timer = setInterval(() => {
      setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTETNT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading && (
              <div style={{ color: "white", textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  جاري تحديد موقعك...
                </Typography>
                <Typography variant="body1">
                  يرجى السماح بالوصول إلى موقعك
                </Typography>
              </div>
            )}

            {locationError && !loading && (
              <div style={{ color: "white", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  تعذر الحصول على موقعك
                </Typography>
                <Typography variant="body1">
                  سيتم عرض طقس اسطنبول كموقع افتراضي
                </Typography>
              </div>
            )}

            {!loading && (
              <>
            {/* CARD */}
            <div
              className="weather-card"
              dir={direction}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  className="city-time-container"
                  dir={direction}
                >
                  <Typography variant="h2" component="div">
                    {loading ? "جاري تحديد الموقع..." : locationName}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ marginRight: 10 }}
                  >
                    {dateAndTime}
                  </Typography>
                </div>
                {/*== CITY & TIME ==*/}
                <hr />

                {/* CONTAINER OF DEGREE & DESCREPTION & ICON */}
                <div className="weather-info-container">
                  {/* DEGREE & DESCREPTION  */}
                  <div dir={direction}>
                    {/* TEMP */}
                    <div className="temperature-container">
                      <Typography
                        variant="h1"
                        component="div"
                        textAlign={locale === "ar" ? "right" : "left"}
                      >
                        {data ? Math.round(data.main.temp - 273.15) : "..."}
                        &#176;
                      </Typography>

                      {data && data.weather && (
                        <img
                          alt="weather"
                          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        />
                      )}
                    </div>

                    {/*== TEMP ==*/}
                    <Typography
                      variant="h4"
                      component="div"
                      textAlign={locale === "ar" ? "right" : "left"}
                      dir={direction}
                    >
                      {t(data ? data.weather[0].description : "...")}
                    </Typography>

                    {/* MIN & MAX */}
                    <div
                      textAlign={"right"}
                      dir={direction}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        textAlign={locale === "ar" ? "right" : "left"}
                        style={{
                          fontSize: locale === "en" ? "1rem" : "1.25rem",
                        }}
                        dir={direction}
                      >
                        {t("expectedTemp", {
                          min: data
                            ? Math.round(data.main.temp_min - 273.15)
                            : "...",
                          max: data
                            ? Math.round(data.main.temp_max - 273.15)
                            : "...",
                        })}
                      </Typography>
                    </div>
                    {/*== MIN & MAX ==*/}
                  </div>
                  {/*== DEGREE & DESCREPTION  ==*/}

                  <CloudIcon className="weather-icon" style={{ fontSize: "200" }} />
                </div>
                {/*== CONTAINER OF DEGREE & DESCREPTION & ICON ==*/}
              </div>
              {/*== CONTENT ==*/}
            </div>
            {/*== CARD ==*/}
            {/* TRANSLATIONS CONTAINER */}
            <div
              style={{
                marginTop: 20,
                textAlign: locale === "ar" ? "right" : "left",
                width: "100%",
              }}
            >
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={handleChangeToArabic}
              >
                {locale === "ar" ? "English" : "العربية"}
              </Button>
            </div>
            {/*== TRANSLATIONS CONTAINER ==*/}
            </>
            )}
          </div>
          {/*== CONTETNT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

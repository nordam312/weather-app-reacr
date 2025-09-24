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
  const direction = locale === "ar" ? "rtl" : "ltr";
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=41.01384&lon=28.94966&appid=${API_KEY}`;

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

  useEffect(() => {
    // Update time immediately
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    // Update time every second
    const timer = setInterval(() => {
      setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    const source = axios.CancelToken.source();
    // Example API call using axios
    axios
      .get(API_URL, {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
      });

    return () => {
      clearInterval(timer);
      source.cancel("Component unmounted");
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
            {/* CARD */}
            <div
              style={{
                backgroundColor: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: 20,
                borderRadius: 15,
                boxShadow: "0 8px 32px 0 rgba( 0, 0, 0, 0.3 )",
                width: "100%",
              }}
              dir={direction}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={direction}
                >
                  <Typography variant="h2" component="div">
                    {t("istanbul")}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* DEGREE & DESCREPTION  */}
                  <div dir={direction}>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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

                  <CloudIcon style={{ fontSize: "200" }} />
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
          </div>
          {/*== CONTETNT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

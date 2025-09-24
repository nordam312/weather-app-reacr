import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Meterial UI Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// METERIAL UI ICONS
import CloudIcon from "@mui/icons-material/Cloud";

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
              dir="rtl"
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
                  dir="rtl"
                >
                  <Typography variant="h2" component="div">
                    اسطنبول
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ marginRight: 10 }}
                  >
                    10-10-2020 الاثنين
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
                  <div>
                    {/* TEMP */}
                    <div>
                      <Typography
                        variant="h1"
                        component="div"
                        textAlign={"right"}
                      >
                        25&#176;
                      </Typography>

                      {/* TODO : TEMP IMAGE */}

                      <Typography
                        variant="h4"
                        component="div"
                        textAlign={"right"}
                      >
                        غائم جزئياً
                      </Typography>
                    </div>
                    {/*== TEMP ==*/}

                    {/* MIN & MAX */}
                    <div textAlign={"right"} dir="rtl">
                      <typography
                        variant="h6"
                        component="div"
                        textAlign={"right"}
                      >
                        درجة الحرارة المتوقعة بين 20&#176; - 28&#176;
                      </typography>
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
            <div style={{ marginTop: 20, textAlign: "left", width: "100%" }}>
              <Button variant="text" style={{ color: "white" }}>
                English
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

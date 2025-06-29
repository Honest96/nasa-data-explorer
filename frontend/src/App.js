import React from "react";
import "./App.css";
import "./styles/components/DatePicker.css";
import "./styles/components/ErrorMessage.css";
import "./styles/components/LoadingSpinner.css";
import "./styles/pages/NasaMediaLibrary.css";
import APOD from "./pages/APOD";
import MarsRover from "./pages/MarsRover";
import NasaMediaLibrary from "./pages/NasaMediaLibrary";
import Header from "./components/Header";

//Root component to render the application
function App() {
  const [currentPage, setCurrentPage] = React.useState("apod");
  const renderPage = () => {
    switch (currentPage) {
      case "apod":
        return <APOD />;
      case "mars-rover":
        return <MarsRover />;
      case "nasa-media":
        return <NasaMediaLibrary />;
      default:
        return <APOD />;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="App-selector">
        <nav className="navigation">
          <button
            className={
              currentPage === "apod" ? "nav-button active" : "nav-button"
            }
            onClick={() => setCurrentPage("apod")}
          >
            Astronomy Picture of the Day
          </button>
          <button
            className={
              currentPage === "mars-rover" ? "nav-button active" : "nav-button"
            }
            onClick={() => setCurrentPage("mars-rover")}
          >
            Mars Rover Photos
          </button>
          <button
            className={
              currentPage === "nasa-media" ? "nav-button active" : "nav-button"
            }
            onClick={() => setCurrentPage("nasa-media")}
          >
            NASA Media Library
          </button>
        </nav>
      </div>
      <main className="App-main">{renderPage()}</main>
    </div>
  );
}

export default App;

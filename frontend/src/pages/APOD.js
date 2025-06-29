import React, { useState, useEffect } from "react";
import "../styles/pages/APOD.css";
import { fetchApodData } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import DatePicker from "../components/DatePicker";

//APOD Component to display NASA's Astronomy Picture of the Day
function APOD() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectDate, setSelectedDate] = useState("");

  const loadApodData = async (date = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApodData(date);
      setApodData(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load APOD:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadApodData();
  }, []);

  const handleChangeDate = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date) {
      loadApodData(date);
    } else {
      loadApodData(); //Choose today's APOD if no date is selected
    }
  };

  const handleRetry = () => {
    loadApodData(selectDate || null);
  };

  if (loading) {
    return (
      <div className="apod-container">
        <h1>Astronomy Picture of the Day</h1>
        <LoadingSpinner message="Festching today's cosmic wonder..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="apod-container">
        <h1>Astronomy Picture of the Day</h1>
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
          retryText="Try Again"
          trype="error"
        />
      </div>
    );
  }

  return (
    <div className="apod-container">
      <h1>Astronomy Picture of the Day</h1>
      <DatePicker
        value={selectDate}
        onChange={handleChangeDate}
        label="Select Date:"
        id="apod-date"
        className="apod-date-picker"
      />

      {apodData && (
        <div className="apod-content">
          <h2>{apodData.title}</h2>
          <p className="apod-date">Date: {apodData.date}</p>

          {apodData.media_type === "image" ? (
            <img
              src={apodData.url}
              alt={apodData.title}
              className="apod-image"
            />
          ) : (
            <iframe
              src={apodData.url}
              title={apodData.title}
              className="apod-video"
              frameBorder="0"
              allowFullScreen
            />
          )}
          <p className="apod-explanation">{apodData.explanation}</p>

          {apodData.copyright && (
            <p className="apod-copyright">© {apodData.copyright}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default APOD;

import React, { useState, useEffect } from "react";
import "../styles/pages/APOD.css";
import { fetchApodData } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import DatePicker from "../components/DatePicker";

//Text-to-Speech for reading APOD explanations
const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    setIsSupported("speechSynthesis" in window);
  }, []);

  const speak = (text) => {
    if (!isSupported || !text) return;

    if (currentText === text && isPaused) {
      resume();
      return;
    }
    window.speechSynthesis.cancel();
    setCurrentText(text);

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText("");
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText("");
    };
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentText("");
  };

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    currentText,
  };
};

const SpeechButton = ({ text, label, className }) => {
  const {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    currentText,
  } = useTextToSpeech();
  if (!isSupported) return null;

  const isCurrentText = currentText === text;
  const canResume = isPaused && isCurrentText;
  const canPause = isSpeaking && isCurrentText;

  const handlePlay = () => speak(text);
  const handlePause = () => pause();
  const handleResume = () => resume();
  const handleStop = () => stop();

  return (
    <div className={`speech-controls ${className}`}>
      <button
        onClick={canResume ? handleResume : handlePlay}
        className="speech-button play-button"
        title={canResume ? "Resume Reading" : `Play ${label}`}
        disabled={!text || (isSpeaking && isCurrentText)}
      >
        {canResume ? "⏯️" : "⏯️"}
      </button>

      {canPause && (
        <button
          onClick={handlePause}
          className="speech-button pause-button"
          title="Pause Reading"
        >
          ⏸️
        </button>
      )}

      {(canPause || canResume) && (
        <button
          onClick={handleStop}
          className="speech-button stop-button"
          title="Stop Reading"
        >
          ⏹️
        </button>
      )}

      {isCurrentText && (
        <span className="speech-status">
          {isSpeaking ? "Reading" : isPaused ? "Paused" : ""}
        </span>
      )}
    </div>
  );
};

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

  const getFullSpeakingText = () => {
    if (!apodData) return "";

    return `${apodData.title}. ${apodData.explanation}${
      apodData.copyright ? ` Copyright ${apodData.copyright}` : ""
    }`;
  };

  if (loading) {
    return (
      <div className="apod-container">
        <h1>Astronomy Picture of the Day</h1>
        <LoadingSpinner message="Fetching today's cosmic wonder..." />
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
          type="error"
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

          <SpeechButton
            text={getFullSpeakingText()}
            label="full APOD description"
            className="main-speech-controls"
          />

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

          <div className="apod-explanation-container">
            <h3>Description</h3>
            <p className="apod-explanation">{apodData.explanation}</p>
          </div>

          {apodData.copyright && (
            <p className="apod-copyright">© {apodData.copyright}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default APOD;

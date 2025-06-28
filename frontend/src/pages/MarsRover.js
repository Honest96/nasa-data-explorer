import React, { useState, useEffect } from "react";
import "../styles/pages/MarsRover.css";
import { fetchMarsRoverPhotos, fetchRoverInfo } from "../services/api";
// import LoadingSpinner from "../components/LoadingSpinner";

//Mars Rover Conmponent to display NASA's Mars Rover Photos
const MarsRover = () => {
  const [photos, setPhotos] = useState([]);
  const [roverInfo, setRoverInfo] = useState(null);
  const [sol, setSol] = useState(100);
  const [total, setTotal] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedRover, setSelectedRover] = useState("curiosity");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const rovers = ["curiosity", "opportunity", "spirit", "perseverance"];
  const cameras = {
    all: "All Cameras",
    FHAZ: "Front Hazard Avoidance Camera",
    RHAZ: "Rear Hazard Avoidance Camera",
    MAST: "Mast Camera",
    CHEMCAM: "Chemistry and Micro-Imaging",
    MAHLI: "Mars Hand Lens Imager",
    MARDI: "Mars Descent Imager",
    NAVCAM: "Navigation Camera",
    PANCAM: "Panoramic Camera",
    MINITES: "Miniature Thermal Emission Spectrometer",
  };

  const loadRoverInfo = async () => {
    try {
      const info = await fetchRoverInfo(selectedRover);
      setRoverInfo(info);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load Mars Rover Info:", err);
    }
  };

  const loadMarsRoverPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      const options = {
        rover: selectedRover,
        camera: selectedCamera,
        page: page,
        sol: sol,
      };

      const data = await fetchMarsRoverPhotos(options);
      setPhotos(data.photos || []);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load Mars Rover Photos:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadRoverInfo();
  }, [selectedRover]);
  useEffect(() => {
    loadMarsRoverPhotos();
  }, [selectedRover, selectedRover, sol, page]);

  const handleRoverChange = (event) => {
    setSelectedRover(event.target.value);
    setPage(1);
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.targe.value);
    setPage(1);
  };

  const handleSolChange = (event) => {
    setSol(parseInt(event.targe.value));
    setPage(1);
  };

  //   const handlePageChange = (event) => {
  //     setPage(newPage);
  //   };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (photos.length >= 25) {
      setPage(page + 1);
    }
  };

  if (loading && (!photos || photos.length === 0)) {
    return (
      <div className="mars-rover-container">
        <div className="loading-spinner">Loading Mars Rover Photos...</div>
      </div>
    );
  }

  return (
    <div className="mars-rover-container">
      <h1>Mars Rover Photos</h1>

      {roverInfo && (
        <div className="rover-info">
          <h2>{roverInfo.name} Rover</h2>
          <p>
            <strong>Status:</strong> {roverInfo.status}
          </p>
          <p>
            <strong>Launch Date:</strong> {roverInfo.launch_date}
          </p>
          <p>
            <strong>Landing Date:</strong> {roverInfo.landing_date}
          </p>
          <p>
            <strong>Total Photos:</strong>{" "}
            {roverInfo.total_photos?.toLocaleString()}
          </p>
          <p>
            <strong>Max Sol:</strong> {roverInfo.max_sol}
          </p>
        </div>
      )}

      <div className="controls">
        <div className="control-group">
          <label htmlFor="rover-select">Select Rover:</label>
          <select
            id="rover-select"
            value={selectedRover}
            onChange={handleRoverChange}
          >
            {rovers.map((rover) => (
              <option key={rover} value={rover}>
                {rover.charAt(0).toUpperCase() + rover.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="camera-select">Select Camera:</label>
          <select
            id="camera-select"
            value={selectedCamera}
            onChange={handleCameraChange}
          >
            {Object.entries(cameras).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sol-input">Sol:</label>
          <input
            type="number"
            id="sol-input"
            value={sol}
            onChange={handleSolChange}
            min="0"
            max={roverInfo ? roverInfo.max_sol : 3000}
          />
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={loadMarsRoverPhotos}>Try Again</button>
        </div>
      )}

      {photos.length === 0 && !loading && !error && (
        <div className="no-photos">
          <p>
            No photos available for the selected criteria. Try different
            settings.
          </p>
        </div>
      )}

      {photos.length > 0 && (
        <div className="photo-section">
          <h3>
            Photos from Sol {sol} ({photos.length} photos)
          </h3>
          <br />

          <div className="photos-grid">
            {photos.map((photo) => (
              <div key={photo.id} className="photo-card">
                <img
                  src={photo.img_src}
                  alt={`Mars Photo ${photo.camera.full_name}`}
                  loading="lazy"
                />
                <div className="photo-info">
                  <p>
                    <strong>Camera:</strong> {photo.camera.full_name}
                  </p>
                  <p>
                    <strong>Sol:</strong> {photo.sol}
                  </p>
                  <p>
                    <strong>Earth Date</strong> {photo.earth_date}
                  </p>
                  <p>
                    <strong>Rover:</strong> {photo.rover.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              //   disabled={photos.length < 25}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={handleNextPage}
              disabled={!photos || photos.length < 25}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {loading && photos.length > 0 && (
        <div className="loading-overlay">Loading More Photos...</div>
      )}
    </div>
  );
};

export default MarsRover;

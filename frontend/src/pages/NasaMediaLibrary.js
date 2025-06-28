import React, { useState, useEffect } from "react";
import {
  fetchNasaMedia,
  fetchNasaMediaDetails,
  fetchNasaMediaAssets,
} from "../services/api";

//NASA Media Library Component to display NASA's Image & Video Library
function NasaMedia() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("astronaut");
  const [mediaType, setMediaType] = useState("image, video");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const mediaTypes = [
    { value: "image,video", label: "Images & Videos" },
    { value: "image", label: "Images Only" },
    { value: "video", label: "Videos Only" },
    { value: "audio", label: "Audio Only" },
  ];

  const popularSearches = [
    "astronaut",
    "mars",
    "earth",
    "moon",
    "space station",
    "comet",
    "satellite",
    "apollo",
    "nebula",
    "galaxy",
    "black hole",
    "solar system",
  ];

  useEffect(() => {
    loadMediaItems();
  }, [searchQuery, mediaType, currentPage, yearStart, yearEnd]);

  const loadMediaItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        query: searchQuery,
        media_type: mediaType,
        page: currentPage,
      };

      if (yearStart) {
        options.year_start = parseInt(yearStart);
      }
      if (yearEnd) {
        options.year_end = parseInt(yearEnd);
      }

      const data = await fetchNasaMedia(options);
      // setMediaType(data?.items || []);
      setMediaItems(data?.items || []);
      setTotalHits(data?.totalHits || 0);
    } catch (error) {
      console.error("Failed to load NASA Media:", error);
      setError(error.message);
      setMediaItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    loadMediaItems();
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openMediaModal = async (media) => {
    setSelectedMedia(media);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMedia(null);
  };

  const MediaCard = ({ media }) => (
    <div className="media-card" onClick={() => openMediaModal(media)}>
      {media.preview_url ? (
        <div className="media-preview">
          {media.media_type === "video" ? (
            <div className="video-preview">
              <img src={media.preview_url} alt={media.title} loading="lazy" />
              <div className="video-overlay">
                <div className="play-button">▶</div>
              </div>
            </div>
          ) : media.media_type === "audio" ? (
            <div className="audio-preview">
              <div className="audio-icon">🎵</div>
              <p>Audio File</p>
            </div>
          ) : (
            <img src={media.preview_url} alt={media.title} loading="lazy" />
          )}
        </div>
      ) : (
        <div className="no-preview">
          <p>No Preview Available</p>
        </div>
      )}

      <div className="media-info">
        <h3>{media.title}</h3>
        <p className="media-description">
          {media.description?.substring(0, 120)}
          {media.description?.length > 120 ? "..." : ""}
        </p>
        <div className="media-meta">
          <span className="media-type">{media.media_type}</span>
          {media.date_created && (
            <span className="media-date">
              {new Date(media.date_created).getFullYear()}
            </span>
          )}
        </div>
        {media.keywords?.length > 0 && (
          <div className="media-keywords">
            {media.keywords.slice(0, 3).map((keyword, index) => (
              <span key={index} className="keyword-tag">
                {keyword}
              </span>
            ))}
          </div>
        )}

        {media.description?.length > 120 && (
          <p className="read-more-hint">Click to read full description</p>
        )}
      </div>
    </div>
  );

  if (loading && mediaItems.length === 0) {
    return (
      <div className="nasa-media-container">
        <div className="loading-spinner">Loading NASA Media Library...</div>
      </div>
    );
  }

  return (
    <div className="nasa-media-container">
      <h1>NASA Image & Video Library</h1>
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-row">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NASA's media library (searches titles, descriptions, and keywords)..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>

          <div className="filters-row">
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="filter-select"
            >
              {mediaTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={yearStart}
              onChange={(e) => setYearStart(e.target.value)}
              placeholder="Start Year"
              min="1900"
              max={new Date().getFullYear()}
              className="year-input"
            />

            <input
              type="number"
              value={yearEnd}
              onChange={(e) => setYearEnd(e.target.value)}
              placeholder="End Year"
              min="1900"
              max={new Date().getFullYear()}
              className="year-input"
            />
          </div>
        </form>

        <div className="popular-searches">
          <p>Popular searches:</p>
          <div className="search-tags">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(search)}
                className="search-tag"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>
          Found {totalHits?.toLocaleString()} results for "{searchQuery}"
          {mediaItems.length > 0 && ` (Showing page ${currentPage})`}
        </p>
      </div>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={loadMediaItems}>Try Again</button>
        </div>
      )}

      {!loading && mediaItems.length === 0 && !error && (
        <div className="no-results">
          <p>No media found for "{searchQuery}". Try different search terms.</p>
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="media-grid">
          {mediaItems.map((media) => (
            <MediaCard key={media.nasa_id} media={media} />
          ))}
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="pagination-button"
          >
            Previous
          </button>

          <span className="page-info">Page {currentPage}</span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={mediaItems.length < 100} // NASA API returns max 100 per page
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {loading && mediaItems.length > 0 && (
        <div className="loading-overlay">Loading more media...</div>
      )}

      {showModal && selectedMedia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-media">
              {selectedMedia.preview_url && (
                <img
                  src={selectedMedia.preview_url}
                  alt={selectedMedia.title}
                  className="modal-image"
                />
              )}
            </div>

            <div className="modal-info">
              <h2>{selectedMedia.title}</h2>

              <div className="modal-description-section">
                <h3>Description</h3>
                <p className="modal-description">{selectedMedia.description}</p>
                {selectedMedia.description_508 &&
                  selectedMedia.description_508 !==
                    selectedMedia.description && (
                    <div className="accessible-description">
                      <h4>Accessible Description:</h4>
                      <p>{selectedMedia.description_508}</p>
                    </div>
                  )}
              </div>

              <div className="modal-metadata">
                <h3>Details</h3>
                <div className="metadata-grid">
                  <p>
                    <strong>NASA ID:</strong> {selectedMedia.nasa_id}
                  </p>
                  <p>
                    <strong>Media Type:</strong> {selectedMedia.media_type}
                  </p>
                  {selectedMedia.date_created && (
                    <p>
                      <strong>Date Created:</strong>{" "}
                      {new Date(
                        selectedMedia.date_created
                      ).toLocaleDateString()}
                    </p>
                  )}
                  {selectedMedia.center && (
                    <p>
                      <strong>NASA Center:</strong> {selectedMedia.center}
                    </p>
                  )}
                  {selectedMedia.photographer && (
                    <p>
                      <strong>Photographer:</strong>{" "}
                      {selectedMedia.photographer}
                    </p>
                  )}
                  {selectedMedia.secondary_creator && (
                    <p>
                      <strong>Secondary Creator:</strong>{" "}
                      {selectedMedia.secondary_creator}
                    </p>
                  )}
                  {selectedMedia.location && (
                    <p>
                      <strong>Location:</strong> {selectedMedia.location}
                    </p>
                  )}
                  {selectedMedia.album && (
                    <p>
                      <strong>Album:</strong> {selectedMedia.album}
                    </p>
                  )}
                </div>
              </div>

              {selectedMedia.keywords?.length > 0 && (
                <div className="modal-keywords">
                  <h3>Keywords</h3>
                  <div className="keywords-list">
                    {selectedMedia.keywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NasaMedia;

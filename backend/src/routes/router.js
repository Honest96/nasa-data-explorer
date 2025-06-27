const express = require("express");
const router = express.Router();

const { getApod } = require("../controllers/apodController");
const {
  getMarsRoverPhotos,
  getRoverInfo,
} = require("../controllers/marsRoverController");
const {
  getNasaMedia,
  getNasaMediaDetails,
  getNasaMediaAssets,
} = require("../controllers/nasaMediaController");

router.get("/apod", getApod);
router.get("/mars-rover/photos", getMarsRoverPhotos);
router.get("/mars-rover/info", getRoverInfo);
router.get("/nasa-media/search", getNasaMedia);
router.get("/nasa-media/details/:nasa_id", getNasaMediaDetails);
router.get("/nasa-media/assets/:nasa_id", getNasaMediaAssets);

module.exports = router;

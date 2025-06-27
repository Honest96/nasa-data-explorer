const { query } = require("express");
const {
  fetchNasaMedia,
  fetchNasaMediaDetails,
  fetchNasaMediaAssets,
} = require("../services/nasaMediaApi");

//handle GET requests to /api/nasa-media
async function getNasaMedia(req, res) {
  try {
    const {
      q = "astronaut",
      media_type = "image, video",
      page = 1,
      year_start,
      year_end,
    } = req.query;
    console.log(`Fetching NASA Media Library for: ${q}`);

    const options = {
      query: q,
      media_type,
      page: parseInt(page),
      year_start: year_start ? parseInt(year_start) : null,
      year_end: year_end ? parseInt(year_end) : null,
    };

    const mediaData = await fetchNasaMedia(options);
    console.log("NASA Media Library fetched successfully:");

    res.status(200).json({
      success: true,
      data: mediaData,
      message: "NASA Media Library fetched successfully",
    });
  } catch (error) {
    console.error("NASA Media Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch NASA Media Library",
      error: error.message,
    });
  }
}

async function getNasaMediaDetails(req, res) {
  try {
    const { nasa_id } = req.params;

    if (!nasa_id) {
      return res(400).json({
        success: false,
        message: "NASA ID required",
      });
    }
    console.log(`Fetching Media Details for NASA ID: ${nasa_id}`);
    const mediaDetails = await fetchNasaMediaDetails(nasa_id);
    console.log("NASA Media Details fetched successfully:");

    res.status(200).json({
      success: true,
      data: mediaDetails,
      message: "NASA Media Details fetched successfully",
    });
  } catch (error) {
    console.error("NASA Media Details Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch NASA Media Details",
      error: error.message,
    });
  }
}

async function getNasaMediaAssets(req, res) {
  try {
    const { nasa_id } = req.params;

    if (!nasa_id) {
      return res(400).json({
        success: false,
        message: "NASA ID required",
      });
    }
    console.log(`Fetching Media Assets for NASA ID: ${nasa_id}`);
    const mediaAssets = await fetchNasaMediaAssets(nasa_id);
    console.log("NASA Media Assets fetched successfully:");

    res.status(200).json({
      success: true,
      data: mediaAssets,
      message: "NASA Media Assets fetched successfully",
    });
  } catch (error) {
    console.error("NASA Media Assets Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch NASA Media Assets",
      error: error.message,
    });
  }
}

module.exports = {
  getNasaMedia,
  getNasaMediaDetails,
  getNasaMediaAssets,
};

const axios = require("axios");
const e = require("express");
require("dotenv").config();

//Fetch Mars Rover Photos
async function fetchMarsRoverPhotos(options = {}) {
  try {
    const apiKey = process.env.NASA_API_KEY;
    if (!apiKey) {
      throw new Error("NASA API key is not set in environment variables.");
    }

    const {
      rover = "curiosity",
      camera = all,
      sol = 100,
      earth_date = null,
      page = 1,
    } = options;

    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}&page=${page}`;

    if (earth_date) {
      apiUrl += `&earth_date=${earth_date}`;
    } else {
      apiUrl += `&sol=${sol}`;
    }

    if (camera && camera !== "all") {
      apiUrl += `&camera=${camera}`;
    }

    console.log(
      "Mars Rover API URL:",
      apiUrl.replace(apiKey, "API_KEY_HIDDEN")
    );
    console.log("Fetching Mars Rover Photos...");

    // const response = await fetch(apiUrl);
    const response = await axios.get(apiUrl);

    console.log("Response status:", response.status);
    console.log("Mars Rover Photos fetched successfully.");
    // console.log('Number of photos:', response.data.photos.length);

    if (!response.data) {
      throw new Error("No data received from Mars Rover API");
    }

    const photos = response.data.photos || [];

    console.log("Mars Rover Photos fetched successfully");
    console.log("Number of photos:", photos.length);

    // If no photos found, suggest alternative sols
    if (photos.length === 0) {
      console.log("No photos found for the current criteria");
    }

    return {
      photos: photos,
      total: photos.length,
      rover: rover,
      camera: camera,
      sol: sol,
      earth_date: earth_date,
      page: page,
    };
  } catch (error) {
    console.error("Error fetching MArs Rover Photos:", error);

    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      throw new Error(
        `Mars Rover API error: ${error.response.status} ${
          error.response.statusText
        }. Details: ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      console.error("No response received from Mars Rover API:", error.request);
      throw new Error("No response received from Mars Rover API");
    } else {
      console.error("Request setup error:", error.message);
      throw error;
    }
  }
}

async function fetchRoverInfo(rover = "curiosity") {
  try {
    const apiKey = process.env.NASA_API_KEY;
    if (!apiKey) {
      throw new Error("NASA API key is not set in environment variables.");
    }
    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}?api_key=${apiKey}`;

    console.log("Fetching Rover Info...");
    // const response = await fetch(apiUrl);
    const response = await axios.get(apiUrl);

    const roverData = response.data?.rover;
    if (!roverData) {
      throw new Error("No rover info received from NASA response");
    }
    // if (!response.ok) {
    //   throw new Error(
    //     `NASA API error: ${response.status} ${response.statusText}`
    //   );
    // }

    console.log("Rover Info fetched successfully.");
    return response.data.rover;
  } catch (error) {
    console.error("Error fetching Rover Info:", error);
    throw error;
  }
}

module.exports = { fetchMarsRoverPhotos, fetchRoverInfo };

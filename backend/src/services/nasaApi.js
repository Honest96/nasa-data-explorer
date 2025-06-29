const fetch = require("node-fetch");
require("dotenv").config();

//Fetch APOD
async function fetchApodData(date = null) {
  try {
    const apiKey = process.env.NASA_API_KEY;
    if (!apiKey) {
      throw new Error("NASA API key is not set in environment variables.");
    }
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    if (date) {
      apiUrl += `&date=${date}`;
    }
    console.log("Fetching NASA APOD Data...");
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `NASA API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("NASA APOD Data fetched successfully.");
    console.log("NASA API URL:", apiUrl);
    return data;
  } catch (error) {
    console.error("Error fetching NASA APOD data:", error);
    throw error;
  }
}

module.exports = { fetchApodData };

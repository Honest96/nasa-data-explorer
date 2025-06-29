const { fetchApodData } = require("../services/nasaApi");

//Handle GET requests to api/apod
async function getApod(req, res) {
  try {
    const { date } = req.query;

    console.log(`Fetching APOD${date ? ` for date: ${date}` : " for today"}`);

    const apodData = await fetchApodData(date);

    res.status(200).json({
      success: true,
      data: apodData,
      message: "APOD data fetched successfully",
    });
  } catch (error) {
    console.error("APOD Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Astronomy Picture of the Day (APOD)",
      error: error.message,
    });
  }
}

module.exports = { getApod };

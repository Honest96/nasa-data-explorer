const {
  fetchMarsRoverPhotos,
  fetchRoverInfo,
} = require("../services/marsRoverApi");

//Handle GET requests to /api/mars-rover
async function getMarsRoverPhotos(req, res) {
  try {
    const {
      rover = "curiosity",
      camera = "all",
      earth_date,
      sol,
      page = 1,
    } = req.query;
    console.log(
      `Fetching Mars Rover Photos for rover: ${rover}, camera: ${camera}, earth_date: ${earth_date}, sol: ${sol}, page: ${page}`
    );

    const options = {
      rover,
      camera,
      page: parseInt(page),
    };

    if (earth_date) {
      options.earth_date = earth_date;
    } else {
      options.sol = sol ? parseInt(sol) : 1000;
    }

    const roverData = await fetchMarsRoverPhotos(options);
    console.log("Mars Rover photos fetched successfully:");

    res.status(200).json({
      success: true,
      data: roverData,
      message: "Mars Rover photos fetched successfully",
    });
  } catch (error) {
    console.error("Mars Rover Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Mars Rover photos",
      error: error.message,
    });
  }
}

//Handle GET requests to /api/mars-rover/info
async function getRoverInfo(req, res) {
  try {
    const { rover = "curiosity" } = req.query;
    console.log(`Fetching Info for rover: ${rover}`);
    const roverInfo = await fetchRoverInfo(rover);
    console.log("Mars Rover Info fetched successfully:");

    res.status(200).json({
      success: true,
      data: roverInfo,
      message: "Mars Rover Info fetched successfully",
    });
  } catch (error) {
    console.error("Mars Rover Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Mars Rover photos",
      error: error.message,
    });
  }
}

module.exports = { getMarsRoverPhotos, getRoverInfo };

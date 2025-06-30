// const API_BASE_URL = "/api";
console.log("Base URL:", process.env.REACT_APP_API_BASE_URL);
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "DEMO_KEY";

//Fetch Astronomy Picture of the Day from backend
export async function fetchApodData(date = null) {
  try {
    let url = `${API_BASE_URL}/apod`;
    if (date) {
      url += `?date=${date}`;
    }
    console.log("Fetching APOD data from backend...");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching APOD data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch APOD");
    }
    console.log("APOD data fetched successfully:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching APOD:", error.message);
    throw error;
  }
}

//Fetch Mars Rover Photos from backend
export async function fetchMarsRoverPhotos(options = {}) {
  let url;
  let response;
  let result;

  try {
    const {
      rover = "curiosity",
      camera = "all",
      earth_date,
      sol,
      page = 1,
    } = options;

    const params = new URLSearchParams({
      rover: rover,
      camera: camera,
      page: page.toString(),
    });

    // let url = `${API_BASE_URL}/mars-rover/photos`; //may have to include camera type, rover name & page
    if (earth_date) {
      params.append("earth_date", earth_date);
    } else {
      params.append("sol", (sol || 1000).toString());
    }

    url = `${API_BASE_URL}/mars-rover/photos?${params.toString()}`;

    console.log("Fetching APOD data from backend...");
    console.log("Mars Rover Photos URL:", url);

    response = await fetch(url);
    result = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error fetching Mars Rover Photos: ${response.status} ${response.statusText}`
      );
    }

    // result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch Mars Rover Photos");
    }
    console.log("Mars Rover Photos fetched successfully:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching Mars Rover Photos:", error.message);
    throw error;
  }
}

//Fetch Mars Rover Info from backend
export async function fetchRoverInfo(rover = "curiosity") {
  try {
    const url = `${API_BASE_URL}/mars-rover/info?rover=${rover}`; //may have to include rover name
    console.log("Fetching Rover Info from backend...");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching Mars Rover Info: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch Mars Rover Info");
    }
    console.log("Mars Rover Info fetched successfully:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching Mars Info Photos:", error.message);
    throw error;
  }
}

//Fetch NASA Images & Videos from backend
export async function fetchNasaMedia(options = {}) {
  let url;
  let response;
  let result;

  try {
    const {
      query = "star cluster",
      media_type = "image,video",
      page = 1,
      year_start,
      year_end,
    } = options;

    const params = new URLSearchParams({
      q: query,
      media_type: media_type,
      page: page.toString(),
    });

    if (year_start) {
      params.append("year_start", year_start);
    }

    if (year_end) {
      params.append("year_end", year_end);
    }

    url = `${API_BASE_URL}/nasa-media/search?${params.toString()}`;

    console.log("Fetching NASA Media from backend...");
    console.log("NASA Media Library URL:", url);

    response = await fetch(url);
    if (!response || !response.ok) {
      throw new Error(
        `Error searching NASA Media Library: ${response.status} ${response.statusText}`
      );
    }

    result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to search NASA Media Library");
    }
    console.log("NASA Media Library searched successfully:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error searching NASA Media Library:", error.message);
    throw error;
  }
}

export async function fetchNasaMediaDetails(nasa_id) {
  try {
    const url = `${API_BASE_URL}/nasa-media/details/${nasa_id}`;
    console.log("Fetching NASA Media Details from backend...");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error searching NASA Media Details: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch NASA Media Details");
    }
    console.log("NASA Media Details fetched successfully:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching NASA Media Details:", error.message);
    throw error;
  }
}

export async function fetchNasaMediaAssets(nasa_id) {
  try {
    const url = `${API_BASE_URL}/nasa-media/assets/${nasa_id}`;
    console.log("Fetching NASA Media Assets from backend...");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error searching NASA Media Assets: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Failed to fetch NASA Media Assets");
    }
    console.log("NASA Media Assets fetched successfully:", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching NASA Media Assets:", error.message);
    throw error;
  }
}

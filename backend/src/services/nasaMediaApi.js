const axios = require("axios");

//Fetch NASA Image, Video Library, Assets & Details
async function fetchNasaMedia(options = {}) {
  try {
    const {
      query = "star cluster",
      media_type = "image, video",
      page = 1,
      year_start = null,
      year_end = null,
    } = options;

    let apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
      query
    )}&media_type=${media_type}&page=${page}`;

    if (year_start) {
      apiUrl += `&year_start=${year_start}`;
    }

    if (year_end) {
      apiUrl += `&year_end=${year_end}`;
    }

    console.log("NASA Media Library URL:", apiUrl);
    console.log("Fetching NASA Media Library");

    const response = await axios.get(apiUrl);

    console.log("Response status:", response.status);

    if (!response.data || !response.data.collection) {
      throw new Error("Invalid API");
    }

    const collection = response.data.collection;
    const items = collection.items;

    console.log("NASA Media Library fetched Successfully");
    console.log("Number of items", items.length);

    const processedItems = items.map((item) => {
      const data = item.data?.[0] || {};
      const links = item.links || {};
      const previewLink = links[0]?.href || null;
      const previewUrl = links.length > 0 ? links[0].href : null;

      return {
        nasa_id: data.nasa_id || "unknown",
        title: data.title || "Untitled",
        description: data.description || "No description available",
        description_508: data.description_508 || null,
        date_created: data.date_created || null,
        media_type: data.media_type || "unknown",
        preview_url: previewUrl,
        keywords: data.keywords || [],
        center: data.center || "NASA",
        photographer: data.photographer || null,
        location: data.location || null,
        secondary_creator: data.secondary_creator || null,
        album: data.album,
        links: links,
      };
    });

    return {
      items: processedItems,
      total: items.length,
      total_hits: collection.metadata?.total_hits || 0,
      page: page,
      query: query,
      media_type: media_type,
    };
  } catch (error) {
    console.error("Error in fetchNasaMedia:", error);

    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      throw new Error(
        `NASA MEdia Library API error: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from NASA Media Library API");
    } else {
      console.error("Request setup error:", error.message);
      throw error;
    }
  }
}

async function fetchNasaMediaDetails(nasa_id) {
  try {
    const apiUrl = `https://images-api.nasa.gov/search?nasa_id=${nasa_id}`;
    const response = await axios.get(apiUrl);
    if (response.data?.collection?.item?.length > 0) {
      const item = response.data.collection.items[0];
      console.log("Media Details fetched successfully.");
      return item;
    } else {
      throw new Error("Media not found");
    }
  } catch (error) {
    console.error("Error fetching Media Details:", error);
    throw error;
  }
}

async function fetchNasaMediaAssets(nasa_id) {
  try {
    const apiUrl = `https://images-api.nasa.gov/asset/nasa_id=${nasa_id}`;
    const response = await axios.get(apiUrl);

    console.log("Media Assets fetched successfully");
    return response.data?.collection?.items || [];
  } catch (error) {
    console.error("Error fetching Media Assets:", error);
    throw error;
  }
}

module.exports = {
  fetchNasaMedia,
  fetchNasaMediaDetails,
  fetchNasaMediaAssets,
};

const axios = require("axios");


const BRABBLE_URL =
  "https://brabble.ai/api/listings";
const {
  getStudentOffers,
} = require("../services/studentOffersService");
const getHackathons = async (req, res) => {
  try {
    const {
      limit = 20,
      offset = 0,
      mode,
      q,
      city,
    } = req.query;

    const params = {
      hub: "hackathons",
      limit: Number(limit),
      offset: Number(offset),
    };

    if (mode) {
      params.mode = mode;
    }

    if (q) {
      params.q = q;
    }

    if (city) {
      params.city = city;
    }

    const response = await axios.get(
      BRABBLE_URL,
      {
        params,
        headers: {
          Authorization: `Bearer ${process.env.BRABBLE_API_KEY}`,
        },
      }
    );

    const data = response.data;

    return res.status(200).json({
      success: true,
      source: "Brabble",
      refreshedAt: data.refreshedAt,
      total: data.total,
      hackathons: data.listings || [],
    });

  } catch (error) {

    console.error(
      "Brabble Hackathon API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid Brabble API key",
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Brabble API daily limit reached",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to fetch hackathons",
    });
  }
};


const getJobs = async (req, res) => {
  try {
    const {
      query = "developer",
      location,
      page = 1,
    } = req.query;

    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/${page}`,
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,

          what: query,

          ...(location && {
            where: location,
          }),

          results_per_page: 20,

          "content-type": "application/json",
        },

        headers: {
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      source: "Adzuna",

      count: response.data.count,

      jobs: response.data.results,
    });
  } catch (error) {
    console.error(
      "Adzuna Jobs Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
      error:
        error.response?.data || error.message,
    });
  }
};

const getInternships = async (req, res) => {
  try {
    const {
      query = "internship",
      location,
      page = 1,
    } = req.query;

    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/${page}`,
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,

          what: query,

          ...(location && {
            where: location,
          }),

          results_per_page: 20,

          "content-type": "application/json",
        },

        headers: {
          Accept: "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      source: "Adzuna",

      count: response.data.count,

      internships: response.data.results,
    });
  } catch (error) {
    console.error(
      "Adzuna Internship Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch internships",
      error:
        error.response?.data || error.message,
    });
  }
};  


const OPENWEBNINJA_EVENTS_URL =
  "https://api.openwebninja.com/realtime-events-data/search-events";

const getEvents = async (req, res) => {
  try {
    const {
      search = "",
      location = "India",
      date = "any",
      category = "all",
    } = req.query;

    // Technology-focused search queries
    const categoryQueries = {
      all: "technology",
      ai: "AI machine learning",
      web: "web development programming",
      cybersecurity: "cybersecurity",
      cloud: "cloud computing",
      developer: "software developer programming",
      startup: "technology startup",
    };

    const techQuery =
      categoryQueries[category] ||
      categoryQueries.all;

    // Build search query
    let query;

    if (search.trim()) {
      query = `${search.trim()} events in ${location}`;
    } else {
      query = `${techQuery} events in ${location}`;
    }

    console.log("--------------------------------");
    console.log("Events Query:", query);
    console.log("Location:", location);
    console.log("Category:", category);
    console.log("--------------------------------");

    // OpenWeb Ninja API request
const response = await axios.get(
  OPENWEBNINJA_EVENTS_URL,
  {
    params: {
      query: "technology events in India",
    },
    headers: {
      "X-API-Key": process.env.OPENWEBNINJA_API_KEY,
    },
    timeout: 60000,
  }
);

    const apiData = response.data;

    // OpenWeb Ninja response:
    // {
    //   status: "OK",
    //   request_id: "...",
    //   parameters: {...},
    //   data: [...]
    // }

    const events = Array.isArray(apiData?.data)
      ? apiData.data
      : [];

    // Convert API response into our application's format
    const formattedEvents = events.map(
      (event, index) => ({
        id:
          event.event_id ||
          event.entity_id ||
          `event-${index}`,

        title:
          event.name ||
          "Technology Event",

        description:
          event.description ||
          "",

        category:
          event.category ||
          "Technology",

        date:
          event.date_human_readable ||
          event.date ||
          null,

        startTime:
          event.start_time ||
          null,

        endTime:
          event.end_time ||
          null,

        location:
          event.venue?.full_address ||
          event.venue?.name ||
          "Location not available",

        city:
          event.venue?.city ||
          location,

        venue:
          event.venue?.name ||
          null,

        image:
          event.thumbnail ||
          event.venue?.photo ||
          null,

        price:
          event.price ||
          null,

        isFree:
          event.is_free ?? null,

        url:
          event.link ||
          null,

        calendarLink:
          event.calendar_link ||
          null,

        directionsLink:
          event.directions_link ||
          null,

        source:
          event.publisher ||
          "OpenWeb Ninja",
      })
    );

    return res.status(200).json({
      success: true,
      source: "OpenWeb Ninja",
      query,
      total: formattedEvents.length,
      events: formattedEvents,
    });
  } catch (error) {
    console.error(
      "OpenWeb Ninja Events API Error:"
    );

    console.error(
      "Status:",
      error.response?.status
    );

    console.error(
      "Data:",
      error.response?.data ||
        error.message
    );

    // Invalid API key
    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid OpenWeb Ninja API key",
      });
    }

    // Rate limit
    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "OpenWeb Ninja API limit reached",
      });
    }

    // Provider timeout
    if (error.response?.status === 504) {
      return res.status(504).json({
        success: false,
        message:
          "OpenWeb Ninja events service timed out. Please try again.",
      });
    }

    // Other errors
    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch tech events",
    });
  }
};

const getBenefits = async (req, res) => {
  try {
    const data = await getStudentOffers();


    const benefits =
      data?.offers ||
      data?.data ||
      (Array.isArray(data) ? data : []);

    return res.status(200).json({
      success: true,
      total: benefits.length,
      benefits,
    });
  } catch (error) {
    console.error("Benefits Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch student benefits",
      error: error.response?.data || error.message,
    });
  }
};



module.exports = {
  getHackathons,
  getJobs,
  getInternships,
  getEvents,
  getBenefits,
};


const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const axios = require("axios");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const GIANT_BOMB_API_KEY = "5830cac61d28c99b6f8810d6624ca7fd0351bfb6";

app.get("/api/games", async (req, res) => {
  try {
    // Make a GET request to the Giant Bomb API
    const response = await axios.get("https://www.giantbomb.com/api/games/", {
      params: {
        api_key: GIANT_BOMB_API_KEY,
        format: "json",
        // Add more parameters as needed
      },
    });

    // Send the Giant Bomb API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/nintendoDsGames", async (req, res) => {
  const pageNumber = req.body.pageNumber;
  try {
    // Make a GET request to the Giant Bomb API
    const response = await axios.get("https://www.giantbomb.com/api/games/", {
      params: {
        api_key: GIANT_BOMB_API_KEY,
        format: "json",
        platforms: "52",
        offset: pageNumber * 100,
        // Add more parameters as needed
      },
    });

    // Send the Giant Bomb API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/game", async (req, res) => {
  try {
    // Make a GET request to the Giant Bomb API
    const guid = req.body.guid;
    console.log(req.body);
    const response = await axios.get("https://www.giantbomb.com/api/game/" + guid, {
      params: {
        api_key: GIANT_BOMB_API_KEY,
        format: "json",
        // Add more parameters as needed
      },
    });

    // Send the Giant Bomb API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

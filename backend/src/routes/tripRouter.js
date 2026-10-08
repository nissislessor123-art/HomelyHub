import express from "express";
import axios from "axios";
import {createTripPlan} from "../controllers/tripController.js";

const tripRouter = express.Router();
tripRouter.route("/").post(createTripPlan)

tripRouter.get("/image", async (req, res) => {
  try {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).send("Image URL is required");
    }

    const url = new URL(imageUrl);

    if (url.hostname !== "serpapi.com") {
      return res.status(403).send("Invalid image source");
    }

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    res.set("Content-Type", response.headers["content-type"]);
    res.set("Cache-Control", "public, max-age=3600");

    res.send(response.data);
  } catch (error) {
    console.error("IMAGE PROXY ERROR:", error.message);
    res.status(500).send("Could not load image");
  }
});

export {tripRouter};
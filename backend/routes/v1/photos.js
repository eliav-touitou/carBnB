require("dotenv").config();
const { Router } = require("express");
const photos = Router();
const { addToPhotosDB, getItemFromDB } = require("../../../database/queries");
const { Photo } = require("../../../database/models");

// Gets a unique rental
photos.post("/savephotos", async (req, res) => {
  const photosToSave = req.body;
  try {
    const isSaved = await addToPhotosDB(photosToSave);
    console.log(isSaved);

    return res.status(200).json({ success: true, data: isSaved });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = photos;

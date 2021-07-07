require("dotenv").config();
const { Router } = require("express");
const photos = Router();
const {
  addToPhotosDB,
  getItemFromDB,
  getPhoto,
} = require("../../../database/queries");
const { Photo } = require("../../../database/models");
const { writeLogs } = require("../../utils/helperFunctions");

// Gets a unique rental
photos.post("/savephotos", async (req, res) => {
  const photosToSave = req.body;
  try {
    const isSaved = await addToPhotosDB(photosToSave);
    console.log(isSaved);

    return res.status(200).json({ success: true, data: isSaved });
  } catch (error) {
    console.log(error.message);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/photos/savephotos",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

photos.post("/uniquephoto", async (req, res) => {
  const { carId } = req.body;
  try {
    const carPhoto = await getPhoto(carId);
    return res.status(200).json({ success: true, data: carPhoto });
  } catch (error) {
    console.log(error);
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: "api/v1/photos/uniquephoto",
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = photos;

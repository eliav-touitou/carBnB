const { Router } = require("express");
const { writeLogs, wikiScraper } = require("../../utils/helperFunctions");
const top = Router();
const {
  top5Owners,
  top5Locations,
  top5Cars,
  getCarsByBrand,
} = require("../../database/queries");

top.get("/:type", async (req, res) => {
  const { type } = req.params;
  let topFive;
  try {
    switch (type) {
      case "cars":
        topFive = await top5Cars(type);
        break;
      case "owners":
        topFive = await top5Owners(type);
        break;
      case "locations":
        topFive = await top5Locations(type);
        topFive = await wikiScraper(topFive);
        break;
      default:
        break;
    }
    // console.log(topFive);
    return res.status(200).json({ success: true, data: topFive });
  } catch (error) {
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: `api/v1/top/${type}`,
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

top.get("/brand/:brand", async (req, res) => {
  const { brand } = req.params;
  console.log(brand);
  try {
    const allCarsByBrand = await getCarsByBrand(brand);
    return res.status(200).json({ success: true, data: allCarsByBrand });
  } catch (error) {
    const objToWrite = {
      date: new Date(),
      error: error,
      status: 500,
      ourMessage: "Problems with our server",
      route: `api/v1/brand/${brand}`,
    };
    await writeLogs(objToWrite);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = top;

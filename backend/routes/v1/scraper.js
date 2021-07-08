require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { writeLogs } = require("../../utils/helperFunctions");
const city = "jerusalem";

// const url = `https://www.kayak.ae/cars/${city},Israel-c14964/${startDate}/${endDate}?sort=rank_a&fs=carcapacity=-${passengersKeys[passengers]}`;

async function run() {
  const url = `https://en.wikipedia.org/wiki/${city}`;
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    const scraper = cheerio.load(data);
    const melel = scraper(
      ".mw-body > #bodyContent > #mw-content-text > .mw-parser-output"
    )
      .children("p")
      .eq(1)
      .text();

    console.log(melel);
  } catch (err) {
    console.log(err);
    const objToWrite = {
      date: new Date(),
      error: err,
      status: "none",
      route: "/api/v1/scraper/run",
    };
    await writeLogs(objToWrite);
  }
}
run();

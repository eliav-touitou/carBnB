const axios = require("axios");
const cheerio = require("cheerio");
const { writeLogs } = require("../../utils/helperFunctions");
const city = "haifa";

async function run() {
  const url = `https://en.wikipedia.org/wiki/${city}`;
  try {
    const { data } = await axios.get(url);

    const scraper = cheerio.load(data);
    let dataFromWiki = scraper(
      ".mw-body > #bodyContent > #mw-content-text > .mw-parser-output"
    )
      .children("p")
      .eq(1)
      .text()
      .trim();
    dataFromWiki = dataFromWiki.replace(/(\[.*?\]|\(.*?\))/g, "");
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

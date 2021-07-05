require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const city = "Haifa";
const startDate = "2021-07-12";
const endDate = "2021-08-12";
const passengersKeys = {
  2: "",
  4: "pas_1_2",
  5: "pas_1_2",
  7: "pas_1_2,pas_3_5",
};
// const url = `https://www.kayak.ae/cars/${city},Israel-c14964/${startDate}/${endDate}?sort=rank_a&fs=carcapacity=-${passengersKeys[passengers]}`;

async function run() {
  const url = `https://www.kayak.ae/cars/Haifa,Israel-c14964/2021-07-12/2021-07-19?sort=price_a`;
  try {
    const { data } = await axios.get(url);
    const scraper = cheerio.load(data);
    // console.log(scraper.text());
    let allPriceString = scraper(".EuxN-Current").text().trim();
    console.log(allPriceString);
    const arr = allPriceString.split(/\s+/);
    //   console.log(arr);
    arr[0] = arr[arr.length - 1] + arr[0];
    arr.pop();
    const calculateAverage = (priceArr) => {
      let sum = 0;
      priceArr.forEach((price, i) => {
        price = price.slice(0, price.length - 3);
        if (price.includes(",")) price = price.replace(/,/g, "");
        price = Number(price);
        sum += price;
        console.log("sum");
      });
      return (sum / Number(priceArr.length)).toFixed(2);
    };
    const average = calculateAverage(arr);
    console.log(average);
  } catch (err) {
    console.log(err);
  }
}
run();

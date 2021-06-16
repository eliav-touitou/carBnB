const calculateDiscount = (tariff, percent, period) => {
  percent = percent.slice(0, -1);
  const newPrice = (tariff - (percent / 100) * tariff) * period;
  //   (pricePerDay - (pricePerMonth / 100) * pricePerDay) * 30;
  return newPrice;
};

module.exports = { calculateDiscount };

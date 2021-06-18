const calculateDiscount = (tariff, percent, period) => {
  percent = percent.slice(0, -1);
  const newPrice = (tariff - (percent / 100) * tariff) * period;
  return newPrice;
};

module.exports = { calculateDiscount };

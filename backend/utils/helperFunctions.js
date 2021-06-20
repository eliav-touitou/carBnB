const calculateDiscount = (tariff, percent, period) => {
  percent = percent.slice(0, -1);
  const newPrice = (tariff - (percent / 100) * tariff) * period;
  return newPrice;
};

const buildPatterns = ({ transactionId, startDate, endDate }) => {
  const textPatternToRenter = `Dear valued User,
  Your order Num ${transactionId} was successfully made!
  you will be notified when the car owner will approve your request. 
  in case the car owner won't handle your request within 12 hours the order will be canceled and you will be notified.
  kind regards, carBnB team`;

  const textPatternToOwner = `Dear valued User,
  your car got an order from user.... on these dates: ${startDate} - ${endDate}.
  please enter your account to confirm the order.
  in case you won't handle the request within 12 hours the order will be canceled.
  kind regards, carBnB team
  `;

  return { textPatternToRenter, textPatternToOwner };
};
module.exports = { calculateDiscount, buildPatterns };

const nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rozjino@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const buildPatterns = ({ transactionId, startDate, endDate }) => {
  const textPatternToRenter = `<p>Dear valued User,
  Your order Num ${transactionId} was successfully made!
  you will be notified when the car owner will approve your request. 
  in case the car owner won't handle your request within 12 hours the order will be canceled and you will be notified.
  kind regards, carBnB team
  </p>`;

  const textPatternToOwner = `<p>Dear valued User,
  your car got an order from user.... on these dates: ${startDate} - ${endDate}.
  please enter your account to confirm the order.
  in case you won't handle the request within 12 hours the order will be canceled.
  kind regards, carBnB team</p>
  `;

  return { textPatternToRenter, textPatternToOwner };
};

const buildPatternsForCanceledRentals = ({ transactionId }) => {
  const textToCanceledRenter = `<p>Dear valued User,
  Your order Num ${transactionId} was canceled because the cars owner didn't complete the process after 12 hours.
  we deeply apologize for the inconvenience
  kind regards, carBnB team<p/>`;
  const textToCanceledOwner = `<p>Dear valued User,
  the order Num ${transactionId}, for your car was canceled because you didn't complete the process and approved the order within our 12H policy .
  kind regards, carBnB team<p/>`;

  return { textToCanceledRenter, textToCanceledOwner };
};

const sendMail = ({ from, to, subject, text }) => {
  mailOption = {
    from: from,
    to: to,
    subject: subject,
    html: text,
    attachments: [
      {
        filename: "Receipt.pdf",
        path: "C:/Users/yone5/Desktop/Cyber4s/carBnB/backend/output.pdf",
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      throw error;
    } else {
      console.log(info);
      return true;
    }
  });
};

module.exports = {
  buildPatterns,
  buildPatternsForCanceledRentals,
  sendMail,
};

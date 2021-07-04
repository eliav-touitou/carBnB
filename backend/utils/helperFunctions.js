require("dotenv").config();
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const logo = process.env.LOGO_PATH;

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
  kind regards, carBnB team</p>`;

  const textPatternToOwner = `<p>Dear valued User,
  your car got an order from user.... on these dates: ${new Date(
    startDate
  ).toDateString()} - ${new Date(endDate).toDateString()}.
  please enter your account to confirm the order.
  in case you won't handle the request within 12 hours the order will be canceled.
  kind regards, carBnB team</p>`;

  return { textPatternToRenter, textPatternToOwner };
};

const buildPatternsForCanceledRentals = ({ transactionId }) => {
  const textToCanceledRenter = `<p>Dear valued User,
  Your order Num ${transactionId} was canceled because the cars owner didn't complete the process after 12 hours.
  we deeply apologize for the inconvenience
  kind regards, carBnB team</p>`;
  const textToCanceledOwner = `<p>Dear valued User,
  the order Num ${transactionId}, for your car was canceled because you didn't complete the process and approved the order within our 12H policy .
  kind regards, carBnB team</p>`;

  return { textToCanceledRenter, textToCanceledOwner };
};

const buildPatternsForAfterRentalFinish = ({ transactionId }) => {
  const textToRenterAfterFinish = `<p>Dear valued User,
  Your order Num ${transactionId} was over. Let us know how was your ride and please 
  rating the owner for better service.
  kind regards, carBnB team</p>`;

  return { textToRenterAfterFinish };
};

const sendMail = ({ from, to, subject, text }) => {
  console.log("///////////////////////////////////////");
  console.log(from, to, subject, text);
  mailOption = {
    from: from,
    to: to,
    subject: subject,
    html: text,
    attachments: [
      {
        filename: "Receipt.pdf",
        path: process.env.PDF_PATH,
        contentType: "application/pdf",
      },
    ],
  };
  if (subject !== "New Order incoming") delete mailOption.attachments;
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(info);
      return true;
    }
  });
};

const buildInvoice = async (userDetails, result, orderedCar) => {
  const invoice = {
    shipping: {
      name: userDetails.first_name + " " + userDetails.last_name,
      address: userDetails.address,
    },
    items: [
      {
        item: orderedCar.brand,
        description: orderedCar.model + " " + orderedCar.year,
        quantity: 1,
        amount: result.total_price,
      },
    ],
    subtotal: result.total_price,
    paid: 0,
    transaction_id: String(result.transaction_id),
  };
  return invoice;
};

const createPDFToSend = async (invoice, path) => {
  function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
  }

  function generateHeader(doc) {
    doc
      .image(logo, 10, 0, { height: 150 })
      .fillColor("#444444")
      .fontSize(10)
      .text("CarBnB Inc.", 200, 50, { align: "right" })
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("New York, NY, 10025", 200, 80, { align: "right" })
      .moveDown();
  }

  function generateCustomerInformation(doc, invoice) {
    doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Invoice Number:", 50, customerInformationTop)
      .font("Helvetica")
      .text(invoice.transaction_id, 150, customerInformationTop)
      .font("Helvetica-Bold")
      .text("Invoice Date:", 50, customerInformationTop + 15)
      .font("Helvetica")
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .font("Helvetica-Bold")
      .text("Balance Due:", 50, customerInformationTop + 30)
      .font("Helvetica")
      .text(
        formatCurrency(invoice.subtotal - invoice.paid),
        150,
        customerInformationTop + 30
      )
      .font("Helvetica-Bold")
      .text("Renter: ", 300, customerInformationTop)
      .font("Helvetica")
      .text(invoice.shipping.name, 350, customerInformationTop)
      .text(invoice.shipping.address, 300, customerInformationTop + 15)
      .moveDown();

    generateHr(doc, 252);
  }

  function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Brand",
      "Model",
      "Quantity",
      "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.item,
        item.description,
        item.quantity,
        formatCurrency(item.amount)
      );

      generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Subtotal",

      formatCurrency(invoice.subtotal)
    );

    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
      doc,
      paidToDatePosition,
      "",
      "",
      "Paid To Date",

      formatCurrency(invoice.paid)
    );

    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      duePosition,
      "",
      "",
      "Balance Due",

      formatCurrency(invoice.subtotal - invoice.paid)
    );
    doc.font("Helvetica");
  }

  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Payment is due within 15 days. Thank you for your business.",
        50,
        780,
        { align: "center", width: 500 }
      );
  }

  function generateTableRow(doc, y, item, description, quantity, lineTotal) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(description, 150, y)
      .text(quantity, 370, y, { width: 90, align: "right" })
      .text(lineTotal, 0, y, { align: "right" });
  }

  function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  function formatCurrency(cents) {
    return "$" + cents.toFixed(2);
  }

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
  }
  createInvoice(invoice, path);
};

module.exports = {
  buildPatterns,
  buildPatternsForCanceledRentals,
  sendMail,
  createPDFToSend,
  buildInvoice,
  buildPatternsForAfterRentalFinish,
};

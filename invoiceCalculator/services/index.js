// app.js
const { loadAndValidate } = require('./inputLoader');
const { calculateInvoice } = require('./invoiceCalculator');
const { printInvoice } = require('./invoicePrinter');

function main() {
    const { validData, invalidEntries } = loadAndValidate();
  
    if (validData.length === 0 && invalidEntries.length === 0) {
      console.log('No valid usage data found.');
      return;
    }
  
    validData.forEach((usage) => {
      const invoice = calculateInvoice(usage);
      printInvoice(invoice);
    });
    
    console.log('------------ Usage entry stats ------------');
    console.table([{validEntries : validData.length}, {invalidEntries: invalidEntries.length}]);

  }
  
  main();
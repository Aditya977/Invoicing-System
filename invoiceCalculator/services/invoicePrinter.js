// invoicePrinter.js
function printInvoice(invoice) {
    console.log(`\n
    Invoice for Customer: ${invoice.CustomerId}`);
    console.log('----------------------------');
    console.log(`API Calls: ${invoice.apiCost.toFixed(2)}`);
    console.log(`Storage: ${invoice.storageCost.toFixed(2)}`);
    console.log(`Compute Time: ${invoice.computeCost.toFixed(2)}`);
    console.log('----------------------------');
    console.log(`Total Due: ${invoice.totalDue.toFixed(2)}`);
    console.log();
  }
  
  module.exports = { printInvoice };
  
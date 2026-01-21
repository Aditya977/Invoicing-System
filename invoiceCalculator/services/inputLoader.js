const path = require('path');
const fs = require('fs');

/**
 * Load JSON file based on CLI arg or default
 */
function loadUsageData() {
  const cliPath = process.argv[2];
  const filePath = cliPath
    ? path.resolve(cliPath)
    : path.resolve(__dirname, '../usage-data.json');

  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error(`Failed to load usage data json from ${filePath}`);
    console.error(err.message);
    return null;
  }
}

/**
 * Validates each entry as per data type.
 */
function loadAndValidate() {
  const usageData = loadUsageData();

  if (!Array.isArray(usageData)) {
    console.error('Invalid data in json.');
    return { validData: [], invalidEntries: usageData ?? [] };
  }

  const validData = [];
  const invalidEntries = [];

  usageData.forEach((entry) => {
    if (
      typeof entry.CustomerId === 'string' &&
      typeof entry.API_Calls === 'number' &&
      typeof entry.Storage_GB === 'number' &&
      typeof entry.Compute_Minutes === 'number' &&
      entry.CustomerId.trim() !== ''
    ) {
      validData.push(entry);
    } else {
      invalidEntries.push(entry);
      const customerId = entry.CustomerId || 'N/A';
      console.warn(
        `Skipping invalid entry: Missing or invalid fields for CustomerId: ${customerId}`
      );
    }
  });

  return { validData, invalidEntries };
}

module.exports = { loadAndValidate };

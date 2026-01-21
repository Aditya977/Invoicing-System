const { USAGE_PRICING } = require('../constants/constants');

/**
 * To calculate usage data for generating invoice
 */
function calculateInvoice(usage) {
  let apiCost = 0;

  if (usage.API_Calls <= USAGE_PRICING.API_CALLS.TIER1_LIMIT) {
    apiCost = usage.API_Calls * USAGE_PRICING.API_CALLS.TIER1_PRICE;
  } else {
    const tier1Cost =
      USAGE_PRICING.API_CALLS.TIER1_LIMIT *
      USAGE_PRICING.API_CALLS.TIER1_PRICE;

    const tier2Calls =
      usage.API_Calls - USAGE_PRICING.API_CALLS.TIER1_LIMIT;

    const tier2Cost =
      tier2Calls * USAGE_PRICING.API_CALLS.TIER2_PRICE;

    apiCost = tier1Cost + tier2Cost;
  }

  const storageCost =
    usage.Storage_GB * USAGE_PRICING.STORAGE_PRICE_PER_GB;

  const computeCost =
    usage.Compute_Minutes * USAGE_PRICING.COMPUTE_PRICE_PER_MINUTE;

  const totalDue = apiCost + storageCost + computeCost;

  return {
    CustomerId: usage.CustomerId,
    apiCost: Number(apiCost.toFixed(2)),
    storageCost: Number(storageCost.toFixed(2)),
    computeCost: Number(computeCost.toFixed(2)),
    totalDue: Number(totalDue.toFixed(2)),
  };
}

module.exports = { calculateInvoice };

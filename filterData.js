const products = require("./productData");

function filterData(filter) {
  const normalized = filter.toLowerCase();
  const result = products.filter((p) => {
    console.log("Comparing:", p.category.toLowerCase(), "with", normalized);
    return p.category.toLowerCase() === normalized;
  });
  console.log("Filtered Result:", result);
  return result;
}

module.exports = { filterData };

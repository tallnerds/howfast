const chalk = require("chalk");
const _ = require("lodash");

/**
 *
 * Colorize the console output based on the given score
 *
 * @param {*} output
 * @param {*} score
 */
const colorify = function (output, score) {
  switch (true) {
    case score > 50:
      return chalk.green(output);
      break;
    case score > 25:
      return chalk.yellow(output);
      break;
    default:
      return chalk.red(output);
      break;
  }
};

/**
 * Displays a summary of all run metric data to console
 *
 * @param metrics
 */
const metricSummary = function (metrics) {
  console.log(
    chalk.underline(`
Average performance`)
  );

  _.forEach(
    metrics,
    ({ label, metricUnit, average: { score, numericValue } }) => {
      console.log(
        `${label}: ${colorify(
          `${numericValue ? numericValue : score}${
            metricUnit ? metricUnit : ""
          }`,
          score
        )}`
      );
    }
  );
};

module.exports = {
  colorify,
  metricSummary,
};

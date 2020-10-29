const chalk = require("chalk");

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

module.exports = {
  colorify,
};

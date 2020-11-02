#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");
const parser = require("url");
const _ = require("lodash");
const chalk = require("chalk");
const { colorify } = require("./../lib/console");
const renderReport = require("./../lib/renderReport");
const { getMetrics, parseMetrics } = require("./../lib/pagespeed");

const options = yargs
  .usage("Usage: -n <name>")
  .option("s", {
    alias: "site",
    describe: "Site to run performance on",
    type: "string",
    demandOption: true,
  })
  .option("t", {
    alias: "times",
    describe: "Number of runs to average across",
    type: "number",
    default: 3,
  })
  .option("o", {
    alias: "output",
    describe: "Place you would like to output your file",
    type: "string",
    default: "/tmp",
  }).argv;

(async () => {
  let results = [];
  // Run through and get results
  for (let x = 0; x < options.times; x++) {
    console.log(`Run ${x + 1} for ${options.site}`);
    results.push(await getMetrics(options.site));
    // results[x] = JSON.parse(fs.readFileSync("report.json"));
  }

  const metrics = parseMetrics(results, options.times);
  renderReport(metrics, options.times);

  // Average metrics over runs
  console.log(
    chalk.underline(`
Average Performance Across ${options.site}`)
  );

  _.forEach(metrics, ({ label, metricUnit, average: { score, numericValue } }) => {
    console.log(
      `${label}: ${colorify(
        `${numericValue ? numericValue : score}${metricUnit ? metricUnit : ""}`,
        score
      )}`
    );
  });

  // Output

  // fs.writeFileSync(
  //   `${options.output}/${
  //     parser.parse(options.site).hostname
  //   }-report-${new Date().toISOString()}.json`,
  //   results[0].report
  // );
})();

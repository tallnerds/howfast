#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");
const parser = require("url");
const _ = require("lodash");
const chalk = require("chalk");
const { colorify } = require("./../lib/console");
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
  let results = {};
  // Run through and get results
  for (let x = 0; x < options.times; x++) {
    console.log(`Run ${x + 1} for ${options.site}`);
    results[x] = await getMetrics(options.site);
    // results[x] = JSON.parse(fs.readFileSync("report.json"));
  }

  const metrics = parseMetrics(results, options.times);

  // Average metrics over runs
  console.log(
    chalk.underline(`
Average Performance Across ${options.site}`)
  );
  console.log(`
Performance Score: ${colorify(
    metrics.performanceScore.score,
    metrics.performanceScore.score
  )}
First Contentful Paint: ${colorify(
    `${metrics.firstContentfulPaint.numericValue}ms`,
    metrics.firstContentfulPaint.score
  )}
Largest Contentful Paint: ${colorify(
    `${metrics.largestContentfulPaint.numericValue}ms`,
    metrics.largestContentfulPaint.score
  )}
Speed Index: ${colorify(
    `${metrics.speedIndex.numericValue}ms`,
    metrics.speedIndex.score
  )}
Cumulative Layout Shift: ${colorify(
    `${metrics.cumulativeLayoutShift.numericValue}`,
    metrics.cumulativeLayoutShift.score
  )}
Server Response Time: ${colorify(
    `${metrics.serverResponseTime.numericValue}ms`,
    metrics.serverResponseTime.score
  )}
`);

  // Output

  // fs.writeFileSync(
  //   `${options.output}/${
  //     parser.parse(options.site).hostname
  //   }-report-${new Date().toISOString()}.json`,
  //   results[0].report
  // );
})();
